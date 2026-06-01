"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/components/AuthProvider";
import { DataTable } from "@/components/StatsAndTables";
import {
	createStaffUser,
	getStaffUsers,
	revokeStaffAccess,
	updateStaffRoles,
} from "@/lib/staff";
import { type StaffMember, UserRole } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { X, UserPlus, UserCog, UserMinus, Check, ShieldAlert } from "lucide-react";

const ROLE_LABELS: Record<UserRole, string> = {
	[UserRole.Admin]: "Administrador",
	[UserRole.Manager]: "Gerente",
	[UserRole.Sales]: "Ventas",
	[UserRole.Support]: "Soporte",
	[UserRole.Publisher]: "Editor",
	[UserRole.Viewer]: "Viewer",
	[UserRole.Customer]: "Cliente",
};

const ROLE_BADGE: Record<UserRole, string> = {
	[UserRole.Admin]: "badge-red",
	[UserRole.Manager]: "badge-blue",
	[UserRole.Sales]: "badge-green",
	[UserRole.Support]: "badge-yellow",
	[UserRole.Publisher]: "badge-purple",
	[UserRole.Viewer]: "badge-gray",
	[UserRole.Customer]: "badge-green",
};

const STAFF_ROLES = [
	UserRole.Admin,
	UserRole.Manager,
	UserRole.Sales,
	UserRole.Support,
	UserRole.Publisher,
];

// ── Modals ──────────────────────────────────────────────────────────────────

function AnimatedModal({
	onClose,
	onSubmit,
	title,
	subtitle,
	icon: Icon,
	children,
	maxWidth = "max-w-2xl",
	loading = false,
	submitText = "Guardar",
	loadingText = "Guardando...",
	footerText = "Completando formulario",
	SubmitIcon = Check,
	submitButtonClass = "bg-abtec-green shadow-abtec-green/30 hover:shadow-abtec-green/40 hover:-translate-y-0.5",
}: {
	onClose: () => void;
	onSubmit: (e?: React.FormEvent) => void;
	title: string;
	subtitle: string;
	icon: any;
	children: React.ReactNode;
	maxWidth?: string;
	loading?: boolean;
	submitText?: string;
	loadingText?: string;
	footerText?: string;
	SubmitIcon?: any;
	submitButtonClass?: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
			animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
			exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
			transition={{ duration: 0.3 }}
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 sm:p-6"
			onClick={onClose}
		>
			<motion.form
				onSubmit={(e) => { e.preventDefault(); onSubmit(e); }}
				initial={{ opacity: 0, scale: 0.95, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: 20 }}
				transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
				className={`bg-white rounded-[24px] ${maxWidth} w-full max-h-[92vh] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/60 flex flex-col overflow-hidden relative`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Decoration */}
				<div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${submitButtonClass.includes('red') ? 'from-red-600 via-rose-500 to-red-400' : 'from-abtec-green via-emerald-400 to-teal-500'}`}></div>

				{/* Header */}
				<div className="flex justify-between items-start border-b border-slate-100 bg-white/80 backdrop-blur-md z-10 shrink-0" style={{ padding: '24px 40px' }}>
					<div className="flex items-start gap-4">
						{Icon && (
							<div className={`flex items-center justify-center w-12 h-12 rounded-2xl shadow-inner border shrink-0 ${submitButtonClass.includes('red') ? 'bg-gradient-to-br from-red-600/20 to-red-600/5 text-red-600 border-red-600/10' : 'bg-gradient-to-br from-abtec-green/20 to-abtec-green/5 text-abtec-green border-abtec-green/10'}`}>
								<Icon size={24} className={submitButtonClass.includes('red') ? 'text-red-600' : 'text-abtec-green'} />
							</div>
						)}
						<div className="mt-1">
							<h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
								{title}
							</h3>
							<p className="text-sm text-slate-500 mt-1 font-medium">
								{subtitle}
							</p>
						</div>
					</div>
					<button
						type="button"
						className="p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer bg-slate-50 border border-slate-200/60 shadow-sm shrink-0 ml-4"
						onClick={onClose}
					>
						<X size={18} />
					</button>
				</div>

				<div className="flex flex-col flex-grow overflow-hidden bg-[#fafafa]">
					<div className="flex-grow overflow-y-auto" style={{ padding: '32px 40px' }}>
						{children}
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-between items-center bg-white border-t border-slate-100 shrink-0" style={{ padding: '20px 40px' }}>
					<p className="text-xs text-slate-400 font-medium hidden sm:block">
						{footerText}
					</p>
					<div className="flex gap-3 w-full sm:w-auto">
						<button
							type="button"
							className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 bg-white border border-slate-200/80 shadow-sm hover:bg-slate-50 hover:text-slate-800 transition-all duration-200 cursor-pointer flex-1 sm:flex-none"
							onClick={onClose}
							disabled={loading}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className={`px-8 py-2.5 rounded-xl font-bold text-white shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border border-transparent disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex-1 sm:flex-none ${submitButtonClass}`}
							disabled={loading}
						>
							{loading ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
									<span>{loadingText}</span>
								</>
							) : (
								<>
									<span>{submitText}</span>
									{SubmitIcon && <SubmitIcon size={18} strokeWidth={2.5} />}
								</>
							)}
						</button>
					</div>
				</div>
			</motion.form>
		</motion.div>
	);
}

function CreateModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void; }) {
	const [form, setForm] = useState({ displayName: "", email: "", password: "", roles: [UserRole.Sales] as UserRole[] });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleRoleChange = (role: UserRole, checked: boolean) => {
		if (checked) setForm(prev => ({ ...prev, roles: [...prev.roles, role] }));
		else setForm(prev => ({ ...prev, roles: prev.roles.filter(r => r !== role) }));
	};

	const handleSubmit = async () => {
		if (form.roles.length === 0) {
			setError("Debes seleccionar al menos un rol.");
			return;
		}
		setLoading(true); setError(null);
		try {
			await createStaffUser(form);
			onSuccess();
		} catch (err: unknown) {
			setError((err as { message?: string })?.message ?? "Error al crear usuario.");
		} finally { setLoading(false); }
	};

	return (
		<AnimatedModal
			title="Nuevo Usuario Staff"
			subtitle="Crea una cuenta para dar acceso al CRM"
			icon={UserPlus}
			onClose={onClose}
			onSubmit={handleSubmit}
			loading={loading}
			submitText="Crear Usuario"
			loadingText="Creando..."
			footerText="Configurando nuevo acceso"
		>
			<div className="space-y-5">
				<div className="flex flex-col gap-2 relative group">
					<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
						Nombre completo <span className="text-rose-500">*</span>
					</label>
					<input
						type="text" required
						className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3.5 text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all font-medium"
						value={form.displayName}
						onChange={(e) => setForm({ ...form, displayName: e.target.value })}
						placeholder="Ej: Juan Pérez"
					/>
				</div>
				<div className="flex flex-col gap-2 relative group">
					<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
						Email <span className="text-rose-500">*</span>
					</label>
					<input
						type="email" required
						className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3.5 text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all font-medium"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						placeholder="juan@abtec.mx"
					/>
				</div>
				<div className="flex flex-col gap-2 relative group">
					<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
						Contraseña temporal <span className="text-rose-500">*</span>
					</label>
					<input
						type="password" required minLength={6}
						className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3.5 text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all font-medium"
						value={form.password}
						onChange={(e) => setForm({ ...form, password: e.target.value })}
						placeholder="Mínimo 6 caracteres"
					/>
				</div>
				<div className="flex flex-col gap-2 relative group">
					<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
						Roles
					</label>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-slate-200/70 rounded-xl bg-white shadow-sm">
						{STAFF_ROLES.map((r) => {
							const checked = form.roles.includes(r);
							return (
								<label key={r} className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${checked ? 'border-abtec-green/40 bg-abtec-green/5' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
									<input
										type="checkbox"
										checked={checked}
										onChange={(e) => handleRoleChange(r, e.target.checked)}
										className="w-4 h-4 rounded border-slate-300 text-abtec-green focus:ring-abtec-green/30"
									/>
									<span className={`text-sm font-medium ${checked ? 'text-abtec-green' : 'text-slate-600'}`}>{ROLE_LABELS[r]}</span>
								</label>
							);
						})}
					</div>
				</div>

				{error && (
					<div className="p-3 bg-rose-50 text-rose-600 text-sm border border-rose-100 rounded-xl font-medium">
						{error}
					</div>
				)}
			</div>
		</AnimatedModal>
	);
}

function EditRoleModal({ member, onClose, onSuccess }: { member: StaffMember; onClose: () => void; onSuccess: () => void; }) {
	const [roles, setRoles] = useState<UserRole[]>(member.roles || []);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleRoleChange = (role: UserRole, checked: boolean) => {
		if (checked) setRoles(prev => [...prev, role]);
		else setRoles(prev => prev.filter(r => r !== role));
	};

	const handleSubmit = async () => {
		if (roles.length === 0) {
			setError("Debes seleccionar al menos un rol.");
			return;
		}
		setLoading(true); setError(null);
		try {
			await updateStaffRoles(member.id, roles);
			onSuccess();
		} catch (err: unknown) {
			setError((err as { message?: string })?.message ?? "Error al actualizar rol.");
		} finally { setLoading(false); }
	};

	return (
		<AnimatedModal
			title="Editar Roles"
			subtitle={`Actualizando roles para: ${member.displayName} · ${member.email}`}
			icon={UserCog}
			onClose={onClose}
			onSubmit={handleSubmit}
			loading={loading}
			submitText="Guardar Cambios"
			loadingText="Guardando..."
			footerText="Ajustando permisos"
		>
			<div className="space-y-5">
				<div className="flex flex-col gap-2 relative group">
					<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
						Roles Asignados
					</label>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-slate-200/70 rounded-xl bg-white shadow-sm">
						{STAFF_ROLES.map((r) => {
							const checked = roles.includes(r);
							return (
								<label key={r} className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${checked ? 'border-abtec-green/40 bg-abtec-green/5' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
									<input
										type="checkbox"
										checked={checked}
										onChange={(e) => handleRoleChange(r, e.target.checked)}
										className="w-4 h-4 rounded border-slate-300 text-abtec-green focus:ring-abtec-green/30"
									/>
									<span className={`text-sm font-medium ${checked ? 'text-abtec-green' : 'text-slate-600'}`}>{ROLE_LABELS[r]}</span>
								</label>
							);
						})}
					</div>
				</div>

				{error && (
					<div className="p-3 bg-rose-50 text-rose-600 text-sm border border-rose-100 rounded-xl font-medium">
						{error}
					</div>
				)}
			</div>
		</AnimatedModal>
	);
}

function RevokeModal({ member, onClose, onSuccess }: { member: StaffMember; onClose: () => void; onSuccess: () => void; }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleRevoke = async () => {
		setLoading(true); setError(null);
		try {
			await revokeStaffAccess(member.id);
			onSuccess();
		} catch (err: unknown) {
			setError((err as { message?: string })?.message ?? "Error al revocar acceso.");
		} finally { setLoading(false); }
	};

	return (
		<AnimatedModal
			title="Revocar Acceso"
			subtitle={`Eliminando permisos para: ${member.displayName}`}
			icon={UserMinus}
			onClose={onClose}
			onSubmit={handleRevoke}
			loading={loading}
			submitText="Revocar Acceso"
			loadingText="Revocando..."
			footerText="Acción irreversible"
			submitButtonClass="bg-red-600 shadow-red-600/30 hover:shadow-red-600/40 hover:-translate-y-0.5"
		>
			<div className="space-y-5 flex flex-col items-center justify-center py-6 text-center">
				<div className="w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mb-4">
					<ShieldAlert className="text-red-500" size={32} />
				</div>
				<h4 className="text-xl font-bold text-slate-800">¿Estás seguro?</h4>
				<p className="text-slate-500 text-sm max-w-sm">
					<strong className="text-slate-700">{member.displayName}</strong> perderá el acceso al CRM de forma inmediata.
					Su cuenta base permanecerá, pero sus roles serán removidos.
				</p>

				{error && (
					<div className="p-3 w-full max-w-sm mx-auto bg-rose-50 text-rose-600 text-sm border border-rose-100 rounded-xl font-medium mt-4">
						{error}
					</div>
				)}
			</div>
		</AnimatedModal>
	);
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function StaffPage() {
	const { staffRoles } = useAuth();
	const router = useRouter();

	const [createOpen, setCreateOpen] = useState(false);
	const [editTarget, setEditTarget] = useState<StaffMember | null>(null);
	const [revokeTarget, setRevokeTarget] = useState<StaffMember | null>(null);

	// Redirect si no es admin
	useEffect(() => {
		if (staffRoles && !staffRoles.includes("admin")) {
			router.replace("/");
		}
	}, [staffRoles, router]);

	const {
		data: staff,
		isLoading,
		mutate,
	} = useSWR<StaffMember[]>("staff-users", getStaffUsers, {
		revalidateOnFocus: false,
		dedupingInterval: 30000,
	});

	const handleSuccess = () => {
		mutate();
		setCreateOpen(false);
		setEditTarget(null);
		setRevokeTarget(null);
	};

	const columns = [
		{
			key: "displayName",
			label: "Nombre",
			sortable: true,
		},
		{
			key: "email",
			label: "Email",
			sortable: true,
		},
		{
			key: "roles",
			label: "Roles",
			render: (item: StaffMember) => (
				<div className="flex flex-wrap gap-1">
					{(item.roles || []).map((role) => (
						<span key={role} className={`badge ${ROLE_BADGE[role] ?? "badge-gray"}`}>
							{ROLE_LABELS[role] ?? role}
						</span>
					))}
				</div>
			),
		},
		{
			key: "status",
			label: "Estado",
			render: (item: StaffMember) => (
				<span
					className={`badge ${item.status === "active" ? "badge-green" : "badge-gray"}`}
				>
					{item.status === "active" ? "Activo" : "Inactivo"}
				</span>
			),
		},
		{
			key: "createdAt",
			label: "Creado",
			render: (item: StaffMember) =>
				item.createdAt
					? new Date(item.createdAt).toLocaleDateString("es-MX", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})
					: "—",
		},
		{
			key: "actions",
			label: "",
			render: (item: StaffMember) => (
				<div className="flex items-center gap-2 justify-end">
					<button
						type="button"
						onClick={() => setEditTarget(item)}
						className="text-xs px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
					>
						Editar roles
					</button>
					<button
						type="button"
						onClick={() => setRevokeTarget(item)}
						className="text-xs px-3 py-1 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
					>
						Revocar
					</button>
				</div>
			),
		},
	];

	if (!staffRoles.includes("admin")) return null;

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Usuarios Staff</h2>
					<p>Gestiona el acceso del equipo interno al CRM</p>
				</div>
				<div className="page-actions">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => setCreateOpen(true)}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<path d="M12 5v14M5 12h14" />
						</svg>
						Nuevo Usuario
					</button>
				</div>
			</div>

			<DataTable
				data={staff ?? []}
				columns={columns}
				searchPlaceholder="Buscar por nombre o email..."
				onSearch={() => {}}
				filterOptions={STAFF_ROLES.map((r) => ({
					label: ROLE_LABELS[r],
					value: r,
				}))}
				emptyMessage={
					isLoading
						? "Cargando usuarios..."
						: "No hay usuarios staff registrados."
				}
			/>

			<AnimatePresence>
				{createOpen && (
					<CreateModal
						onClose={() => setCreateOpen(false)}
						onSuccess={handleSuccess}
					/>
				)}
				{editTarget && (
					<EditRoleModal
						member={editTarget}
						onClose={() => setEditTarget(null)}
						onSuccess={handleSuccess}
					/>
				)}
				{revokeTarget && (
					<RevokeModal
						member={revokeTarget}
						onClose={() => setRevokeTarget(null)}
						onSuccess={handleSuccess}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

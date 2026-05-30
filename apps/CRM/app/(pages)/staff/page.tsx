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

function ModalOverlay({
	onClose,
	children,
}: {
	onClose: () => void;
	children: React.ReactNode;
}) {
	return (
		<div
			className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}

function CreateModal({
	onClose,
	onSuccess,
}: {
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [form, setForm] = useState({
		displayName: "",
		email: "",
		password: "",
		roles: [UserRole.Sales] as UserRole[],
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleRoleChange = (role: UserRole, checked: boolean) => {
		if (checked) {
			setForm((prev) => ({ ...prev, roles: [...prev.roles, role] }));
		} else {
			setForm((prev) => ({ ...prev, roles: prev.roles.filter((r) => r !== role) }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (form.roles.length === 0) {
			setError("Debes seleccionar al menos un rol.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await createStaffUser(form);
			onSuccess();
		} catch (err: unknown) {
			const msg =
				(err as { message?: string })?.message ?? "Error al crear usuario.";
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ModalOverlay onClose={onClose}>
			<h3 className="text-lg font-bold text-gray-900 mb-4">
				Nuevo Usuario Staff
			</h3>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
						Nombre completo
					</label>
					<input
						type="text"
						required
						className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
						value={form.displayName}
						onChange={(e) => setForm({ ...form, displayName: e.target.value })}
						placeholder="Juan Pérez"
					/>
				</div>
				<div>
					<label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
						Email
					</label>
					<input
						type="email"
						required
						className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						placeholder="juan@abtec.mx"
					/>
				</div>
				<div>
					<label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
						Contraseña temporal
					</label>
					<input
						type="password"
						required
						minLength={6}
						className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
						value={form.password}
						onChange={(e) => setForm({ ...form, password: e.target.value })}
						placeholder="Mínimo 6 caracteres"
					/>
				</div>
				<div>
					<label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
						Roles
					</label>
					<div className="space-y-2 border border-gray-200 rounded-lg p-3">
						{STAFF_ROLES.map((r) => (
							<label key={r} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
								<input
									type="checkbox"
									checked={form.roles.includes(r)}
									onChange={(e) => handleRoleChange(r, e.target.checked)}
									className="rounded border-gray-300 text-primary focus:ring-primary/30"
								/>
								<span>{ROLE_LABELS[r]}</span>
							</label>
						))}
					</div>
				</div>

				{error && (
					<p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
						{error}
					</p>
				)}

				<div className="flex gap-3 pt-2">
					<button type="button" onClick={onClose} className="btn flex-1">
						Cancelar
					</button>
					<button
						type="submit"
						disabled={loading}
						className="btn btn-primary flex-1"
					>
						{loading ? "Creando..." : "Crear usuario"}
					</button>
				</div>
			</form>
		</ModalOverlay>
	);
}

function EditRoleModal({
	member,
	onClose,
	onSuccess,
}: {
	member: StaffMember;
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [roles, setRoles] = useState<UserRole[]>(member.roles || []);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleRoleChange = (role: UserRole, checked: boolean) => {
		if (checked) {
			setRoles((prev) => [...prev, role]);
		} else {
			setRoles((prev) => prev.filter((r) => r !== role));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (roles.length === 0) {
			setError("Debes seleccionar al menos un rol.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await updateStaffRoles(member.id, roles);
			onSuccess();
		} catch (err: unknown) {
			const msg =
				(err as { message?: string })?.message ?? "Error al actualizar rol.";
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ModalOverlay onClose={onClose}>
			<h3 className="text-lg font-bold text-gray-900 mb-1">Editar Roles</h3>
			<p className="text-sm text-gray-500 mb-4">
				{member.displayName} · {member.email}
			</p>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
						Roles
					</label>
					<div className="space-y-2 border border-gray-200 rounded-lg p-3">
						{STAFF_ROLES.map((r) => (
							<label key={r} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
								<input
									type="checkbox"
									checked={roles.includes(r)}
									onChange={(e) => handleRoleChange(r, e.target.checked)}
									className="rounded border-gray-300 text-primary focus:ring-primary/30"
								/>
								<span>{ROLE_LABELS[r]}</span>
							</label>
						))}
					</div>
				</div>

				{error && (
					<p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
						{error}
					</p>
				)}

				<div className="flex gap-3 pt-2">
					<button type="button" onClick={onClose} className="btn flex-1">
						Cancelar
					</button>
					<button
						type="submit"
						disabled={loading}
						className="btn btn-primary flex-1"
					>
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</div>
			</form>
		</ModalOverlay>
	);
}

function RevokeModal({
	member,
	onClose,
	onSuccess,
}: {
	member: StaffMember;
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleRevoke = async () => {
		setLoading(true);
		setError(null);
		try {
			await revokeStaffAccess(member.id);
			onSuccess();
		} catch (err: unknown) {
			const msg =
				(err as { message?: string })?.message ?? "Error al revocar acceso.";
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ModalOverlay onClose={onClose}>
			<div className="text-center">
				<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#ef4444"
						strokeWidth="2"
						aria-hidden="true"
					>
						<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
					</svg>
				</div>
				<h3 className="text-lg font-bold text-gray-900 mb-1">Revocar acceso</h3>
				<p className="text-sm text-gray-500 mb-1">
					<span className="font-semibold">{member.displayName}</span> perderá
					acceso al CRM inmediatamente.
				</p>
				<p className="text-xs text-gray-400 mb-4">
					Su cuenta de Firebase permanecerá, solo se revoca el claim.
				</p>

				{error && (
					<p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
						{error}
					</p>
				)}

				<div className="flex gap-3">
					<button type="button" onClick={onClose} className="btn flex-1">
						Cancelar
					</button>
					<button
						type="button"
						disabled={loading}
						onClick={handleRevoke}
						className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60"
					>
						{loading ? "Revocando..." : "Revocar acceso"}
					</button>
				</div>
			</div>
		</ModalOverlay>
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
		</div>
	);
}

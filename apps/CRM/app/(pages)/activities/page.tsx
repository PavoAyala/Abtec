"use client";

import useSWR from "swr";
import { useState } from "react";
import { DataTable } from "@/components/StatsAndTables";
import { fetcher, SWRKeys } from "@/lib/swr";
import { type Activity, ActivityType } from "@/types";
import { createActivity, updateActivity } from "@/lib/activities";
import { useAuth } from "@/components/AuthProvider";
import { ACTIVITY_TYPE_LABELS } from "@/lib/labels";

// Helper para parsear de manera segura fechas de Firestore/SWR
const parseDate = (d: any): Date | null => {
	if (!d) return null;
	if (d instanceof Date) return d;
	if (typeof d === "object" && "seconds" in d) return new Date(d.seconds * 1000);
	if (typeof d === "object" && "_seconds" in d) return new Date(d._seconds * 1000);
	const parsed = new Date(d);
	return isNaN(parsed.getTime()) ? null : parsed;
};

export default function ActivitiesPage() {
	const { user } = useAuth();
	const { data: activities, mutate } = useSWR<Activity[]>(
		SWRKeys.activities,
		fetcher.activities,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	
	// Form state
	const [type, setType] = useState<ActivityType>(ActivityType.Task);
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [isCompleted, setIsCompleted] = useState(false);
	
	// Calendar State
	const [currentMonth, setCurrentMonth] = useState(new Date());

	const openCreateModal = () => {
		setEditingId(null);
		setType(ActivityType.Task);
		setDescription("");
		setDueDate("");
		setIsCompleted(false);
		setIsModalOpen(true);
	};

	const openEditModal = (activity: Activity) => {
		setEditingId(activity.id);
		setType(activity.type);
		setDescription(activity.description);
		
		if (activity.dueDate) {
			const dateObj = parseDate(activity.dueDate);
			if (dateObj) {
				const yyyy = dateObj.getFullYear();
				const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
				const dd = String(dateObj.getDate()).padStart(2, '0');
				setDueDate(`${yyyy}-${mm}-${dd}`);
			} else {
				setDueDate("");
			}
		} else {
			setDueDate("");
		}
		
		setIsCompleted(!!activity.completedAt);
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const activityData = {
			type,
			description,
			dueDate: dueDate ? new Date(`${dueDate}T12:00:00`) : undefined, // mid-day to avoid timezone shifting
			completedAt: isCompleted ? new Date() : undefined,
			ownerId: user?.uid,
		};
		try {
			if (editingId) {
				await updateActivity(editingId, activityData);
			} else {
				await createActivity(activityData);
			}
			setIsModalOpen(false);
			mutate();
		} catch (error) {
			console.error("Error saving activity:", error);
			alert("Error al guardar la actividad.");
		}
	};

	const nextMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
	};

	const prevMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
	};

	const renderCalendar = () => {
		if (!activities) return null;

		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const firstDay = new Date(year, month, 1).getDay();
		
		const days = [];
		for (let i = 0; i < firstDay; i++) {
			days.push(<div key={`empty-${i}`} className="min-h-[100px] p-2 bg-slate-50/50 border-r border-b border-slate-200/50"></div>);
		}

		for (let d = 1; d <= daysInMonth; d++) {
			const dayActivities = activities.filter(act => {
				if (!act.dueDate) return false;
				const actDate = parseDate(act.dueDate);
				if (!actDate) return false;
				return actDate.getFullYear() === year && actDate.getMonth() === month && actDate.getDate() === d;
			});

			const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

			days.push(
				<div key={d} className={`p-2 min-h-[120px] flex flex-col gap-1 transition-colors border-r border-b border-slate-200/50 ${isToday ? 'bg-blue-50/30' : 'bg-white hover:bg-slate-50/80'}`}>
					<span className={`text-sm font-semibold mb-1 w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-abtec-blue text-white' : 'text-slate-500'}`}>{d}</span>
					<div className="flex flex-col gap-1.5 overflow-y-auto max-h-[90px] pr-1 custom-scrollbar">
						{dayActivities.map(act => (
							<div key={act.id} className={`group relative text-[11px] p-1.5 pr-6 rounded-md truncate border shadow-sm transition-all hover:shadow-md cursor-pointer ${act.completedAt ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`} title={act.description} onClick={() => openEditModal(act)}>
								<span className="font-bold mr-1">[{act.type}]</span>
								{act.description}
								<button 
									className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-abtec-blue opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded"
								>
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
								</button>
							</div>
						))}
					</div>
				</div>
			);
		}

		const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

		return (
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
				<div className="flex justify-between items-center p-6 border-b border-slate-100">
					<h3 className="text-xl font-bold text-slate-800 capitalize">{monthNames[month]} {year}</h3>
					<div className="flex gap-2">
						<button onClick={prevMonth} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
						</button>
						<button onClick={() => setCurrentMonth(new Date())} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Hoy</button>
						<button onClick={nextMonth} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
						</button>
					</div>
				</div>
				<div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200/50">
					{["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
						<div key={day} className="p-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200/50 last:border-0">
							{day}
						</div>
					))}
				</div>
				<div className="grid grid-cols-7 bg-white">
					{days.map((day, idx) => (
						<div key={`cell-${idx}`}>
							{day}
						</div>
					))}
				</div>
			</div>
		);
	};

	const columns = [
		{
			key: "type",
			label: "Tipo",
			sortable: true,
			render: (item: Activity) => {
				const getIcon = () => {
					switch (item.type) {
						case ActivityType.Call:
							return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle" }} aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" /></svg>;
						case ActivityType.Email:
							return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle" }} aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
						case ActivityType.Meeting:
							return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle" }} aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
						case ActivityType.Task:
							return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle" }} aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>;
						default:
							return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle" }} aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /></svg>;
					}
				};
				return (
					<span style={{ display: "flex", alignItems: "center" }}>
						{getIcon()}
						<span style={{ marginLeft: 8 }}>{ACTIVITY_TYPE_LABELS[item.type] || item.type}</span>
					</span>
				);
			},
		},
		{
			key: "description",
			label: "Descripción",
			sortable: true,
		},
		{
			key: "dueDate",
			label: "Fecha Programada",
			render: (item: Activity) => {
				const d = parseDate(item.dueDate);
				if (!d) return "-";
				// Ensure parsing handles timezone gracefully
				return d.toLocaleDateString("es-MX");
			}
		},
		{
			key: "completedAt",
			label: "Estado",
			render: (item: Activity) => (
				<span className={`badge ${item.completedAt ? "badge-green" : "badge-yellow"}`}>
					{item.completedAt ? "Completada" : "Pendiente"}
				</span>
			),
		},
		{
			key: "acciones",
			label: "",
			render: (item: Activity) => (
				<div className="flex justify-end">
					<button 
						onClick={(e) => { e.stopPropagation(); openEditModal(item); }}
						className="p-1.5 text-slate-400 hover:text-abtec-blue hover:bg-blue-50 rounded-md transition-colors"
						title="Editar actividad"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
					</button>
				</div>
			)
		}
	];

	return (
		<div className="page-container relative">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Actividades</h2>
					<p>Tareas y seguimiento</p>
				</div>
				<div className="page-actions flex gap-6 items-center">
					<div className="flex gap-3">
						<button 
							className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all flex items-center gap-2 shadow-sm ${viewMode === 'list' ? 'bg-abtec-blue text-white border-abtec-blue' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
							onClick={() => setViewMode('list')}
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
							Lista
						</button>
						<button 
							className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all flex items-center gap-2 shadow-sm ${viewMode === 'calendar' ? 'bg-abtec-blue text-white border-abtec-blue' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
							onClick={() => setViewMode('calendar')}
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
							Calendario
						</button>
					</div>

					<div className="h-8 w-px bg-slate-200"></div>

					<button type="button" className="btn btn-primary shadow-md" onClick={openCreateModal}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
						Nueva Actividad
					</button>
				</div>
			</div>

			{viewMode === 'list' ? (
				<DataTable
					data={activities || []}
					columns={columns}
					searchPlaceholder="Buscar actividades..."
					emptyMessage="No hay actividades. Crea una nueva para empezar."
				/>
			) : (
				renderCalendar()
			)}

			{/* Modal Nueva/Editar Actividad */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" style={{ padding: '16px' }}>
					<div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in duration-200">
						<div className="flex justify-between items-center border-b border-slate-100 bg-slate-50/50" style={{ padding: '24px 32px' }}>
							<h3 className="text-xl font-bold text-slate-800 tracking-tight">
								{editingId ? "Editar Actividad" : "Nueva Actividad"}
							</h3>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full p-1.5 border border-slate-200 shadow-sm flex-shrink-0">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
							</button>
						</div>
						
						<form onSubmit={handleSubmit} className="flex flex-col gap-6" style={{ padding: '32px' }}>
							<div className="flex flex-col gap-2">
								<label className="text-sm font-semibold text-slate-700">Tipo de Actividad <span className="text-rose-500">*</span></label>
								<select 
									className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 outline-none transition-all"
									value={type}
									onChange={(e) => setType(e.target.value as ActivityType)}
									required
								>
									{Object.values(ActivityType).map(t => (
										<option key={t} value={t}>{ACTIVITY_TYPE_LABELS[t] || t}</option>
									))}
								</select>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-sm font-semibold text-slate-700">Descripción <span className="text-rose-500">*</span></label>
								<textarea 
									className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 outline-none transition-all resize-none h-24"
									placeholder="Ej. Llamar a cliente para seguimiento de cotización..."
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-2">
									<label className="text-sm font-semibold text-slate-700">Fecha de Creación</label>
									<input 
										type="text" 
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 cursor-not-allowed"
										value={new Date().toLocaleDateString("es-ES")}
										readOnly
									/>
								</div>
								
								<div className="flex flex-col gap-2">
									<label className="text-sm font-semibold text-slate-700">Fecha Programada</label>
									<input 
										type="date" 
										className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 outline-none transition-all"
										value={dueDate}
										onChange={(e) => setDueDate(e.target.value)}
									/>
								</div>
							</div>

							<div className="flex items-center gap-3 mt-2 p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setIsCompleted(!isCompleted)}>
								<input 
									type="checkbox" 
									className="w-5 h-5 rounded border-slate-300 text-abtec-blue focus:ring-abtec-blue pointer-events-none"
									checked={isCompleted}
									readOnly
								/>
								<span className="text-sm font-semibold text-slate-700 select-none">
									Marcar como Completada
								</span>
							</div>

							<div className="flex justify-end gap-3 border-t border-slate-100" style={{ marginTop: '16px', paddingTop: '24px' }}>
								<button 
									type="button" 
									onClick={() => setIsModalOpen(false)}
									className="rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
									style={{ padding: '10px 24px' }}
								>
									Cancelar
								</button>
								<button 
									type="submit"
									className="rounded-xl font-semibold bg-abtec-blue text-white hover:bg-[#14154e] shadow-sm transition-colors"
									style={{ padding: '10px 24px' }}
								>
									Guardar Actividad
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

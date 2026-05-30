"use client";

import { useState } from "react";
import useSWR from "swr";
import { DataTable } from "@/components/StatsAndTables";
import { fetcher, SWRKeys } from "@/lib/swr";
import { type Ticket, TicketPriority, TicketStatus } from "@/types";
import { updateTicket } from "@/lib/tickets";
import { TICKET_STATUS_LABELS, TICKET_PRIORITY_LABELS } from "@/lib/labels";

const statusColors: Record<string, string> = {
	[TicketStatus.Open]: "badge-yellow",
	[TicketStatus.InProgress]: "badge-blue",
	[TicketStatus.Resolved]: "badge-green",
	[TicketStatus.Closed]: "badge-gray",
};

const priorityColors: Record<string, string> = {
	[TicketPriority.Low]: "badge-gray",
	[TicketPriority.Medium]: "badge-yellow",
	[TicketPriority.High]: "badge-red",
	[TicketPriority.Critical]: "badge-red",
};

export default function TicketsPage() {
	const { data: tickets, mutate } = useSWR<Ticket[]>(SWRKeys.tickets, fetcher.tickets, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000,
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	// Form State
	const [status, setStatus] = useState<TicketStatus>(TicketStatus.Open);
	const [priority, setPriority] = useState<TicketPriority>(TicketPriority.Medium);
	const [category, setCategory] = useState("");

	const handleOpenEdit = (ticket: Ticket) => {
		setEditingId(ticket.id);
		setStatus(ticket.status);
		setPriority(ticket.priority);
		setCategory(ticket.category || "General");
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editingId) return;

		setIsSubmitting(true);
		try {
			await updateTicket(editingId, {
				status,
				priority,
				category,
			});
			mutate();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error actualizando ticket:", error);
			alert("Error al guardar el ticket");
		} finally {
			setIsSubmitting(false);
		}
	};

	const columns = [
		{
			key: "title",
			label: "Título",
			sortable: true,
		},
		{
			key: "contactEmail",
			label: "Cliente",
			render: (item: Ticket) => item.contactEmail || "Desconocido",
		},
		{
			key: "category",
			label: "Categoría",
			sortable: true,
		},
		{
			key: "priority",
			label: "Prioridad",
			render: (item: Ticket) => (
				<span
					className={`badge ${priorityColors[item.priority] || "badge-gray"}`}
				>
					{TICKET_PRIORITY_LABELS[item.priority] || item.priority}
				</span>
			),
		},
		{
			key: "status",
			label: "Estado",
			render: (item: Ticket) => (
				<span className={`badge ${statusColors[item.status] || "badge-gray"}`}>
					{TICKET_STATUS_LABELS[item.status] || item.status}
				</span>
			),
		},
		{
			key: "acciones",
			label: "",
			render: (item: Ticket) => (
				<div className="flex justify-end">
					<button 
						onClick={(e) => { e.stopPropagation(); handleOpenEdit(item); }}
						className="p-1.5 text-slate-400 hover:text-abtec-blue hover:bg-blue-50 rounded-md transition-colors"
						title="Gestionar Ticket"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
					</button>
				</div>
			)
		}
	];

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Tickets de Soporte</h2>
					<p>Atención a solicitudes levantadas por los clientes desde el portal web</p>
				</div>
			</div>

			<DataTable
				data={tickets || []}
				columns={columns}
				searchPlaceholder="Buscar tickets..."
				emptyMessage="No hay tickets. El sistema está tranquilo."
			/>

			{/* Modal Editar Ticket */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" style={{ padding: '16px' }}>
					<div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in duration-200">
						<div className="flex justify-between items-center border-b border-slate-100 bg-slate-50/50" style={{ padding: '24px 32px' }}>
							<h3 className="text-xl font-bold text-slate-800 tracking-tight">
								Gestionar Ticket
							</h3>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full p-1.5 border border-slate-200 shadow-sm flex-shrink-0">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
							</button>
						</div>
						
						<form onSubmit={handleSubmit} className="flex flex-col gap-6" style={{ padding: '32px' }}>
							
							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Estado</label>
								<select 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									value={status}
									onChange={(e) => setStatus(e.target.value as TicketStatus)}
									required
								>
									{Object.values(TicketStatus).map(t => (
										<option key={t} value={t}>{TICKET_STATUS_LABELS[t] || t}</option>
									))}
								</select>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Prioridad</label>
								<select 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									value={priority}
									onChange={(e) => setPriority(e.target.value as TicketPriority)}
									required
								>
									{Object.values(TicketPriority).map(p => (
										<option key={p} value={p}>{TICKET_PRIORITY_LABELS[p] || p}</option>
									))}
								</select>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Categoría</label>
								<input 
									type="text" 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									placeholder="Ej. Soporte, Mantenimiento"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									required
								/>
							</div>

							<div className="flex justify-end gap-3 border-t border-slate-100" style={{ marginTop: '16px', paddingTop: '24px' }}>
								<button 
									type="button" 
									onClick={() => setIsModalOpen(false)}
									className="rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
									style={{ padding: '10px 24px' }}
									disabled={isSubmitting}
								>
									Cancelar
								</button>
								<button 
									type="submit"
									className="rounded-xl font-semibold bg-abtec-blue text-white hover:bg-[#14154e] shadow-sm transition-colors flex items-center gap-2"
									style={{ padding: '10px 24px' }}
									disabled={isSubmitting}
								>
									{isSubmitting ? "Guardando..." : "Guardar Cambios"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

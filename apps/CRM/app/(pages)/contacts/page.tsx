"use client";

import { useState } from "react";
import useSWR from "swr";
import { DataTable } from "@/components/StatsAndTables";
import { fetcher, SWRKeys } from "@/lib/swr";
import { type Contact, LifecycleStage } from "@/types";
import { createContact, updateContact } from "@/lib/contacts";
import { LIFECYCLE_LABELS } from "@/lib/labels";

const lifecycleColors: Partial<Record<LifecycleStage, string>> = {
	[LifecycleStage.Subscriber]: "badge-gray",
	[LifecycleStage.Lead]: "badge-blue",
	[LifecycleStage.MQL]: "badge-yellow",
	[LifecycleStage.SQL]: "badge-green",
	[LifecycleStage.Opportunity]: "badge-green",
	[LifecycleStage.Customer]: "badge-green",
	[LifecycleStage.Lost]: "badge-red",
};

export default function ContactsPage() {
	const { data: allContacts, mutate } = useSWR<Contact[]>(
		SWRKeys.contacts,
		fetcher.contacts,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	const contacts = allContacts?.filter(c => c.lifecycleStage !== LifecycleStage.Customer) || [];

	// Estado del modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	
	// Formulario
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [lifecycleStage, setLifecycleStage] = useState<LifecycleStage>(LifecycleStage.Lead);

	const handleOpenCreate = () => {
		setEditingId(null);
		setName("");
		setEmail("");
		setPhone("");
		setLifecycleStage(LifecycleStage.Lead);
		setIsModalOpen(true);
	};

	const handleOpenEdit = (contact: Contact) => {
		setEditingId(contact.id);
		setName(contact.name);
		setEmail(contact.email);
		setPhone(contact.phone || "");
		setLifecycleStage(contact.lifecycleStage);
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !email) return alert("Nombre y correo son requeridos");

		setIsSubmitting(true);
		try {
			const contactData = { 
				name, 
				email, 
				phone, 
				lifecycleStage 
			};
			
			if (editingId) {
				await updateContact(editingId, contactData);
			} else {
				await createContact(contactData);
			}
			
			mutate();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error guardando contacto:", error);
			alert("Error al guardar el contacto");
		} finally {
			setIsSubmitting(false);
		}
	};

	const columns = [
		{
			key: "name",
			label: "Nombre",
			sortable: true,
		},
		{
			key: "email",
			label: "Email",
			sortable: true,
		},
		{
			key: "phone",
			label: "Teléfono",
			render: (item: Contact) => item.phone || "-",
		},
		{
			key: "lifecycleStage",
			label: "Estado",
			render: (item: Contact) => (
				<span className={`badge ${lifecycleColors[item.lifecycleStage]}`}>
					{LIFECYCLE_LABELS[item.lifecycleStage] || item.lifecycleStage}
				</span>
			),
		},
		{
			key: "leadScore",
			label: "Score",
			sortable: true,
			render: (item: Contact) => (
				<span style={{ fontWeight: 600 }}>{item.leadScore}</span>
			),
		},
		{
			key: "acciones",
			label: "",
			render: (item: Contact) => (
				<div className="flex justify-end">
					<button 
						onClick={(e) => { e.stopPropagation(); handleOpenEdit(item); }}
						className="p-1.5 text-slate-400 hover:text-abtec-blue hover:bg-blue-50 rounded-md transition-colors"
						title="Editar contacto"
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
					<h2>Contactos</h2>
					<p>Gestiona tus contactos y leads</p>
				</div>
				<div className="page-actions">
					<button type="button" className="btn btn-primary shadow-md" onClick={handleOpenCreate}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M12 5v14M5 12h14" />
						</svg>
						Nuevo Contacto
					</button>
				</div>
			</div>

			<DataTable
				data={contacts || []}
				columns={columns}
				searchPlaceholder="Buscar contactos..."
				emptyMessage="No hay contactos. Añade uno nuevo para comenzar."
			/>

			{/* Modal Nuevo Contacto */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" style={{ padding: '16px' }}>
					<div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in duration-200">
						<div className="flex justify-between items-center border-b border-slate-100 bg-slate-50/50" style={{ padding: '24px 32px' }}>
							<h3 className="text-xl font-bold text-slate-800 tracking-tight">
								{editingId ? "Editar Contacto" : "Nuevo Contacto"}
							</h3>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full p-1.5 border border-slate-200 shadow-sm flex-shrink-0">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
							</button>
						</div>
						
						<form onSubmit={handleSubmit} className="flex flex-col gap-6" style={{ padding: '32px' }}>
							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nombre <span className="text-rose-500">*</span></label>
								<input 
									type="text" 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									placeholder="Ej. Juan Pérez"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Correo Electrónico <span className="text-rose-500">*</span></label>
								<input 
									type="email" 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									placeholder="juan@ejemplo.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Teléfono</label>
								<input 
									type="tel" 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									placeholder="Ej. +52 123 456 7890"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Estado (Ciclo de Vida) <span className="text-rose-500">*</span></label>
								<select 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									value={lifecycleStage}
									onChange={(e) => setLifecycleStage(e.target.value as LifecycleStage)}
									required
								>
									{Object.values(LifecycleStage).map(t => (
										<option key={t} value={t}>{LIFECYCLE_LABELS[t] || t}</option>
									))}
								</select>
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
									{isSubmitting ? "Guardando..." : (editingId ? "Guardar Cambios" : "Crear Contacto")}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

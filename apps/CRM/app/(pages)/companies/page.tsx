"use client";

import { useState } from "react";
import useSWR from "swr";
import { DataTable } from "@/components/StatsAndTables";
import { fetcher, SWRKeys } from "@/lib/swr";
import { createCompany, updateCompany } from "@/lib/companies";
import { type Company, LifecycleStage } from "@/types";
import { LIFECYCLE_LABELS } from "@/lib/labels";

export default function CompaniesPage() {
	const { data: allCompanies, mutate } = useSWR(SWRKeys.companies, fetcher.companies, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000,
	});

	const companies = allCompanies?.filter(c => c.lifecycleStage !== LifecycleStage.Customer) || [];

	const columns = [
		{
			key: "name",
			label: "Nombre",
			sortable: true,
		},
		{
			key: "industry",
			label: "Industria",
			sortable: true,
		},
		{
			key: "size",
			label: "Tamaño",
			sortable: true,
		},
		{
			key: "website",
			label: "Website",
			render: (item: { website?: string }) =>
				item.website ? (
					<a
						href={item.website}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: "var(--accent)", textDecoration: "none" }}
					>
						{item.website}
					</a>
				) : (
					"-"
				),
		},
		{
			key: "acciones",
			label: "",
			render: (item: Company) => (
				<div className="flex justify-end">
					<button 
						onClick={(e) => { e.stopPropagation(); handleOpenEdit(item); }}
						className="p-1.5 text-slate-400 hover:text-abtec-blue hover:bg-blue-50 rounded-md transition-colors"
						title="Editar empresa"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
					</button>
				</div>
			)
		}
	];

	// Estado del modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	
	// Formulario
	const [name, setName] = useState("");
	const [industry, setIndustry] = useState("");
	const [size, setSize] = useState("");
	const [website, setWebsite] = useState("");
	const [lifecycleStage, setLifecycleStage] = useState<LifecycleStage>(LifecycleStage.Lead);

	const handleOpenCreate = () => {
		setEditingId(null);
		setName("");
		setIndustry("");
		setSize("");
		setWebsite("");
		setLifecycleStage(LifecycleStage.Lead);
		setIsModalOpen(true);
	};

	const handleOpenEdit = (company: Company) => {
		setEditingId(company.id);
		setName(company.name);
		setIndustry(company.industry || "");
		setSize(company.size || "");
		setWebsite(company.website || "");
		setLifecycleStage(company.lifecycleStage || LifecycleStage.Lead);
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name) return alert("El nombre es requerido");

		setIsSubmitting(true);
		try {
			const companyData = { name, industry, size, website, lifecycleStage };
			
			if (editingId) {
				await updateCompany(editingId, companyData);
			} else {
				await createCompany(companyData);
			}
			
			mutate();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error guardando empresa:", error);
			alert("Error al guardar la empresa");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Empresas</h2>
					<p>Administra empresas y cuentas</p>
				</div>
				<div className="page-actions">
					<button type="button" className="btn btn-primary shadow-md" onClick={handleOpenCreate}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M12 5v14M5 12h14" />
						</svg>
						Nueva Empresa
					</button>
				</div>
			</div>

			<DataTable
				data={companies || []}
				columns={columns}
				searchPlaceholder="Buscar empresas..."
				emptyMessage="No hay empresas. Añade una nueva para comenzar."
			/>

			{/* Modal Nueva Empresa */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" style={{ padding: '16px' }}>
					<div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in duration-200">
						<div className="flex justify-between items-center border-b border-slate-100 bg-slate-50/50" style={{ padding: '24px 32px' }}>
							<h3 className="text-xl font-bold text-slate-800 tracking-tight">
								{editingId ? "Editar Empresa" : "Nueva Empresa"}
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
									placeholder="Ej. Acme Corp"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Industria</label>
								<input 
									type="text" 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									placeholder="Ej. Tecnología, Manufactura"
									value={industry}
									onChange={(e) => setIndustry(e.target.value)}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Tamaño</label>
								<input 
									type="text" 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									placeholder="Ej. 10-50 empleados"
									value={size}
									onChange={(e) => setSize(e.target.value)}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Sitio Web</label>
								<input 
									type="url" 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									placeholder="https://ejemplo.com"
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
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
									{isSubmitting ? "Guardando..." : (editingId ? "Guardar Cambios" : "Crear Empresa")}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

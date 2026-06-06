"use client";

import { useState } from "react";
import useSWR from "swr";
import { DataTable } from "@/components/StatsAndTables";
import { fetcher, SWRKeys } from "@/lib/swr";
import { type Contact, type Company, LifecycleStage } from "@/types";
import { updateContact } from "@/lib/contacts";
import { updateCompany } from "@/lib/companies";
import { uploadContractPDF } from "@/lib/storage";

export default function ClientesPage() {
	const [activeTab, setActiveTab] = useState<"personas" | "empresas">("personas");

	// Fetch contacts that are customers
	const { data: allContacts, mutate: mutateContacts } = useSWR<Contact[]>(
		SWRKeys.contacts,
		fetcher.contacts,
		{ revalidateOnFocus: false }
	);
	const contacts = allContacts?.filter(c => c.lifecycleStage === LifecycleStage.Customer) || [];

	// Fetch companies that are customers
	const { data: allCompanies, mutate: mutateCompanies } = useSWR<Company[]>(
		SWRKeys.companies,
		fetcher.companies,
		{ revalidateOnFocus: false }
	);
	const companies = allCompanies?.filter(c => c.lifecycleStage === LifecycleStage.Customer) || [];

	// Modal state
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingItem, setEditingItem] = useState<Contact | Company | null>(null);

	// Form state for Implementation Details
	const [panelBrand, setPanelBrand] = useState("");
	const [warrantyEndDate, setWarrantyEndDate] = useState("");
	const [lastMaintenanceDate, setLastMaintenanceDate] = useState("");
	const [contractFile, setContractFile] = useState<File | null>(null);
	const [contractUrl, setContractUrl] = useState("");
	const [relevantInfo, setRelevantInfo] = useState("");

	const handleOpenEdit = (item: Contact | Company) => {
		setEditingItem(item);
		setPanelBrand(item.panelBrand || "");
		setWarrantyEndDate(
			item.warrantyEndDate
				? new Date(item.warrantyEndDate).toISOString().split("T")[0]
				: ""
		);
		setLastMaintenanceDate(
			item.lastMaintenanceDate
				? new Date(item.lastMaintenanceDate).toISOString().split("T")[0]
				: ""
		);
		setContractUrl(item.contractUrl || "");
		setRelevantInfo(item.relevantInfo || "");
		setContractFile(null);
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editingItem) return;

		setIsSubmitting(true);
		try {
			let uploadedUrl = contractUrl;
			if (contractFile) {
				uploadedUrl = await uploadContractPDF(contractFile, editingItem.id);
			}

			const updateData = {
				panelBrand,
				warrantyEndDate: warrantyEndDate ? new Date(warrantyEndDate) : undefined,
				lastMaintenanceDate: lastMaintenanceDate ? new Date(lastMaintenanceDate) : undefined,
				contractUrl: uploadedUrl,
				relevantInfo,
			};

			if (activeTab === "personas") {
				await updateContact(editingItem.id, updateData);
				mutateContacts();
			} else {
				await updateCompany(editingItem.id, updateData);
				mutateCompanies();
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error actualizando cliente:", error);
			alert("Error al guardar la información del cliente");
		} finally {
			setIsSubmitting(false);
		}
	};

	const personasColumns = [
		{ key: "name", label: "Nombre", sortable: true },
		{ key: "email", label: "Email", sortable: true },
		{ key: "phone", label: "Teléfono", render: (item: Contact) => item.phone || "-" },
		{ key: "panelBrand", label: "Marca Paneles", render: (item: Contact) => item.panelBrand || "-" },
		{
			key: "warranty",
			label: "Garantía Hasta",
			render: (item: Contact) => item.warrantyEndDate ? new Date(item.warrantyEndDate).toLocaleDateString() : "-"
		},
		{
			key: "acciones",
			label: "",
			render: (item: Contact) => (
				<div className="flex justify-end">
					<button
						onClick={(e) => { e.stopPropagation(); handleOpenEdit(item); }}
						className="p-1.5 text-slate-400 hover:text-abtec-blue hover:bg-blue-50 rounded-md transition-colors"
						title="Editar Implementación"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
					</button>
				</div>
			)
		}
	];

	const empresasColumns = [
		{ key: "name", label: "Empresa", sortable: true },
		{ key: "industry", label: "Industria", sortable: true },
		{ key: "panelBrand", label: "Marca Paneles", render: (item: Company) => item.panelBrand || "-" },
		{
			key: "warranty",
			label: "Garantía Hasta",
			render: (item: Company) => item.warrantyEndDate ? new Date(item.warrantyEndDate).toLocaleDateString() : "-"
		},
		{
			key: "acciones",
			label: "",
			render: (item: Company) => (
				<div className="flex justify-end">
					<button
						onClick={(e) => { e.stopPropagation(); handleOpenEdit(item); }}
						className="p-1.5 text-slate-400 hover:text-abtec-blue hover:bg-blue-50 rounded-md transition-colors"
						title="Editar Implementación"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
					</button>
				</div>
			)
		}
	];

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Clientes</h2>
					<p>Gestiona la información de implementación y contratos de tus clientes</p>
				</div>
			</div>

			<div className="mb-6 border-b border-slate-200">
				<nav className="-mb-px flex space-x-8">
					<button
						onClick={() => setActiveTab("personas")}
						className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "personas" ? "border-abtec-blue text-abtec-blue" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
					>
						Personas ({contacts.length})
					</button>
					<button
						onClick={() => setActiveTab("empresas")}
						className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "empresas" ? "border-abtec-blue text-abtec-blue" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
					>
						Empresas ({companies.length})
					</button>
				</nav>
			</div>

			{activeTab === "personas" ? (
				<DataTable
					data={contacts}
					columns={personasColumns}
					searchPlaceholder="Buscar personas..."
					emptyMessage="No hay clientes registrados en Personas."
				/>
			) : (
				<DataTable
					data={companies}
					columns={empresasColumns}
					searchPlaceholder="Buscar empresas..."
					emptyMessage="No hay clientes registrados en Empresas."
				/>
			)}

			{isModalOpen && editingItem && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" style={{ padding: '16px' }}>
					<div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
						<div className="flex justify-between items-center border-b border-slate-100 bg-slate-50/50" style={{ padding: '24px 32px' }}>
							<div>
								<h3 className="text-xl font-bold text-slate-800 tracking-tight">
									Detalles de Implementación
								</h3>
								<p className="text-sm text-slate-500 mt-1">{editingItem.name}</p>
							</div>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full p-1.5 border border-slate-200 shadow-sm flex-shrink-0">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
							</button>
						</div>

						<div className="overflow-y-auto">
							<form onSubmit={handleSubmit} className="flex flex-col gap-5" style={{ padding: '32px' }}>
								<div className="flex flex-col gap-2">
									<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Marca de Paneles</label>
									<input
										type="text"
										className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
										placeholder="Ej. SunPower, Jinko"
										value={panelBrand}
										onChange={(e) => setPanelBrand(e.target.value)}
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="flex flex-col gap-2">
										<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Garantía Hasta</label>
										<input
											type="date"
											className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue transition-all"
											value={warrantyEndDate}
											onChange={(e) => setWarrantyEndDate(e.target.value)}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Último Mantenimiento</label>
										<input
											type="date"
											className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue transition-all"
											value={lastMaintenanceDate}
											onChange={(e) => setLastMaintenanceDate(e.target.value)}
										/>
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Contrato (PDF)</label>
									<input
										type="file"
										accept=".pdf"
										className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-abtec-blue/10 file:text-abtec-blue hover:file:bg-abtec-blue/20 transition-all"
										onChange={(e) => setContractFile(e.target.files?.[0] || null)}
									/>
									{contractUrl && !contractFile && (
										<a href={contractUrl} target="_blank" rel="noreferrer" className="text-sm text-abtec-blue hover:underline ml-1">
											Ver contrato actual
										</a>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Información Relevante</label>
									<textarea
										className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
										rows={3}
										placeholder="Notas adicionales..."
										value={relevantInfo}
										onChange={(e) => setRelevantInfo(e.target.value)}
									></textarea>
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
				</div>
			)}
		</div>
	);
}

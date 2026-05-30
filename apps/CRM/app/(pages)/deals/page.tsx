"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher, SWRKeys } from "@/lib/swr";
import { createDeal, updateDeal } from "@/lib/deals";
import { type Deal, DealStage } from "@/types";
import { DEAL_STAGE_LABELS } from "@/lib/labels";

const STAGE_CONFIG: Record<DealStage, { color: string; label: string }> = {
	[DealStage.Lead]: { color: "lead", label: DEAL_STAGE_LABELS[DealStage.Lead] },
	[DealStage.Proposal]: { color: "proposal", label: DEAL_STAGE_LABELS[DealStage.Proposal] },
	[DealStage.Negotiation]: { color: "negotiation", label: DEAL_STAGE_LABELS[DealStage.Negotiation] },
	[DealStage.Won]: { color: "won", label: DEAL_STAGE_LABELS[DealStage.Won] },
	[DealStage.Lost]: { color: "lost", label: DEAL_STAGE_LABELS[DealStage.Lost] },
};

export default function DealsPage() {
	const { data: deals, mutate } = useSWR<Deal[]>(SWRKeys.deals, fetcher.deals, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000,
	});

	const pipeline = {
		[DealStage.Lead]: deals?.filter((d) => d.stage === DealStage.Lead) || [],
		[DealStage.Proposal]:
			deals?.filter((d) => d.stage === DealStage.Proposal) || [],
		[DealStage.Negotiation]:
			deals?.filter((d) => d.stage === DealStage.Negotiation) || [],
		[DealStage.Won]: deals?.filter((d) => d.stage === DealStage.Won) || [],
		[DealStage.Lost]: deals?.filter((d) => d.stage === DealStage.Lost) || [],
	};

	const totalByStage = (stage: DealStage) =>
		deals
			?.filter((d) => d.stage === stage)
			.reduce((sum, d) => sum + d.value, 0) || 0;

	// Estado del modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	
	// Formulario
	const [title, setTitle] = useState("");
	const [value, setValue] = useState(0);
	const [currency, setCurrency] = useState("MXN");
	const [stage, setStage] = useState<DealStage>(DealStage.Lead);
	const [probability, setProbability] = useState(50);

	const handleOpenCreate = () => {
		setEditingId(null);
		setTitle("");
		setValue(0);
		setCurrency("MXN");
		setStage(DealStage.Lead);
		setProbability(50);
		setIsModalOpen(true);
	};

	const handleOpenEdit = (deal: Deal) => {
		setEditingId(deal.id);
		setTitle(deal.title);
		setValue(deal.value);
		setCurrency(deal.currency);
		setStage(deal.stage);
		setProbability(deal.probability);
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title) return alert("El título es requerido");

		setIsSubmitting(true);
		try {
			const dealData = { 
				title, 
				value, 
				currency, 
				stage, 
				probability 
			};
			
			if (editingId) {
				await updateDeal(editingId, dealData);
			} else {
				await createDeal(dealData);
			}
			
			mutate();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error guardando deal:", error);
			alert("Error al guardar el deal");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, dealId: string) => {
		e.dataTransfer.setData("dealId", dealId);
		e.dataTransfer.effectAllowed = "move";
		setTimeout(() => {
			if (e.target instanceof HTMLElement) {
				e.target.style.opacity = "0.5";
			}
		}, 0);
	};

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.target instanceof HTMLElement) {
			e.target.style.opacity = "1";
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>, newStage: DealStage) => {
		e.preventDefault();
		const dealId = e.dataTransfer.getData("dealId");
		if (!dealId || !deals) return;

		const dealToMove = deals.find(d => d.id === dealId);
		if (!dealToMove || dealToMove.stage === newStage) return;

		// Optimistic update
		const updatedDeals = deals.map(d => 
			d.id === dealId ? { ...d, stage: newStage } : d
		);
		
		await mutate(updatedDeals, false);
		
		try {
			await updateDeal(dealId, { stage: newStage });
			mutate();
		} catch (error) {
			console.error("Failed to move deal:", error);
			mutate(); // Rollback on error
		}
	};

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Pipeline de Deals</h2>
					<p>Gestiona tus oportunidades de venta</p>
				</div>
				<div className="page-actions">
					<button type="button" className="btn btn-primary shadow-md" onClick={handleOpenCreate}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M12 5v14M5 12h14" />
						</svg>
						Nuevo Deal
					</button>
				</div>
			</div>

			<div className="pipeline">
				{Object.values(DealStage).map((stage) => (
					<div
						key={stage}
						className="pipeline-column"
						data-stage={STAGE_CONFIG[stage].color}
						onDragOver={handleDragOver}
						onDrop={(e) => handleDrop(e, stage as DealStage)}
					>
						<div className="pipeline-header">
							<div>
								<h4>{STAGE_CONFIG[stage].label}</h4>
								<span className="pipeline-count">
									{pipeline[stage].length} deals
								</span>
							</div>
							<span className="pipeline-value">
								${totalByStage(stage).toLocaleString()}
							</span>
						</div>
						{pipeline[stage].map((deal) => (
							<div 
								key={deal.id} 
								className="pipeline-card relative group"
								draggable
								onDragStart={(e) => handleDragStart(e, deal.id!)}
								onDragEnd={handleDragEnd}
								style={{ cursor: "grab" }}
							>
								<div className="pr-6">
									<h5 className="truncate" title={deal.title}>{deal.title}</h5>
								</div>
								<div className="meta">
									<span className="value">
										{deal.currency} {deal.value.toLocaleString()}
									</span>
								</div>
								{deal.companyId && (
									<div className="company">
										Empresa ID: {deal.companyId.slice(0, 8)}
									</div>
								)}
								<button 
									onClick={(e) => { e.stopPropagation(); handleOpenEdit(deal); }}
									className="absolute top-2 right-2 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-abtec-blue hover:bg-blue-50 rounded-md transition-all"
									title="Editar deal"
								>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
								</button>
							</div>
						))}
						{(!pipeline[stage] || pipeline[stage].length === 0) && (
							<div className="empty-state" style={{ padding: "32px 16px" }}>
								<svg
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									aria-hidden="true"
								>
									<rect width="18" height="18" x="3" y="3" rx="2" />
									<path d="M12 8v8M8 12h8" />
								</svg>
								<p style={{ fontSize: "13px", marginTop: "8px" }}>Sin deals</p>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Modal Nuevo Deal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" style={{ padding: '16px' }}>
					<div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in duration-200">
						<div className="flex justify-between items-center border-b border-slate-100 bg-slate-50/50" style={{ padding: '24px 32px' }}>
							<h3 className="text-xl font-bold text-slate-800 tracking-tight">
								{editingId ? "Editar Deal" : "Nuevo Deal"}
							</h3>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full p-1.5 border border-slate-200 shadow-sm flex-shrink-0">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
							</button>
						</div>
						
						<form onSubmit={handleSubmit} className="flex flex-col gap-6" style={{ padding: '32px' }}>
							<div className="flex flex-col gap-2">
								<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Título de la oportunidad <span className="text-rose-500">*</span></label>
								<input 
									type="text" 
									className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
									placeholder="Ej. Proyecto 200kW Industrial"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-2">
									<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Valor (Monto)</label>
									<input 
										type="number" 
										className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
										placeholder="0"
										value={value}
										onChange={(e) => setValue(Number(e.target.value))}
										min="0"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Moneda</label>
									<select 
										className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
										value={currency}
										onChange={(e) => setCurrency(e.target.value)}
									>
										<option value="MXN">MXN</option>
										<option value="USD">USD</option>
									</select>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-2">
									<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Etapa inicial</label>
									<select 
										className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
										value={stage}
										onChange={(e) => setStage(e.target.value as DealStage)}
									>
										{Object.entries(DealStage).map(([key, val]) => (
											<option key={val} value={val}>{STAGE_CONFIG[val as DealStage].label}</option>
										))}
									</select>
								</div>
								<div className="flex flex-col gap-2">
									<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Probabilidad (%)</label>
									<input 
										type="number" 
										className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:border-abtec-blue focus:ring-4 focus:ring-abtec-blue/10 transition-all"
										placeholder="50"
										value={probability}
										onChange={(e) => setProbability(Number(e.target.value))}
										min="0"
										max="100"
									/>
								</div>
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
									{isSubmitting ? "Guardando..." : (editingId ? "Guardar Cambios" : "Crear Deal")}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

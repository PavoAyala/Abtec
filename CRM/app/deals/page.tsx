"use client";

import useSWR from "swr";
import { SWRKeys, fetcher } from "@/lib/swr";
import { Deal, DealStage } from "@/types";

const STAGE_CONFIG: Record<DealStage, { color: string; label: string }> = {
	[DealStage.Lead]: { color: "lead", label: "Lead" },
	[DealStage.Proposal]: { color: "proposal", label: "Propuesta" },
	[DealStage.Negotiation]: { color: "negotiation", label: "Negociación" },
	[DealStage.Won]: { color: "won", label: "Ganada" },
	[DealStage.Lost]: { color: "lost", label: "Perdida" },
};

export default function DealsPage() {
	const { data: deals } = useSWR<Deal[]>(SWRKeys.deals, fetcher.deals, {
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

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Pipeline de Deals</h2>
					<p>Gestiona tus oportunidades de venta</p>
				</div>
				<div className="page-actions">
					<button className="btn btn-primary">
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
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
							<div key={deal.id} className="pipeline-card">
								<h5>{deal.title}</h5>
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
		</div>
	);
}

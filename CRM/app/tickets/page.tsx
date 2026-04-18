"use client";

import useSWR from "swr";
import { SWRKeys, fetcher } from "@/lib/swr";
import { TicketStatus, TicketPriority } from "@/types";
import { DataTable } from "@/components/StatsAndTables";

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
	const { data: tickets } = useSWR(SWRKeys.tickets, fetcher.tickets, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000,
	});

	const columns = [
		{
			key: "title",
			label: "Título",
			sortable: true,
		},
		{
			key: "status",
			label: "Estado",
			render: (item: { status: string }) => (
				<span className={`badge ${statusColors[item.status] || "badge-gray"}`}>
					{item.status}
				</span>
			),
		},
		{
			key: "priority",
			label: "Prioridad",
			render: (item: { priority: string }) => (
				<span
					className={`badge ${priorityColors[item.priority] || "badge-gray"}`}
				>
					{item.priority}
				</span>
			),
		},
		{
			key: "category",
			label: "Categoría",
			sortable: true,
		},
	];

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Tickets de Soporte</h2>
					<p>Sistema de soporte postventa</p>
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
						Nuevo Ticket
					</button>
				</div>
			</div>

			<DataTable
				data={tickets || []}
				columns={columns}
				searchPlaceholder="Buscar tickets..."
				emptyMessage="No hay tickets. El sistema está tranquilo."
			/>
		</div>
	);
}

"use client";

import useSWR from "swr";
import { SWRKeys, fetcher } from "@/lib/swr";
import { Contact, LifecycleStage } from "@/types";
import { DataTable } from "@/components/StatsAndTables";

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
	const { data: contacts } = useSWR<Contact[]>(
		SWRKeys.contacts,
		fetcher.contacts,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

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
					{item.lifecycleStage}
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
	];

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Contactos</h2>
					<p>Gestiona tus contactos y leads</p>
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
		</div>
	);
}

"use client";

import useSWR from "swr";
import { DataTable } from "@/components/StatsAndTables";
import { fetcher, SWRKeys } from "@/lib/swr";

export default function CompaniesPage() {
	const { data: companies } = useSWR(SWRKeys.companies, fetcher.companies, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000,
	});

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
	];

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Empresas</h2>
					<p>Administra empresas y cuentas</p>
				</div>
				<div className="page-actions">
					<button type="button" className="btn btn-primary">
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
		</div>
	);
}

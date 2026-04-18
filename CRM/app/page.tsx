"use client";

import Link from "next/link";
import useSWR from "swr";
import StatCard from "@/components/StatsAndTables";
import { fetcher, SWRKeys } from "@/lib/swr";

export default function DashboardPage() {
	const { data: contacts } = useSWR(SWRKeys.contacts, fetcher.contacts, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000,
	});
	const { data: deals } = useSWR(SWRKeys.deals, fetcher.deals, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000,
	});
	const { data: dealStats } = useSWR(SWRKeys.dealsStats, fetcher.dealsStats, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000,
	});

	const { data: ticketStats } = useSWR(
		SWRKeys.ticketsStats,
		fetcher.ticketsStats,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	const stats = {
		totalContacts: contacts?.length || 0,
		totalDeals: deals?.length || 0,
		pipelineValue: dealStats?.totalValue || 0,
		openTickets: (ticketStats?.open || 0) + (ticketStats?.inProgress || 0),
	};

	const modules = [
		{
			href: "/contacts",
			title: "Contactos",
			description: "Gestiona tus contactos y leads",
			icon: "people",
			color: "blue",
		},
		{
			href: "/companies",
			title: "Empresas",
			description: "Administra empresas y cuentas",
			icon: "business",
			color: "green",
		},
		{
			href: "/deals",
			title: "Pipeline",
			description: "Gestiona tus oportunidades",
			icon: "handshake",
			color: "yellow",
		},
		{
			href: "/tickets",
			title: "Tickets",
			description: "Sistema de soporte postventa",
			icon: "support",
			color: "red",
		},
		{
			href: "/activities",
			title: "Actividades",
			description: "Tareas y seguimiento",
			icon: "event",
			color: "purple",
		},
	];

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Dashboard</h2>
					<p>Resumen de tu CRM</p>
				</div>
			</div>

			<div className="stats-grid">
				<StatCard
					label="Total Contactos"
					value={stats.totalContacts}
					icon={
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
							<circle cx="9" cy="7" r="4" />
							<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
							<path d="M16 3.13a4 4 0 0 1 0 7.75" />
						</svg>
					}
					variant="blue"
				/>
				<StatCard
					label="Total Deals"
					value={stats.totalDeals}
					icon={
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<path d="m11 17 2 2a1 1 0 1 0 3-3" />
							<path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
						</svg>
					}
					variant="green"
				/>
				<StatCard
					label="Valor Pipeline"
					value={stats.pipelineValue}
					prefix="$"
					icon={
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<line x1="12" y1="1" x2="12" y2="23" />
							<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
						</svg>
					}
					variant="yellow"
				/>
				<StatCard
					label="Tickets Abiertos"
					value={stats.openTickets}
					icon={
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
							<circle cx="12" cy="17" r="5" />
						</svg>
					}
					variant="red"
				/>
			</div>

			<div className="card">
				<div className="card-header">
					<h3>Módulos del CRM</h3>
				</div>
				<div className="card-body">
					<div className="module-grid">
						{modules.map((mod) => (
							<Link key={mod.href} href={mod.href} className="module-card">
								<div className={`module-icon ${mod.color}`}>
									{mod.icon === "people" && (
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											aria-hidden="true"
										>
											<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
											<circle cx="9" cy="7" r="4" />
											<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
											<path d="M16 3.13a4 4 0 0 1 0 7.75" />
										</svg>
									)}
									{mod.icon === "business" && (
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											aria-hidden="true"
										>
											<path d="M3 21h18" />
											<path d="M5 21V7l8-4v18" />
											<path d="M19 21V11l-6-4" />
										</svg>
									)}
									{mod.icon === "handshake" && (
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											aria-hidden="true"
										>
											<path d="m11 17 2 2a1 1 0 1 0 3-3" />
											<path d="m14 14 2.5 2.5a1 1 0 1 0 3-3" />
										</svg>
									)}
									{mod.icon === "support" && (
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											aria-hidden="true"
										>
											<path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
											<circle cx="12" cy="17" r="5" />
										</svg>
									)}
									{mod.icon === "event" && (
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											aria-hidden="true"
										>
											<rect width="18" height="18" x="3" y="4" rx="2" />
											<path d="M16 2v4" />
											<path d="M8 2v4" />
											<path d="M3 10h18" />
										</svg>
									)}
								</div>
								<div className="module-content">
									<h4>{mod.title}</h4>
									<p>{mod.description}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

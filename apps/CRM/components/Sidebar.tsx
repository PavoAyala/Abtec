"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";

interface SidebarContextType {
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
	collapsed: false,
	setCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

const navItems = [
	{ href: "/", label: "Dashboard", icon: "dashboard" },
	{ href: "/contacts", label: "Contactos", icon: "people", badge: "12" },
	{ href: "/companies", label: "Empresas", icon: "business" },
	{ href: "/deals", label: "Pipeline", icon: "handshake" },
	{ href: "/tickets", label: "Tickets", icon: "support", badge: "5" },
	{ href: "/activities", label: "Actividades", icon: "event" },
];

const settingsItems = [
	{ href: "/settings", label: "Configuración", icon: "settings" },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
	const icons: Record<string, JSX.Element> = {
		dashboard: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<rect x="3" y="3" width="7" height="7" rx="1" />
				<rect x="14" y="3" width="7" height="7" rx="1" />
				<rect x="14" y="14" width="7" height="7" rx="1" />
				<rect x="3" y="14" width="7" height="7" rx="1" />
			</svg>
		),
		people: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
				<path d="M16 3.13a4 4 0 0 1 0 7.75" />
			</svg>
		),
		business: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M3 21h18" />
				<path d="M5 21V7l8-4v18" />
				<path d="M19 21V11l-6-4" />
				<path d="M9 9v.01" />
				<path d="M9 12v.01" />
				<path d="M9 15v.01" />
				<path d="M9 18v.01" />
			</svg>
		),
		handshake: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="m11 17 2 2a1 1 0 1 0 3-3" />
				<path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
				<path d="m21 3 1 11h-2" />
				<path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
				<path d="M3 4h8" />
			</svg>
		),
		support: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
				<circle cx="12" cy="17" r="5" />
				<path d="M12 14v3" />
			</svg>
		),
		event: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M8 2v4" />
				<path d="M16 2v4" />
				<rect width="18" height="18" x="3" y="4" rx="2" />
				<path d="M3 10h18" />
				<path d="m9 16 2 2 4-4" />
			</svg>
		),
		settings: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		),
		usersShield: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<path d="M23 11l-4 4-2-2" />
				<path d="M20 7v4" />
			</svg>
		),
		chevronLeft: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="m15 18-6-6 6-6" />
			</svg>
		),
		chevronRight: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="m9 18 6-6-6-6" />
			</svg>
		),
	};

	return icons[name] || null;
}

export default function Sidebar({
	children,
}: Readonly<{ children: ReactNode }>) {
	const [collapsed, setCollapsed] = useState(false);
	const pathname = usePathname();
	const { staffRole } = useAuth();

	const isActive = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	const contextValue = useMemo(
		() => ({ collapsed, setCollapsed }),
		[collapsed],
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			<div className="app-layout">
				<aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
					<div className="sidebar-header">
						<div className="sidebar-logo">
							<Image
								src="/logo.png"
								alt="Abtec"
								width={24}
								height={24}
								style={{ borderRadius: 4 }}
							/>
						</div>
						<span className="sidebar-brand">Abtec CRM</span>
					</div>

					<nav className="sidebar-nav">
						<div className="nav-section">
							<div className="nav-section-title">Menú</div>
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`nav-item ${isActive(item.href) ? "active" : ""}`}
								>
									<span className="nav-item-icon">
										<Icon name={item.icon} />
									</span>
									<span className="nav-item-text">{item.label}</span>
									{item.badge && (
										<span className="nav-item-badge">{item.badge}</span>
									)}
								</Link>
							))}
						</div>

						<div className="nav-section">
							<div className="nav-section-title">Sistema</div>
							{settingsItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`nav-item ${isActive(item.href) ? "active" : ""}`}
								>
									<span className="nav-item-icon">
										<Icon name={item.icon} />
									</span>
									<span className="nav-item-text">{item.label}</span>
								</Link>
							))}
							{staffRole === "admin" && (
								<Link
									href="/staff"
									className={`nav-item ${isActive("/staff") ? "active" : ""}`}
								>
									<span className="nav-item-icon">
										<Icon name="usersShield" />
									</span>
									<span className="nav-item-text">Usuarios Staff</span>
								</Link>
							)}
						</div>
					</nav>

					<div className="sidebar-footer">
						<button
							type="button"
							className="sidebar-toggle"
							onClick={() => setCollapsed(!collapsed)}
						>
							<Icon
								name={collapsed ? "chevronRight" : "chevronLeft"}
								size={16}
							/>
							{!collapsed && <span>Colapsar</span>}
						</button>
					</div>
				</aside>

				<main className="main-content">{children}</main>
			</div>
		</SidebarContext.Provider>
	);
}

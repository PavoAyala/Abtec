"use client";

import CommandPalette, { useCommandPalette } from "@/components/CommandPalette";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/components/AuthProvider";

if (typeof window !== "undefined") {
	const originalLog = console.log;
	console.log = (...args) => {
		if (typeof args[0] === "string" && args[0].includes("[Fast Refresh]")) {
			return;
		}
		originalLog(...args);
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isLoginPage = pathname === "/login";

	return (
		<html lang="es">
			<head>
				<title>Abtec CRM</title>
				<link rel="icon" href="/logo.png" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<AuthProvider>
					{isLoginPage ? (
						children
					) : (
						<RoleGuard>
							<CommandPaletteWrapper>
								<Sidebar>{children}</Sidebar>
							</CommandPaletteWrapper>
						</RoleGuard>
					)}
				</AuthProvider>
			</body>
		</html>
	);
}

function RoleGuard({ children }: { children: React.ReactNode }) {
	const { staffRoles, isStaff } = useAuth();
	
	if (isStaff && staffRoles.includes("unassigned") && staffRoles.length === 1) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1628] to-[#0d1a0d] p-4 text-white text-center">
				<div className="max-w-md p-8 bg-[#0d1020] rounded-2xl shadow-2xl border border-white/10">
					<div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
							<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
						</svg>
					</div>
					<h1 className="text-2xl font-bold text-red-500 mb-4">Acceso Restringido</h1>
					<p className="text-gray-300">
						No tienes roles asignados. No puedes realizar acciones en el CRM. Por favor, contacte al administrador.
					</p>
				</div>
			</div>
		);
	}
	
	return <>{children}</>;
}

function CommandPaletteWrapper({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { isOpen, setIsOpen } = useCommandPalette();

	return (
		<>
			{children}
			<CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				style={{
					position: "fixed",
					bottom: "24px",
					right: "24px",
					width: "48px",
					height: "48px",
					borderRadius: "50%",
					background: "var(--accent)",
					color: "white",
					border: "none",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "var(--shadow-lg)",
					zIndex: 40,
					transition: "transform 0.2s",
				}}
				title="Buscar (Cmd+K)"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
			</button>
		</>
	);
}

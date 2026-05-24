"use client";

import CommandPalette, { useCommandPalette } from "@/components/CommandPalette";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/components/AuthProvider";

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
						<CommandPaletteWrapper>
							<Sidebar>{children}</Sidebar>
						</CommandPaletteWrapper>
					)}
				</AuthProvider>
			</body>
		</html>
	);
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

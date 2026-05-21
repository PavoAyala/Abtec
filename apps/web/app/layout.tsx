import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Roboto, Oswald } from "next/font/google";
import type { JSX } from "react";

import AuthModal from "../components/auth/AuthModal";
import FirebaseEmulatorBootstrap from "../components/FirebaseEmulatorBootstrap";
import { AuthProvider } from "../hooks/useAuth";
import "./globals.css";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

const oswald = Oswald({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-oswald",
});

export const metadata: Metadata = {
	title: "Abtec - Energía que Transforma",
	description:
		"Transforma tu consumo de energía con soluciones solares de vanguardia. Servicios profesionales de instalación, mantenimiento y consultoría solar.",
	keywords: [
		"energía solar",
		"paneles solares",
		"energía renovable",
		"instalación solar",
		"consultoría energética",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<html lang="es" className={`light ${roboto.variable} ${oswald.variable}`}>
			<head>
				{/* eslint-disable @next/next/no-page-custom-font */}
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
					rel="stylesheet"
				/>
				{/* eslint-enable @next/next/no-page-custom-font */}
			</head>
			<body className="bg-white text-gray-800 antialiased font-sans">
				<FirebaseEmulatorBootstrap />
				{/* @ts-expect-error React node mismatch in monorepo */}
				<AuthProvider>
					{children}
					{/* @ts-expect-error React node mismatch in monorepo */}
					<AuthModal />
				</AuthProvider>
				<Analytics />
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import type { JSX } from "react";
import { Analytics } from "@vercel/analytics/next";
import FirebaseEmulatorBootstrap from "../components/FirebaseEmulatorBootstrap";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abtec - Energía que Transforma",
  description: "Transforma tu consumo de energía con soluciones solares de vanguardia. Servicios profesionales de instalación, mantenimiento y consultoría solar.",
  keywords: ["energía solar", "paneles solares", "energía renovable", "instalación solar", "consultoría energética"],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: any;
}>): JSX.Element {
  return (
    <html lang="es" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-secondary dark:text-white antialiased">
        <FirebaseEmulatorBootstrap />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

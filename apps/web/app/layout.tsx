import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abtec - Energia que Transforma",
  description: "Transform your energy consumption with cutting-edge solar solutions. Professional solar installation, maintenance, and consulting services.",
  keywords: ["solar energy", "solar panels", "renewable energy", "solar installation", "energy consulting"],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="es" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-secondary dark:text-white antialiased">
        {children}
      </body>
    </html>
  );
}

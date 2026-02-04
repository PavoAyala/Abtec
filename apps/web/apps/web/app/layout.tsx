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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

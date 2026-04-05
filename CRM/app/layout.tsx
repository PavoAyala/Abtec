import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abtec CRM',
  description: 'CRM + Postventa para Abtec',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header className="header">
          <h1>Abtec CRM</h1>
          <nav className="nav">
            <Link href="/">Dashboard</Link>
            <Link href="/contacts">Contactos</Link>
            <Link href="/companies">Empresas</Link>
            <Link href="/deals">Pipeline</Link>
            <Link href="/tickets">Tickets</Link>
            <Link href="/activities">Actividades</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

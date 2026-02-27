'use client';
import type { JSX } from 'react';
import Link from 'next/link';

export default function Header(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-secondary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <img src="/logo.png" alt="ABTEC Logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-secondary text-2xl font-bold tracking-tight">ABTEC</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          <Link className="text-secondary/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="/nosotros">Nosotros</Link>
          <Link className="text-secondary/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="/servicios">Servicios</Link>
          <Link className="text-secondary/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="/productos">Productos</Link>
          <a className="text-secondary/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="/financiamiento">Financiamiento</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:bg-secondary/90">
            Acceso Clientes
          </button>
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}

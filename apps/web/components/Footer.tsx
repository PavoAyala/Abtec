import type { JSX } from 'react';
import Image from 'next/image';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-white py-12 border-t border-secondary/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <img src="/logo.png" alt="ABTEC Logo" className="w-6 h-6 object-contain opacity-50" />
            </div>
            <span className="text-secondary/40 font-bold uppercase tracking-tighter">ABTEC © 2024</span>
          </div>
          <div className="flex gap-8">
            <a className="text-secondary/40 hover:text-primary transition-colors text-sm font-medium" href="#">Política de Privacidad</a>
            <a className="text-secondary/40 hover:text-primary transition-colors text-sm font-medium" href="#">Términos de Servicio</a>
            <a className="text-secondary/40 hover:text-primary transition-colors text-sm font-medium" href="#">Reporte de Sostenibilidad</a>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-background-light flex items-center justify-center text-secondary/40 hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
              <span className="material-symbols-outlined text-lg">public</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-background-light flex items-center justify-center text-secondary/40 hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
              <span className="material-symbols-outlined text-lg">groups</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

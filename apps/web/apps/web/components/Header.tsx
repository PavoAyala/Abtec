import type { JSX } from 'react';
import Image from 'next/image';

export default function Header(): JSX.Element {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-secondary/10 dark:border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-auto min-w-[32px]">
                        <Image
                            src="/logo.png"
                            alt="ABTEC Logo"
                            width={120}
                            height={40}
                            className="h-full w-auto object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-secondary dark:text-white text-2xl font-bold tracking-tight">ABTEC</h1>
                </div>
                <nav className="hidden md:flex items-center gap-10">
                    <a className="text-secondary/80 dark:text-white/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">Services</a>
                    <a className="text-secondary/80 dark:text-white/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">Products</a>
                    <a className="text-secondary/80 dark:text-white/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">Company</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="bg-secondary text-white dark:bg-white dark:text-secondary px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:bg-secondary/90 cursor-pointer">
                        Client Access
                    </button>
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">person</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

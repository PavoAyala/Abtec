'use client';

import type { JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header(): JSX.Element {
    const t = useTranslations('header');

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
                    <a className="text-secondary/80 dark:text-white/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">{t('services')}</a>
                    <a className="text-secondary/80 dark:text-white/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">{t('products')}</a>
                    <a className="text-secondary/80 dark:text-white/80 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">{t('company')}</a>
                </nav>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <Link href="/client-access" className="bg-secondary text-white dark:bg-white dark:text-secondary px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:bg-secondary/90 cursor-pointer">
                        {t('clientAccess')}
                    </Link>
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">person</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

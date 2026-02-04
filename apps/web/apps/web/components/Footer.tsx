'use client';

import type { JSX } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer(): JSX.Element {
    const t = useTranslations('footer');

    return (
        <footer className="bg-white dark:bg-background-dark py-12 border-t border-secondary/5 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="relative h-8 w-auto min-w-[24px] opacity-50">
                            <Image
                                src="/logo.png"
                                alt="ABTEC Logo"
                                width={100}
                                height={32}
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        <span className="text-secondary/40 dark:text-white/40 font-bold uppercase tracking-tighter">{t('copyright')}</span>
                    </div>
                    <div className="flex gap-8">
                        <a className="text-secondary/40 dark:text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">{t('privacyPolicy')}</a>
                        <a className="text-secondary/40 dark:text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">{t('termsOfService')}</a>
                        <a className="text-secondary/40 dark:text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">{t('sustainabilityReport')}</a>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-secondary/40 dark:text-white/40 hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-lg">public</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-secondary/40 dark:text-white/40 hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-lg">groups</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

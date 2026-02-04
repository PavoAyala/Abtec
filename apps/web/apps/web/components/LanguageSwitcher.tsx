'use client';

import type { JSX } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher(): JSX.Element {
    const t = useTranslations('languageSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: string) => {
        const currentPathname = pathname;
        const newPathname = currentPathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    return (
        <div className="relative">
            <select
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
                className="appearance-none bg-transparent border border-secondary/20 dark:border-white/20 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-secondary/80 dark:text-white/80 hover:border-primary focus:border-primary focus:outline-none cursor-pointer transition-colors"
                aria-label={t('label')}
            >
                <option value="en" className="text-secondary">EN</option>
                <option value="es" className="text-secondary">ES</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-sm text-secondary/60 dark:text-white/60 pointer-events-none">
                expand_more
            </span>
        </div>
    );
}

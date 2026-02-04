'use client';

import type { JSX } from 'react';
import { useTranslations } from 'next-intl';

export default function Hero(): JSX.Element {
    const t = useTranslations('hero');

    return (
        <section className="relative w-full min-h-[85vh] flex items-center">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent z-10"></div>
                <div
                    className="w-full h-full bg-cover bg-center"
                    aria-label="Modern solar panel array under clear blue sky"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5rXRHtAb_4eDDTCMuPLSrMUyz7kjNwz94omFlmxXKrYZMQGcJyu14Ax-9RtuaG3TmigUNN2tniY6vTmFpL2MDVUMIWUx1CQb2ub1M01WBejWETKv4e8WkjzYLsAlGnwqLpXvRy6BhN0A0hDUTGV9H-CpY1FKSx5ZdZtO-M7kaMxpsRKVYqsMj-d1aSFnAHtOcawlj6urb5ubo73_7RgC8NdpeyxekZecO_khBig1GscyPIBh2idJhXZgQk71COpZaoW_yUYiVKiQ")' }}
                ></div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-20 w-full">
                <div className="max-w-2xl flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 w-fit">
                        <span className="material-symbols-outlined text-lg">bolt</span>
                        <span className="text-xs font-bold tracking-widest uppercase">{t('badge')}</span>
                    </div>
                    <h1 className="text-white text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                        {t('title')} <span className="text-primary underline decoration-primary/30">{t('titleHighlight')}</span>
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">
                        {t('description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer">
                            {t('requestQuote')} <span className="material-symbols-outlined">trending_flat</span>
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center cursor-pointer">
                            {t('ourTechnology')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

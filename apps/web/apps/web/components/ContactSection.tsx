'use client';

import type { JSX } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactSection(): JSX.Element {
    const t = useTranslations('contact');

    return (
        <section className="py-24 bg-secondary text-white relative overflow-hidden">
            {/* Decorative light effect */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">{t('subtitle')}</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t('title')}</h3>
                        <p className="text-white/70 text-lg mb-10 max-w-md leading-relaxed">
                            {t('description')}
                        </p>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <div>
                                    <p className="text-sm text-white/50 uppercase font-bold tracking-wider">{t('phone')}</p>
                                    <p className="text-lg font-medium">+1 (555) 000-8888</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <p className="text-sm text-white/50 uppercase font-bold tracking-wider">{t('email')}</p>
                                    <p className="text-lg font-medium">contact@abtec-energy.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
                        <form action="#" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-secondary text-sm font-bold uppercase tracking-wide">{t('form.fullName')}</label>
                                    <input className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 outline-none w-full" placeholder={t('form.fullNamePlaceholder')} type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-secondary text-sm font-bold uppercase tracking-wide">{t('form.emailAddress')}</label>
                                    <input className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 outline-none w-full" placeholder={t('form.emailPlaceholder')} type="email" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-secondary text-sm font-bold uppercase tracking-wide">{t('form.serviceType')}</label>
                                <select className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary outline-none w-full">
                                    <option>{t('form.industrialInstallation')}</option>
                                    <option>{t('form.residentialInstallation')}</option>
                                    <option>{t('form.maintenanceMonitoring')}</option>
                                    <option>{t('form.energyConsulting')}</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-secondary text-sm font-bold uppercase tracking-wide">{t('form.message')}</label>
                                <textarea className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 outline-none w-full" placeholder={t('form.messagePlaceholder')} rows={4}></textarea>
                            </div>
                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-primary/20 cursor-pointer" type="submit">
                                {t('form.submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

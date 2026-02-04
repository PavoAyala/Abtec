import type { JSX } from 'react';

export default function Services(): JSX.Element {
    return (
        <>
            <section className="pt-24 pb-12 bg-white dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">What we do</h2>
                            <h3 className="text-secondary dark:text-white text-4xl md:text-5xl font-bold tracking-tight">Specialized Solar Solutions</h3>
                        </div>
                        <p className="text-secondary/60 dark:text-white/60 text-lg max-w-sm">
                            Comprehensive services ensuring your transition to renewable energy is seamless, efficient, and profitable.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-24 bg-white dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Installation Card */}
                        <div className="group p-8 rounded-2xl bg-background-light dark:bg-white/5 border border-secondary/5 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">solar_power</span>
                            </div>
                            <h4 className="text-secondary dark:text-white text-2xl font-bold mb-4">Installation</h4>
                            <p className="text-secondary/60 dark:text-white/60 leading-relaxed">
                                Expert residential and industrial solar setups utilizing Tier 1 hardware and precision engineering for maximum yield.
                            </p>
                            <div className="mt-8 flex items-center text-primary font-bold gap-2 cursor-pointer">
                                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                        {/* Maintenance Card */}
                        <div className="group p-8 rounded-2xl bg-background-light dark:bg-white/5 border border-secondary/5 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="w-14 h-14 rounded-xl bg-secondary dark:bg-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">build</span>
                            </div>
                            <h4 className="text-secondary dark:text-white text-2xl font-bold mb-4">Maintenance</h4>
                            <p className="text-secondary/60 dark:text-white/60 leading-relaxed">
                                24/7 monitoring and preventive maintenance to ensure the longevity and peak performance of your energy system.
                            </p>
                            <div className="mt-8 flex items-center text-primary font-bold gap-2 cursor-pointer">
                                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                        {/* Consulting Card */}
                        <div className="group p-8 rounded-2xl bg-background-light dark:bg-white/5 border border-secondary/5 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">query_stats</span>
                            </div>
                            <h4 className="text-secondary dark:text-white text-2xl font-bold mb-4">Consulting</h4>
                            <p className="text-secondary/60 dark:text-white/60 leading-relaxed">
                                Custom energy audits and ROI analysis. We help you make data-driven decisions for your industrial or home investment.
                            </p>
                            <div className="mt-8 flex items-center text-primary font-bold gap-2 cursor-pointer">
                                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

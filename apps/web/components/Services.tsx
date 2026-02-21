import type { JSX } from 'react';

export default function Services(): JSX.Element {
    return (
        <>
            {/* Services Section Header */}
            <section className="pt-24 pb-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Qué hacemos</h2>
                            <h3 className="text-secondary text-4xl md:text-5xl font-bold tracking-tight">Soluciones Solares Especializadas</h3>
                        </div>
                        <p className="text-secondary/60 text-lg max-w-sm">
                            Servicios integrales que aseguran que su transición a la energía renovable sea fluida, eficiente y rentable.
                        </p>
                    </div>
                </div>
            </section>
            {/* Feature Grid */}
            <section className="pb-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Installation Card */}
                        <div className="group p-8 rounded-2xl bg-background-light border border-secondary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">solar_power</span>
                            </div>
                            <h4 className="text-secondary text-2xl font-bold mb-4">Instalación</h4>
                            <p className="text-secondary/60 leading-relaxed">
                                Instalaciones solares residenciales e industriales expertas que utilizan hardware Tier 1 e ingeniería de precisión para el máximo rendimiento.
                            </p>
                            <div className="mt-8 flex items-center text-primary font-bold gap-2 cursor-pointer">
                                Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                        {/* Maintenance Card */}
                        <div className="group p-8 rounded-2xl bg-background-light border border-secondary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">build</span>
                            </div>
                            <h4 className="text-secondary text-2xl font-bold mb-4">Mantenimiento</h4>
                            <p className="text-secondary/60 leading-relaxed">
                                Monitoreo 24/7 y mantenimiento preventivo para asegurar la longevidad y el máximo rendimiento de su sistema de energía.
                            </p>
                            <div className="mt-8 flex items-center text-primary font-bold gap-2 cursor-pointer">
                                Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                        {/* Consulting Card */}
                        <div className="group p-8 rounded-2xl bg-background-light border border-secondary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">query_stats</span>
                            </div>
                            <h4 className="text-secondary text-2xl font-bold mb-4">Consultoría</h4>
                            <p className="text-secondary/60 leading-relaxed">
                                Auditorías energéticas personalizadas y análisis de ROI. Le ayudamos a tomar decisiones basadas en datos para su inversión industrial o doméstica.
                            </p>
                            <div className="mt-8 flex items-center text-primary font-bold gap-2 cursor-pointer">
                                Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

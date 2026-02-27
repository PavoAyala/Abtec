import type { JSX } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function Nosotros(): JSX.Element {
    return (
        <>
            <Header />
            <main className="bg-white">
                {/* Banner Section */}
                <section className="relative w-full py-24 md:py-32 bg-secondary overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent"></div>
                        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 w-fit mb-6 mx-auto">
                            <span className="material-symbols-outlined text-lg">public</span>
                            <span className="text-xs font-bold tracking-widest uppercase">Empresa Mexicana</span>
                        </div>
                        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            Nuestra <span className="text-primary">Misión Ambiental</span>
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            ABTEC es una empresa consolidada en Monterrey, N.L., con un firme compromiso hacia la sustentabilidad y el aprovechamiento de fuentes de energía renovables.
                        </p>
                    </div>
                </section>

                {/* Identity & Origin Section */}
                <section className="py-20 bg-background-light">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Sobre Nosotros</h2>
                                <h3 className="text-secondary text-3xl md:text-4xl font-bold tracking-tight mb-6">
                                    Trayectoria y Solidez en el Mercado Nacional
                                </h3>
                                <p className="text-secondary/70 text-lg leading-relaxed mb-6">
                                    Con oficinas centrales en el corazón de Monterrey, ABTEC está conformada por un grupo de profesionales especializados en proyectos de ahorro, optimización y generación de energía.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <span className="material-symbols-outlined">verified</span>
                                        </div>
                                        <div>
                                            <h4 className="text-secondary font-bold">Patentes Propias</h4>
                                            <p className="text-secondary/60 text-sm">Sistemas de instalación de paneles e iluminación registrados.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <span className="material-symbols-outlined">build</span>
                                        </div>
                                        <div>
                                            <h4 className="text-secondary font-bold">100% Mexicano</h4>
                                            <p className="text-secondary/60 text-sm">Paneles y luminarias fabricados orgullosamente en México.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-video rounded-2xl bg-secondary/10 overflow-hidden shadow-2xl relative">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5rXRHtAb_4eDDTCMuPLSrMUyz7kjNwz94omFlmxXKrYZMQGcJyu14Ax-9RtuaG3TmigUNN2tniY6vTmFpL2MDVUMIWUx1CQb2ub1M01WBejWETKv4e8WkjzYLsAlGnwqLpXvRy6BhN0A0hDUTGV9H-CpY1FKSx5ZdZtO-M7kaMxpsRKVYqsMj-d1aSFnAHtOcawlj6urb5ubo73_7RgC8NdpeyxekZecO_khBig1GscyPIBh2idJhXZgQk71COpZaoW_yUYiVKiQ")' }}></div>
                                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-secondary/5">
                                    <div className="flex items-center gap-4">
                                        <div className="text-4xl font-bold text-primary">+15</div>
                                        <div className="text-secondary/60 text-xs font-bold uppercase tracking-wider leading-tight">Años de<br />Experiencia</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Goals Section: Mission, Vision, Objective */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Mission */}
                            <div className="p-8 rounded-2xl border border-secondary/5 hover:border-primary/30 transition-all bg-background-light group">
                                <div className="w-14 h-14 rounded-xl bg-secondary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">flag</span>
                                </div>
                                <h4 className="text-secondary text-2xl font-bold mb-4">Misión</h4>
                                <p className="text-secondary/60 leading-relaxed italic">
                                    "Ser la marca y empresa principal en comercialización e instalación de equipos de alta eficiencia en nuestro país."
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="p-8 rounded-2xl border border-secondary/5 hover:border-primary/30 transition-all bg-background-light group">
                                <div className="w-14 h-14 rounded-xl bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">visibility</span>
                                </div>
                                <h4 className="text-secondary text-2xl font-bold mb-4">Visión</h4>
                                <p className="text-secondary/60 leading-relaxed italic">
                                    "Ser la empresa líder en la disminución de las emisiones de gases invernadero CO2 en América."
                                </p>
                            </div>

                            {/* Objective */}
                            <div className="p-8 rounded-2xl border border-secondary/5 hover:border-primary/30 transition-all bg-background-light group">
                                <div className="w-14 h-14 rounded-xl bg-secondary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">ads_click</span>
                                </div>
                                <h4 className="text-secondary text-2xl font-bold mb-4">Objetivo</h4>
                                <p className="text-secondary/60 leading-relaxed italic">
                                    "Ser la empresa de suministro y servicios de ahorro de energía más importante del Norte de México."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Innovation & Quality Section */}
                <section className="py-20 bg-secondary text-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Calidad Certificada</h2>
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Eficiencia que se Nota</h3>
                            <p className="text-white/70 text-lg">
                                Manejamos una amplia variedad de equipos bajo normativas Nacionales e Internacionales, asegurando solo los más altos estándares de calidad.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <span className="material-symbols-outlined text-primary text-4xl shrink-0">engineering</span>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Ingeniería Energética</h4>
                                        <p className="text-white/60">Proyectos integrales que incluyen suministro, instalación y financiamiento.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <span className="material-symbols-outlined text-primary text-4xl shrink-0">eco</span>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Bonos de Carbono</h4>
                                        <p className="text-white/60">Gestión especializada para registro de proyectos verdes y obtención de incentivos.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <span className="material-symbols-outlined text-primary text-4xl shrink-0">electric_bolt</span>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Equipos de Alta Eficiencia</h4>
                                        <p className="text-white/60">Todos nuestros equipos garantizan un mayor ahorro y funcionalidad excepcional.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <span className="material-symbols-outlined text-primary text-4xl shrink-0">groups</span>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Alcance Municipal</h4>
                                        <p className="text-white/60">Experiencia en proyectos de alumbrado y ahorro en municipios como Apodaca, Juárez y Pesquería.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Global Partners Carousel (Simplified List for UI) */}
                <section className="py-20 bg-background-light">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="text-center mb-12">
                            <h4 className="text-secondary/40 font-bold text-xs uppercase tracking-[0.3em] mb-4">Distribuidores Directos de Fabrica</h4>
                            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                                {['Philips', 'Siemens', 'ABB', 'Jinko', 'Baldor', 'Amerisolar', 'Holophane', 'Acuity'].map((brand) => (
                                    <span key={brand} className="text-secondary text-xl font-black tracking-tighter">{brand}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

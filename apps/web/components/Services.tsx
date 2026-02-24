import type { JSX } from 'react';

interface ServiceCard {
    icon: string;
    title: string;
    description: string;
    items: string[];
    accent: 'primary' | 'secondary';
}

const services: ServiceCard[] = [
    {
        icon: 'solar_power',
        title: 'Energía Solar & Eólica',
        description:
            'Soluciones integrales de energía renovable: desde el diseño hasta la instalación llave en mano y mantenimiento continuo.',
        items: [
            'Suministro e instalación de paneles solares',
            'Proyectos de energía solar y eólica',
            'Ingeniería energética para generación eléctrica',
            'Mantenimiento a equipos solares y eólicos',
            'Gestión ante autoridades para ejecución de proyectos',
        ],
        accent: 'primary',
    },
    {
        icon: 'lightbulb',
        title: 'Iluminación de Alta Eficiencia',
        description:
            'Diseño e implementación de sistemas de iluminación eficientes para espacios públicos e industriales.',
        items: [
            'Suministro de luminarias de alta eficiencia',
            'Proyectos de alumbrado público e iluminación industrial',
            'Ingeniería con software de iluminación Dialux',
            'Instalación y ejecución de proyectos de alumbrado',
        ],
        accent: 'secondary',
    },
    {
        icon: 'engineering',
        title: 'Ingeniería & Construcción',
        description:
            'Ingeniería conceptual, básica, detallada y financiera para proyectos industriales y residenciales.',
        items: [
            'Ingeniería conceptual, básica, detallada y financiera',
            'Obra industrial civil y electromecánica',
            'Obra residencial e industrial',
            'Instalaciones eléctricas generales y en media tensión',
            'Protección catódica y mecánica de tuberías',
            'Gerencia y planificación de proyectos',
        ],
        accent: 'primary',
    },
    {
        icon: 'eco',
        title: 'Control Ambiental',
        description:
            'Soluciones de remediación y gestión ambiental para industrias comprometidas con la sustentabilidad.',
        items: [
            'Site assessment y análisis de remediación',
            'Manejo, reuso y reciclaje de residuos',
            'Tratamientos in situ y ex situ',
            'Atención a emergencias ambientales',
            'Plantas de tratamiento de aguas',
            'Control de ruido e insonorizaciones',
        ],
        accent: 'secondary',
    },
];

const consultingSteps = [
    {
        number: '01',
        label: 'Visita técnica',
        description: 'Nuestros ingenieros visitan tus instalaciones para un análisis completo.',
    },
    {
        number: '02',
        label: 'Análisis de consumo',
        description: 'Evaluamos tu consumo eléctrico y los equipos instalados.',
    },
    {
        number: '03',
        label: 'Evaluación solar',
        description: 'Medimos la exposición solar y el potencial de generación de tu sitio.',
    },
    {
        number: '04',
        label: 'Propuesta técnico-económica',
        description: 'Recibes un plan a tu medida con ROI estimado y recomendaciones de ahorro.',
    },
];

export default function Services(): JSX.Element {
    return (
        <>
            {/* Services Section Header */}
            <section id="servicios" className="pt-24 pb-12 bg-white scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
                                Nuestros Servicios
                            </h2>
                            <h3 className="text-secondary text-4xl md:text-5xl font-bold tracking-tight">
                                Soluciones Energéticas & de Ingeniería
                            </h3>
                        </div>
                        <p className="text-secondary/60 text-lg max-w-sm">
                            Servicios integrales en energía renovable, iluminación eficiente,
                            ingeniería de construcción y control ambiental.
                        </p>
                    </div>
                </div>
            </section>

            {/* Service Cards Grid */}
            <section className="pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="group p-8 rounded-2xl bg-background-light border border-secondary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                <div
                                    className={`w-14 h-14 rounded-xl ${service.accent === 'primary' ? 'bg-primary' : 'bg-secondary'} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                                >
                                    <span className="material-symbols-outlined text-3xl">
                                        {service.icon}
                                    </span>
                                </div>
                                <h4 className="text-secondary text-2xl font-bold mb-3">
                                    {service.title}
                                </h4>
                                <p className="text-secondary/60 leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-2">
                                    {service.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-secondary/70 text-sm">
                                            <span className="material-symbols-outlined text-primary text-base mt-0.5">
                                                check_circle
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Consulting Process */}
            <section className="py-20 bg-background-light">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="mb-12 text-center">
                        <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
                            Proceso de Consulta
                        </h2>
                        <h3 className="text-secondary text-3xl md:text-4xl font-bold tracking-tight">
                            Paneles Solares en Monterrey
                        </h3>
                        <p className="text-secondary/60 mt-4 max-w-xl mx-auto">
                            Venta · Instalación · Consulta y Propuesta a tu Medida.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {consultingSteps.map((step) => (
                            <div key={step.number} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                    <span className="text-primary group-hover:text-white font-bold text-lg transition-colors duration-300">
                                        {step.number}
                                    </span>
                                </div>
                                <h4 className="text-secondary font-bold text-lg mb-2">{step.label}</h4>
                                <p className="text-secondary/60 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

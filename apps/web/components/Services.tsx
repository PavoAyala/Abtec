"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Settings, Sun } from "lucide-react";
import type { JSX } from "react";

export default function Services(): JSX.Element {
	const services = [
		{
			title: "Paneles Solares",
			description:
				"Venta, Instalación y Mantenimiento de Paneles Solares Monterrey con más de 24 años de experiencia en el mercado fotovoltaico.",
			icon: <Sun className="w-10 h-10 text-abtec-blue" />,
			link: "#contacto",
		},
		{
			title: "Iluminación",
			description:
				"Venta e Instalación de Luminarias de Alta Eficiencia con distribución directa de fábrica de marcas como Philips, Lumiance y Acuity Brand.",
			icon: <Lightbulb className="w-10 h-10 text-abtec-blue" />,
			link: "#contacto",
		},
		{
			title: "Ingeniería",
			description:
				"Estudios especializados de soluciones de ingeniería en producción de energía alternativa con diseños adaptados a las necesidades del cliente.",
			icon: <Settings className="w-10 h-10 text-abtec-blue" />,
			link: "#contacto",
		},
	];

	return (
		<section id="servicios" className="py-16 bg-[#f8fafc]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-4xl mx-auto mb-16">
					<p className="text-abtec-green font-semibold text-sm uppercase tracking-[0.35em] mb-4">
						NUESTROS
					</p>
					<h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] uppercase">
						SERVICIOS
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<motion.div
							key={service.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.15, duration: 0.5 }}
							className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
						>
							<div className="w-24 h-24 bg-[#eef2f7] rounded-full flex items-center justify-center mb-8">
								{service.icon}
							</div>
							<h3 className="font-heading text-2xl font-bold text-[#1f2a5c] mb-3">
								{service.title}
							</h3>
							<div className="w-16 h-1 bg-abtec-blue rounded-full mb-6 mx-auto" />
							<p className="text-gray-600 text-sm leading-relaxed mb-8 font-sans">
								{service.description}
							</p>
							<a
								href={service.link}
								className="inline-flex items-center justify-center rounded-full border border-abtec-blue px-8 py-3 text-abtec-blue text-sm font-semibold uppercase tracking-[0.15em] hover:bg-abtec-blue hover:text-white transition-colors"
							>
								Cotizar
							</a>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

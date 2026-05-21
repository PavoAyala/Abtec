"use client";

import { motion } from "framer-motion";
import { Leaf, CircleDollarSign, ShieldCheck, TrendingUp, Home } from "lucide-react";
import type { JSX } from "react";

export default function Benefits(): JSX.Element {
	const benefits = [
		{
			title: "Ecológico",
			description:
				"Los proyectos de Paneles Solares Monterrey son una alternativa que logra disminuir la emisión de gases CO2.",
			icon: <Leaf className="w-8 h-8 text-abtec-green" />,
		},
		{
			title: "Ahorro en pagos de CFE",
			description:
				"Instalando Paneles Solares Monterrey en tu hogar o negocio, lograrás disminuir hasta un 98% tus pagos ante CFE.",
			icon: <CircleDollarSign className="w-8 h-8 text-abtec-green" />,
		},
		{
			title: "Tarifa consumo fija",
			description:
				"Instalar Paneles Solares Monterrey protege tu tarifa ante CFE y evita cobros adicionales por concepto de penalización de consumo elevado.",
			icon: <ShieldCheck className="w-8 h-8 text-abtec-green" />,
		},
		{
			title: "Autofinanciable",
			description:
				"Los proyectos de Paneles Solares Monterrey poseen un retorno de inversión atractivo que va desde los 2 años de recuperación.",
			icon: <TrendingUp className="w-8 h-8 text-abtec-green" />,
		},
		{
			title: "Eleva la plusvalía",
			description:
				"Al instalar en tu propiedad Paneles Solares Monterrey aumentas el valor de ésta debido a que podrá generar su propia energía.",
			icon: <Home className="w-8 h-8 text-abtec-green" />,
		},
	];

	return (
		<section className="py-16 bg-[#f8fafc]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white border border-slate-200 rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6 sm:p-10">
					<div className="text-center max-w-4xl mx-auto mb-12">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="font-heading text-3xl md:text-5xl font-bold text-[#121d3a] mb-6 uppercase"
						>
							<span className="text-abtec-green">BENEFICIOS</span>{" "}
							<span className="text-abtec-blue">PANELES SOLARES</span> MONTERREY
						</motion.h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
						{benefits.map((benefit, index) => (
							<motion.div
								key={benefit.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
								className="flex flex-col items-center text-center rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm"
							>
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-5">
									{benefit.icon}
								</div>
								<h3 className="font-heading text-lg md:text-xl font-bold text-abtec-blue mb-3">
									{benefit.title}
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed font-sans">
									{benefit.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

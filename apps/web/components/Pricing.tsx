"use client";

import { motion } from "framer-motion";
import type { JSX } from "react";

export default function Pricing(): JSX.Element {
	const plans = [
		{
			name: "Standard",
			price: "45,000",
			features: [
				"Instalación Certificada",
				"Garantía de Inversor: 5 años",
				"Certificaciones USA",
			],
		},
		{
			name: "Premium",
			price: "52,000",
			features: [
				"Instalación Certificada",
				"Garantía de Inversor: 10 años",
				"Certificaciones USA / Europa",
			],
		},
		{
			name: "Ultimate",
			price: "59,000",
			features: [
				"Instalación Certificada",
				"Garantía Microinversor: 12 años",
				"Certificaciones USA / Europa",
			],
		},
	];

	return (
		<section className="py-16 bg-[#f8fafc] overflow-hidden">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-4xl mx-auto mb-16">
					<p className="text-abtec-blue font-semibold tracking-widest uppercase text-sm mb-4">
						PANELES SOLARES MONTERREY
					</p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] mb-6 uppercase"
					>
						PRECIOS DE <span className="text-abtec-green">PROYECTOS</span>
					</motion.h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans.map((plan, index) => (
						<motion.div
							key={plan.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.15, duration: 0.5 }}
							className="bg-white rounded-[32px] border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col"
						>
							<div className="p-10 text-center flex-grow flex flex-col">
								<p className="text-abtec-blue font-semibold uppercase tracking-[0.35em] text-sm mb-3">
									DESDE
								</p>
								<p className="text-3xl md:text-4xl font-heading font-bold text-[#1f2a5c] mb-3">
									${plan.price}
								</p>
								<h3 className="font-heading text-2xl font-bold text-[#1f2a5c] mb-4">
									{plan.name}
								</h3>
								<div className="w-16 h-1 bg-abtec-green mb-8 mx-auto rounded-full" />

								<div className="space-y-3 text-gray-700 text-sm font-sans mb-8 flex-grow">
									{plan.features.map((feature, i) => (
										<div key={i}>{feature}</div>
									))}
								</div>
							</div>

							<div className="p-8 bg-[#f8fafc] border-t border-slate-200">
								<a
									href="https://wa.link/rwcs6i"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-block w-full bg-abtec-blue text-white font-bold py-4 rounded-full text-sm uppercase tracking-[0.15em] hover:bg-[#14154e] transition-colors"
								>
									SOLICITAR COTIZACIÓN
								</a>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

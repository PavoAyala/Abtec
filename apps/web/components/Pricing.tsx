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
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center max-w-4xl mx-auto mb-16"
				>
					<p className="text-abtec-blue font-semibold tracking-widest uppercase text-sm mb-4">
						PANELES SOLARES MONTERREY
					</p>
					<h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] mb-6 uppercase">
						PRECIOS DE <span className="text-abtec-green">PROYECTOS</span>
					</h2>
					<motion.div
						initial={{ width: 0 }}
						whileInView={{ width: 64 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="h-1 bg-[#262660] mx-auto mt-4 rounded-full"
					/>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans.map((plan, index) => (
						<motion.div
							key={plan.name}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								delay: index * 0.15,
								duration: 0.6,
								ease: "easeOut",
							}}
							whileHover={{
								y: -8,
								boxShadow:
									"0 30px 60px -15px rgba(31, 42, 92, 0.12), 0 0 0 1px rgba(38, 38, 96, 0.04)",
								transition: { duration: 0.3 },
							}}
							className="group bg-white rounded-[32px] border border-slate-100 shadow-[0_15px_45px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col justify-between"
						>
							<div className="p-10 text-center flex-grow flex flex-col">
								<p className="text-abtec-blue font-semibold uppercase tracking-[0.35em] text-sm mb-3">
									DESDE
								</p>
								<p className="text-3xl md:text-4xl font-heading font-bold text-[#1f2a5c] mb-3">
									${plan.price}
								</p>
								<h3 className="font-heading text-2xl font-bold text-[#1f2a5c] mb-4 group-hover:text-abtec-green transition-colors duration-300">
									{plan.name}
								</h3>
								<div className="w-12 h-1 bg-abtec-green mb-8 mx-auto rounded-full group-hover:w-20 transition-all duration-500" />

								<div className="space-y-3 text-slate-700 text-sm font-sans mb-8 flex-grow">
									{plan.features.map((feature) => (
										<div key={feature}>{feature}</div>
									))}
								</div>
							</div>

							<div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
								<a
									href="https://wa.link/rwcs6i"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center text-center w-full bg-[#262660] hover:bg-[#1f2a5c] text-white font-bold py-4 rounded-full text-sm uppercase tracking-[0.15em] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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

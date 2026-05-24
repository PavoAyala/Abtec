"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, Home, Percent } from "lucide-react";
import type { JSX } from "react";

export default function Financing(): JSX.Element {
	const options = [
		{
			title: "3, 6, 9, o 12 MSI",
			description:
				"Adquiere tu sistema de paneles solares con tu TDC disfrutando de 3, 6, 9 o 12 meses sin intereses al realizar tu compra.",
			badge: "Sin Intereses",
			icon: CreditCard,
			features: [
				"Tarjetas de crédito Visa, MasterCard y AMEX",
				"0% de comisión por apertura o cargos ocultos",
				"Trámite 100% inmediato al realizar tu pago",
			],
		},
		{
			title: "MEJORAVIT",
			description:
				"Aprovecha tu crédito Mejoravit para adquirir tu sistema de paneles solares con un financiamiento por parte de Mejoravit.",
			badge: "Crédito Hogar",
			icon: Home,
			features: [
				"Usa tu subcuenta de vivienda INFONAVIT",
				"Descuento automático mensual vía nómina",
				"Garantía de ecotecnologías autorizadas",
			],
		},
		{
			title: "FINANCIAMIENTO CON CI BANCO",
			description:
				"Adquiere tu sistema de paneles solares pagando un 10% de enganche, cubriendo el monto restante en un plazo de 2 a 7 años.",
			badge: "Plazo de 2 a 7 Años",
			icon: Percent,
			features: [
				"Enganche inicial desde tan solo el 10%",
				"Plazos de pago flexibles (24 a 84 meses)",
				"Tasa de interés preferencial fija y deducible",
			],
		},
	];

	return (
		<section id="financiamiento" className="py-20 bg-slate-50/50 relative overflow-hidden">
			{/* Decorative background blobs */}
			<div className="absolute top-1/4 left-1/12 w-96 h-96 bg-abtec-blue/5 rounded-full filter blur-3xl pointer-events-none" />
			<div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-[#3ab54a]/5 rounded-full filter blur-3xl pointer-events-none" />

			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center max-w-4xl mx-auto mb-16"
				>
					<p className="text-[#262660] font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-3">
						OPCIONES DE ADQUISICIÓN
					</p>
					<h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] uppercase">
						FINANCIA<span className="text-abtec-green">MIENTO</span>
					</h2>
					<motion.div
						initial={{ width: 0 }}
						whileInView={{ width: 64 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="h-1 bg-[#262660] mx-auto mt-4 rounded-full"
					/>
				</motion.div>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{options.map((option, index) => (
						<motion.div
							key={option.title}
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
							}}
							className="group bg-white rounded-[32px] border border-slate-100/80 p-8 md:p-10 shadow-[0_15px_45px_rgba(15,23,42,0.03)] flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
						>
							{/* Top Accent Gradient Line on Hover */}
							<div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#262660] to-abtec-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

							<div className="flex flex-col h-full">
								{/* Icon and Badge Header */}
								<div className="flex justify-between items-start mb-6">
									<div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-[#262660] group-hover:bg-[#262660] group-hover:text-white transition-all duration-300">
										<option.icon size={26} strokeWidth={1.5} />
									</div>
									<span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-3.5 py-1.5 rounded-full group-hover:bg-abtec-green group-hover:text-white transition-all duration-300">
										{option.badge}
									</span>
								</div>

								{/* Title */}
								<h3 className="text-[#262660] group-hover:text-abtec-green transition-colors duration-300 font-heading text-2xl font-bold mb-3">
									{option.title}
								</h3>

								{/* Decorative Divider */}
								<div className="w-10 h-0.5 bg-slate-200 group-hover:w-20 group-hover:bg-abtec-green transition-all duration-500 mb-6" />

								{/* Description */}
								<p className="text-slate-600 text-sm leading-relaxed font-sans mb-6">
									{option.description}
								</p>

								{/* Key Features List */}
								<div className="space-y-3 mb-8 mt-auto">
									{option.features.map((feature) => (
										<div
											key={feature}
											className="flex items-start gap-2.5 text-xs text-slate-600"
										>
											<div className="bg-emerald-50 text-[#3ab54a] rounded-full p-0.5 mt-0.5 flex-shrink-0 group-hover:bg-[#3ab54a] group-hover:text-white transition-all duration-300">
												<Check className="w-3 h-3" strokeWidth={3} />
											</div>
											<span>{feature}</span>
										</div>
									))}
								</div>

								{/* CTA Button */}
								<div className="mt-auto pt-6 border-t border-slate-100">
									<a
										href="https://walink.co/776849"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center text-center w-full bg-[#262660] hover:bg-[#1f2a5c] text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-[0.12em] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
									>
										COTIZAR AHORA
									</a>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

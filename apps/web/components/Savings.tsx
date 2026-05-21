"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { JSX } from "react";
import { useState } from "react";
import Image from "next/image";

export default function Savings(): JSX.Element {
	const [isMonthly, setIsMonthly] = useState(true);

	const residentialBenefits = [
		"Retorno inversión: Corto plazo.",
		"Ahorro desde primer recibo.",
		"Eleva la plusvalía.",
		"Garantías hasta de 25 años.",
		"Instalación con diseño moderno.",
	];

	const commercialBenefits = [
		"100% deducible de impuestos.",
		"Retorno inversión: Corto plazo.",
		"Atractivo para los clientes.",
		"Rentable.",
		"Responsable socialmente.",
	];

	return (
		<section className="py-16 bg-white">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
					<div>
						<p className="text-abtec-blue font-bold tracking-widest uppercase text-sm mb-4">
							MENSUAL Y ANUAL
						</p>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] mb-6 uppercase"
						>
							PROMEDIO DE <span className="text-abtec-green">AHORRO</span>
						</motion.h2>
						<p className="text-gray-700 text-sm leading-relaxed mb-8 font-sans">
							Te mostramos el estimado MÍNIMO de ahorro en dinero que tendrías al instalar Paneles Solares Monterrey en tu hogar o negocio.
						</p>

						<div className="flex items-center justify-center xl:justify-start bg-[#f3f3f7] rounded-full p-1 w-max shadow-sm border border-slate-200 mb-10">
							<button
								type="button"
								className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
									isMonthly
										? "bg-abtec-green text-white shadow"
										: "text-gray-500 hover:text-abtec-blue"
								}`}
								onClick={() => setIsMonthly(true)}
							>
								Mensual
							</button>
							<button
								type="button"
								className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
									!isMonthly
										? "bg-abtec-green text-white shadow"
										: "text-gray-500 hover:text-abtec-blue"
								}`}
								onClick={() => setIsMonthly(false)}
							>
								Anual
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="bg-[#f8fafc] rounded-[32px] border border-slate-200 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] flex flex-col"
							>
								<h3 className="text-xl font-bold text-[#1f2a5c] mb-4">Residencial</h3>
								<div className="text-abtec-green font-heading text-5xl md:text-6xl font-bold mb-4">
									+ ${isMonthly ? "1,955" : "11,730"}
								</div>
								<p className="text-gray-600 text-sm mb-8">Ahorro en recibos de CFE por generar tu propia energía.</p>
								<div className="mb-8">
									<a
										href="https://walink.co/776849"
										target="_blank"
										rel="noopener noreferrer"
									className="block w-full bg-abtec-blue text-white py-3 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#14154e] transition-colors"
									>
										COTIZAR
									</a>
								</div>
								<div className="space-y-3 mb-6">
									{residentialBenefits.map((benefit, i) => (
										<div key={i} className="flex items-start gap-3 text-sm text-gray-600">
											<div className="bg-abtec-green/20 rounded-full p-2 mt-1">
												<Check className="w-4 h-4 text-abtec-green" strokeWidth={3} />
											</div>
											<span>{benefit}</span>
										</div>
									))}
								</div>
								<p className="text-xs text-gray-500">Basado en casos reales.</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1, duration: 0.5 }}
								className="bg-[#f8fafc] rounded-[32px] border border-slate-200 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] flex flex-col"
							>
								<h3 className="text-xl font-bold text-[#1f2a5c] mb-4">Comercial</h3>
								<div className="text-abtec-green font-heading text-5xl md:text-6xl font-bold mb-4">
									+ ${isMonthly ? "7,500" : "45,000"}
								</div>
								<p className="text-gray-600 text-sm mb-8">Ahorro en recibos de CFE por generar tu propia energía.</p>
								<div className="mb-8">
									<a
										href="https://walink.co/776849"
										target="_blank"
										rel="noopener noreferrer"
									className="block w-full bg-abtec-blue text-white py-3 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#14154e] transition-colors"
									>
										COTIZAR
									</a>
								</div>
								<div className="space-y-3 mb-6">
									{commercialBenefits.map((benefit, i) => (
										<div key={i} className="flex items-start gap-3 text-sm text-gray-600">
											<div className="bg-abtec-green/20 rounded-full p-2 mt-1">
												<Check className="w-4 h-4 text-abtec-green" strokeWidth={3} />
											</div>
											<span>{benefit}</span>
										</div>
									))}
								</div>
								<p className="text-xs text-gray-500">Basado en casos reales.</p>
							</motion.div>
						</div>
					</div>
				</div>

				<div className="mt-12 relative h-[440px] rounded-[32px] overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<Image
						src="/images/proyecto residencial.png"
						alt="Paneles solares"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-black/20" />
				</div>
			</div>
		</section>
	);
}

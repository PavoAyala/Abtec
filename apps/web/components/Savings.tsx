"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { useState } from "react";

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
		<section className="py-16 bg-[#f8fafc] w-full overflow-hidden">
			{/* Split Layout Container Card - stretches full-width */}
			<div className="bg-white border-y border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.03)] overflow-hidden grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-0 w-full">
				{/* Left Side: Contents & Cards */}
				<div className="p-8 md:p-12 lg:p-14 xl:py-16 xl:pr-12 xl:pl-[8%] 2xl:pl-[12%] flex flex-col justify-between w-full">
					<div className="w-full max-w-[850px] mx-auto xl:mx-0 flex flex-col justify-between h-full">
						{/* Header Row */}
						<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
							<div className="max-w-xl">
								<p className="text-abtec-blue font-semibold tracking-widest uppercase text-xs md:text-sm mb-3">
									MENSUAL Y ANUAL
								</p>
								<h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] uppercase">
									PROMEDIO DE <span className="text-abtec-green">AHORRO</span>
								</h2>
								<div className="w-16 h-1 bg-[#262660] mt-4 mb-6 rounded-full" />
								<p className="text-slate-600 text-sm leading-relaxed font-sans">
									Te mostramos el estimado MÍNIMO de ahorro en dinero que tendrías
									al instalar Paneles Solares Monterrey en tu hogar o negocio.
								</p>
							</div>

							{/* Custom Interactive Toggle Switch */}
							<div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full w-max h-max shadow-sm self-start sm:self-end">
								<button
									type="button"
									onClick={() => setIsMonthly(true)}
									className={`text-xs font-bold transition-colors duration-300 focus:outline-none ${isMonthly ? "text-[#262660]" : "text-slate-400"}`}
								>
									Mensual
								</button>
								<button
									type="button"
									onClick={() => setIsMonthly(!isMonthly)}
									className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none flex items-center ${isMonthly ? "bg-[#262660]" : "bg-[#3AB54A]"}`}
									aria-label="Cambiar periodo de ahorro"
								>
									<div
										className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isMonthly ? "translate-x-0" : "translate-x-5"}`}
									/>
								</button>
								<button
									type="button"
									onClick={() => setIsMonthly(false)}
									className={`text-xs font-bold transition-colors duration-300 focus:outline-none ${!isMonthly ? "text-abtec-green" : "text-slate-400"}`}
								>
									Anual
								</button>
							</div>
						</div>

						{/* Sub-cards Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Residencial Card */}
							<div className="group bg-slate-50/50 hover:bg-white rounded-[28px] p-8 border border-slate-100/80 hover:border-slate-200/60 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
								<div className="absolute top-0 inset-x-0 h-1 bg-[#262660] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div>
									<span className="text-[10px] font-bold uppercase tracking-widest bg-[#262660]/5 text-[#262660] px-3.5 py-1.5 rounded-full w-max mb-4 block">
										Hogares
									</span>
									<h3 className="font-heading text-2xl font-bold text-[#1f2a5c] mb-2">
										Residencial
									</h3>

									{/* Animated Savings Number */}
									<div className="font-heading text-4xl md:text-5xl font-bold text-abtec-green mb-3 h-14 flex items-center">
										<AnimatePresence mode="wait">
											<motion.span
												key={isMonthly ? "monthly" : "yearly"}
												initial={{ opacity: 0, y: -8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 8 }}
												transition={{ duration: 0.18 }}
											>
												+ ${isMonthly ? "1,955" : "11,730"}
											</motion.span>
										</AnimatePresence>
									</div>

									<p className="text-slate-500 text-xs leading-relaxed mb-6">
										Ahorro en recibos de CFE por generar tu propia energía.
									</p>
									<div className="w-12 h-0.5 bg-slate-100 group-hover:w-24 group-hover:bg-[#262660] transition-all duration-500 mb-6" />

									<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
										Beneficios:
									</p>
									<div className="space-y-3.5">
										{residentialBenefits.map((benefit) => (
											<div
												key={benefit}
												className="flex items-start gap-2.5 text-xs text-slate-600"
											>
												<div className="bg-emerald-50 text-emerald-500 rounded-full p-1 flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
													<Check className="w-3.5 h-3.5" strokeWidth={3} />
												</div>
												<span>{benefit}</span>
											</div>
										))}
									</div>
								</div>

								<div className="mt-8">
									<a
										href="https://walink.co/776849"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center text-center w-full bg-[#262660] hover:bg-[#1f2a5c] text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-[0.12em] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
									>
										COTIZAR
									</a>
									<span className="text-[9px] text-slate-400 text-center mt-3 block italic">
										Basado en casos reales.
									</span>
								</div>
							</div>

							{/* Comercial Card */}
							<div className="group bg-slate-50/50 hover:bg-white rounded-[28px] p-8 border border-slate-100/80 hover:border-slate-200/60 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
								<div className="absolute top-0 inset-x-0 h-1 bg-abtec-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div>
									<span className="text-[10px] font-bold uppercase tracking-widest bg-abtec-green/5 text-abtec-green px-3.5 py-1.5 rounded-full w-max mb-4 block">
										Negocios
									</span>
									<h3 className="font-heading text-2xl font-bold text-[#1f2a5c] mb-2">
										Comercial
									</h3>

									{/* Animated Savings Number */}
									<div className="font-heading text-4xl md:text-5xl font-bold text-abtec-green mb-3 h-14 flex items-center">
										<AnimatePresence mode="wait">
											<motion.span
												key={isMonthly ? "monthly" : "yearly"}
												initial={{ opacity: 0, y: -8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 8 }}
												transition={{ duration: 0.18 }}
											>
												+ ${isMonthly ? "7,500" : "45,000"}
											</motion.span>
										</AnimatePresence>
									</div>

									<p className="text-slate-500 text-xs leading-relaxed mb-6">
										Ahorro en recibos de CFE por generar tu propia energía.
									</p>
									<div className="w-12 h-0.5 bg-slate-100 group-hover:w-24 group-hover:bg-[#262660] transition-all duration-500 mb-6" />

									<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
										Beneficios:
									</p>
									<div className="space-y-3.5">
										{commercialBenefits.map((benefit) => (
											<div
												key={benefit}
												className="flex items-start gap-2.5 text-xs text-slate-600"
											>
												<div className="bg-emerald-50 text-emerald-500 rounded-full p-1 flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
													<Check className="w-3.5 h-3.5" strokeWidth={3} />
												</div>
												<span>{benefit}</span>
											</div>
										))}
									</div>
								</div>

								<div className="mt-8">
									<a
										href="https://walink.co/776849"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center text-center w-full bg-[#262660] hover:bg-[#1f2a5c] text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-[0.12em] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
									>
										COTIZAR
									</a>
									<span className="text-[9px] text-slate-400 text-center mt-3 block italic">
										Basado en casos reales.
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side: Solar Panel Image */}
				<div className="relative min-h-[350px] xl:min-h-full w-full overflow-hidden group">
					<Image
						src="/images/proyecto residencial.png"
						alt="Paneles solares residenciales"
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
					<div className="absolute bottom-6 left-6 text-white z-10 hidden xl:block">
						<p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/80">Proyectos ABTEC</p>
						<h4 className="font-heading text-lg font-bold">Energía Limpia y Rentable</h4>
					</div>
				</div>
			</div>
		</section>
	);
}

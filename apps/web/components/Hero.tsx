"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { JSX } from "react";

export default function Hero(): JSX.Element {
	const stats = [
		{ value: "24 +", label: "AÑOS EXPERIENCIA" },
		{ value: "30 +", label: "COBERTURA ESTADOS" },
		{ value: "1000 +", label: "RECOMENDACIONES" },
		{ value: "20,000 +", label: "PANELES SOLARES" },
	];

	return (
		<section className="relative w-full overflow-hidden bg-[#eef2f7] py-10">
			<div className="w-full px-4 sm:px-6 lg:px-8">
				<div className="relative w-full overflow-hidden rounded-[32px] bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
					<div className="absolute inset-0">
						<Image
							src="/images/markus-spiske-qwRF33UKsVg-unsplash.jpg"
							alt="Paneles solares Monterrey"
							fill
							priority
							className="object-cover"
							quality={100}
						/>
						<div className="absolute inset-0 bg-slate-950/35" />
					</div>

					<div className="relative z-10 min-h-[640px] flex flex-col justify-start pt-24 pb-12">
						<div className="max-w-3xl mx-auto text-center">
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/80 mb-3"
							>
								AHORRA HASTA UN 98% EN TUS RECIBOS DE CFE
							</motion.p>

							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.08] max-w-3xl mx-auto"
							>
								Genera tu propia energía con Paneles Solares Monterrey
							</motion.h1>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs mx-auto sm:max-w-none"
							>
								<a
									href="https://wa.link/rwcs6i"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white text-slate-950 px-8 py-4 font-semibold uppercase tracking-[0.15em] shadow-sm transition hover:bg-slate-100"
								>
									Cotizar
								</a>
								<a
									href="https://api.whatsapp.com/send/?phone=528131292192&text=%C2%A1Hola%21%20Quisiera%20obtener%20una%20cotizaci%C3%B3n"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#262660] text-white px-8 py-4 font-semibold uppercase tracking-[0.15em] shadow-md hover:bg-[#1f2a5c] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
								>
									WhatsApp
								</a>
							</motion.div>
						</div>
					</div>

					<div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 lg:px-8 pb-6">
						<div className="mx-auto max-w-[1360px] rounded-[32px] bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl py-6 px-4 sm:px-6">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{stats.map((stat, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.25 + idx * 0.08 }}
										className="flex flex-col items-center justify-center rounded-3xl bg-white px-5 py-6 text-center shadow-sm"
									>
										<p className="text-4xl md:text-5xl font-heading font-bold text-[#1f2a5c] mb-2">
											{stat.value}
										</p>
										<span className="text-xs md:text-sm tracking-[0.2em] uppercase text-slate-500">
											{stat.label}
										</span>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

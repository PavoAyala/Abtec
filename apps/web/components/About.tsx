"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { JSX } from "react";

export default function About(): JSX.Element {
	return (
		<section id="nosotros" className="py-16 bg-[#f8fafc]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white border border-slate-200 rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
					<div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0 items-stretch">
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="relative w-full overflow-hidden h-[350px] sm:h-[450px] lg:h-full lg:min-h-full"
						>
							<Image
								src="/images/abtec1.jpeg"
								alt="PANELES SOLARES MONTERREY"
								fill
								className="object-cover hover:scale-102 transition-transform duration-700 ease-out"
								quality={100}
								priority
							/>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.15 }}
							className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-6 sm:p-10 lg:p-12 xl:p-16"
						>
							<p className="text-abtec-green font-semibold text-sm uppercase tracking-[0.4em] mb-4">
								ABTEC
							</p>
							<h2 className="font-heading text-3xl md:text-4xl font-bold text-[#121d3a] mb-4 leading-tight">
								Paneles Solares Monterrey
							</h2>
							<p className="text-abtec-green text-xl font-bold mb-8">
								Paga hasta $45 pesos en recibos de CFE
							</p>
							<p className="text-gray-700 text-base leading-relaxed mb-5 font-sans">
								Invertir en ABTEC Paneles Solares Monterrey para hogares,
								comercios o industrias genera beneficios en ahorros de hasta el
								98% en pagos de recibos de luz ante CFE, durante un tiempo de
								vida de los sistemas solares de hasta 30 años.
							</p>
							<p className="text-gray-700 text-base leading-relaxed mb-5 font-sans">
								Considerando que la instalación de Paneles Solares Monterrey
								como una opción de producción de energía alternativa puede
								reducir la emisión de CO2 y a su vez servir como estrategia de
								inversión en nuestro hogar o negocio, aumentando la plusvalía de
								la propiedad.
							</p>
							<p className="text-gray-700 text-base leading-relaxed font-sans">
								Los proyectos de Paneles Solares Monterrey permiten un ahorro a
								corto plazo en los pagos en recibos de luz ante CFE, así como
								protegen las tarifas para evitar aumentos por exceso de consumo.
							</p>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}

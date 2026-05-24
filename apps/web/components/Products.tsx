"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";

export default function Products(): JSX.Element {
	const products = [
		{
			title: "Iluminación",
			description:
				"Distribución e Instalación de proyectos de iluminación de alta eficiencia desde comerciales hasta alumbrado público.",
			image: "/images/LUMINARIA PHILIPS.png",
		},
		{
			title: "Paneles Solares",
			description:
				"Instalación, distribución y mantenimiento de Paneles Solares Monterrey en hogares, comercios e industrias.",
			image: "/images/PANELES SOLARES-1.png",
		},
		{
			title: "Boiler Solar",
			description:
				"Distribución de boiler solares de alta calidad para proyectos residenciales y comerciales en toda la república mexicana.",
			image: "/images/BOILER SOLAR.png",
		},
	];

	return (
		<section id="equipos" className="py-16 bg-[#f8fafc]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center max-w-4xl mx-auto mb-16"
				>
					<h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] uppercase">
						NUESTROS <span className="text-abtec-green">PRODUCTOS</span>
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
					{products.map((product, index) => (
						<motion.div
							key={product.title}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								delay: index * 0.15,
								duration: 0.6,
								ease: "easeOut",
							}}
							whileHover={{
								y: -12,
								boxShadow:
									"0 30px 60px -15px rgba(31, 42, 92, 0.15), 0 0 0 1px rgba(38, 38, 96, 0.05)",
								transition: { duration: 0.3 },
							}}
							className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-[0_15px_45px_rgba(15,23,42,0.04)] flex flex-col justify-between"
						>
							<div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-b from-slate-50/50 to-transparent flex items-center justify-center p-6">
								<div className="relative w-full h-full transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 ease-out">
									<Image
										src={product.image}
										alt={product.title}
										fill
										className="object-contain"
										quality={100}
									/>
								</div>
							</div>
							<div className="px-8 py-10 text-center flex-grow flex flex-col justify-between">
								<div>
									<h3 className="text-2xl font-heading font-bold text-abtec-green mb-2 group-hover:text-[#262660] transition-colors duration-300">
										{product.title}
									</h3>
									<div className="w-12 h-1 bg-abtec-blue mx-auto mb-6 rounded-full group-hover:w-24 group-hover:bg-abtec-green transition-all duration-500" />
									<p className="text-slate-600 text-sm leading-relaxed mb-8">
										{product.description}
									</p>
								</div>
								<a
									href="#contacto"
									className="inline-flex items-center justify-center w-full bg-[#262660] text-white py-3.5 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#1f2a5c] shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] active:scale-[0.98]"
								>
									<span className="mr-2">Cotizar</span>
									<ArrowRight
										size={16}
										className="transform group-hover:translate-x-1.5 transition-transform duration-300"
									/>
								</a>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

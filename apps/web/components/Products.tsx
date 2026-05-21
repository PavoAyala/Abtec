"use client";

import { motion } from "framer-motion";
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
				<div className="text-center max-w-4xl mx-auto mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] uppercase"
					>
						NUESTROS <span className="text-abtec-green">PRODUCTOS</span>
					</motion.h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{products.map((product, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.15, duration: 0.5 }}
							className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-200"
						>
							<div className="relative h-64 sm:h-72">
								<Image
									src={product.image}
									alt={product.title}
									fill
									className="object-contain"
									quality={100}
								/>
							</div>
							<div className="px-8 py-10 text-center">
								<h3 className="text-2xl font-heading font-bold text-abtec-green mb-2">
									{product.title}
								</h3>
								<div className="w-16 h-1 bg-abtec-blue mx-auto mb-6 rounded-full" />
								<p className="text-gray-600 text-sm leading-relaxed mb-8">
									{product.description}
								</p>
								<a
									href="#contacto"
									className="inline-flex items-center justify-center w-full bg-abtec-blue text-white py-3 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#14154e] transition-colors"
								>
									Cotizar
								</a>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

"use client";

import { motion } from "framer-motion";
import type { JSX } from "react";

export default function Financing(): JSX.Element {
	const options = [
		{
			title: "3, 6, 9, o 12 MSI",
			description:
				"Adquiere tu sistema de paneles solares con tu TDC disfrutando de 3, 6, 9 o 12 meses sin intereses al realizar tu compra.",
		},
		{
			title: "MEJORAVIT",
			description:
				"Aprovecha tu crédito Mejoravit para adquirir tu sistema de paneles solares con un financiamiento por parte de Mejoravit.",
		},
		{
			title: "FINANCIAMIENTO CON CI BANCO",
			description:
				"Adquiere tu sistema de paneles solares pagando un 10% de enganche, cubriendo el monto restante en un plazo de 2 a 7 años.",
		},
	];

	return (
		<section id="financiamiento" className="py-16 bg-[#f8fafc]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{options.map((option, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.15, duration: 0.5 }}
							className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
						>
							<h3 className="text-abtec-green font-heading text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
								{option.title}
							</h3>
							<p className="text-gray-700 text-sm leading-relaxed font-sans text-center md:text-left">
								{option.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

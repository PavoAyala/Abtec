"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { JSX } from "react";

export default function Brands(): JSX.Element {
	const brands = [
		"PHILIPS LOGO.png",
		"ENPHASE LOGO.png",
		"FRONIUS LOGO.png",
		"LOGO JA SOLAR.png",
		"RISEN LOGO.png",
		"SMA LOGO.png",
	];

	return (
		<section className="py-16 bg-[#f8fafc] overflow-hidden">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-4xl mx-auto mb-16">
					<p className="text-abtec-blue font-semibold uppercase tracking-[0.35em] text-sm mb-3">
						NUESTRAS
					</p>
					<h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] uppercase">
						MARCA<span className="text-abtec-green">S</span>
					</h2>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
					{brands.map((brand, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05, duration: 0.4 }}
							className="bg-[#eef2f7] rounded-[28px] p-6 flex items-center justify-center"
						>
							<div className="relative w-full h-20">
								<Image
									src={`/images/${brand}`}
									alt={`Marca ${index + 1}`}
									fill
									className="object-contain"
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

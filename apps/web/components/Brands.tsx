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

	const duplicatedBrands = [
		...brands.map((brand) => ({ name: brand, id: `first-${brand}` })),
		...brands.map((brand) => ({ name: brand, id: `second-${brand}` })),
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
					<p className="text-abtec-blue font-semibold uppercase tracking-[0.35em] text-sm mb-3">
						NUESTRAS
					</p>
					<h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] uppercase">
						MARCA<span className="text-abtec-green">S</span>
					</h2>
					<motion.div
						initial={{ width: 0 }}
						whileInView={{ width: 64 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="h-1 bg-[#262660] mx-auto mt-4 rounded-full"
					/>
				</motion.div>

				{/* Auto Marquee Container */}
				<div className="w-full overflow-hidden relative">
					{/* Edge Fade Overlays */}
					<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
					<div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

					<div className="flex animate-brands-container">
						<div className="flex gap-8 px-4 py-4 animate-brands-scroll">
							{duplicatedBrands.map((brand, index) => (
								<div
									key={brand.id}
									className="bg-white rounded-[28px] border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-8 flex items-center justify-center w-64 h-36 flex-shrink-0 hover:scale-105 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(15,23,42,0.06)]"
								>
									<div className="relative w-full h-full">
										<Image
											src={`/images/${brand.name}`}
											alt={`Marca ${index + 1}`}
											fill
											className="object-contain"
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					<style>{`
						@keyframes marquee-brands {
							0% { transform: translateX(0); }
							100% { transform: translateX(-50%); }
						}
						.animate-brands-container {
							display: flex;
							width: max-content;
						}
						.animate-brands-scroll {
							display: flex;
							width: max-content;
							animation: marquee-brands 22s linear infinite;
						}
						.animate-brands-scroll:hover {
							animation-play-state: paused;
						}
					`}</style>
				</div>
			</div>
		</section>
	);
}

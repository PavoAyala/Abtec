"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { JSX } from "react";
import Image from "next/image";
import { useState } from "react";

export default function TestimonialsClients(): JSX.Element {
	const testimonials = [
		{
			name: "Javier Gómez",
			title: "Cliente Comercial",
			text: "Empresa muy profesional y recomendable para proyectos de paneles solares en Monterrey, te atienden en sus oficinas, los ingenieros te explican bien el proyecto y te muestran los paneles solares y inversores en su bodega, la cual está en las mismas instalaciones, ahí mismo tienen ellos también instalado paneles solares por lo que puedes ver el sistema funcionando.",
			image: "/images/proyecto residencial.png",
		},
		{
			name: "Douglas Gil",
			title: "Jefe Administrativo en ABTEC Paneles Solares Monterrey",
			text: "Especialista titulado en administración de recursos y eficiencia de procesos, profesional en ejecución de proyectos de Paneles Solares Monterrey a través de métodos efectivos de seguimiento y atención al cliente durante el tiempo de vida útil de los sistemas solares.",
			image: "/images/abtec1.jpeg",
		},
	];

	const clients = [
		"HEINEKEN MEXICO.png",
		"LOGO TERNIUM.png",
		"BUDENHEIM.png",
		"VITRO.png",
		"LOGO TUPY.png",
		"GRÚAS MONTERREY.png",
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	const previousTestimonial = () => {
		setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
	};

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
	};

	return (
		<section className="py-16 bg-[#f8fafc]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<p className="text-abtec-blue font-semibold uppercase tracking-[0.4em] text-sm mb-3">
						TESTIMONIOS
					</p>
					<h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1c1d29] uppercase">
						<span className="text-abtec-green">RESEÑAS</span> DE CLIENTES
					</h2>
				</div>

				<div className="relative rounded-[40px] overflow-hidden bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)] p-6 md:p-10">
					<div className="hidden md:flex absolute inset-y-0 left-0 items-center px-4">
						<button
							type="button"
							onClick={previousTestimonial}
							className="w-14 h-14 bg-[#1c1d29] text-white rounded-full flex items-center justify-center shadow hover:bg-[#131427] transition"
						>
							<ChevronLeft size={24} />
						</button>
					</div>
					<div className="hidden md:flex absolute inset-y-0 right-0 items-center px-4">
						<button
							type="button"
							onClick={nextTestimonial}
							className="w-14 h-14 bg-[#1c1d29] text-white rounded-full flex items-center justify-center shadow hover:bg-[#131427] transition"
						>
							<ChevronRight size={24} />
						</button>
					</div>

					<div className="bg-[#1c1d29] rounded-[28px] p-8 md:p-12 text-center text-white relative overflow-hidden">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_35%)]" />
						<div className="relative z-10 max-w-3xl mx-auto">
							<div className="flex flex-col items-center gap-4 md:gap-6 mb-8">
								<div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
									<Image
										src={testimonials[currentIndex].image}
										alt={testimonials[currentIndex].name}
										width={96}
										height={96}
										className="object-cover"
									/>
								</div>
								<p className="text-sm uppercase tracking-[0.35em] text-abtec-green font-bold">
									{testimonials[currentIndex].title}
								</p>
								<h3 className="font-heading text-3xl md:text-4xl font-bold text-white">
									{testimonials[currentIndex].name}
								</h3>
							</div>
							<p className="text-base md:text-lg leading-relaxed text-white/80">
								"{testimonials[currentIndex].text}"
							</p>
						</div>
					</div>
				</div>

				<div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
					{clients.map((client, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05, duration: 0.4 }}
							className="bg-[#eef2f7] rounded-[24px] p-6 flex items-center justify-center"
						>
							<Image
								src={`/images/${client}`}
								alt={`Marca ${index + 1}`}
								width={140}
								height={80}
								className="object-contain"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

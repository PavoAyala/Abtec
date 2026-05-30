"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { useState } from "react";

export default function TestimonialsClients(): JSX.Element {
	const testimonials = [
		{
			name: "Gastos Empresariales",
			title: "Cliente Comercial",
			text: "Muy contento con el servicio y los resultados que he tenido con mi sistema solar que me instalo ABTEC. De un recibo en promedio de $8,000 al mes me llega ahora de $90 pesos, cumplen lo que prometen y atienden mis solicitudes puntualmente, los recomiendo ampliamente.",
			image: "/images/abtec1.jpeg",
		},
		{
			name: "Marcela Duque",
			title: "Cliente Residencial",
			text: "La instalación fue muy rápida, se hicieron cargo de todos los trámites y mis paneles comenzaron a funcionar antes de lo que pensábamos. El personal muy profesional y explicando cada duda de manera muy entendible.",
			image: "/images/markus-spiske-qwRF33UKsVg-unsplash (1)-1.jpg",
		},
		{
			name: "Ana Maria López",
			title: "Cliente Residencial",
			text: "Súper rápidos y la mejor cotización, busque con diferentes proveedores y fue la mejor opción. Además no todos proporcionan monitoreo WI-FI para hacer bien cuentas y estar atento al cobro de CFE.",
			image: "/images/convento.png",
		},
		{
			name: "Tomoyuky Nagamatsu",
			title: "Cliente Residencial",
			text: "Excelente atención, cumplen con los plazos y costos ofrecidos entregando productos de alta calidad. Inmejorable instalación. Muy recomendable!",
			image: "/images/TREVIÑO.png",
		},
		{
			name: "Paco Ibarra",
			title: "Cliente Residencial",
			text: "Excelente servicio muy profesionales, los equipos quedaron perfectos y funcionan mejor de lo que esperaba recomiendo al cien por ciento esta empresa",
			image: "/images/michael-wilson-Wp7wotWlbBk-unsplash.jpg",
		},
		{
			name: "Javier Gómez",
			title: "Cliente Comercial",
			text: "Empresa muy profesional y recomendable para proyectos de paneles solares en Monterrey, te atienden en sus oficinas los ingenieros para explicarte bien el proyecto y te muestran los paneles solares y inversores en su bodega la cual esta en las mismas instalaciones, ahí mismo tienen ellos también instalado paneles solares por lo que puedes ver el sistema funcionando.",
			image: "/images/casanova.png",
		},
		{
			name: "Luria Zuñiga",
			title: "Cliente Residencial",
			text: "Nos llegó el primer recibo de luz con periodo completo con paneles, y debo confesarle que usamos la luz MUCHO MÁS, de lo que se había calculado. Tuvimos muchas visitas en casa que hicieron que todos los climas de la casa estuvieran prendidos diario, y a pesar que se hizo el cálculo de la cantidad de paneles por un uso muy bajo, nos llegó un recibo súper increíble!!!! Estamos muy satisfechos con el producto que nos ofrecieron!",
			image: "/images/6d658031-bf7e-41a9-82e8-ccd0b5cb5af6.png",
		},
	];

	const clients = [
		"LOGO HEINEKEN.png",
		"LOGO TERNIUM.png",
		"LOGO BUDENHEIM.png",
		"LOGO VITRO.png",
		"LOGO TUPY.png",
		"LOGO GRUAS MONTERREY.png",
	];

	const duplicatedClients = [
		...clients.map((client) => ({ name: client, id: `first-${client}` })),
		...clients.map((client) => ({ name: client, id: `second-${client}` })),
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0); // -1 for left, 1 for right

	const previousTestimonial = () => {
		setDirection(-1);
		setCurrentIndex((prev) =>
			prev === 0 ? testimonials.length - 1 : prev - 1,
		);
	};

	const nextTestimonial = () => {
		setDirection(1);
		setCurrentIndex((prev) =>
			prev === testimonials.length - 1 ? 0 : prev + 1,
		);
	};

	const variants = {
		enter: (dir: number) => ({
			x: dir > 0 ? 100 : -100,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (dir: number) => ({
			x: dir < 0 ? 100 : -100,
			opacity: 0,
		}),
	};

	const activeTestimonial = (testimonials[currentIndex] || testimonials[0]) as {
		name: string;
		title: string;
		text: string;
		image: string;
	};

	return (
		<section className="py-16 bg-[#f8fafc]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative rounded-[32px] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.03)] p-8 md:p-14 flex flex-col items-center">
					{/* Header inside the card */}
					<div className="text-center mb-10 w-full">
						<p className="text-abtec-blue font-semibold uppercase tracking-[0.4em] text-xs md:text-sm mb-3">
							TESTIMONIOS
						</p>
						<h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-abtec-green uppercase">
							RESEÑAS DE CLIENTES
						</h2>
						{/* Header underline divider */}
						<div className="w-16 h-1 bg-[#262660] mx-auto mt-4 rounded-full" />
					</div>

					{/* Navigation Arrow Left */}
					<button
						type="button"
						onClick={previousTestimonial}
						className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-[#262660] hover:bg-[#1a1a44] text-white rounded-full flex items-center justify-center shadow-lg transition-all z-20 cursor-pointer hover:scale-105 active:scale-95"
						aria-label="Testimonio anterior"
					>
						<ChevronLeft size={24} />
					</button>

					{/* Navigation Arrow Right */}
					<button
						type="button"
						onClick={nextTestimonial}
						className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-[#262660] hover:bg-[#1a1a44] text-white rounded-full flex items-center justify-center shadow-lg transition-all z-20 cursor-pointer hover:scale-105 active:scale-95"
						aria-label="Siguiente testimonio"
					>
						<ChevronRight size={24} />
					</button>

					{/* Testimonial Active Slide Content */}
					<div className="w-full max-w-4xl mx-auto overflow-hidden relative min-h-[280px] md:min-h-[220px] flex items-center justify-center px-8 md:px-16">
						<AnimatePresence initial={false} custom={direction} mode="wait">
							<motion.div
								key={currentIndex}
								custom={direction}
								variants={variants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{
									x: { type: "spring", stiffness: 300, damping: 30 },
									opacity: { duration: 0.2 },
								}}
								className="w-full flex flex-col items-center"
							>
								{/* Author Profile Information Group */}
								<div className="flex items-center gap-4 mb-6">
									<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm flex-shrink-0 relative">
										<Image
											src={activeTestimonial.image}
											alt={activeTestimonial.name}
											fill
											className="object-cover"
										/>
									</div>
									<div className="flex flex-col text-left">
										<span className="text-xs md:text-sm uppercase tracking-wider text-[#262660] font-semibold">
											{activeTestimonial.title}
										</span>
										<h3 className="font-heading text-xl md:text-2xl font-bold text-[#262660]">
											{activeTestimonial.name}
										</h3>
									</div>
								</div>

								{/* Divider between author and text */}
								<div className="w-12 h-0.5 bg-[#262660] opacity-40 mb-6" />

								{/* Testimonial text */}
								<p className="text-base md:text-lg text-slate-600 leading-relaxed text-center italic max-w-3xl">
									"{activeTestimonial.text}"
								</p>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Clients Brands Logo Section (Automatic Marquee) */}
				<div className="mt-16 w-full overflow-hidden relative">
					{/* Fade effects on edges */}
					<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
					<div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

					<div className="flex animate-marquee-container">
						<div className="flex gap-8 px-4 py-4 animate-marquee-scroll">
							{duplicatedClients.map((client, index) => (
								<div
									key={client.id}
									className="bg-white rounded-[28px] border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-8 flex items-center justify-center w-64 h-36 flex-shrink-0 hover:scale-105 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(15,23,42,0.06)]"
								>
									<div className="relative w-full h-full">
										<Image
											src={`/images/${client.name}`}
											alt={`Cliente ${index + 1}`}
											fill
											className="object-contain"
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					<style>{`
						@keyframes marquee {
							0% { transform: translateX(0); }
							100% { transform: translateX(-50%); }
						}
						.animate-marquee-container {
							display: flex;
							width: max-content;
						}
						.animate-marquee-scroll {
							display: flex;
							width: max-content;
							animation: marquee 25s linear infinite;
						}
						.animate-marquee-scroll:hover {
							animation-play-state: paused;
						}
					`}</style>
				</div>
			</div>
		</section>
	);
}

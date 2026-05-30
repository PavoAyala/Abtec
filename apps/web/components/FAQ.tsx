"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { useState } from "react";

export default function FAQ(): JSX.Element {
	const faqs = [
		{
			question: "¿Qué es un inversor o un Panel Solar Monterrey?",
			answer:
				"Un panel solar captura la luz del sol y la convierte en energía directa. El inversor es el equipo encargado de transformar esa energía directa en energía alterna, que es la que utilizan los electrodomésticos en tu hogar o negocio.",
		},
		{
			question: "¿Cómo funcionan los Paneles Solares Monterrey?",
			answer:
				"Funcionan capturando los fotones de la luz solar a través de celdas fotovoltaicas, generando una corriente eléctrica que luego es adaptada por el inversor para el uso diario o para inyectarse a la red de CFE.",
		},
		{
			question:
				"¿Qué garantía poseen los equipos y cuánto tiempo de vida tienen?",
			answer:
				"Los paneles solares cuentan con una garantía de generación de hasta 25 años y un tiempo de vida útil que puede superar los 30 años. Los inversores tienen garantías que varían entre 5, 10 o hasta 12 años dependiendo del modelo.",
		},
		{
			question:
				"¿Los Paneles Solares Monterrey soportan condiciones climáticas como granizo, viento ó lluvia?",
			answer:
				"Sí, están diseñados y certificados internacionalmente para soportar condiciones climáticas adversas, incluyendo granizo de tamaño estándar y vientos fuertes, gracias a su cubierta de vidrio templado de alta resistencia.",
		},
		{
			question:
				"¿Los Paneles Solares Monterrey producen energía en la noche o incluso en día nublados?",
			answer:
				"Los sistemas de Paneles Solares Monterrey producen electricidad de acuerdo con la radiación solar que reciben; es decir, en un día nublado el sistema produce una menor cantidad de energía, por lo que en la noche ya que no hay luz solar y el sistema no producirá energía eléctrica hasta el día siguiente. En resumen, producirán la cantidad de energía proporcional a la cantidad de radiación solar que los equipos reciban.",
		},
		{
			question:
				"¿Seguiré pagando recibos de luz a CFE si instalo Paneles Solares Monterrey?",
			answer:
				"Sí, seguirás recibiendo un recibo de CFE, pero el monto será mínimo (el cargo fijo de conexión, aproximadamente $45 a $50 pesos), logrando un ahorro de hasta el 98% en tu consumo de energía.",
		},
		{
			question:
				"¿Se puede ampliar o reducir el sistema de Paneles Solares Monterrey en el futuro?",
			answer:
				"Sí, el sistema es completamente escalable. Puedes iniciar con una cantidad de paneles y posteriormente agregar más si tus necesidades de consumo de energía aumentan.",
		},
		{
			question: "¿Qué sucede si se va la luz?",
			answer:
				"Por medidas de seguridad de CFE, los sistemas interconectados a la red se apagan automáticamente si hay un corte de energía, para evitar inyectar electricidad mientras el personal de CFE realiza reparaciones. Si deseas energía de respaldo, requerirás un sistema con baterías.",
		},
		{
			question:
				"¿Qué pasa con los Paneles Solares Monterrey si cambio de domicilio?",
			answer:
				"Los paneles solares pueden ser desinstalados y reubicados en tu nueva propiedad por un equipo de profesionales, o bien, puedes dejarlos y usar el sistema como un argumento sólido para aumentar el valor de venta (plusvalía) de la casa.",
		},
	];

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="py-16 bg-[#f8fafc]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				{/* Unified premium card container */}
				<div className="bg-white border border-slate-200 rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.06)] overflow-hidden">
					<div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-0 items-stretch">
						{/* Left Side: Tall Image */}
						<div className="relative w-full h-[350px] lg:h-auto lg:min-h-full overflow-hidden group bg-slate-100">
							<Image
								src="/images/solar_panel.png"
								alt="Preguntas frecuentes sobre paneles solares"
								fill
								className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
								quality={100}
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#262660]/20 via-transparent to-transparent pointer-events-none" />
						</div>

						{/* Right Side: Accordion Content */}
						<div className="p-6 sm:p-10 lg:p-12 xl:p-14 bg-white flex flex-col justify-center">
							<div className="text-center mb-10">
								<p className="text-abtec-blue font-semibold uppercase tracking-[0.35em] text-sm mb-3">
									CONOCE MÁS ACERCA DE
								</p>
								<motion.h2
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c]"
								>
									PANELES SOLARES MONTERREY
								</motion.h2>
								<div className="w-16 h-1 bg-[#262660] mx-auto mt-4 mb-6 rounded-full" />
								<p className="text-slate-600 text-sm leading-relaxed mx-auto max-w-xl font-sans">
									Respuestas a las preguntas más frecuentes en Proyectos de
									Paneles Solares Monterrey.
								</p>
							</div>

							<div className="space-y-4">
								{faqs.map((faq, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.08, duration: 0.3 }}
										className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.01)] hover:shadow-[0_10px_20px_rgba(15,23,42,0.03)] hover:border-slate-300/80 transition-all duration-300 overflow-hidden"
									>
										<button
											type="button"
											onClick={() => toggleFAQ(index)}
											className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition duration-300"
										>
											<span className="flex flex-col pr-4">
												<span className="text-[10px] font-bold uppercase tracking-wider text-[#262660]/60 mb-1">
													Click para mayor información
												</span>
												<span className="font-heading text-abtec-green font-semibold text-base sm:text-[17px] leading-snug">
													{faq.question}
												</span>
											</span>
											<Plus
												className={`w-5 h-5 text-[#262660] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}
												strokeWidth={2.5}
											/>
										</button>
										<AnimatePresence>
											{openIndex === index && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.25, ease: "easeInOut" }}
												>
													<div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed font-sans text-sm text-justify border-t border-slate-100 bg-slate-50/20">
														{faq.answer}
													</div>
												</motion.div>
											)}
										</AnimatePresence>
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

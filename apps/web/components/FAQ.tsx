"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
		<section className="py-16 bg-white border-t border-gray-100">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start">
					<div className="rounded-[32px] overflow-hidden">
						<div className="relative h-[520px] bg-slate-100">
							<Image
								src="/images/solar_panel.png"
								alt="Preguntas frecuentes sobre paneles solares"
								fill
								className="object-cover"
								quality={100}
							/>
						</div>
					</div>
					<div>
						<div className="text-center mb-10">
							<p className="text-abtec-blue font-semibold uppercase tracking-[0.35em] text-sm mb-3">
								CONOCE MÁS ACERCA DE
							</p>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] mb-4"
							>
								PANELES SOLARES MONTERREY
							</motion.h2>
							<p className="text-gray-700 text-sm leading-relaxed mx-auto max-w-2xl">
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
									className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden"
								>
									<button
										type="button"
										onClick={() => toggleFAQ(index)}
										className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
									>
										<span className="font-heading text-[#1f2a5c] text-base md:text-lg">
											{faq.question}
										</span>
										<ChevronDown
											className={`w-5 h-5 text-abtec-green transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
										/>
									</button>
									<AnimatePresence>
										{openIndex === index && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												<div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed font-sans text-sm text-justify border-t border-slate-100">
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
		</section>
	);
}

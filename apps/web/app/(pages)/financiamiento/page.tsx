"use client";

import type { JSX } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { 
	Banknote, CreditCard, Landmark, PiggyBank,
	CheckCircle2, ChevronDown, User, Phone, Mail, FileText
} from "lucide-react";

interface FinanceOption {
	tag: string;
	title: string;
	name: string;
	bullets: string[];
	image: string;
}

export default function FinanciamientoPage(): JSX.Element {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		nombre: "",
		telefono: "",
		correo: "",
		servicio: "",
		comentarios: ""
	});

	const options: FinanceOption[] = [
		{
			tag: "PANELES SOLARES MONTERREY",
			title: "PLAZO DESDE 12 HASTA 84 MESES",
			name: "Financiamiento CIBANCO",
			bullets: [
				"Persona Física / Persona Moral.",
				"Opción de abono a cuenta sin penalización.",
				"Incluye seguro del sistema solar ante robo o daños sin costo adicional.",
				"Tasa de interés desde el 15.75% anual."
			],
			image: "/images/PANELES SOLARES-1.png"
		},
		{
			tag: "PANELES SOLARES MONTERREY",
			title: "PLAZO DESDE 3 HASTA 12 MESES",
			name: "Financiamiento con Tarjeta de Crédito",
			bullets: [
				"Visa, MasterCard ó American Express.",
				"Opción de pagos a distancia.",
				"Opción a financiamiento directa a través de su banco (Consultar términos y condiciones).",
				"Opción a pago con tarjeta en una sola exhibición."
			],
			image: "/images/kateryna-hliznitsova-Eyt8PjCWKLw-unsplash.jpg"
		},
		{
			tag: "PANELES SOLARES MONTERREY",
			title: "PLAZO DESDE 3 HASTA 6 MESES",
			name: "Financiamiento Directo",
			bullets: [
				"50% de enganche.",
				"0% de interés.",
				"Pagos con factura fiscal."
			],
			image: "/images/thisisengineering-raeng-q1-zGTPk1Co-unsplash.jpg"
		},
		{
			tag: "GASERA 2-1",
			title: "PLAZO DESDE 12 HASTA 60 MESES",
			name: "Financiamiento RED GIRASOL",
			bullets: [
				"Desde 0% de enganche.",
				"Financiamientos desde $50,000 hasta $10,000,000 de pesos.",
				"Flexibilidad para amortizar durante el plazo o hasta el final.",
				"Disposición en efectivo."
			],
			image: "/images/proyecto residencial.png"
		}
	];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormSubmitted(true);
		setTimeout(() => {
			setFormSubmitted(false);
			setFormData({
				nombre: "",
				telefono: "",
				correo: "",
				servicio: "",
				comentarios: ""
			});
		}, 5000);
	};

	return (
		<>
			<Header />
			<main className="bg-[#f8fafc] font-sans text-gray-800">
				{/* Banner Section */}
				<section className="relative w-full py-24 md:py-32 bg-slate-950 overflow-hidden">
					<div className="absolute inset-0 z-0">
						<Image
							src="/images/markus-spiske-qwRF33UKsVg-unsplash (1)-1.jpg"
							alt="Financiamiento"
							fill
							className="object-cover object-[center_30%] opacity-40"
							priority
							sizes="100vw"
							quality={90}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/80"></div>
					</div>
					<div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 w-fit mb-6 mx-auto">
							<Banknote className="w-4 h-4 animate-pulse text-primary" />
							<span className="text-xs font-bold tracking-widest uppercase text-primary">
								Opciones Flexibles
							</span>
						</div>
						<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 font-display">
							Financiamiento
						</h1>
						<p className="text-white/70 text-lg md:text-xl font-medium tracking-wide">
							Facilitamos tu transición hacia la energía solar
						</p>
					</div>
				</section>

				{/* Options Grid Section (Alternating Design) */}
				<section className="py-24 bg-[#f8fafc]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center max-w-3xl mx-auto mb-20">
							<span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
								Inversión Inteligente
							</span>
							<h2 className="text-secondary text-3xl md:text-5xl font-bold tracking-tight font-display">
								Planes de Financiamiento
							</h2>
						</div>

						<div className="space-y-6 max-w-6xl mx-auto">
							{options.map((option, idx) => {
								const isEven = idx % 2 === 0;
								return (
									<div key={idx} className="w-full">
										{/* Main Alternating Card Container */}
										<div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-[0_15px_50px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 p-6 sm:p-10 lg:p-12">
											<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
												
												{/* Text Details Column */}
												<div className={`lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
													<div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
														<span className="text-[11px] font-bold tracking-[0.25em] text-[#262660]">
															{option.tag}
														</span>
														<span className="text-xs text-gray-400 font-bold">—</span>
													</div>
													
													<p className="text-abtec-green font-bold text-sm tracking-wide mb-1 uppercase">
														{option.title}
													</p>
													
													<h3 className="text-secondary font-bold text-3xl md:text-4xl font-heading mb-4">
														{option.name}
													</h3>
													
													{/* Green Underline Divider */}
													<div className="w-16 h-[2.5px] bg-abtec-green rounded-full my-4 mx-auto lg:mx-0"></div>
													
													<ul className="space-y-3 mt-4 text-sm md:text-base font-sans text-slate-600 text-left w-full">
														{option.bullets.map((bullet, bIdx) => (
															<li key={bIdx} className="flex items-start gap-3">
																<CheckCircle2 className="w-5 h-5 text-abtec-green shrink-0 mt-0.5" />
																<span>{bullet}</span>
															</li>
														))}
													</ul>

													<div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
														<Link href="#contacto" className="bg-[#262660] hover:bg-[#1d1d54] text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
															Obtener un presupuesto
														</Link>
														<Link href="#contacto" className="bg-white border-2 border-[#262660] text-[#262660] hover:bg-slate-50 text-sm font-bold py-3.5 px-6 rounded-xl transition-all text-center">
															Mayor información
														</Link>
													</div>
												</div>

												{/* Image Column */}
												<div className={`lg:col-span-6 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
													<div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-slate-100 shadow-sm group">
														<Image
															src={option.image}
															alt={option.name}
															fill
															className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
															sizes="(max-w-768px) 100vw, 50vw"
															quality={95}
														/>
														<div className="absolute inset-0 bg-[#262660]/5 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
													</div>
												</div>

											</div>
										</div>

										{/* Custom Separator Component between option cards */}
										{idx < options.length - 1 && (
											<div className="my-8 w-full h-8 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center justify-center opacity-60">
												<div className="w-11/12 border-t border-slate-200"></div>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Contact and Corporate Info Section */}
				<section id="contacto" className="py-24 bg-white border-t border-gray-100 relative">
					<div className="max-w-7xl mx-auto px-6 lg:px-10">
						{/* Header containing title and description */}
						<div className="mb-10 max-w-3xl">
							<h2 className="text-abtec-green text-3xl md:text-4xl font-bold font-display">
								¿Deseas cotizar?
							</h2>
							<div className="w-12 h-[3.5px] bg-abtec-blue mt-3 mb-5"></div>
							<p className="text-slate-600 text-sm md:text-base leading-relaxed">
								Déjanos tus datos y pronto nos pondremos en contacto contigo para brindarte la cotización que nos solicitas.
							</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
							
							{/* Left side: Form Card */}
							<div className="lg:col-span-7 bg-[#F5F5FA] rounded-[32px] p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100/50 flex flex-col justify-center">
								{formSubmitted ? (
									<div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl p-8 shadow-sm">
										<CheckCircle2 className="w-16 h-16 text-abtec-green mb-4 animate-bounce" />
										<h4 className="text-abtec-blue font-bold text-xl mb-2">¡Solicitud Recibida!</h4>
										<p className="text-slate-500 text-sm max-w-sm">
											Muchas gracias por contactarnos. Un especialista en financiamiento se comunicará contigo a la brevedad.
										</p>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="flex flex-col gap-6">
										<div className="mb-2 flex items-center gap-3">
											<div className="w-10 h-10 rounded-full bg-abtec-blue/10 flex items-center justify-center">
												<Mail className="w-5 h-5 text-abtec-blue" />
											</div>
											<h3 className="text-xl font-bold text-abtec-blue font-display">Ingresa tus datos</h3>
										</div>
										<div className="space-y-6">
											{/* Inputs row: Nombre and Teléfono side by side */}
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												{/* Input: Nombre */}
												<div className="space-y-2">
													<label className="text-xs font-bold text-abtec-blue-900/80 tracking-wide block">
														Nombre y apellido
													</label>
													<div className="relative">
														<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
															<User className="w-4 h-4 text-slate-400" />
														</div>
														<input 
															type="text" 
															required
															value={formData.nombre}
															onChange={(e) => setFormData({...formData, nombre: e.target.value})}
															className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-abtec-green/50 focus:border-abtec-green transition-all shadow-sm"
														/>
													</div>
												</div>

												{/* Input: Teléfono */}
												<div className="space-y-2">
													<label className="text-xs font-bold text-abtec-blue-900/80 tracking-wide block">
														Número de teléfono
													</label>
													<div className="relative">
														<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
															<Phone className="w-4 h-4 text-slate-400" />
														</div>
														<input 
															type="tel" 
															required
															value={formData.telefono}
															onChange={(e) => setFormData({...formData, telefono: e.target.value})}
															className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-abtec-green/50 focus:border-abtec-green transition-all shadow-sm"
														/>
													</div>
												</div>
											</div>

											{/* Input: Correo */}
											<div className="space-y-2">
												<label className="text-xs font-bold text-abtec-blue-900/80 tracking-wide block">
													Correo electrónico
												</label>
												<div className="relative">
													<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
														<Mail className="w-4 h-4 text-slate-400" />
													</div>
													<input 
														type="email" 
														required
														value={formData.correo}
														onChange={(e) => setFormData({...formData, correo: e.target.value})}
														className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-abtec-green/50 focus:border-abtec-green transition-all shadow-sm"
													/>
												</div>
											</div>

											{/* Dropdown: Servicio */}
											<div className="space-y-2">
												<label className="text-xs font-bold text-abtec-blue-900/80 tracking-wide block">
													Tipo de servicio
												</label>
												<span className="text-xs text-slate-700 font-medium block -mt-1 mb-2">
													¿Qué te gustaría cotizar?
												</span>
												<div className="relative">
													<select
														required
														value={formData.servicio}
														onChange={(e) => setFormData({...formData, servicio: e.target.value})}
														className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-abtec-green/50 focus:border-abtec-green transition-all shadow-sm text-gray-700 appearance-none cursor-pointer"
													>
														<option value="" disabled>Selecciona un plan</option>
														<option value="cibanco">Financiamiento CIBANCO</option>
														<option value="tarjeta">Financiamiento Tarjeta de Crédito</option>
														<option value="directo">Financiamiento Directo</option>
														<option value="redgirasol">Financiamiento RED GIRASOL</option>
														<option value="otro">Otro</option>
													</select>
													<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-slate-500">
														<ChevronDown className="w-4 h-4" />
													</div>
												</div>
											</div>
										</div>

										{/* Submit button */}
										<div className="pt-4">
											<button 
												type="submit"
												className="w-full bg-[#262660] hover:bg-[#1d1d54] text-white font-bold py-4 px-10 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
											>
												Enviar
											</button>
										</div>
									</form>
								)}
							</div>

							{/* Right side: ABTEC info card */}
							<div className="lg:col-span-5 bg-[#E2E2EA] rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-sm border border-slate-200/40">
								<div>
									{/* Card Image */}
									<div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden mb-6 shadow-sm">
										<Image
											src="/images/PANELES SOLARES-1.png"
											alt="ABTEC Financiamiento"
											fill
											className="object-cover"
											sizes="(max-w-768px) 100vw, 30vw"
											quality={95}
										/>
									</div>

									<h3 className="text-abtec-green text-2xl md:text-3xl font-bold font-display mb-4">
										Planes a tu Medida
									</h3>
									
									<p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-sans">
										Recibir una corrida financiera para tu proyecto es fácil y rápido a través de nuestros expertos con más de 15 años de experiencia en el mercado. Compártenos tus datos y encontraremos el esquema que mejor se adapte a ti.
									</p>
								</div>

								<div>
									<p className="text-abtec-blue font-bold italic text-sm md:text-base mb-4 font-sans">
										¿Necesitas contactarnos de inmediato?
									</p>
									
									{/* Button: Contáctanos */}
									<Link 
										href="/#contacto" 
										className="inline-block bg-[#262660] hover:bg-[#1d1d54] text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm text-center"
									>
										Contactar a Ventas
									</Link>
								</div>
							</div>

						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

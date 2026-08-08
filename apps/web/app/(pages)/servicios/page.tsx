"use client";

import type { JSX } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { 
	CheckCircle2, ChevronDown, User, Phone, Mail, FileText, Quote, Star
} from "lucide-react";

interface ServiceOption {
	tag: string;
	title: string;
	description: string;
	image: string;
}

interface Testimonial {
	quote: string;
	tag: string;
	type: string;
	name: string;
}

export default function ServiciosPage(): JSX.Element {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		nombre: "",
		telefono: "",
		correo: "",
		servicio: "",
		comentarios: ""
	});

	const services: ServiceOption[] = [
		{
			tag: "INGENIEROS CON MÁS DE 24 AÑOS DE EXPERIENCIA",
			title: "PANELES SOLARES",
			description: "Venta, Instalación y Mantenimiento de Paneles Solares con precios competitivos directos de fábrica e instaladores con certificación para proyectos residenciales, comerciales e industriales con servicio en todo México.",
			image: "/images/solar_panel.png"
		},
		{
			tag: "DISTRIBUCIÓN DIRECTA DE FÁBRICA",
			title: "ILUMINACIÓN",
			description: "Venta e Instalación de Luminarias de Alta Eficiencia con distribución directa de fábrica de marcas como Philips, Lumiance y Acuity Brand. Profesionales con certificación en integraciones comerciales, industriales y gubernamentales.",
			image: "/images/usg 2.png"
		},
		{
			tag: "EXPERTOS EN SOLUCIONES DE ENERGÍA",
			title: "INGENIERÍA",
			description: "Estudios especializados de soluciones de ingeniería en producción de energías alternativas con diseños adaptados a las necesidades del cliente, considerando beneficios a corto plazo con resultados duraderos.",
			image: "/images/kateryna-hliznitsova-Eyt8PjCWKLw-unsplash.jpg"
		}
	];

	const testimonials: Testimonial[] = [
		{
			quote: "Muy contento con el servicio y los resultados que he tenido con mi sistema solar que me instalo ABTEC. De un recibo en promedio de $8,000 al mes me llega ahora de $90 pesos, cumplen lo que prometen y atienden mis solicitudes puntualmente, los recomiendo ampliamente",
			tag: "PANELES SOLARES MONTERREY",
			type: "Cliente Comercial",
			name: "Gastos Empresariales"
		},
		{
			quote: "Empresa muy profesional y recomendable para proyectos de paneles solares en Monterrey, te atienden en sus oficinas los ingenieros para explicarte bien el proyecto y te muestran los paneles solares y inversores en su bodega la cual esta en las mismas instalaciones, ahí mismo tienen ellos también instalado paneles solares por lo que puedes ver el sistema funcionando.",
			tag: "PANELES SOLARES MONTERREY",
			type: "Cliente Comercial",
			name: "Javier Gómez"
		},
		{
			quote: "Súper rápidos y la mejor cotización, busque con diferentes proveedores y fue la mejor opción. Además no todos proporcionan monitoreo WI-FI para hacer bien cuentas y estar atento al cobro de CFE.",
			tag: "PANELES SOLARES MONTERREY",
			type: "Cliente Residencial",
			name: "Ana Maria López"
		},
		{
			quote: "La instalación fue muy rápida, se hicieron cargo de todos los trámites y mis paneles comenzaron a funcionar antes de lo que pensábamos. El personal muy profesional y explicando cada duda de manera muy entendible.",
			tag: "PANELES SOLARES MONTERREY",
			type: "Cliente Residencial",
			name: "Marcela Duque"
		}
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
							src="/images/markus-spiske-_LHodAyB_RE-unsplash.jpg"
							alt="Servicios"
							fill
							className="object-cover object-center opacity-40"
							priority
							sizes="100vw"
							quality={90}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/80"></div>
					</div>
					<div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 w-fit mb-6 mx-auto">
							<CheckCircle2 className="w-4 h-4 text-primary" />
							<span className="text-xs font-bold tracking-widest uppercase text-primary">
								Soluciones Integrales
							</span>
						</div>
						<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 font-display">
							Servicios
						</h1>
						<p className="text-white/70 text-lg md:text-xl font-medium tracking-wide">
							Experiencia, calidad y eficiencia energética a tu alcance
						</p>
					</div>
				</section>

				{/* Services Grid Section (Alternating Design) */}
				<section className="py-24 bg-[#f8fafc]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center max-w-3xl mx-auto mb-20">
							<span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
								Nuestros Servicios
							</span>
							<h2 className="text-secondary text-3xl md:text-5xl font-bold tracking-tight font-display">
								¿Qué ofrecemos?
							</h2>
						</div>

						<div className="space-y-6 max-w-6xl mx-auto">
							{services.map((service, idx) => {
								const isEven = idx % 2 === 0;
								return (
									<div key={idx} className="w-full">
										{/* Main Alternating Card Container */}
										<div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-[0_15px_50px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 p-6 sm:p-10 lg:p-12">
											<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
												
												{/* Text Details Column */}
												<div className={`lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
													
													<p className="text-abtec-green font-bold text-[11px] tracking-[0.15em] mb-3 uppercase">
														{service.tag}
													</p>
													
													<h3 className="text-secondary font-bold text-3xl md:text-4xl font-heading mb-4">
														{service.title}
													</h3>
													
													{/* Green Underline Divider */}
													<div className="w-16 h-[2.5px] bg-abtec-green rounded-full my-4 mx-auto lg:mx-0"></div>
													
													<p className="text-slate-600 text-sm md:text-base leading-relaxed mt-4 font-sans">
														{service.description}
													</p>

													<div className="flex mt-8 w-full sm:w-auto">
														<Link href="#contacto" className="w-full bg-[#262660] hover:bg-[#1d1d54] text-white text-sm font-bold py-3.5 px-10 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
															Cotizar
														</Link>
													</div>
												</div>

												{/* Image Column */}
												<div className={`lg:col-span-6 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
													<div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-slate-100 shadow-sm group">
														<Image
															src={service.image}
															alt={service.title}
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

										{/* Custom Separator Component */}
										{idx < services.length - 1 && (
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

				{/* Testimonials Section */}
				<section className="py-24 bg-white border-t border-gray-100 relative">
					<div className="max-w-7xl mx-auto px-6 lg:px-10">
						
						{/* Header containing title and description */}
						<div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
							<div className="max-w-2xl">
								<span className="text-abtec-green font-bold text-[11px] tracking-[0.25em] mb-3 block uppercase">
									NUESTROS CLIENTES • TESTIMONIOS
								</span>
								<h2 className="text-secondary text-3xl md:text-4xl font-bold font-display mb-6">
									Reseñas de Clientes
								</h2>
								<div className="w-16 h-[3.5px] bg-abtec-blue mb-6"></div>
								<p className="text-slate-600 text-sm md:text-base leading-relaxed">
									Con más de 24 años de experiencia en el mercado fotovoltaico nuestros clientes continuan confiando en nosotros. Al ofrecerles el servicio de calidad que nos caracteriza, nos recomiendan y continuan confiando en nosotros para la elaboración de nuevos proyectos.
								</p>
							</div>
							<div className="shrink-0 w-full lg:w-auto">
								<Link href="#contacto" className="w-full lg:w-auto bg-[#262660] hover:bg-[#1d1d54] text-white font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-sm block text-center">
									¡Contáctanos!
								</Link>
							</div>
						</div>

						{/* Testimonials Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
							{testimonials.map((testi, i) => (
								<div key={i} className="bg-[#f8fafc] border border-slate-200/60 p-8 md:p-10 rounded-[32px] hover:shadow-md transition-shadow relative">
									<Quote className="absolute top-8 right-8 w-12 h-12 text-abtec-blue/5" />
									<div className="flex text-[#FFB800] mb-6">
										{[...Array(5)].map((_, idx) => (
											<Star key={idx} className="w-4 h-4 fill-current" />
										))}
									</div>
									<p className="text-slate-700 italic text-sm md:text-base leading-relaxed mb-8 relative z-10 font-medium">
										"{testi.quote}"
									</p>
									<div className="border-t border-slate-200/80 pt-6 mt-auto">
										<span className="text-xs font-bold tracking-[0.1em] text-abtec-green uppercase mb-1 block">
											{testi.tag}
										</span>
										<h4 className="text-[#262660] font-bold text-lg font-heading">
											{testi.name}
										</h4>
										<span className="text-sm text-slate-500 mt-1 block">
											{testi.type}
										</span>
									</div>
								</div>
							))}
						</div>

						{/* Clients Brands Logo Section (Automatic Marquee) */}
						<div className="mt-24 w-full overflow-hidden relative">
							{/* Fade effects on edges */}
							<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
							<div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

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

				{/* Contact Section */}
				<section id="contacto" className="py-24 bg-[#f8fafc] border-t border-gray-100 relative">
					<div className="max-w-7xl mx-auto px-6 lg:px-10">
						{/* Header containing title and description */}
						<div className="mb-10 max-w-3xl">
							<h2 className="text-abtec-green text-3xl md:text-4xl font-bold font-display">
								¿Dudas? Comunícate con expertos
							</h2>
							<div className="w-12 h-[3.5px] bg-abtec-blue mt-3 mb-5"></div>
							<p className="text-slate-600 text-sm md:text-base leading-relaxed">
								Cotiza tu proyecto en tan sólo unos sencillos pasos. Déjanos tus datos y un asesor se comunicará contigo para platicar acerca de tus necesidades y presupuesto. Logrando así, otorgarte una cotización que más se adapte a ti.
							</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
							
							{/* Left side: Form Card */}
							<div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-8 md:p-10 shadow-sm border border-slate-200/60 flex flex-col justify-center">
								{formSubmitted ? (
									<div className="flex flex-col items-center justify-center py-16 text-center bg-[#f8fafc] rounded-2xl p-8 shadow-sm">
										<CheckCircle2 className="w-16 h-16 text-abtec-green mb-4 animate-bounce" />
										<h4 className="text-abtec-blue font-bold text-xl mb-2">¡Solicitud Recibida!</h4>
										<p className="text-slate-500 text-sm max-w-sm">
											Muchas gracias por contactarnos. Un especialista se comunicará contigo a la brevedad.
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
															className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-abtec-green/50 focus:border-abtec-green transition-all shadow-sm"
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
															className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-abtec-green/50 focus:border-abtec-green transition-all shadow-sm"
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
														className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-abtec-green/50 focus:border-abtec-green transition-all shadow-sm"
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
														className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-abtec-green/50 focus:border-abtec-green transition-all shadow-sm text-gray-700 appearance-none cursor-pointer"
													>
														<option value="" disabled>Selecciona un servicio o producto</option>
														<option value="paneles">Paneles Solares</option>
														<option value="iluminacion">Iluminación</option>
														<option value="ingenieria">Ingeniería</option>
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
												Obtén una cotización
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
											src="/images/proy residencial.png"
											alt="ABTEC Asesores"
											fill
											className="object-cover"
											sizes="(max-w-768px) 100vw, 30vw"
											quality={95}
										/>
									</div>

									<h3 className="text-abtec-green text-2xl md:text-3xl font-bold font-display mb-4 leading-tight">
										Obtén un presupuesto <br/>¡Sin costo!
									</h3>
									
									<p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-sans">
										Recibe un estudio-cotización a través del apoyo de nuestros expertos en soluciones de energía con más de 24 años de experiencia en el mercado.
									</p>
								</div>

								<div>
									<p className="text-abtec-blue font-bold italic text-sm md:text-base mb-4 font-sans">
										¿Necesitas contactarnos de inmediato?
									</p>
									
									<a 
										href="tel:8132476565" 
										className="inline-block bg-[#262660] hover:bg-[#1d1d54] text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm text-center w-full"
									>
										Llamar ahora
									</a>
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

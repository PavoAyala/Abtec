"use client";

import type { JSX } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import { 
	Sun, Zap, MapPin, Hammer, ShoppingBag, Wrench, 
	Send, FileText, ChevronRight, User, Phone, Mail, CheckCircle2, ChevronDown 
} from "lucide-react";

interface ProjectItem {
	type: "PROYECTO COMERCIAL" | "PROYECTO SOCIAL" | "PROYECTO INDUSTRIAL";
	title: string;
	location: string;
	panels: string;
	power: string;
	image: string;
}

export default function NosotrosPanelesSolares(): JSX.Element {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		nombre: "",
		telefono: "",
		correo: "",
		servicio: "",
		comentarios: ""
	});

	const projects: ProjectItem[] = [
		{
			type: "PROYECTO COMERCIAL",
			title: "COMERCIAL TREVIÑO",
			location: "Reynosa, Tamaulipas.",
			panels: "803 módulos.",
			power: "315.4 kW.",
			image: "/images/TREVIÑO.png"
		},
		{
			type: "PROYECTO COMERCIAL",
			title: "GASOLINERA",
			location: "Silao, Guanajuato.",
			panels: "360 módulos.",
			power: "136.5 kW.",
			image: "/images/casanova.png"
		},
		{
			type: "PROYECTO COMERCIAL",
			title: "GASERAS",
			location: "Nuevo León, Coahuila y Tamaulipas.",
			panels: "337 módulos.",
			power: "135 kW.",
			image: "/images/markus-spiske-qwRF33UKsVg-unsplash (1)-1.jpg"
		},
		{
			type: "PROYECTO COMERCIAL",
			title: "REFACCIONARIA",
			location: "San Nicolás de los Garza, Nuevo León.",
			panels: "80 módulos.",
			power: "29.6 kW.",
			image: "/images/solar_panel.png"
		},
		{
			type: "PROYECTO SOCIAL",
			title: "CONVENTO",
			location: "Nuevo Laredo, Tamaulipas.",
			panels: "97 módulos.",
			power: "39.28 kW.",
			image: "/images/convento.png"
		},
		{
			type: "PROYECTO INDUSTRIAL",
			title: "BUDENHEIM SA DE CV",
			location: "Santa Catarina, Nuevo León.",
			panels: "54 módulos.",
			power: "13.77 kW.",
			image: "/images/abtec1.jpeg"
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
							src="/images/solar_panel.png"
							alt="Proyectos de Paneles Solares"
							fill
							className="object-cover object-[center_30%] opacity-50"
							priority
							sizes="100vw"
							quality={90}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/80"></div>
					</div>
					<div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 w-fit mb-6 mx-auto">
							<Sun className="w-4 h-4 animate-spin-slow text-primary" />
							<span className="text-xs font-bold tracking-widest uppercase text-primary">
								Paneles Solares Monterrey
							</span>
						</div>
						<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 font-display">
							Proyectos de Paneles Solares
						</h1>
						<p className="text-white/70 text-lg md:text-xl font-medium tracking-wide">
							ABTEC • Soluciones de Energía Limpia
						</p>
					</div>
				</section>

				{/* Services Section */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-6 lg:px-10">
						<div className="text-center max-w-3xl mx-auto mb-16">
							<span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">
								Paneles Solares Monterrey
							</span>
							<h2 className="text-secondary text-3xl md:text-4xl font-bold tracking-tight font-display">
								Nuestros Servicios Principales
							</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{/* Service: Ventas */}
							<div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
								<div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<ShoppingBag className="w-6 h-6" />
								</div>
								<span className="text-primary/75 text-xs font-bold uppercase tracking-widest block mb-2">
									SERVICIO
								</span>
								<h3 className="text-secondary text-2xl font-bold mb-4 font-display">
									VENTAS
								</h3>
								<p className="text-gray-650 text-sm leading-relaxed">
									Suministro directo de paneles solares fotovoltaicos de última generación (Tier 1), inversores y microinversores eficientes y estructuras de montaje de alta resistencia.
								</p>
							</div>

							{/* Service: Instalación */}
							<div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
								<div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Hammer className="w-6 h-6" />
								</div>
								<span className="text-primary/75 text-xs font-bold uppercase tracking-widest block mb-2">
									SERVICIO
								</span>
								<h3 className="text-secondary text-2xl font-bold mb-4 font-display">
									INSTALACIÓN
								</h3>
								<p className="text-gray-650 text-sm leading-relaxed">
									Mano de obra certificada e ingeniería experta para montajes estructurales duraderos y sistemas de conexión interconectados a CFE, garantizando seguridad eléctrica total.
								</p>
							</div>

							{/* Service: Mantenimiento */}
							<div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
								<div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Wrench className="w-6 h-6" />
								</div>
								<span className="text-primary/75 text-xs font-bold uppercase tracking-widest block mb-2">
									SERVICIO
								</span>
								<h3 className="text-secondary text-2xl font-bold mb-4 font-display">
									MANTENIMIENTO
								</h3>
								<p className="text-gray-650 text-sm leading-relaxed">
									Pólizas de limpieza de módulos fotovoltaicos, reapriete de terminales eléctricas, diagnóstico con termografía y monitoreo en línea para asegurar el rendimiento del 100%.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Projects Grid Section (Based on Screenshot Design) */}
				<section className="py-24 bg-[#f8fafc]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center max-w-3xl mx-auto mb-20">
							<span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
								Paneles Solares Monterrey
							</span>
							<h2 className="text-secondary text-3xl md:text-5xl font-bold tracking-tight font-display">
								Portafolio de Proyectos
							</h2>
						</div>

						<div className="space-y-6 max-w-6xl mx-auto">
							{projects.map((project, idx) => {
								const isEven = idx % 2 === 0;
								return (
									<div key={idx} className="w-full">
										{/* Main Alternating Card Container */}
										<div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-[0_15px_50px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 p-6 sm:p-10 lg:p-12">
											<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
												
												{/* Text Details Column */}
												<div className={`lg:col-span-6 flex flex-col items-center justify-center text-center ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
													<div className="flex items-center gap-2 mb-2 justify-center">
														<span className="text-[11px] font-bold tracking-[0.25em] text-[#262660]">
															{project.type}
														</span>
														<span className="text-xs text-gray-400 font-bold">—</span>
													</div>
													
													<h3 className="text-abtec-green font-bold text-3xl font-heading tracking-wide uppercase">
														{project.title}
													</h3>
													
													{/* Green Underline Divider */}
													<div className="w-16 h-[2.5px] bg-abtec-green rounded-full my-4"></div>
													
													<div className="space-y-3 mt-2 text-sm md:text-base font-sans">
														<p className="leading-relaxed">
															<span className="font-bold text-[#262660]">Ubicación de proyecto:</span>{" "}
															<span className="text-abtec-green font-semibold">{project.location}</span>
														</p>
														<p className="leading-relaxed">
															<span className="font-bold text-[#262660]">Nº de paneles solares instalados:</span>{" "}
															<span className="text-abtec-green font-semibold">{project.panels}</span>
														</p>
														<p className="leading-relaxed">
															<span className="font-bold text-[#262660]">Potencia del proyecto:</span>{" "}
															<span className="text-abtec-green font-semibold">{project.power}</span>
														</p>
													</div>
												</div>

												{/* Image Column */}
												<div className={`lg:col-span-6 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
													<div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-slate-100 shadow-sm group">
														<Image
															src={project.image}
															alt={project.title}
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

										{/* Custom Separator Component between project cards */}
										{idx < projects.length - 1 && (
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
				<section className="py-24 bg-white border-t border-gray-100 relative">
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
											Muchas gracias por contactarnos. Un especialista en proyectos fotovoltaicos se comunicará contigo a la brevedad.
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
														<option value="" disabled>Selecciona un servicio o producto</option>
														<option value="venta">Venta de Paneles Solares</option>
														<option value="instalacion">Instalación de Paneles Solares</option>
														<option value="mantenimiento">Mantenimiento de Paneles Solares</option>
														<option value="comercial">Proyecto Comercial Fotovoltaico</option>
														<option value="industrial">Proyecto Industrial Fotovoltaico</option>
														<option value="social">Proyecto Social / Convento / A.C.</option>
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
											src="/images/getty-images-k7hOrbveDEI-unsplash-1.jpg"
											alt="ABTEC Paneles Solares"
											fill
											className="object-cover"
											sizes="(max-w-768px) 100vw, 30vw"
											quality={95}
										/>
									</div>

									<h3 className="text-abtec-green text-2xl md:text-3xl font-bold font-display mb-4">
										ABTEC Paneles Solares
									</h3>
									
									<p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-sans">
										Recibir un presupuesto para tu proyecto es fácil y rápido a través de nuestros expertos con más de 24 años de experiencia en el mercado. Compártenos tus datos y pronto nos comunicaremos contigo para brindarte el estudio-cotización de paneles solares que más se adapte a tus necesidades.
									</p>
								</div>

								<div>
									<p className="text-abtec-blue font-bold italic text-sm md:text-base mb-4 font-sans">
										¿Deseas recibir nuestro CV Empresarial?
									</p>
									
									{/* Button: Contáctanos */}
									<Link 
										href="/#contacto" 
										className="inline-block bg-[#262660] hover:bg-[#1d1d54] text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm text-center"
									>
										Contáctanos
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

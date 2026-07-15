"use client";

import type { JSX } from "react";

import Image from "next/image";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { 
	Phone, Mail, MapPin, Map,
	Facebook, Instagram, Linkedin, Twitter, MessageCircle
} from "lucide-react";

export default function ContactoPage(): JSX.Element {


	return (
		<>
			<Header />
			<main className="bg-[#f8fafc] font-sans text-gray-800">
				
				{/* Banner Section */}
				<section className="relative w-full py-20 md:py-28 bg-[#1f2a5c] overflow-hidden">
					<div className="absolute inset-0 z-0">
						<Image
							src="/images/proy residencial.png"
							alt="Contacto ABTEC"
							fill
							className="object-cover object-center opacity-30"
							priority
							sizes="100vw"
							quality={90}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-[#1f2a5c]/80 via-[#1f2a5c]/60 to-[#1f2a5c]/90"></div>
					</div>
					<div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-abtec-green/20 border border-abtec-green/30 w-fit mb-6 mx-auto">
							<MessageCircle className="w-4 h-4 text-abtec-green" />
							<span className="text-xs font-bold tracking-widest uppercase text-abtec-green">
								Atención Personalizada
							</span>
						</div>
						<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 font-display">
							Contáctanos
						</h1>
						<p className="text-white/70 text-lg md:text-xl font-medium tracking-wide">
							Estamos listos para ayudarte con tu próximo proyecto de energía
						</p>
					</div>
				</section>

				{/* Main Contact Section */}
				<section className="py-16 md:py-24 bg-[#f8fafc] relative z-20 -mt-8">
					<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
							
							{/* Left Side: Direct WhatsApp Contact */}
							<div className="lg:col-span-7 flex flex-col gap-8">
								<div className="bg-white rounded-[32px] p-8 sm:p-10 md:p-12 shadow-[0_15px_50px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col items-center text-center">
									<div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
										<MessageCircle className="w-10 h-10 text-[#25D366] animate-bounce" />
									</div>
									
									<h2 className="text-[#262660] text-2xl sm:text-3xl font-bold font-heading uppercase mb-4">
										Contacto Directo vía <span className="text-[#25D366]">WhatsApp</span>
									</h2>
									
									<p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mb-8">
										Para brindarte una atención rápida y personalizada, hemos simplificado nuestro proceso de contacto. Haz clic abajo para iniciar una conversación directa en WhatsApp con uno de nuestros asesores técnicos certificados y resolver todas tus dudas sobre paneles solares.
									</p>

									<a 
										href="https://api.whatsapp.com/send/?phone=528131292192&text=%C2%A1Hola%21%20%F0%9F%99%8B%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8F%20Quisiera%20obtener%20una%20cotizaci%C3%B3n%20para%20un%20proyecto%20de%20energ%C3%ADa%20solar%20con%20ABTEC." 
										target="_blank" 
										rel="noopener noreferrer" 
										className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-10 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm sm:text-base uppercase tracking-wider cursor-pointer w-full max-w-sm"
									>
										<MessageCircle className="w-5 h-5 fill-current" />
										<span>Enviar Mensaje</span>
									</a>

									<div className="flex items-center gap-2 mt-6 text-xs text-slate-400">
										<span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping"></span>
										<span>Asesores disponibles en línea</span>
									</div>
								</div>

								{/* Social Media Section */}
								<div className="bg-[#262660] rounded-[32px] p-8 flex flex-col sm:flex-row items-center justify-between shadow-[0_15px_50px_rgba(15,23,42,0.06)] overflow-hidden relative">
									<div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
									<div className="relative z-10 mb-4 sm:mb-0 text-center sm:text-left">
										<h4 className="text-white text-xl font-bold font-heading uppercase tracking-widest">
											¡Síguenos!
										</h4>
										<p className="text-white/60 text-sm mt-1">
											Conecta con nosotros en nuestras redes sociales
										</p>
									</div>
									<div className="flex gap-4 relative z-10">
										<a href="https://www.facebook.com/abtecmx/?ref=page_internal" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-abtec-green hover:scale-110 transition-all duration-300">
											<Facebook className="w-5 h-5 fill-current" />
										</a>
										<a href="https://www.instagram.com/abtecmx/?hl=es-la" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-abtec-green hover:scale-110 transition-all duration-300">
											<Instagram className="w-5 h-5" />
										</a>
										<a href="https://api.whatsapp.com/send/?phone=528131292192&text=%C2%A1Hola%21%20%F0%9F%99%8B%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8F%20%0AQuisiera%20obtener%20una%20cotizaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-abtec-green hover:scale-110 transition-all duration-300">
											<MessageCircle className="w-5 h-5 fill-current" />
										</a>
										<a href="https://mx.linkedin.com/company/abtec-soluciones-en-energ%C3%ADa" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-abtec-green hover:scale-110 transition-all duration-300">
											<Linkedin className="w-5 h-5 fill-current" />
										</a>
									</div>
								</div>
							</div>

							{/* Right Side: Contact Info & Map */}
							<div className="lg:col-span-5 flex flex-col gap-8">
								{/* Contact Details Card */}
								<div className="bg-[#E2E2EA] rounded-[32px] p-8 md:p-10 shadow-[0_15px_50px_rgba(15,23,42,0.04)] border border-slate-200/40 relative overflow-hidden">
									
									<h3 className="text-[#262660] text-2xl md:text-3xl font-bold font-display mb-3">
										Habla con un asesor
									</h3>
									<p className="text-slate-700 text-sm font-bold mb-2">
										¿Necesitas ayuda con tu proyecto?
									</p>
									<p className="text-slate-600 text-sm leading-relaxed mb-8">
										Nuestros especialistas atenderán tu solicitud lo más pronto posible. Déjanos tus datos y descripción de tu proyecto y te haremos llegar un estudio-propuesta que más se adapte a tus necesidades.
									</p>

									<div className="space-y-6">
										<div className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
												<Phone className="w-5 h-5 text-abtec-green" />
											</div>
											<div>
												<p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">Teléfono</p>
												<a href="tel:8196881365" className="text-[#262660] font-bold text-lg hover:text-abtec-green transition-colors">
													(81) 9688 1365
												</a>
											</div>
										</div>

										<div className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
												<Mail className="w-5 h-5 text-abtec-green" />
											</div>
											<div>
												<p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">Correo electrónico</p>
												<a href="mailto:ventas@abtec.mx" className="text-[#262660] font-bold text-lg hover:text-abtec-green transition-colors">
													ventas@abtec.mx
												</a>
											</div>
										</div>

										<div className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
												<MessageCircle className="w-5 h-5 text-abtec-green" />
											</div>
											<div>
												<p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">WhatsApp</p>
												<a 
													href="https://api.whatsapp.com/send/?phone=528131292192&text=%C2%A1Hola%21%20%F0%9F%99%8B%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8F%20%0AQuisiera%20obtener%20una%20cotizaci%C3%B3n" 
													target="_blank" 
													rel="noopener noreferrer" 
													className="text-[#262660] font-bold text-lg hover:text-abtec-green transition-colors"
												>
													(81) 3129 2192
												</a>
											</div>
										</div>

										<div className="w-full h-px bg-slate-300 my-6"></div>

										<div className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 mt-1">
												<MapPin className="w-5 h-5 text-[#262660]" />
											</div>
											<div>
												<p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">Suc. Monterrey</p>
												<p className="text-slate-700 text-sm leading-relaxed">
													Rafael Platón Sánchez 1015 NTE.<br/>
													Colonia Centro, Monterrey.<br/>
													C.P. 64000. N.L.
												</p>
											</div>
										</div>


									</div>
								</div>

								{/* Google Maps Toggle Section */}
								<div className="bg-white rounded-[32px] p-4 sm:p-6 shadow-[0_15px_50px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col gap-4">
									
									<div className="flex items-center gap-2 px-2">
										<Map className="w-5 h-5 text-abtec-blue" />
										<h4 className="text-[#262660] font-bold font-heading">Nuestra Ubicación</h4>
									</div>

									{/* Iframe container */}
									<div className="w-full rounded-[20px] overflow-hidden bg-slate-100 aspect-video relative border border-slate-200">
										<iframe 
											src="https://maps.google.com/maps?q=ABTEC%20Paneles%20Solares%20Monterrey&t=&z=16&ie=UTF8&iwloc=&output=embed" 
											width="100%" 
											height="100%" 
											style={{ border: 0 }} 
											allowFullScreen={false} 
											loading="lazy" 
											referrerPolicy="no-referrer-when-downgrade"
											className="absolute inset-0"
											title="Mapa Sucursal Monterrey - ABTEC Paneles Solares"
										></iframe>
									</div>
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

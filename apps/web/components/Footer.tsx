"use client";

import { Mail, MapPin, Phone, Search, Facebook, Instagram, MessageCircle, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";

export default function Footer(): JSX.Element {
	const currentYear = new Date().getFullYear();

	const menuLinks = [
		{ name: "Paneles Solares Monterrey", href: "/" },
		{ name: "Acerca de Nosotros", href: "/nosotros/paneles-solares" },
		{ name: "Servicios", href: "#servicios" },
		{ name: "Equipos", href: "#equipos" },
		{ name: "Financiamiento", href: "/financiamiento" },
		{ name: "Blog", href: "/blog" },
		{ name: "Contacto", href: "/contacto" },
	];

	const articles = [
		{ name: "Paneles Solares Monterrey", href: "/nosotros/paneles-solares" },
		{ name: "Proyectos de Iluminación", href: "/nosotros/iluminacion" },
		{ name: "Calentadores Solares", href: "/nosotros/calentadores-solares" },
		{ name: "Boiler Solar", href: "/nosotros/boiler-solar" },
	];

	const blogLinks = [
		"¿Qué son los paneles solares Monterrey? ¿Cómo funcionan?",
		"Caracteristicas de los paneles solares Monterrey",
		"Limpieza y mantenimiento de los paneles solares Monterrey",
		"Problemas comunes al instalar paneles solares Monterrey",
		"Beneficios de instalar paneles solares Monterrey",
	];

	return (
		<footer className="bg-white text-[#1c1d29] pt-20 pb-8 border-t-[8px] border-abtec-green relative overflow-hidden">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					{/* Brand & Contact */}
					<div className="flex flex-col gap-6">
						<Link href="/" className="flex items-center gap-3 mb-2">
							<div className="bg-white p-2 rounded border border-gray-100">
								<Image
									src="/images/logotipoABTEC_horizontal.png"
									alt="ABTEC Logo"
									width={120}
									height={40}
									className="object-contain"
								/>
							</div>
						</Link>

						<div className="flex flex-col gap-4 mt-4 font-sans text-sm">
							<div className="flex items-center gap-3 text-gray-700 hover:text-abtec-blue transition-colors">
								<Phone className="text-abtec-green" size={18} />
								<span>(81) 3247 6565</span>
							</div>
							<div className="flex items-center gap-3 text-gray-700 hover:text-abtec-blue transition-colors">
								<Mail className="text-abtec-green" size={18} />
								<span>ventas@abtec.mx</span>
							</div>
							<div className="flex items-center gap-3 text-gray-700 hover:text-abtec-blue transition-colors">
								<MapPin className="text-abtec-green" size={18} />
								<span>Monterrey, N.L.</span>
							</div>
						</div>

						<div className="mt-4">
							<h3 className="text-lg font-heading font-bold mb-4 text-[#1c1d29] uppercase">
								Buscador
							</h3>
							<form className="relative" onSubmit={(e) => e.preventDefault()}>
								<input
									type="text"
									placeholder="Buscar..."
									className="w-full bg-gray-50 border border-gray-200 rounded py-2 pl-4 pr-10 text-[#1c1d29] placeholder:text-gray-400 focus:outline-none focus:border-abtec-green focus:bg-white transition-all font-sans text-sm"
								/>
								<button
									type="submit"
									className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-abtec-green transition-colors"
								>
									<Search size={18} />
								</button>
							</form>
						</div>

						<div className="mt-8">
							<h3 className="text-lg font-heading font-bold mb-4 text-[#1c1d29] uppercase">
								Síguenos
							</h3>
							<div className="flex gap-4">
								<a href="https://www.facebook.com/abtecmx/?ref=page_internal" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all duration-300">
									<Facebook size={18} fill="currentColor" />
								</a>
								<a href="https://www.instagram.com/abtecmx/?hl=es-la" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#E4405F] hover:text-white transition-all duration-300">
									<Instagram size={18} />
								</a>
								<a href="https://api.whatsapp.com/send/?phone=528132476565&text=%C2%A1Hola%21%20%F0%9F%99%8B%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8F%20%0AQuisiera%20obtener%20una%20cotizaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#25D366] hover:text-white transition-all duration-300">
									<MessageCircle size={18} fill="currentColor" />
								</a>
								<a href="https://mx.linkedin.com/company/abtec-soluciones-en-energ%C3%ADa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0A66C2] hover:text-white transition-all duration-300">
									<Linkedin size={18} fill="currentColor" />
								</a>
							</div>
						</div>
					</div>

					{/* Navigation Links */}
					<div>
						<h3 className="text-lg font-heading font-bold mb-6 text-[#1c1d29] uppercase tracking-wider">
							Navegación
						</h3>
						<ul className="flex flex-col gap-3">
							{menuLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="text-gray-700 hover:text-abtec-green transition-colors font-sans text-sm flex items-center gap-2 group"
									>
										<span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-abtec-green transition-colors" />
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Articles */}
					<div>
						<h3 className="text-lg font-heading font-bold mb-6 text-[#1c1d29] uppercase tracking-wider">
							Proyectos
						</h3>
						<ul className="flex flex-col gap-3">
							{articles.map((article, index) => (
								<li key={index}>
									<Link
										href={article.href}
										className="text-gray-700 hover:text-abtec-green transition-colors font-sans text-sm flex items-start gap-2 group"
									>
										<span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-abtec-green transition-colors mt-1.5 flex-shrink-0" />
										<span className="leading-tight">{article.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Blog */}
					<div>
						<h3 className="text-lg font-heading font-bold mb-6 text-[#1c1d29] uppercase tracking-wider">
							Blog
						</h3>
						<ul className="flex flex-col gap-4">
							{blogLinks.map((blog, index) => (
								<li key={index}>
									<Link
										href="/blog"
										className="text-gray-700 hover:text-abtec-green transition-colors font-sans text-sm leading-tight block"
									>
										{blog}
									</Link>
								</li>
							))}
						</ul>
						<Link
							href="/contacto"
							className="inline-block mt-8 bg-abtec-blue text-white font-bold px-6 py-3 rounded hover:bg-opacity-90 transition-colors uppercase text-sm"
						>
							¡Contáctanos!
						</Link>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex gap-6 text-sm text-gray-500 font-sans">
						<Link href="#" className="hover:text-abtec-green transition-colors">
							Términos y Condiciones
						</Link>
						<Link href="/politicas-de-privacidad" className="hover:text-abtec-green transition-colors">
							Política de Privacidad
						</Link>
					</div>
					<p className="text-sm text-gray-500 text-center md:text-right font-sans">
						Derechos reservados ABTEC Soluciones de Energía® {currentYear}
					</p>
				</div>
			</div>
		</footer>
	);
}

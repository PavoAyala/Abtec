"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Search } from "lucide-react";
import type { JSX } from "react";

export default function Footer(): JSX.Element {
	const currentYear = new Date().getFullYear();

	const menuLinks = [
		{ name: "Paneles Solares Monterrey", href: "/" },
		{ name: "Acerca de Nosotros", href: "#nosotros" },
		{ name: "Servicios", href: "#servicios" },
		{ name: "Equipos", href: "#equipos" },
		{ name: "Financiamiento", href: "#financiamiento" },
		{ name: "Blog", href: "#blog" },
		{ name: "Contacto", href: "#contacto" },
	];

	const articles = [
		"Paneles Solares Saltillo",
		"Paneles Solares Monterrey",
		"Alumbrado Público",
		"Proyecto de Paneles Solares Monterrey",
		"Proyecto de Paneles Solares Saltillo",
		"Panel Solar Saltillo",
		"Panel Solar Monterrey",
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
							<h3 className="text-lg font-heading font-bold mb-4 text-[#1c1d29] uppercase">Buscador</h3>
							<form className="relative" onSubmit={(e) => e.preventDefault()}>
								<input
									type="text"
									placeholder="Buscar..."
									className="w-full bg-gray-50 border border-gray-200 rounded py-2 pl-4 pr-10 text-[#1c1d29] placeholder:text-gray-400 focus:outline-none focus:border-abtec-green focus:bg-white transition-all font-sans text-sm"
								/>
								<button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-abtec-green transition-colors">
									<Search size={18} />
								</button>
							</form>
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
							Artículos
						</h3>
						<ul className="flex flex-col gap-3">
							{articles.map((article, index) => (
								<li key={index}>
									<a
										href="#"
										className="text-gray-700 hover:text-abtec-green transition-colors font-sans text-sm flex items-start gap-2 group"
									>
										<span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-abtec-green transition-colors mt-1.5 flex-shrink-0" />
										<span className="leading-tight">{article}</span>
									</a>
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
									<a
										href="#"
										className="text-gray-700 hover:text-abtec-green transition-colors font-sans text-sm leading-tight block"
									>
										{blog}
									</a>
								</li>
							))}
						</ul>
						<a
							href="#contacto"
							className="inline-block mt-8 bg-abtec-green text-white font-bold px-6 py-3 rounded hover:bg-opacity-90 transition-colors uppercase text-sm"
						>
							¡Contáctanos!
						</a>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex gap-6 text-sm text-gray-500 font-sans">
						<a href="#" className="hover:text-abtec-green transition-colors">
							Términos y Condiciones
						</a>
						<a href="#" className="hover:text-abtec-green transition-colors">
							Política de Privacidad
						</a>
					</div>
					<p className="text-sm text-gray-500 text-center md:text-right font-sans">
						Derechos reservados ABTEC Soluciones de Energía® {currentYear}
					</p>
				</div>
			</div>
		</footer>
	);
}

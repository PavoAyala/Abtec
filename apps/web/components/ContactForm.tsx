"use client";

import Image from "next/image";
import type { JSX } from "react";

export default function ContactForm(): JSX.Element {
	return (
		<section id="contacto" className="w-full bg-[#f8fafc] overflow-hidden">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
				{/* Left Card: Comunícate con expertos */}
				<div className="bg-[#1c1d29] p-8 md:p-12 lg:py-16 xl:py-20 text-white flex flex-col justify-between w-full">
					<div className="w-full max-w-[650px] lg:ml-auto lg:pr-8 flex flex-col justify-between h-full">
						<div>
							<p className="text-abtec-green font-semibold uppercase tracking-[0.35em] mb-4 text-sm">
								¿DUDAS?
							</p>
							<h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
								Comunícate con expertos
							</h2>
							<p className="text-white/80 text-sm leading-relaxed mb-8">
								Cotiza Paneles Solares Monterrey en tan sólo unos sencillos pasos.
								Déjanos tus datos y un asesor se comunicará contigo para platicar
								acerca de tus necesidades, presupuesto y consumo eléctrico actual.
							</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-3 mt-4">
							<div className="bg-white/10 rounded-3xl p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-2">
									Teléfono
								</p>
								<p className="text-lg font-bold">(81) 3247 6565</p>
							</div>
							<div className="bg-white/10 rounded-3xl p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-2">
									Correo
								</p>
								<p className="text-lg font-bold">ventas@abtec.mx</p>
							</div>
							<div className="bg-white/10 rounded-3xl p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-2">
									Ubicación
								</p>
								<p className="text-lg font-bold">Monterrey, N.L.</p>
							</div>
						</div>
					</div>
				</div>

				{/* Right Card: Image and WA button */}
				<div className="relative min-h-[450px] lg:min-h-full w-full overflow-hidden group">
					<Image
						src="/images/proyecto residencial.png"
						alt="Paneles solares Monterrey"
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
						quality={100}
						priority
					/>
					<div className="absolute inset-0 bg-black/25 pointer-events-none" />
					<div className="absolute inset-0 flex items-center justify-center p-6">
						<div className="bg-white/95 backdrop-blur-md rounded-[28px] p-8 text-center shadow-2xl max-w-sm w-full">
							<h3 className="text-[#262660] font-bold text-xl mb-2">
								Obtén un presupuesto
							</h3>
							<p className="text-slate-600 text-sm leading-relaxed mb-6">
								Recibe un estudio-cotización de Paneles Solares Monterrey a
								través de expertos del área fotovoltaica.
							</p>
							<a
								href="https://wa.link/rwcs6i"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center w-full bg-[#262660] hover:bg-[#1f2a5c] text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-[0.12em] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
							>
								Obtener una cotización
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

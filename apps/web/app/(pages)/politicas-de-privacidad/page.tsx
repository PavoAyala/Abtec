import type { JSX } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function PrivacyPolicyPage(): JSX.Element {
	return (
		<>
			<Header />
			<main className="bg-[#f8fafc] font-sans text-gray-800 min-h-screen">
				{/* Banner Section */}
				<section className="relative w-full py-20 md:py-28 bg-[#1f2a5c] overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-b from-[#1f2a5c]/80 via-[#1f2a5c]/60 to-[#1f2a5c]/90"></div>
					<div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
						<h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-4 font-display">
							Aviso de Privacidad
						</h1>
					</div>
				</section>

				{/* Content Section */}
				<section className="py-16 md:py-24 bg-[#f8fafc] relative z-20 -mt-8">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_15px_50px_rgba(15,23,42,0.04)] border border-slate-200/60">
							<div className="space-y-6 text-slate-700 leading-relaxed">
								<p>
									Con fundamento en los artículos 15 y 16 de la Ley Federal de Protección de Datos Personales en Posesión de Particulares hacemos de su conocimiento que <strong>ABTEC</strong>, con domicilio en Rafael Platón Sanchez Norte 1015. Colonia Centro. CP. 64000. Monterrey, N.L. es responsable de recabar sus datos personales, del uso que se le dé a los mismos y de su protección.
								</p>
								<p>
									Su información personal será utilizada para las siguientes finalidades: proveer los servicios y productos que ha solicitado; notificarle sobre nuevos servicios o productos que tengan relación con los ya contratados o adquiridos; comunicarle sobre cambios en los mismos; elaborar estudios y programas que son necesarios para determinar hábitos de consumo; realizar evaluaciones periódicas de nuestros productos y servicios a efecto de mejorar la calidad de los mismos; evaluar la calidad del servicio que brindamos, y en general, para dar cumplimiento a las obligaciones que hemos contraído con usted.
								</p>
								<p>
									Para las finalidades antes mencionadas, requerimos obtener los siguientes datos personales:
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>Nombre completo.</li>
									<li>Teléfono fijo y/o celular.</li>
									<li>Correo electrónico.</li>
									<li>Dirección.</li>
								</ul>
								<p>
									Es importante informarle que usted tiene derecho al Acceso, Rectificación y Cancelación de sus datos personales, a Oponerse al tratamiento de los mismos o a revocar el consentimiento que para dicho fin nos haya otorgado.
								</p>
								<p>
									Para ello, es necesario que envíe la solicitud en los términos que marca la Ley en su Art. 29 a nuestro Departamento de Protección de Datos Personales vía correo electrónico a <a href="mailto:ventas@abtec.mx" className="text-abtec-blue font-semibold hover:text-abtec-green transition-colors">ventas@abtec.mx</a>, el cual solicitamos confirme vía telefónica para garantizar su correcta recepción.
								</p>
								<p>
									En caso de que no desee de recibir mensajes promocionales de nuestra parte, puede enviarnos su solicitud por medio de la dirección electrónica: <a href="mailto:ventas@abtec.mx" className="text-abtec-blue font-semibold hover:text-abtec-green transition-colors">ventas@abtec.mx</a>
								</p>
								<div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
									<p className="text-sm font-semibold text-slate-800">
										<span className="text-abtec-green uppercase tracking-wider mr-2">Importante:</span> 
										Cualquier modificación a este aviso de privacidad podrá consultarlo en <a href="https://www.abtec.com.mx" className="text-abtec-blue hover:text-abtec-green transition-colors">www.abtec.com.mx</a>
									</p>
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

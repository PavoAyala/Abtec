"use client";

import type { JSX } from "react";
import { useEffect } from "react";

export default function PrivacyModal({
	isOpen,
	onClose,
}: Readonly<{ isOpen: boolean; onClose: () => void }>): JSX.Element | null {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<dialog
			className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6 bg-transparent border-none w-full h-full max-w-none max-h-none"
			open={isOpen}
			aria-modal="true"
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-secondary/80 backdrop-blur-sm transition-opacity"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal Content */}
			<div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
				{/* Header */}
				<div className="p-6 md:p-8 flex items-center justify-between border-b border-secondary/5 bg-background-light">
					<div>
						<h2 className="text-2xl md:text-3xl font-bold text-secondary tracking-tight">
							Aviso de Privacidad
						</h2>
						<div className="h-1 w-12 bg-primary rounded-full mt-2"></div>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Cerrar"
						className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary/40 hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm border border-secondary/10"
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>

				{/* Body */}
				<div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
					<div className="text-secondary/80 space-y-8 leading-relaxed text-base md:text-lg">
						<p>
							Con fundamento en los artículos 15 y 16 de la Ley Federal de
							Protección de Datos Personales en Posesión de Particulares hacemos
							de su conocimiento que{" "}
							<span className="font-bold text-secondary">ABTEC</span>, con
							domicilio en Rafael Platón Sanchez Norte 1015. Colonia Centro. CP.
							64000. Monterrey, N.L. es responsable de recabar sus datos
							personales, del uso que se le dé a los mismos y de su protección.
						</p>

						<p>
							Su información personal será utilizada para las siguientes
							finalidades: proveer los servicios y productos que ha solicitado;
							notificarle sobre nuevos servicios o productos que tengan relación
							con los ya contratados o adquiridos; comunicarle sobre cambios en
							los mismos; elaborar estudios y programas que son necesarios para
							determinar hábitos de consumo; realizar evaluaciones periódicas de
							nuestros productos y servicios a efecto de mejorar la calidad de
							los mismos; evaluar la calidad del servicio que brindamos, y en
							general, para dar cumplimiento a las obligaciones que hemos
							contraído con usted.
						</p>

						<div className="bg-background-light p-6 md:p-8 rounded-2xl border border-secondary/5">
							<h3 className="text-secondary text-sm font-bold uppercase tracking-wider mb-4">
								Datos personales requeridos:
							</h3>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<li className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
									<span>Nombre completo</span>
								</li>
								<li className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
									<span>Teléfono fijo y/o celular</span>
								</li>
								<li className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
									<span>Correo electrónico</span>
								</li>
								<li className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
									<span>Dirección</span>
								</li>
							</ul>
						</div>

						<p>
							Es importante informarle que usted tiene derecho al{" "}
							<span className="font-bold text-secondary border-b-2 border-primary/30">
								Acceso, Rectificación y Cancelación
							</span>{" "}
							de sus datos personales, a Oponerse al tratamiento de los mismos o
							a revocar el consentimiento que para dicho fin nos haya otorgado.
						</p>

						<p>
							Para ello, es necesario que envíe la solicitud en los términos que
							marca la Ley en su Art. 29 a nuestro Departamento de Protección de
							Datos Personales vía correo electrónico a{" "}
							<a
								href="mailto:ventas@abtec.mx"
								className="font-bold text-primary hover:underline"
							>
								ventas@abtec.mx
							</a>
							, el cual solicitamos confirme vía telefónica para garantizar su
							correcta recepción.
						</p>

						<p>
							En caso de que no desee de recibir mensajes promocionales de
							nuestra parte, puede enviarnos su solicitud por medio de la
							dirección electrónica:{" "}
							<a
								href="mailto:ventas@abtec.mx"
								className="font-bold text-primary hover:underline"
							>
								ventas@abtec.mx
							</a>
						</p>

						<div className="pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<p className="text-sm">
								<span className="font-bold">Importante:</span> Cualquier
								modificación a este aviso de privacidad podrá consultarlo en{" "}
								<a
									href="https://www.abtec.mx"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline font-medium"
								>
									www.abtec.mx
								</a>
							</p>
							<p className="text-xs font-medium text-secondary/30 uppercase tracking-widest">
								Última actualización: Feb 2025
							</p>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="p-6 border-t border-secondary/5 bg-background-light flex justify-end">
					<button
						type="button"
						onClick={onClose}
						className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
					>
						Entendido
					</button>
				</div>
			</div>
		</dialog>
	);
}

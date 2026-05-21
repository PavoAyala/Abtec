"use client";

import { motion } from "framer-motion";
import type { ChangeEvent, FormEvent, JSX } from "react";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

interface FormData {
	name: string;
	email: string;
	phone: string;
	message: string;
}

export default function ContactForm(): JSX.Element {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent): Promise<void> => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const { getClientDb } = await import("../lib/firebase");
			const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
			const db = getClientDb();

			await addDoc(collection(db, "quotes"), {
				...formData,
				serviceType: "Cotización Web",
				createdAt: serverTimestamp(),
				status: "new",
			});

			setSubmitStatus("success");
			setFormData({ name: "", email: "", phone: "", message: "" });
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="contacto" className="py-16 bg-[#f8fafc] overflow-hidden">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-12">
					<div className="bg-[#1c1d29] rounded-[32px] p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
						<p className="text-abtec-green font-semibold uppercase tracking-[0.35em] mb-4 text-sm">
							¿DUDAS?
						</p>
						<h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
							Comunícate con expertos
						</h2>
						<p className="text-white/80 text-sm leading-relaxed mb-8">
							Cotiza Paneles Solares Monterrey en tan sólo unos sencillos pasos. Déjanos tus datos y un asesor se comunicará contigo para platicar acerca de tus necesidades, presupuesto y consumo eléctrico actual.
						</p>
						<div className="grid gap-4 sm:grid-cols-3">
							<div className="bg-white/10 rounded-3xl p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-2">Teléfono</p>
								<p className="text-lg font-bold">(81) 3247 6565</p>
							</div>
							<div className="bg-white/10 rounded-3xl p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-2">Correo</p>
								<p className="text-lg font-bold">ventas@abtec.mx</p>
							</div>
							<div className="bg-white/10 rounded-3xl p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-2">Ubicación</p>
								<p className="text-lg font-bold">Monterrey, N.L.</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
						<div className="relative h-full min-h-[340px]">
							<Image
								src="/images/proyecto residencial.png"
								alt="Paneles solares Monterrey"
								fill
								className="object-cover"
								quality={100}
							/>
							<div className="absolute inset-0 bg-black/20" />
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="bg-white/95 rounded-[28px] p-8 text-center shadow-2xl max-w-sm">
									<h3 className="text-abtec-green font-bold text-xl mb-2">Obtén un presupuesto</h3>
									<p className="text-slate-900 text-sm leading-relaxed mb-6">Recibe un estudio-cotización de Paneles Solares Monterrey a través de expertos del área fotovoltaica.</p>
									<a
										href="https://wa.link/rwcs6i"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center bg-abtec-blue text-white rounded-full px-6 py-3 font-semibold uppercase text-sm tracking-[0.15em] hover:bg-[#14154e] transition-colors"
									>
										Obtener una cotización
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid lg:grid-cols-2 gap-10">
					<div className="bg-white rounded-[32px] p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] border border-slate-200">
						<h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1f2a5c] mb-6">¿Listo para cotizar?</h2>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div className="flex flex-col gap-2">
									<label htmlFor="name" className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700">Nombre Completo</label>
									<input
										name="name"
										id="name"
										value={formData.name}
										onChange={handleInputChange}
										className="bg-slate-50 border border-slate-200 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-abtec-green focus:border-transparent text-slate-900 text-sm"
										placeholder="Ingresa tu nombre"
										type="text"
										required
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="email" className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700">Correo Electrónico</label>
									<input
										name="email"
										id="email"
										value={formData.email}
										onChange={handleInputChange}
										className="bg-slate-50 border border-slate-200 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-abtec-green focus:border-transparent text-slate-900 text-sm"
										placeholder="correo@ejemplo.com"
										type="email"
										required
									/>
								</div>
							</div>
							<div className="grid gap-6 md:grid-cols-2">
								<div className="flex flex-col gap-2">
									<label htmlFor="phone" className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700">Teléfono</label>
									<input
										name="phone"
										id="phone"
										value={formData.phone}
										onChange={handleInputChange}
										className="bg-slate-50 border border-slate-200 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-abtec-green focus:border-transparent text-slate-900 text-sm"
										placeholder="81 0000 0000"
										type="tel"
										required
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="message" className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700">Mensaje</label>
									<textarea
										name="message"
										id="message"
										value={formData.message}
										onChange={handleInputChange}
										className="min-h-[160px] bg-slate-50 border border-slate-200 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-abtec-green focus:border-transparent text-slate-900 text-sm"
										placeholder="Platícanos sobre tu consumo actual..."
										rows={4}
									></textarea>
								</div>
							</div>
							<button
								type="submit"
								className="w-full bg-abtec-blue text-white font-bold py-4 rounded-full uppercase tracking-[0.15em] hover:bg-[#14154e] transition-colors"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Enviando..." : "Enviar solicitud"}
							</button>
							{submitStatus === "success" && (
								<p className="text-abtec-green text-center font-bold text-sm">
									¡Mensaje enviado con éxito! Un asesor se contactará pronto.
								</p>
							)}
							{submitStatus === "error" && (
								<p className="text-red-500 text-center font-bold text-sm">
									Error al enviar el mensaje. Por favor, inténtalo de nuevo.
								</p>
							)}
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

"use client";
import type { JSX } from "react";

interface PaymentMethod {
	icon: string;
	title: string;
	description: string;
}

const paymentMethods: PaymentMethod[] = [
	{
		icon: "account_balance_wallet",
		title: "Contado",
		description:
			"Pago directo del proyecto completo con las mejores condiciones.",
	},
	{
		icon: "eco",
		title: "Ecovale",
		description:
			"Programa de financiamiento ecológico para proyectos sustentables.",
	},
	{
		icon: "home",
		title: "Subcuenta Infonavit",
		description: "Paga tu proyecto con el saldo de tu subcuenta de vivienda.",
	},
	{
		icon: "account_balance",
		title: "Financiamiento CIBANCO",
		description: "Financiamiento accesible a través de CIBANCO.",
	},
	{
		icon: "credit_card",
		title: "Tarjetas a Meses",
		description: "Pagos con tarjetas de débito y crédito a meses.",
	},
	{
		icon: "real_estate_agent",
		title: "Arrendamiento BX+",
		description: "Esquema de arrendamiento financiero flexible.",
	},
];

const candidateRequirements = [
	"No haber utilizado el crédito INFONAVIT antes",
	"Predial pagado de la casa a nombre del derechohabiente, cónyuge o padres",
	"Que se esté cotizando actualmente en el INFONAVIT",
	"Que se tenga al menos 116 puntos",
	"Que se tenga un AFORE seleccionado",
	"Que el RFC coincida entre el AFORE e INFONAVIT",
];

const infonavitBenefits = [
	{
		icon: "money_off",
		text: "No es un crédito, es el 5% de tu salario retenido durante años.",
	},
	{
		icon: "group",
		text: "Puedes usar ya sea tu cuenta, la de tu pareja o la de tus padres.",
	},
	{
		icon: "description",
		text: "AbTec se encarga de la documentación y trámites.",
	},
];

export default function Financing(): JSX.Element {
	return (
		<>
			{/* Hero Banner */}
			<section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/85 py-24 md:py-32">
				<div className="absolute inset-0 opacity-5">
					<div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
					<div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-white blur-3xl" />
				</div>
				<div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
					<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
						<span className="material-symbols-outlined text-primary text-xl">
							payments
						</span>
						<span className="text-white/80 text-sm font-semibold uppercase tracking-wider">
							Financiamiento
						</span>
					</div>
					<h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-6">
						Opciones de <span className="text-primary">Financiamiento</span>
					</h1>
					<p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
						Facilitamos la inversión en tu proyecto de energía solar con
						múltiples modalidades de pago adaptadas a tus necesidades.
					</p>
				</div>
			</section>

			{/* Payment Methods Grid */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-10">
					<div className="text-center mb-16">
						<h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
							Formas de Pago
						</h2>
						<h3 className="text-secondary text-3xl md:text-4xl font-bold tracking-tight">
							Modalidades de Pago
						</h3>
						<p className="text-secondary/60 mt-4 max-w-xl mx-auto">
							Manejamos varias modalidades de pago para que puedas invertir en
							energía solar de la manera que más te convenga.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{paymentMethods.map((method) => (
							<div
								key={method.title}
								className="group p-8 rounded-2xl bg-background-light border border-secondary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
							>
								<div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
									<span className="material-symbols-outlined text-primary group-hover:text-white text-3xl transition-colors duration-300">
										{method.icon}
									</span>
								</div>
								<h4 className="text-secondary text-xl font-bold mb-2">
									{method.title}
								</h4>
								<p className="text-secondary/60 text-sm leading-relaxed">
									{method.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Infonavit Section */}
			<section className="py-20 bg-background-light">
				<div className="max-w-7xl mx-auto px-6 lg:px-10">
					<div className="text-center mb-16">
						<h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
							Paneles Solares Infonavit
						</h2>
						<h3 className="text-secondary text-3xl md:text-4xl font-bold tracking-tight">
							Paga Tu Proyecto con tu Subcuenta de Infonavit
						</h3>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						{/* Benefits Column */}
						<div>
							<div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-8">
								<span className="material-symbols-outlined text-primary">
									verified
								</span>
								<span className="text-primary font-semibold text-sm">
									Beneficios
								</span>
							</div>
							<div className="space-y-6">
								{infonavitBenefits.map((benefit) => (
									<div
										key={benefit.icon}
										className="flex items-start gap-4 group"
									>
										<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
											<span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors duration-300">
												{benefit.icon}
											</span>
										</div>
										<p className="text-secondary/80 text-lg leading-relaxed pt-2">
											{benefit.text}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Requirements Column */}
						<div className="bg-white rounded-2xl p-8 border border-secondary/10 shadow-lg shadow-secondary/5">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
									<span className="material-symbols-outlined text-white text-xl">
										checklist
									</span>
								</div>
								<h4 className="text-secondary text-xl font-bold">
									¿Cómo saber si soy candidato?
								</h4>
							</div>
							<ul className="space-y-4">
								{candidateRequirements.map((req) => (
									<li key={req} className="flex items-start gap-3">
										<span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">
											check_circle
										</span>
										<span className="text-secondary/70 leading-relaxed">
											{req}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Contact CTA */}
			<section
				id="contacto"
				className="relative overflow-hidden py-20 bg-secondary"
			>
				<div className="absolute inset-0 opacity-5">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-3xl" />
				</div>
				<div className="relative max-w-7xl mx-auto px-6 lg:px-10">
					<div className="max-w-3xl mx-auto text-center">
						<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
							<span className="material-symbols-outlined text-primary text-xl">
								support_agent
							</span>
							<span className="text-white/80 text-sm font-semibold uppercase tracking-wider">
								Nuestros Expertos
							</span>
						</div>
						<h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6">
							¡Te ayudamos con tu proyecto!
						</h3>
						<p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
							Si tienes alguna duda acerca de las formas de pago o
							financiamiento no dudes en contactarte con nosotros, resolveremos
							todas tus dudas.
						</p>
						<a
							href="/#contacto"
							className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
						>
							<span className="material-symbols-outlined">mail</span>
							Contáctanos
						</a>
					</div>
				</div>
			</section>
		</>
	);
}

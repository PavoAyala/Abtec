"use client";
import Link from "next/link";
import type { JSX } from "react";

interface Product {
	icon: string;
	title: string;
	description: string;
	size: "large" | "medium" | "small";
	gridArea: string;
}

const products: Product[] = [
	{
		icon: "solar_power",
		title: "Paneles Solares",
		description:
			"Somos distribuidores y representantes autorizados de las marcas más importantes de equipo solar, como paneles solares, celdas solares, inversores. Nuestros equipos son de las marcas más reconocidas a nivel mundial autorizados por el FIRCO y FIDE.",
		size: "large",
		gridArea: "panels",
	},
	{
		icon: "lightbulb",
		title: "Iluminación de Alta Eficiencia",
		description:
			"Distribuidores autorizados de luminarias, lámparas y focos LED, Inducción Magnética, Fluorescente, Aditivos Metálicos Cerámicos y Super Sodio, para alumbrado público, industria y residencial.",
		size: "medium",
		gridArea: "lighting",
	},
	{
		icon: "wb_twilight",
		title: "Alumbrado Público Solar",
		description:
			"Distribuidores autorizados de alumbrado público y exteriores solar LED y de Inducción Magnética, autorizados por el FIRCO y FIDE.",
		size: "medium",
		gridArea: "street",
	},
	{
		icon: "water_pump",
		title: "Bombas de Agua Solar",
		description:
			"Distribuidores autorizados de equipo de bombeo solar por medio de paneles solares, autorizados por el FIRCO y FIDE.",
		size: "small",
		gridArea: "pumps",
	},
	{
		icon: "water_heater",
		title: "Calentadores de Agua Solares",
		description:
			"Distribuidores autorizados de calentadores de agua solares de las marcas más importantes, autorizados por el FIRCO y FIDE.",
		size: "small",
		gridArea: "heaters",
	},
	{
		icon: "ac_unit",
		title: "Enfriamiento y Congeladores",
		description:
			"Distribuidores autorizados de equipo de enfriamiento, cuartos fríos, congeladores y equipos de aire acondicionado de alta eficiencia para la industria y residencial.",
		size: "medium",
		gridArea: "cooling",
	},
	{
		icon: "precision_manufacturing",
		title: "Motores",
		description:
			"Distribuidores autorizados de motores eléctricos de alta eficiencia para la industria, autorizados por el FIRCO y FIDE.",
		size: "medium",
		gridArea: "motors",
	},
	{
		icon: "wind_power",
		title: "Generadores Eólicos",
		description:
			"Distribuidores autorizados de equipo para producir energía por medio de generadores eólicos.",
		size: "small",
		gridArea: "wind",
	},
	{
		icon: "water",
		title: "Plantas Tratadoras",
		description:
			"Distribuidores autorizados de equipo para plantas recicladoras y tratadoras de agua.",
		size: "small",
		gridArea: "water",
	},
];

function ProductCard({ product }: { product: Product }): JSX.Element {
	const isLarge = product.size === "large";
	const isMedium = product.size === "medium";

	return (
		<div
			className={`group relative overflow-hidden rounded-2xl border border-secondary/10 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1 ${
				isLarge
					? "bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80 p-10 md:p-12"
					: isMedium
						? "bg-white p-8"
						: "bg-background-light p-6"
			}`}
			style={{ gridArea: product.gridArea }}
		>
			{/* Decorative gradient orb */}
			<div
				className={`absolute rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-40 ${
					isLarge
						? "-top-20 -right-20 w-60 h-60 bg-primary/30"
						: "-top-10 -right-10 w-40 h-40 bg-primary/10 group-hover:bg-primary/20"
				}`}
			/>

			{/* Content */}
			<div className="relative z-10 flex flex-col h-full">
				{/* Icon */}
				<div
					className={`flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
						isLarge
							? "w-16 h-16 bg-primary text-white mb-8"
							: isMedium
								? "w-14 h-14 bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white"
								: "w-12 h-12 bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white"
					}`}
				>
					<span
						className={`material-symbols-outlined ${isLarge ? "text-3xl" : isMedium ? "text-2xl" : "text-xl"}`}
					>
						{product.icon}
					</span>
				</div>

				{/* Title */}
				<h3
					className={`font-bold tracking-tight mb-3 ${
						isLarge
							? "text-white text-3xl md:text-4xl"
							: isMedium
								? "text-secondary text-xl"
								: "text-secondary text-lg"
					}`}
				>
					{product.title}
				</h3>

				{/* Description */}
				<p
					className={`leading-relaxed flex-1 ${
						isLarge
							? "text-white/80 text-base md:text-lg max-w-md"
							: isMedium
								? "text-secondary/60 text-sm"
								: "text-secondary/55 text-xs"
					}`}
				>
					{product.description}
				</p>

				{/* Badge */}
				{isLarge && (
					<div className="mt-8 flex items-center gap-2">
						<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-wider uppercase border border-primary/30">
							<span className="material-symbols-outlined text-sm">
								verified
							</span>
							FIRCO & FIDE
						</span>
						<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold tracking-wider uppercase border border-white/20">
							<span className="material-symbols-outlined text-sm">star</span>
							Producto Estrella
						</span>
					</div>
				)}

				{/* Hover arrow */}
				<Link
					href="/#contacto"
					className={`mt-4 inline-flex items-center gap-1 font-semibold text-sm transition-all duration-300 translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
						isLarge ? "text-primary" : "text-primary"
					}`}
				>
					<span>Cotizar</span>
					<span className="material-symbols-outlined text-lg">
						arrow_forward
					</span>
				</Link>
			</div>

			{/* Bottom gradient line on hover */}
			<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
		</div>
	);
}

export default function Products(): JSX.Element {
	return (
		<>
			{/* Section Header */}
			<section className="pt-24 pb-12 bg-white scroll-mt-20">
				<div className="max-w-7xl mx-auto px-6 lg:px-10">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
						<div className="max-w-2xl">
							<h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
								Nuestros Productos
							</h2>
							<h3 className="text-secondary text-4xl md:text-5xl font-bold tracking-tight">
								Suministro e Instalación
							</h3>
						</div>
						<p className="text-secondary/60 text-lg max-w-sm">
							Distribuidores y representantes autorizados de las marcas más
							importantes, autorizados por el FIRCO y FIDE.
						</p>
					</div>
				</div>
			</section>

			{/* Bento Grid */}
			<section className="pb-20 bg-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-10">
					{/* Desktop Bento Grid */}
					<div
						className="hidden lg:grid gap-5"
						style={{
							gridTemplateColumns: "repeat(3, 1fr)",
							gridTemplateRows: "auto auto auto",
							gridTemplateAreas: `
                                "panels panels lighting"
                                "panels panels street"
                                "pumps heaters cooling"
                                "motors wind water"
                            `,
						}}
					>
						{products.map((product) => (
							<ProductCard key={product.title} product={product} />
						))}
					</div>

					{/* Tablet Grid */}
					<div
						className="hidden md:grid lg:hidden gap-5"
						style={{
							gridTemplateColumns: "repeat(2, 1fr)",
							gridTemplateAreas: `
                                "panels panels"
                                "lighting street"
                                "pumps heaters"
                                "cooling motors"
                                "wind water"
                            `,
						}}
					>
						{products.map((product) => (
							<ProductCard key={product.title} product={product} />
						))}
					</div>

					{/* Mobile Stack */}
					<div className="grid md:hidden gap-4">
						{products.map((product) => (
							<div key={product.title} style={{ gridArea: "auto" }}>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/90">
				<div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
					<div>
						<h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
							¿Necesitas una cotización?
						</h3>
						<p className="text-white/70 text-lg">
							Contáctanos y recibe una propuesta personalizada para tu proyecto.
						</p>
					</div>
					<Link
						href="/#contacto"
						className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/30 flex items-center gap-2 whitespace-nowrap"
					>
						Solicitar Cotización
						<span className="material-symbols-outlined">trending_flat</span>
					</Link>
				</div>
			</section>
		</>
	);
}

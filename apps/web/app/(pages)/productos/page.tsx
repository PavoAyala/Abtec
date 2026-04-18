import type { JSX } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Products from "../../../components/Products";

export const metadata = {
	title: "Productos | ABTEC",
	description:
		"Suministro e instalación de paneles solares, iluminación LED, alumbrado público solar, bombas solares, calentadores, enfriamiento, motores, generadores eólicos y plantas tratadoras.",
};

export default function ProductosPage(): JSX.Element {
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header />
			<main className="flex-1">
				<Products />
			</main>
			<Footer />
		</div>
	);
}

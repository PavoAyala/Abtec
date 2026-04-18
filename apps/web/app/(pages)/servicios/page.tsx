import type { JSX } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Services from "../../../components/Services";

export const metadata = {
	title: "Servicios | ABTEC",
	description:
		"Servicios integrales en energía solar y eólica, iluminación de alta eficiencia, ingeniería y construcción, y control ambiental.",
};

export default function ServiciosPage(): JSX.Element {
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header />
			<main className="flex-1">
				<Services />
			</main>
			<Footer />
		</div>
	);
}

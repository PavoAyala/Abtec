import type { JSX } from "react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";

export default function Home(): JSX.Element {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<Services />
				<ContactForm />
			</main>
			<Footer />
		</>
	);
}

import type { JSX } from "react";
import About from "../components/About";
import Benefits from "../components/Benefits";
import BlogPreview from "../components/BlogPreview";
import Brands from "../components/Brands";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";
import Financing from "../components/Financing";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import Products from "../components/Products";
import Savings from "../components/Savings";
import Services from "../components/Services";
import TestimonialsClients from "../components/TestimonialsClients";

export default function Home(): JSX.Element {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<About />
				<Benefits />
				<Services />
				<TestimonialsClients />
				<Products />
				<Brands />
				<Pricing />
				<Financing />
				<Savings />
				<ContactForm />
				<FAQ />
				<BlogPreview />
			</main>
			<Footer />
		</>
	);
}

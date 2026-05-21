import type { JSX } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Benefits from "../components/Benefits";
import Services from "../components/Services";
import TestimonialsClients from "../components/TestimonialsClients";
import Products from "../components/Products";
import Brands from "../components/Brands";
import Pricing from "../components/Pricing";
import Financing from "../components/Financing";
import Savings from "../components/Savings";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";
import BlogPreview from "../components/BlogPreview";
import Footer from "../components/Footer";

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

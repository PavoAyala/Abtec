import type { JSX } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home(): JSX.Element {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <ContactSection />
      <Footer />
    </main>
  );
}

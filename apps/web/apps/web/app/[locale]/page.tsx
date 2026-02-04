import type { JSX } from 'react';
import { setRequestLocale } from 'next-intl/server';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

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

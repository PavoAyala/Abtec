import type { JSX } from 'react';
import Header from '../../../components/Header';
import Financing from '../../../components/Financing';
import Footer from '../../../components/Footer';

export const metadata = {
    title: 'Financiamiento | ABTEC',
    description:
        'Conoce nuestras modalidades de pago: contado, Ecovale, subcuenta Infonavit, financiamiento CIBANCO, tarjetas a meses y arrendamiento BX+.',
};

export default function FinanciamientoPage(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <Financing />
            </main>
            <Footer />
        </div>
    );
}

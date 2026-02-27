'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';

export default function ClientAccess(): JSX.Element {
    const { user, loading, error, signIn, signOut, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await signIn(email, password);
        } catch {
            // Error is handled in useAuth hook
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-abtec-green-600" />
            </div>
        );
    }

    if (isAuthenticated && user) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-abtec-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-10 h-10 text-abtec-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-abtec-navy-900">
                                Bienvenido, {user.email}
                            </h1>
                            <p className="text-abtec-navy-600 mt-2">
                                Has iniciado sesión en tu portal de cliente.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <h3 className="font-semibold text-abtec-navy-900 mb-2">
                                    Estado del Sistema
                                </h3>
                                <p className="text-abtec-navy-600 text-sm">
                                    Consulta el rendimiento de tu sistema solar y los datos de producción de energía.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <h3 className="font-semibold text-abtec-navy-900 mb-2">
                                    Tickets de Soporte
                                </h3>
                                <p className="text-abtec-navy-600 text-sm">
                                    Crea y realiza el seguimiento de las solicitudes de soporte para tu instalación.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={signOut}
                                className="px-6 py-3 border-2 border-abtec-navy-200 text-abtec-navy-700 font-semibold rounded-lg hover:bg-abtec-navy-50 transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-abtec-green-600 text-white font-semibold rounded-lg hover:bg-abtec-green-700 transition-colors text-center"
                            >
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                        <div className="w-12 h-12 bg-abtec-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">A</span>
                        </div>
                        <span className="text-2xl font-bold text-abtec-navy-900">Abtec</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-abtec-navy-900">Acceso Cliente</h1>
                    <p className="text-abtec-navy-600 mt-2">
                        Inicia sesión para acceder a tu portal de cliente
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-abtec-navy-700 mb-2"
                            >
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
                                placeholder="tu@ejemplo.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-abtec-navy-700 mb-2"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-abtec-green-600 hover:bg-abtec-green-700 disabled:bg-abtec-green-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
                        >
                            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-abtec-green-600 hover:text-abtec-green-700 font-medium text-sm"
                        >
                            &larr; Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

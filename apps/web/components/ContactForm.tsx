'use client';

import type { JSX, ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  serviceType: string;
  message: string;
}

export default function ContactForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    serviceType: 'Instalación Industrial',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Removed unused handleChange

  // Re-implementing simplified handleChange for React inputs with name prop
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Dynamically import firebase to avoid server-side issues
      const { getClientDb } = await import('../lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const db = getClientDb();

      await addDoc(collection(db, 'quotes'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
      });

      console.log('Form submitted successfully');

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        serviceType: 'Instalación Industrial',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-secondary text-white relative overflow-hidden scroll-mt-20">
      {/* Decorative light effect */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Contáctanos</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Inicia tu Transición <br />Energética Hoy</h3>
            <p className="text-white/70 text-lg mb-10 max-w-md leading-relaxed">
              ¿Listo para dar el siguiente paso? Completa el formulario y nuestros ingenieros especializados realizarán un análisis solar personalizado para tu propiedad.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase font-bold tracking-wider">Teléfono</p>
                  <p className="text-lg font-medium">(+52) 81 9688.1365</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase font-bold tracking-wider">Correo Electrónico</p>
                  <p className="text-lg font-medium">ventas@abtec.mx</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-secondary text-sm font-bold uppercase tracking-wide">Nombre Completo</label>
                  <input
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 w-full"
                    placeholder="Juan Pérez"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-secondary text-sm font-bold uppercase tracking-wide">Correo Electrónico</label>
                  <input
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 w-full"
                    placeholder="juan@empresa.com"
                    type="email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="serviceType" className="text-secondary text-sm font-bold uppercase tracking-wide">Tipo de Servicio</label>
                <select
                  name="serviceType"
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary w-full"
                >
                  <option>Instalación Industrial</option>
                  <option>Instalación Residencial</option>
                  <option>Mantenimiento y Monitoreo</option>
                  <option>Consultoría Energética</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-secondary text-sm font-bold uppercase tracking-wide">Mensaje</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 w-full"
                  placeholder="¿Cómo podemos ayudarte?"
                  rows={4}
                ></textarea>
              </div>
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud de Cotización'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-center font-bold">¡Mensaje enviado con éxito!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center font-bold">Error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

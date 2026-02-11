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
    serviceType: 'Industrial Installation',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { title, value } = e.target;
    // The HTML inputs don't have name attributes in the snippet, I'll add them.
    // Wait, the snippet uses labels. I will ensure inputs have proper names.
    // If e.target.name is undefined, I need to make sure I add name props to inputs.
    // Assuming standard behavior.

    // Actually, I'll just use the name attribute which I will add to the inputs.
    const name = e.target.getAttribute('name');
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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
      const { db } = await import('../lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

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
        serviceType: 'Industrial Installation',
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
    <section className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Decorative light effect */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Contact Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Start Your Energy <br />Transition Today</h3>
            <p className="text-white/70 text-lg mb-10 max-w-md leading-relaxed">
              Ready to take the next step? Fill out the form and our specialized engineers will provide a personalized solar analysis for your property.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase font-bold tracking-wider">Phone</p>
                  <p className="text-lg font-medium">+1 (555) 000-8888</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase font-bold tracking-wider">Email</p>
                  <p className="text-lg font-medium">contact@abtec-energy.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-bold uppercase tracking-wide">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 w-full"
                    placeholder="John Doe"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-bold uppercase tracking-wide">Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 w-full"
                    placeholder="john@company.com"
                    type="email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-bold uppercase tracking-wide">Service Type</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary w-full"
                >
                  <option>Industrial Installation</option>
                  <option>Residential Installation</option>
                  <option>Maintenance & Monitoring</option>
                  <option>Energy Consulting</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-bold uppercase tracking-wide">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-background-light border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-secondary/30 w-full"
                  placeholder="How can we help you?"
                  rows={4}
                ></textarea>
              </div>
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Quote Request'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-center font-bold">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center font-bold">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

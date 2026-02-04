'use client';

import type { JSX, ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string;
}

export default function ContactForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    propertyType: 'residential',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
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
        phone: '',
        propertyType: 'residential',
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
    <section id="contact" className="py-32 bg-abtec-navy-900 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-abtec-green-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-abtec-navy-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 pt-8">
            <span className="text-[#84cc16] font-bold text-sm tracking-widest uppercase block">
              Contact Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Start Your Energy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Transition Today
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Ready to take the next step? Fill out the form and our specialized engineers will provide a personalized solar analysis for your property.
            </p>

            <div className="pt-8 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-abtec-navy-800 rounded-full flex items-center justify-center text-[#84cc16]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Phone</p>
                  <p className="text-white font-semibold text-lg hover:text-[#84cc16] transition-colors">+1 (555) 000-8888</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-abtec-navy-800 rounded-full flex items-center justify-center text-[#84cc16]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="text-white font-semibold text-lg hover:text-[#84cc16] transition-colors">contact@abtec-energy.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-extrabold text-abtec-navy-900 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-[#f8fafc] rounded-lg focus:ring-2 focus:ring-[#84cc16] transition-all outline-none text-abtec-navy-900 placeholder-gray-400 font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-extrabold text-abtec-navy-900 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-[#f8fafc] rounded-lg focus:ring-2 focus:ring-[#84cc16] transition-all outline-none text-abtec-navy-900 placeholder-gray-400 font-medium"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="propertyType" className="block text-[10px] font-extrabold text-abtec-navy-900 uppercase tracking-widest mb-2">Service Type</label>
                <div className="relative">
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-[#f8fafc] rounded-lg focus:ring-2 focus:ring-[#84cc16] transition-all outline-none text-abtec-navy-900 font-medium appearance-none"
                  >
                    <option value="residential">Residential Installation</option>
                    <option value="commercial">Commercial Project</option>
                    <option value="industrial">Industrial Solution</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-extrabold text-abtec-navy-900 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#f8fafc] rounded-lg focus:ring-2 focus:ring-[#84cc16] transition-all outline-none resize-none text-abtec-navy-900 placeholder-gray-400 font-medium"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#84cc16] hover:bg-[#65a30d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-[#84cc16]/20"
              >
                {isSubmitting ? 'Sending Request...' : 'Send Quote Request'}
              </button>

              {/* Status Messages - Simplified for clean design */}
              {submitStatus === 'success' && (
                <p className="text-green-600 text-center font-medium bg-green-50 py-2 rounded-lg">Thank you! We&apos;ll be in touch soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-center font-medium bg-red-50 py-2 rounded-lg">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

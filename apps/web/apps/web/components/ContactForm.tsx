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
      // TODO: Integrate with Firebase backend
      console.log('Form submitted:', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: 'residential',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-abtec-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <span className="text-abtec-green-400 font-semibold text-sm uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
              Start Your Energy Transition Today
            </h2>
            <p className="mt-4 text-abtec-navy-200 text-lg">
              Ready to harness the power of the sun? Fill out the form and our team
              will get back to you within 24 hours with a personalized quote.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-4">
              {[
                'Free initial consultation and site assessment',
                'Competitive pricing with flexible financing',
                'Professional installation by certified technicians',
                'Comprehensive warranty and support',
              ].map((benefit) => (
                <div key={benefit} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-abtec-green-400 mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-abtec-navy-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-abtec-navy-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-abtec-navy-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-abtec-navy-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Property Type */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-abtec-navy-700 mb-2"
                >
                  Property Type
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-abtec-navy-700 mb-2"
                >
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors resize-none text-abtec-navy-900"
                  placeholder="Tell us about your energy needs..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-abtec-green-600 hover:bg-abtec-green-700 disabled:bg-abtec-green-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? 'Submitting...' : 'Request Quote'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center">
                  Thank you! We&apos;ll be in touch soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

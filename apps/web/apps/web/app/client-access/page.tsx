'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

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
                Welcome, {user.email}
              </h1>
              <p className="text-abtec-navy-600 mt-2">
                You are logged into your client portal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-abtec-navy-900 mb-2">
                  System Status
                </h3>
                <p className="text-abtec-navy-600 text-sm">
                  View your solar system performance and energy production data.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-abtec-navy-900 mb-2">
                  Support Tickets
                </h3>
                <p className="text-abtec-navy-600 text-sm">
                  Create and track support requests for your installation.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={signOut}
                className="px-6 py-3 border-2 border-abtec-navy-200 text-abtec-navy-700 font-semibold rounded-lg hover:bg-abtec-navy-50 transition-colors"
              >
                Sign Out
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-abtec-green-600 text-white font-semibold rounded-lg hover:bg-abtec-green-700 transition-colors text-center"
              >
                Back to Home
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
          <h1 className="text-2xl font-bold text-abtec-navy-900">Client Access</h1>
          <p className="text-abtec-navy-600 mt-2">
            Sign in to access your client portal
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-abtec-navy-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
                placeholder="Enter your password"
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
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-abtec-green-600 hover:text-abtec-green-700 font-medium text-sm"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

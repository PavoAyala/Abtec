'use client';

import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Header(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'SERVICES' },
    { href: '#products', label: 'PRODUCTS' },
    { href: '#company', label: 'COMPANY' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-[#84cc16] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <span className={`text-xl font-black tracking-wide ${scrolled ? 'text-abtec-navy-900' : 'text-white'}`}>
              ABTEC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold tracking-widest hover:text-[#84cc16] transition-colors ${scrolled ? 'text-abtec-navy-700' : 'text-white/90'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Client Access Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/client-access"
              className="bg-[#1e293b] hover:bg-[#334155] text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 border border-white/10 flex items-center gap-2"
            >
              Client Access
              {user && (
                <div className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
              )}
            </Link>
            {user && (
              <div className="w-10 h-10 rounded-full bg-[#bbf7d0] flex items-center justify-center text-[#166534] font-bold border-2 border-white">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-abtec-navy-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-abtec-navy-900 hover:text-[#84cc16] font-bold tracking-wider text-sm p-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-gray-100" />
              <Link
                href="/client-access"
                className="bg-[#1e293b] text-white font-semibold py-3 px-4 rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Client Access
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

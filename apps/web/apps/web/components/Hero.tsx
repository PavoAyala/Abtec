import type { JSX } from 'react';
import Link from 'next/link';

export default function Hero(): JSX.Element {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2664&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-abtec-navy-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-abtec-navy-900 via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-abtec-green-500/10 border border-abtec-green-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-abtec-green-500 rounded-full mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-abtec-green-400 text-sm font-medium tracking-wide uppercase">
              Solar Innovation
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none">
              Energía que
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-abtec-green-500 tracking-tight leading-none underline decoration-4 underline-offset-8 decoration-abtec-green-500/30">
              Transforma
            </h1>
          </div>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 font-light leading-relaxed">
            Efficient and sustainable solar energy solutions tailored for residential and industrial scaling. Experience the future of energy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="#contact"
              className="group w-full sm:w-auto bg-[#84cc16] hover:bg-[#65a30d] text-white text-lg font-bold py-4 px-10 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg shadow-[#84cc16]/25"
            >
              Request Quote
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#technology"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg font-medium py-4 px-10 rounded-lg transition-all duration-200 border border-white/10"
            >
              Our Technology
            </Link>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 mt-16 border-t border-white/5 mx-auto max-w-5xl">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '10MW', label: 'Energy Generated' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '15+', label: 'Years Experience' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:text-abtec-green-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div> */}
    </section>
  );
}

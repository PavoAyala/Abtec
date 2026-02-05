import type { JSX, ReactNode } from 'react';

interface Service {
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
}

const services: Service[] = [
  {
    title: 'Solar Installation',
    description:
      'Professional installation of solar panels for residential, commercial, and industrial properties. Our certified technicians ensure optimal placement and maximum efficiency.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    features: ['Site Assessment', 'Custom Design', 'Permit Handling', 'Professional Installation'],
  },
  {
    title: 'Maintenance & Support',
    description:
      'Keep your solar system running at peak performance with our comprehensive maintenance plans. Regular inspections, cleaning, and proactive repairs.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    features: ['Regular Inspections', 'Panel Cleaning', '24/7 Monitoring', 'Emergency Repairs'],
  },
  {
    title: 'Energy Consulting',
    description:
      'Expert advice on optimizing your energy consumption and maximizing ROI. We analyze your needs and design the perfect solar solution for you.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    features: ['Energy Audit', 'ROI Analysis', 'System Sizing', 'Financing Options'],
  },
];

export default function Services(): JSX.Element {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#84cc16] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-abtec-navy-900 leading-tight">
              Specialized Solar Solutions
            </h2>
          </div>
          <div className="md:max-w-md">
            <p className="text-abtec-navy-600 text-lg leading-relaxed text-right md:text-left">
              Comprehensive services ensuring your transition to renewable energy is seamless, efficient, and profitable.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-[#f8fafc] rounded-3xl p-10 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              {/* Icon - Maintenance (index 1) gets Navy, others get Green */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg ${index === 1
                  ? 'bg-abtec-navy-800 shadow-abtec-navy-900/20'
                  : 'bg-[#84cc16] shadow-[#84cc16]/20'
                }`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-abtec-navy-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-abtec-navy-600 mb-8 leading-relaxed text-sm">
                {service.description}
              </p>

              {/* Link */}
              <a href="#contact" className={`inline-flex items-center font-bold text-sm transition-colors ${index === 1 ? 'text-abtec-navy-800 hover:text-abtec-navy-600' : 'text-[#84cc16] hover:text-[#65a30d]'
                }`}>
                Learn more
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

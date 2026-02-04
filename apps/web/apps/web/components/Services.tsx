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
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-abtec-green-600 font-semibold text-sm uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-abtec-navy-900">
            Specialized Solar Solutions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-abtec-navy-600">
            From initial consultation to ongoing maintenance, we provide end-to-end solar
            solutions tailored to your specific needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-abtec-green-100 rounded-xl flex items-center justify-center text-abtec-green-600 mb-6">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-abtec-navy-900 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-abtec-navy-600 mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-abtec-navy-700"
                  >
                    <svg
                      className="w-5 h-5 text-abtec-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

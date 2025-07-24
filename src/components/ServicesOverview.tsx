import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Heart, Headphones, ArrowRight, CheckCircle } from 'lucide-react';

const ServicesOverview = () => {
  const services = [
    {
      icon: CreditCard,
      title: "Disabilities Card",
      description: "Official recognition and access to comprehensive support services and benefits across the UAE.",
      image: "/Global Disability Carde.jpg",
      color: "from-uae-green to-green-700",
      features: [
        "Priority access to services",
        "Healthcare discounts",
        "Transportation benefits",
        "Shopping discounts",
        "Entertainment perks"
      ],
      link: "/disabilities-card"
    },
    {
      icon: Heart,
      title: "Carers Card",
      description: "Recognition and support for dedicated caregivers who provide essential care to individuals with disabilities.",
      image: "/Global Carers Card DEMO_page-0003.jpg",
      color: "from-uae-red to-red-700",
      features: [
        "Respite care services",
        "Training programs",
        "Support networks",
        "Wellness benefits",
        "Recognition rewards"
      ],
      link: "/carers-card"
    },
    {
      icon: Headphones,
      title: "Customer Support Card",
      description: "Enhanced assistance and priority support for individuals requiring additional help with daily activities.",
      image: "/Global Support Card.jpg",
      color: "from-uae-black to-gray-800",
      features: [
        "24/7 priority support",
        "Dedicated helpline",
        "Personal assistance",
        "Quick resolution",
        "Enhanced services"
      ],
      link: "/customer-support-card"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Card Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our range of specialized cards designed to provide 
            comprehensive support and benefits tailored to your specific needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
              >
                {/* Card Header with Gradient */}
                <div className="relative p-8 text-white overflow-hidden h-64">
                  {/* Card Image Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  {/* Dark Overlay for Text Readability */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-85`} />
                  
                  <div className="relative z-10">
                    <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-white/90 leading-relaxed">{service.description}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-uae-green mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col space-y-3">
                    <Link
                      to={service.link}
                      className="inline-flex items-center justify-center px-6 py-3 bg-uae-green text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link
                      to={`/apply-${service.title.toLowerCase().replace(' card', '').replace(' ', '-')}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-uae-green text-uae-green font-semibold rounded-lg hover:bg-uae-green hover:text-white transition-all duration-300"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lanyard Service */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🏷️</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Verified Global Disability Lanyard</h3>
                <p className="text-gray-600">Internationally recognized symbol</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              A discreet way to indicate that you have a non-visible disability and may need 
              additional support, patience, or understanding.
            </p>
            <Link
              to="/verified-lanyard"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300"
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Renewal Service */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔄</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Card Renewal Services</h3>
                <p className="text-gray-600">Keep your benefits active</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Easily renew your existing cards to continue enjoying all the benefits 
              and services without interruption.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/renew-disabilities"
                className="text-orange-600 font-medium hover:text-orange-700 transition-colors duration-300 text-sm"
              >
                Renew Disabilities Card →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
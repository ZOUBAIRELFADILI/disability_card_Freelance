import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Users, 
  Wrench, 
  Car, 
  Home, 
  Briefcase,
  ArrowRight 
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: ClipboardCheck,
      title: "Disability Assessment",
      description: "Comprehensive evaluations by certified professionals to determine eligibility and support needs.",
      features: ["Medical Assessment", "Functional Evaluation", "Support Planning"]
    },
    {
      icon: Users,
      title: "Personal Support Services",
      description: "Dedicated support workers to assist with daily activities and community participation.",
      features: ["Personal Care", "Community Access", "Social Support"]
    },
    {
      icon: Wrench,
      title: "Equipment & Aids",
      description: "Provision of assistive technology and equipment to enhance independence and mobility.",
      features: ["Mobility Aids", "Communication Devices", "Daily Living Aids"]
    },
    {
      icon: Car,
      title: "Transport Services",
      description: "Accessible transportation solutions for medical appointments and community activities.",
      features: ["Medical Transport", "Community Access", "Wheelchair Accessible"]
    },
    {
      icon: Home,
      title: "Home Modifications",
      description: "Professional home adaptations to create safe and accessible living environments.",
      features: ["Ramp Installation", "Bathroom Modifications", "Accessibility Upgrades"]
    },
    {
      icon: Briefcase,
      title: "Employment Support",
      description: "Career guidance and workplace support to help individuals achieve their employment goals.",
      features: ["Job Training", "Workplace Support", "Career Counseling"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a full range of disability services designed to promote independence, 
            dignity, and quality of life for individuals across the UAE.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-600 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/services"
                  className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-emerald-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl mb-8 text-emerald-100">
              Our team is here to help you access the services you need. 
              Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
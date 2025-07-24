import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Clock, CreditCard } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-uae-green via-green-600 to-green-800 relative overflow-hidden">
      {/* UAE Flag Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <div className="w-full h-1/3 bg-uae-red"></div>
        <div className="w-full h-1/3 bg-white"></div>
        <div className="w-full h-1/3 bg-uae-black"></div>
        <div className="absolute left-0 top-0 w-1/4 h-full bg-uae-green"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Your National Disability Aid Today
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of UAE residents who are already enjoying exclusive benefits, 
            discounts, and support services with National Disability Aid.
          </p>
        </div>

        {/* Main CTA Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Disabilities Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Disability Aid Services
            </h3>
            <p className="text-green-100 mb-6 leading-relaxed">
              Access comprehensive support services, healthcare benefits, and exclusive 
              discounts across the UAE.
            </p>
            <Link
              to="/apply-disabilities"
              className="inline-flex items-center px-8 py-4 bg-white text-uae-green font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Carers Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">❤️</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Carers Support
            </h3>
            <p className="text-green-100 mb-6 leading-relaxed">
              Recognition and support for dedicated caregivers with access to respite 
              services and training programs.
            </p>
            <Link
              to="/apply-carers"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-green transition-all duration-300"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Customer Support Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">🤝</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Customer Support Services
            </h3>
            <p className="text-green-100 mb-6 leading-relaxed">
              Enhanced assistance and priority support for individuals requiring 
              additional help with daily activities.
            </p>
            <Link
              to="/apply-customer-support"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-green transition-all duration-300"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Call Us</h4>
            <p className="text-green-100">+971 4 123 4567</p>
            <p className="text-green-200 text-sm">Available 24/7</p>
          </div>

          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Email Us</h4>
            <p className="text-green-100">info@gcdc.ae</p>
            <p className="text-green-200 text-sm">Quick response guaranteed</p>
          </div>

          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Office Hours</h4>
            <p className="text-green-100">Sun - Thu: 8AM - 6PM</p>
            <p className="text-green-200 text-sm">Emergency support 24/7</p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
            <p className="text-white text-lg font-medium mb-2">
              🇦🇪 Proudly serving the UAE community since 2020
            </p>
            <p className="text-green-100">
              Join thousands of satisfied cardholders who have transformed their lives with our support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
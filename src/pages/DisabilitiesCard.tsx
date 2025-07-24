import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowRight, Shield, Heart, Users, Award } from 'lucide-react';

const DisabilitiesCard = () => {
  const benefits = [
    {
      category: "Healthcare Benefits",
      items: [
        "Priority appointments at healthcare facilities",
        "Discounted medical consultations and treatments",
        "Free or reduced-cost prescription medications",
        "Access to specialized disability services",
        "Physiotherapy and rehabilitation discounts"
      ]
    },
    {
      category: "Transportation Benefits",
      items: [
        "Free public transportation (Metro, Bus, Tram)",
        "Discounted taxi services",
        "Priority parking spaces",
        "Airport assistance services",
        "Reduced car registration fees"
      ]
    },
    {
      category: "Shopping & Retail",
      items: [
        "10-25% discounts at major retailers",
        "Special offers at grocery stores",
        "Reduced prices on assistive technology",
        "Priority customer service",
        "Exclusive sales events"
      ]
    },
    {
      category: "Entertainment & Leisure",
      items: [
        "Discounted movie tickets",
        "Reduced entry fees to attractions",
        "Special rates at hotels and resorts",
        "Free or discounted gym memberships",
        "Cultural event discounts"
      ]
    }
  ];

  const eligibility = [
    "UAE resident with valid Emirates ID",
    "Medical documentation of disability",
    "Completed application form",
    "Recent passport-sized photographs",
    "Proof of residence in UAE"
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "Advanced security features with government verification"
    },
    {
      icon: Heart,
      title: "Comprehensive Support",
      description: "Access to wide range of support services and benefits"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with support groups and community resources"
    },
    {
      icon: Award,
      title: "Official Recognition",
      description: "Officially recognized by UAE government and partners"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-uae-green to-green-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="w-8 h-8" />
                <span className="text-lg font-medium">Official UAE Service</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Disabilities Card
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Your gateway to comprehensive support services, exclusive benefits, 
                and priority access across the UAE. Designed to enhance independence 
                and quality of life for individuals with disabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/apply-disabilities"
                  className="inline-flex items-center px-8 py-4 bg-white text-uae-green font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-green transition-all duration-300"
                >
                  Get Information
                </Link>
              </div>
            </div>
            
            {/* Card Preview */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-96 h-60 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden">
                  <img 
                    src="/Global Disability Carde.jpg" 
                    alt="Disabilities Card"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Card Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced features designed to provide security, convenience, and comprehensive support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-uae-green group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-uae-green group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access hundreds of benefits and services designed to support your daily life and enhance your independence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-uae-green rounded-full mr-3"></div>
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-uae-green mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
              <p className="text-lg text-gray-600 mb-8">
                To qualify for the Disabilities Card, you must meet the following criteria:
              </p>
              <ul className="space-y-4">
                {eligibility.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-uae-green w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-uae-green text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submit Application</h4>
                    <p className="text-gray-600 text-sm">Complete the online application form with required documents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-uae-green text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Medical Assessment</h4>
                    <p className="text-gray-600 text-sm">Attend medical evaluation with certified healthcare professional</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-uae-green text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Card Production</h4>
                    <p className="text-gray-600 text-sm">Your card will be produced and delivered within 7-10 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-uae-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Apply for Your Disabilities Card?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Take the first step towards accessing comprehensive support and exclusive benefits. 
            Our team is here to guide you through the application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply-disabilities"
              className="inline-flex items-center px-8 py-4 bg-white text-uae-green font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Start Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-green transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisabilitiesCard;
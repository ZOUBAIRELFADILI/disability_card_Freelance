import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, CheckCircle, ArrowRight, Clock, Shield, Users, Award } from 'lucide-react';

const CustomerSupportCard = () => {
  const benefits = [
    {
      category: "Priority Support Services",
      items: [
        "24/7 dedicated support hotline",
        "Priority queue for all services",
        "Expedited service resolution",
        "Personal support coordinator",
        "Emergency assistance available"
      ]
    },
    {
      category: "Enhanced Customer Service",
      items: [
        "Dedicated customer service representatives",
        "Extended service hours",
        "Multi-language support options",
        "Video call support available",
        "Follow-up service guarantees"
      ]
    },
    {
      category: "Personal Assistance",
      items: [
        "Shopping and errands assistance",
        "Appointment scheduling help",
        "Document preparation support",
        "Translation services",
        "Technology assistance"
      ]
    },
    {
      category: "Communication Support",
      items: [
        "Sign language interpretation",
        "Written communication assistance",
        "Audio description services",
        "Large print materials",
        "Digital accessibility tools"
      ]
    }
  ];

  const eligibility = [
    "UAE resident with valid Emirates ID",
    "Documented need for additional support",
    "Completed support needs assessment",
    "Medical or professional recommendation",
    "Recent passport-sized photographs"
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock support when you need it most"
    },
    {
      icon: Shield,
      title: "Priority Access",
      description: "Skip the queue with priority service access"
    },
    {
      icon: Users,
      title: "Personal Coordinator",
      description: "Dedicated support coordinator for your needs"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Guaranteed quality service with follow-up support"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-uae-black to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-6">
                <Headphones className="w-8 h-8" />
                <span className="text-lg font-medium">Enhanced Support</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Customer Support Card
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Enhanced assistance and priority support for individuals requiring 
                additional help with daily activities. Access dedicated support services, 
                personal assistance, and priority customer service across the UAE.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/apply-customer-support"
                  className="inline-flex items-center px-8 py-4 bg-white text-uae-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-black transition-all duration-300"
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
                    src="/Global Support Card.jpg" 
                    alt="Customer Support Card"
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
              Designed to provide enhanced support and priority assistance for your daily needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-uae-black group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-uae-black group-hover:text-white" />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Enhanced Support Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive support services designed to assist you with daily activities 
              and provide the help you need when you need it
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-uae-black rounded-full mr-3"></div>
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-uae-black mr-3 mt-0.5 flex-shrink-0" />
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
                To qualify for the Customer Support Card, you must meet the following criteria:
              </p>
              <ul className="space-y-4">
                {eligibility.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-uae-black w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
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
                  <div className="bg-uae-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submit Application</h4>
                    <p className="text-gray-600 text-sm">Complete the support needs application with documentation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-uae-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Needs Assessment</h4>
                    <p className="text-gray-600 text-sm">Participate in support needs assessment and evaluation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-uae-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Service Activation</h4>
                    <p className="text-gray-600 text-sm">Receive your card and begin accessing enhanced support services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-uae-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Apply for Your Customer Support Card?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get the enhanced support and assistance you need for daily activities. 
            Join our priority support program and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply-customer-support"
              className="inline-flex items-center px-8 py-4 bg-white text-uae-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Start Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-black transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerSupportCard;
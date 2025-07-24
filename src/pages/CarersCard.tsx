import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle, ArrowRight, Users, Clock, Award, Shield } from 'lucide-react';

const CarersCard = () => {
  const benefits = [
    {
      category: "Respite Care Services",
      items: [
        "Temporary care relief for primary caregivers",
        "Professional respite care providers",
        "Flexible scheduling options",
        "Emergency respite support",
        "Specialized disability care"
      ]
    },
    {
      category: "Training & Development",
      items: [
        "Caregiver skills training programs",
        "Disability awareness workshops",
        "First aid and emergency response",
        "Mental health support training",
        "Continuing education opportunities"
      ]
    },
    {
      category: "Support Networks",
      items: [
        "Caregiver support groups",
        "Peer mentoring programs",
        "Online community forums",
        "Regular meetups and events",
        "Professional counseling services"
      ]
    },
    {
      category: "Wellness Benefits",
      items: [
        "Health and wellness programs",
        "Stress management resources",
        "Fitness center discounts",
        "Mental health support",
        "Self-care workshops"
      ]
    }
  ];

  const eligibility = [
    "Primary caregiver for person with disability",
    "UAE resident with valid Emirates ID",
    "Proof of caregiving relationship",
    "Completed caregiver assessment",
    "Recent passport-sized photographs"
  ];

  const features = [
    {
      icon: Heart,
      title: "Caregiver Recognition",
      description: "Official recognition of your vital role as a caregiver"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other caregivers and support networks"
    },
    {
      icon: Clock,
      title: "Flexible Services",
      description: "Access services that fit your caregiving schedule"
    },
    {
      icon: Award,
      title: "Professional Development",
      description: "Enhance your caregiving skills with training programs"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-uae-red to-red-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="w-8 h-8" />
                <span className="text-lg font-medium">Caregiver Support</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Carers Card
              </h1>
              <p className="text-xl text-red-100 mb-8 leading-relaxed">
                Recognition and comprehensive support for dedicated caregivers who provide 
                essential care to individuals with disabilities. Access respite services, 
                training programs, and a supportive community network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/apply-carers"
                  className="inline-flex items-center px-8 py-4 bg-white text-uae-red font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-red transition-all duration-300"
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
                    src="/Global Carers Card DEMO_page-0003.jpg" 
                    alt="Carers Card"
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
              Designed specifically for caregivers to provide recognition, support, and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-uae-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-uae-red group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-uae-red group-hover:text-white" />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Caregiver Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access specialized services and support designed to help you provide the best care 
              while maintaining your own wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-uae-red rounded-full mr-3"></div>
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-uae-red mr-3 mt-0.5 flex-shrink-0" />
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
                To qualify for the Carers Card, you must meet the following criteria:
              </p>
              <ul className="space-y-4">
                {eligibility.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-uae-red w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
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
                  <div className="bg-uae-red text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submit Application</h4>
                    <p className="text-gray-600 text-sm">Complete the caregiver application with required documentation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-uae-red text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Caregiver Assessment</h4>
                    <p className="text-gray-600 text-sm">Participate in caregiver assessment and verification process</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-uae-red text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Card Issuance</h4>
                    <p className="text-gray-600 text-sm">Receive your Carers Card and access to all benefits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-uae-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Apply for Your Carers Card?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Get the recognition and support you deserve as a dedicated caregiver. 
            Join our community of supported caregivers across the UAE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply-carers"
              className="inline-flex items-center px-8 py-4 bg-white text-uae-red font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Start Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-red transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarersCard;
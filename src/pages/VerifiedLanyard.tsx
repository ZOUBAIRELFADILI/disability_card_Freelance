import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Globe, Shield, Users, Award } from 'lucide-react';

const VerifiedLanyard = () => {
  const benefits = [
    {
      category: "International Recognition",
      items: [
        "Recognized in over 100 countries worldwide",
        "Accepted at major airports and transport hubs",
        "Understood by international service providers",
        "Consistent symbol across different cultures",
        "Global disability awareness initiative"
      ]
    },
    {
      category: "Discreet Identification",
      items: [
        "Subtle way to indicate hidden disabilities",
        "No need to explain your condition repeatedly",
        "Reduces anxiety in public spaces",
        "Maintains privacy while seeking support",
        "Professional and dignified appearance"
      ]
    },
    {
      category: "Enhanced Support",
      items: [
        "Priority assistance at service counters",
        "Additional time and patience from staff",
        "Access to quiet spaces when available",
        "Understanding from service providers",
        "Reduced waiting times where possible"
      ]
    },
    {
      category: "Travel Benefits",
      items: [
        "Airport assistance and priority boarding",
        "Special accommodation requests",
        "Security checkpoint assistance",
        "Hotel and accommodation support",
        "Transportation priority services"
      ]
    }
  ];

  const eligibility = [
    "UAE resident with valid Emirates ID",
    "Documentation of non-visible disability",
    "Medical or professional assessment",
    "Completed application form",
    "Recent passport-sized photograph"
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Internationally recognized symbol for hidden disabilities"
    },
    {
      icon: Shield,
      title: "Discreet Support",
      description: "Subtle way to indicate you may need additional assistance"
    },
    {
      icon: Users,
      title: "Widespread Acceptance",
      description: "Recognized by major retailers, airports, and service providers"
    },
    {
      icon: Award,
      title: "Official Certification",
      description: "Verified and certified through our official program"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-4xl">🏷️</div>
                <span className="text-lg font-medium">Global Recognition</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Verified Global Disability Lanyard
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                A discreet way to indicate that you have a non-visible disability and may need 
                additional support, patience, or understanding. Recognized internationally 
                and accepted by major service providers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/apply-disabilities"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Get Information
                </Link>
              </div>
            </div>
            
            {/* Lanyard Preview */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-2xl text-white">🏷️</div>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Global Disability Lanyard</h3>
                    <p className="text-blue-700 mb-6">Hidden Disabilities</p>
                    
                    <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
                      <div className="w-full h-20 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">VERIFIED</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-blue-600 space-y-1">
                      <p>Internationally Recognized</p>
                      <p>Valid Worldwide</p>
                      <p>UAE Certified</p>
                    </div>
                  </div>
                  
                  {/* UAE Flag Corner */}
                  <div className="absolute top-4 right-4 w-8 h-6 rounded-sm overflow-hidden opacity-60">
                    <div className="w-full h-1/3 bg-red-500"></div>
                    <div className="w-full h-1/3 bg-white"></div>
                    <div className="w-full h-1/3 bg-black"></div>
                    <div className="absolute left-0 top-0 w-1/4 h-full bg-green-600"></div>
                  </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Lanyard Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed to provide discreet identification and support for individuals with non-visible disabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white" />
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
              Access support and understanding wherever you go with our internationally recognized lanyard
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to get your verified global disability lanyard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Apply Online",
                description: "Complete our simple application form with required documentation"
              },
              {
                step: "2",
                title: "Verification",
                description: "We verify your eligibility and documentation within 48 hours"
              },
              {
                step: "3",
                title: "Production",
                description: "Your personalized lanyard is produced with security features"
              },
              {
                step: "4",
                title: "Delivery",
                description: "Receive your lanyard with usage guidelines and partner information"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
              <p className="text-lg text-gray-600 mb-8">
                To qualify for the Verified Global Disability Lanyard, you must meet the following criteria:
              </p>
              <ul className="space-y-4">
                {eligibility.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Hidden Disabilities Include</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Autism and Asperger's syndrome",
                    "ADHD and learning difficulties",
                    "Mental health conditions",
                    "Chronic pain and fatigue",
                    "Hearing and visual impairments",
                    "Epilepsy and neurological conditions",
                    "Diabetes and chronic illnesses",
                    "Speech and language disorders"
                  ].map((condition, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Get Your Verified Global Disability Lanyard
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of people worldwide who use the lanyard to access the support 
            and understanding they need in their daily lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply-disabilities"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Apply for Lanyard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifiedLanyard;
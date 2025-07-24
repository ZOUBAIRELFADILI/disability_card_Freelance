import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, TrendingUp, Users, Award, ArrowRight, CheckCircle, DollarSign, Target } from 'lucide-react';

const BecomeFranchise = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Global Expansion",
      description: "Be part of expanding GCDC services worldwide with proven business model"
    },
    {
      icon: TrendingUp,
      title: "Growing Market",
      description: "Tap into the expanding disability services market with increasing demand"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Make a meaningful difference in your local disability community"
    },
    {
      icon: Award,
      title: "Established Brand",
      description: "Leverage our recognized brand and proven track record of success"
    }
  ];

  const requirements = [
    "Passion for disability advocacy and community service",
    "Business experience or willingness to learn",
    "Financial capacity to invest in franchise operations",
    "Commitment to GCDC values and service standards",
    "Local market knowledge and community connections",
    "Ability to meet franchise territory requirements"
  ];

  const support = [
    {
      category: "Training & Education",
      items: [
        "Comprehensive franchise training program",
        "Ongoing professional development",
        "Disability services certification",
        "Business operations training"
      ]
    },
    {
      category: "Marketing & Branding",
      items: [
        "Complete marketing toolkit",
        "Brand guidelines and materials",
        "Digital marketing support",
        "Local advertising assistance"
      ]
    },
    {
      category: "Operations Support",
      items: [
        "Standard operating procedures",
        "Technology platform access",
        "Quality assurance programs",
        "Regular business reviews"
      ]
    },
    {
      category: "Ongoing Assistance",
      items: [
        "Dedicated franchise support team",
        "Regular training updates",
        "Peer network access",
        "Performance monitoring tools"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-uae-green to-green-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Become a Global Franchise Partner
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              Join our mission to expand Global Carers and Disability Cards (GCDC) services 
              worldwide. Help us create inclusive communities while building a successful business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-uae-green font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Apply for Franchise
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-green transition-all duration-300">
                Download Information Pack
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Franchise Opportunity</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partner with us to bring essential disability services to communities worldwide 
              while building a sustainable and impactful business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-uae-green transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-uae-green group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Growing Market Opportunity</h2>
              <p className="text-lg text-gray-600 mb-8">
                The global disability services market is experiencing unprecedented growth, 
                driven by increasing awareness, aging populations, and supportive legislation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-uae-green text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold">
                    1.3B
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Global Disability Population</h4>
                    <p className="text-gray-600 text-sm">People worldwide living with disabilities</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-uae-red text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold">
                    15%
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Market Growth Rate</h4>
                    <p className="text-gray-600 text-sm">Annual growth in disability services sector</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-uae-black text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold">
                    $13T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Economic Impact</h4>
                    <p className="text-gray-600 text-sm">Annual global disability economy</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose GCDC Franchise?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-uae-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Proven business model with track record of success</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-uae-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive training and ongoing support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-uae-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Protected territory with exclusive rights</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-uae-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Strong brand recognition and marketing support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-uae-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Multiple revenue streams and growth opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Franchise Requirements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're looking for passionate partners who share our commitment to creating 
              inclusive communities and supporting individuals with disabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ideal Franchise Partner</h3>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-uae-green w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-uae-green/10 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="w-8 h-8 text-uae-green mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">Investment Range</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  Initial investment varies by territory size and market conditions. 
                  Financing options available for qualified candidates.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Franchise fee: Contact for details</li>
                  <li>• Working capital requirements</li>
                  <li>• Equipment and setup costs</li>
                  <li>• Marketing launch budget</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-blue-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">Territory Options</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  Multiple territory sizes available to match your investment capacity 
                  and growth ambitions.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• City-based territories</li>
                  <li>• Regional coverage areas</li>
                  <li>• National master franchise opportunities</li>
                  <li>• Population-based territory sizing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Franchise Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide extensive support to ensure your success from day one and throughout 
              your franchise journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {support.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
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

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined application process is designed to identify the right partners 
              and ensure mutual success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Initial Inquiry",
                description: "Submit your interest and receive information pack"
              },
              {
                step: "2",
                title: "Application Review",
                description: "Complete detailed application and financial qualification"
              },
              {
                step: "3",
                title: "Discovery Process",
                description: "Meet our team and learn about the opportunity"
              },
              {
                step: "4",
                title: "Franchise Agreement",
                description: "Finalize terms and begin your franchise journey"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-uae-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-uae-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join our global network of franchise partners and help us expand GCDC services 
            to communities worldwide. Together, we can create a more inclusive world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-uae-green font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-green transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeFranchise;
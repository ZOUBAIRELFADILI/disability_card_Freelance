import React from 'react';
import { Building2, Handshake, Star, MapPin, Phone, Globe } from 'lucide-react';

const Partners = () => {
  const partnerCategories = [
    {
      title: "Retail & Shopping",
      icon: Building2,
      partners: [
        {
          name: "Carrefour UAE",
          logo: "🛒",
          discount: "Up to 15% off",
          description: "Major hypermarket chain with locations across UAE",
          benefits: ["Grocery discounts", "Home appliances", "Electronics"]
        },
        {
          name: "Dubai Mall",
          logo: "🏬",
          discount: "10-25% off",
          description: "World's largest shopping mall with premium brands",
          benefits: ["Fashion discounts", "Dining offers", "Entertainment"]
        },
        {
          name: "Mall of the Emirates",
          logo: "🛍️",
          discount: "15-30% off",
          description: "Premium shopping destination in Dubai",
          benefits: ["Luxury brands", "Ski Dubai access", "Dining"]
        }
      ]
    },
    {
      title: "Transportation",
      icon: MapPin,
      partners: [
        {
          name: "Emirates Airlines",
          logo: "✈️",
          discount: "20% off flights",
          description: "UAE's flagship airline with global destinations",
          benefits: ["Flight discounts", "Priority boarding", "Lounge access"]
        },
        {
          name: "Dubai Metro",
          logo: "🚇",
          discount: "50% off fares",
          description: "Dubai's rapid transit system",
          benefits: ["Reduced fares", "Priority seating", "Accessibility support"]
        },
        {
          name: "UAE Taxi Services",
          logo: "🚕",
          discount: "25% off rides",
          description: "Licensed taxi services across UAE",
          benefits: ["Discounted rides", "Priority booking", "Accessible vehicles"]
        }
      ]
    },
    {
      title: "Healthcare",
      icon: Phone,
      partners: [
        {
          name: "Dubai Health Authority",
          logo: "🏥",
          discount: "Free consultations",
          description: "Government healthcare services",
          benefits: ["Free check-ups", "Reduced medication costs", "Priority appointments"]
        },
        {
          name: "Mediclinic UAE",
          logo: "⚕️",
          discount: "30% off services",
          description: "Private healthcare network",
          benefits: ["Specialist consultations", "Diagnostic tests", "Physiotherapy"]
        },
        {
          name: "NMC Healthcare",
          logo: "🩺",
          discount: "25% off treatments",
          description: "Leading healthcare provider in UAE",
          benefits: ["Medical treatments", "Dental care", "Mental health support"]
        }
      ]
    },
    {
      title: "Fuel & Automotive",
      icon: Globe,
      partners: [
        {
          name: "ADNOC",
          logo: "⛽",
          discount: "10% off fuel",
          description: "UAE's national oil company",
          benefits: ["Fuel discounts", "Car wash services", "Convenience store"]
        },
        {
          name: "EPPCO",
          logo: "🚗",
          discount: "15% off services",
          description: "Fuel and automotive services",
          benefits: ["Fuel discounts", "Car maintenance", "Tire services"]
        }
      ]
    }
  ];

  const stats = [
    { number: "150+", label: "Partner Companies" },
    { number: "500+", label: "Locations" },
    { number: "25%", label: "Average Discount" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Handshake className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Partners
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Discover the extensive network of UAE businesses offering exclusive benefits to our cardholders
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners by Category */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Partner Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our partners span across various industries to provide comprehensive benefits
            </p>
          </div>

          <div className="space-y-16">
            {partnerCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
                    <div className="flex items-center">
                      <Icon className="w-8 h-8 text-white mr-4" />
                      <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.partners.map((partner, partnerIndex) => (
                        <div key={partnerIndex} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center mb-4">
                            <div className="text-3xl mr-4">{partner.logo}</div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{partner.name}</h4>
                              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                                {partner.discount}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{partner.description}</p>
                          
                          <div className="space-y-2">
                            <h5 className="font-semibold text-gray-900">Benefits:</h5>
                            <ul className="space-y-1">
                              {partner.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                                  <Star className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How to Use Benefits */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Use Your Benefits
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to access your partner discounts and benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Present Your Card",
                description: "Show your National Disability Card along with your Emirates ID at participating partner locations",
                icon: "💳"
              },
              {
                step: "2",
                title: "Verify Eligibility",
                description: "Partner staff will verify your card status and applicable discounts for your purchase or service",
                icon: "✅"
              },
              {
                step: "3",
                title: "Enjoy Benefits",
                description: "Receive your discount or special service as per the partner's terms and conditions",
                icon: "🎉"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-4">Step {item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Become a Partner CTA */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Become Our Partner
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join our network of partners and help create a more inclusive UAE while growing your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Partnership Information
            </button>
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Apply to Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
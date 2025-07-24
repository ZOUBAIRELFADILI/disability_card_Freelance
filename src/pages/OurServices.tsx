import React from 'react';
import { Heart, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';

const OurServices = () => {
  const services = [
    {
      icon: Heart,
      title: "Disabilities Card",
      description: "Comprehensive support and benefits for individuals with disabilities",
      features: [
        "Access to exclusive discounts and offers",
        "Priority services at partner locations",
        "Healthcare support and assistance",
        "Transportation benefits",
        "Educational support programs"
      ],
      color: "green"
    },
    {
      icon: Users,
      title: "Carers Card",
      description: "Recognition and support for dedicated caregivers",
      features: [
        "Caregiver-specific discounts and benefits",
        "Respite care services",
        "Training and development programs",
        "Mental health support resources",
        "Community support networks"
      ],
      color: "red"
    },
    {
      icon: Shield,
      title: "Customer Support Card",
      description: "Enhanced assistance for daily activities and services",
      features: [
        "24/7 customer support hotline",
        "Personal assistance services",
        "Emergency response support",
        "Service coordination assistance",
        "Advocacy and representation"
      ],
      color: "black"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Comprehensive support services designed to enhance quality of life and promote independence
            </p>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Three Essential Card Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each card is designed to meet specific needs and provide targeted support for different communities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const colorClasses = {
                green: "from-green-500 to-green-600 border-green-200",
                red: "from-red-500 to-red-600 border-red-200",
                black: "from-gray-800 to-gray-900 border-gray-200"
              };

              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className={`bg-gradient-to-r ${colorClasses[service.color]} p-8 text-white`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90">{service.description}</p>
                  </div>
                  
                  <div className="p-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`mt-6 w-full bg-gradient-to-r ${colorClasses[service.color]} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center`}>
                      Learn More
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Support Services
            </h2>
            <p className="text-xl text-gray-600">
              Beyond our card services, we offer comprehensive support programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Application Assistance",
                description: "Help with completing and submitting card applications",
                icon: "📝"
              },
              {
                title: "Renewal Services",
                description: "Streamlined renewal process for existing cardholders",
                icon: "🔄"
              },
              {
                title: "Partner Network",
                description: "Access to our extensive network of partner businesses",
                icon: "🤝"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer service and assistance",
                icon: "📞"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Choose the card that best fits your needs and begin your application today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Compare Cards
            </button>
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
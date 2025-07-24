import React from 'react';
import { Heart, Users, Shield, Award, Target, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every interaction with empathy and understanding, recognizing the unique challenges faced by our community."
    },
    {
      icon: Users,
      title: "Inclusion",
      description: "We believe in creating opportunities for everyone to participate fully in society, regardless of their abilities or circumstances."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest standards of honesty, transparency, and ethical conduct in all our operations."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in service delivery, continuously improving to meet and exceed expectations."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description: "National Disability Card Services was established with a mission to support the UAE's vision of inclusion."
    },
    {
      year: "2021",
      title: "First 1,000 Cards",
      description: "Successfully issued our first 1,000 disability cards, establishing partnerships with major UAE retailers."
    },
    {
      year: "2022",
      title: "Carers Program Launch",
      description: "Expanded services to include Carers Cards, recognizing the vital role of caregivers in our community."
    },
    {
      year: "2023",
      title: "Customer Support Cards",
      description: "Introduced Customer Support Cards to assist individuals needing additional daily life support."
    },
    {
      year: "2024",
      title: "150+ Partners",
      description: "Reached 150+ partner organizations across UAE, providing comprehensive benefits to cardholders."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Empowering lives through comprehensive disability support services across the United Arab Emirates
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  National Disability Card Services was born from a simple yet powerful vision: to create a more 
                  inclusive UAE where every individual, regardless of their abilities or circumstances, can access 
                  the support and opportunities they deserve.
                </p>
                <p>
                  Founded in 2020, we recognized the need for a comprehensive system that would not only provide 
                  identification for people with disabilities but also connect them to a network of benefits, 
                  discounts, and support services across the country.
                </p>
                <p>
                  Today, we proudly serve thousands of cardholders through our three specialized programs: 
                  Disabilities Cards, Carers Cards, and Customer Support Cards, each designed to address 
                  specific needs within our community.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <Target className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To provide comprehensive disability card services that enhance quality of life and promote independence.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <Globe className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-gray-600">
                  A UAE where everyone can participate fully in society with dignity and equal opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Key milestones in our mission to serve the UAE community
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-green-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-green-100">Making a difference in the UAE community</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Cardholders" },
              { number: "150+", label: "Partner Organizations" },
              { number: "500+", label: "Locations Nationwide" },
              { number: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover how our services can support you or your loved ones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Learn About Our Services
            </button>
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Apply for a Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
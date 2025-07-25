import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Shield, Award, Users } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "National Disability Aid UAE",
      subtitle: "Your gateway to exclusive benefits and support services across the UAE",
      image: "/scroll_image1.png",
      cta: "Apply for Disability Aid"
    },
    {
      title: "Carers Support Services",
      subtitle: "Recognition and benefits for dedicated caregivers supporting individuals with disabilities",
      image: "/National_carer_card_scroll.png",
      cta: "Apply for Carers Support"
    },
    {
      title: "Customer Support Services",
      subtitle: "Enhanced assistance and priority support for individuals requiring additional help",
      image: "/Customer_support_card_scroll.png",
      cta: "Apply for Support Services"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
      ))}

      {/* UAE Flag Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <div className="w-full h-1/3 bg-uae-red"></div>
        <div className="w-full h-1/3 bg-uae-white"></div>
        <div className="w-full h-1/3 bg-uae-black"></div>
        <div className="absolute left-0 top-0 w-1/4 h-full bg-uae-green"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-uae-red rounded-full"></div>
                  <div className="w-4 h-4 bg-uae-green rounded-full"></div>
                  <div className="w-4 h-4 bg-uae-white border border-gray-300 rounded-full"></div>
                  <div className="w-4 h-4 bg-uae-black rounded-full"></div>
                </div>
                <span className="text-white/80 text-sm font-medium">🇦🇪 UAE Official Service</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                {slides[currentSlide].subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/apply-disabilities"
                  className="inline-flex items-center px-8 py-4 bg-uae-green text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse-glow"
                >
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/our-services"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-uae-green p-2 rounded-full animate-float">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <span className="text-lg">Official Services</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-uae-red p-2 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="text-lg">Verified Benefits</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-uae-black p-2 rounded-full animate-float" style={{ animationDelay: '1s' }}>
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-lg">UAE Approved</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white p-2 rounded-full animate-float" style={{ animationDelay: '1.5s' }}>
                    <Users className="w-6 h-6 text-uae-green" />
                  </div>
                  <span className="text-lg">Community Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-uae-green scale-125' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
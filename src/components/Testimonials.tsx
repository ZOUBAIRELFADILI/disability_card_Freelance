import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Fatima Al-Zahra",
      location: "Dubai",
      cardType: "Disabilities Card",
      rating: 5,
      text: "The National Disability Card has transformed my daily life. The discounts and priority services make everything so much easier. The application process was smooth and the staff were incredibly supportive throughout.",
      avatar: "👩"
    },
    {
      name: "Ahmed Hassan",
      location: "Abu Dhabi",
      cardType: "Carers Card",
      rating: 5,
      text: "As a caregiver for my elderly mother, the Carers Card has been a blessing. The respite services and support network have helped me provide better care while taking care of my own wellbeing.",
      avatar: "👨"
    },
    {
      name: "Sarah Mohammed",
      location: "Sharjah",
      cardType: "Customer Support Card",
      rating: 5,
      text: "The priority support and assistance I receive with my Customer Support Card has made navigating daily tasks so much easier. The 24/7 helpline is incredibly helpful and responsive.",
      avatar: "👩"
    },
    {
      name: "Omar Al-Rashid",
      location: "Ajman",
      cardType: "Disabilities Card",
      rating: 5,
      text: "The partner network is extensive and the benefits are real. From transportation to shopping, my Disabilities Card opens doors and provides genuine support when I need it most.",
      avatar: "👨"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Cardholders Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people whose lives have been enhanced 
            through our National Disability Card services.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-16 h-16 text-uae-green" />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed font-medium">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Client Info */}
              <div className="text-center">
                <div className="w-16 h-16 bg-uae-green rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].location}
                </p>
                <div className="inline-block bg-uae-green/10 text-uae-green px-3 py-1 rounded-full text-sm font-medium mt-2">
                  {testimonials[currentTestimonial].cardType}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-uae-green scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-uae-green" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">5-Star Service</h3>
            <p className="text-gray-600">Consistently rated excellent by our cardholders</p>
          </div>
          
          <div className="text-center">
            <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-8 h-8 text-uae-green" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Stories</h3>
            <p className="text-gray-600">Authentic testimonials from real cardholders</p>
          </div>
          
          <div className="text-center">
            <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-uae-green rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Reviews</h3>
            <p className="text-gray-600">All testimonials are verified and genuine</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
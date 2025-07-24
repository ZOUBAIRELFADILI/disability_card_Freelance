import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Clock, Truck, ArrowRight } from 'lucide-react';

const ApplicationProcess = () => {
  const steps = [
    {
      number: "1",
      icon: CreditCard,
      title: "Apply and pay for your card online",
      description: "Fill in our simple online form in just a few minutes, and pay securely online.",
      color: "text-blue-600"
    },
    {
      number: "2", 
      icon: Clock,
      title: "Same-day application decision",
      description: "We review your application and supporting documents on the same day, often within the hour. If your application is unsuccessful, we will refund you immediately.",
      color: "text-blue-600"
    },
    {
      number: "3",
      icon: Truck,
      title: "Tracked delivery",
      description: "We track your delivery with Royal Mail to ensure your card arrives safely. Your card will typically arrive within 5-10 days.",
      color: "text-blue-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Title and Button */}
          <div>
            <div className="mb-6">
              <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                • HOW TO APPLY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Easy Application Process
            </h2>
            <Link
              to="/apply-disabilities"
              className="inline-flex items-center px-8 py-4 bg-uae-green text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Start my application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="flex items-start space-x-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <IconComponent className={`w-6 h-6 ${step.color}`} />
                      <h3 className="text-xl font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
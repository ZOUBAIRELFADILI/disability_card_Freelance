import React, { useState, useEffect } from 'react';

const CardShowcase = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      name: "Disabilities Card",
      image: "/National-Disability-Carde.jpg",
      title: "Secure Proof of Disability for Disabled People",
      subtitle: "NATIONAL DISABILITY CARD",
      description: "The National Disability Card allows you to quickly and easily visually identify people with disabilities.",
      validity: "Valid for three years",
      leftFeatures: [
        {
          title: "Personal Information",
          description: "Featuring the card holder's name."
        },
        {
          title: "Photo Identification", 
          description: "A full colour photo prevents misuse and provides easy visual identification of the card holder."
        },
        {
          title: "High Security Features",
          description: "The card is protected by a number of high quality security features including a secure watermark over the card surface, precise intricate guilloche patterns and bespoke background and symbols."
        }
      ],
      rightFeatures: [
        {
          title: "Unique Card Number",
          description: "An individual UCN is assigned to every card."
        },
        {
          title: "UAE National Flag",
          description: "All our cards are made and exclusively issued to UAE addresses."
        },
        {
          title: "International Symbol of Access",
          description: "The ISA is maintained as an international standard (ISO 7001) by the International Commission on Technology and Accessibility (ICTA), a committee of Rehabilitation International (RI)."
        }
      ]
    },
    {
      name: "Carers Card",
      image: "/Nationality-Carers-Card.jpg",
      title: "Recognition and Support for Dedicated Caregivers",
      subtitle: "CARERS CARD",
      description: "The Carers Card provides recognition and support for those who care for individuals with disabilities.",
      validity: "Valid for three years",
      leftFeatures: [
        {
          title: "Caregiver Information",
          description: "Featuring the caregiver's name and credentials."
        },
        {
          title: "Photo Identification",
          description: "A full colour photo prevents misuse and provides easy visual identification of the caregiver."
        },
        {
          title: "High Security Features",
          description: "The card is protected by a number of high quality security features including a secure watermark over the card surface, precise intricate guilloche patterns and bespoke background and symbols."
        }
      ],
      rightFeatures: [
        {
          title: "Unique Card Number",
          description: "An individual UCN is assigned to every card."
        },
        {
          title: "UAE National Flag",
          description: "All our cards are made and exclusively issued to UAE addresses."
        },
        {
          title: "Caregiver Symbol",
          description: "International symbol representing care and support services for caregivers."
        }
      ]
    },
    {
      name: "Customer Support Card",
      image: "/National-Support-Card.jpg",
      title: "Enhanced Support for Daily Activities",
      subtitle: "CUSTOMER SUPPORT CARD",
      description: "The Customer Support Card provides enhanced assistance and priority support for individuals requiring additional help.",
      validity: "Valid for three years",
      leftFeatures: [
        {
          title: "Personal Information",
          description: "Featuring the card holder's name and details."
        },
        {
          title: "Photo Identification",
          description: "A full colour photo prevents misuse and provides easy visual identification of the card holder."
        },
        {
          title: "High Security Features",
          description: "The card is protected by a number of high quality security features including a secure watermark over the card surface, precise intricate guilloche patterns and bespoke background and symbols."
        }
      ],
      rightFeatures: [
        {
          title: "Unique Card Number",
          description: "An individual UCN is assigned to every card."
        },
        {
          title: "UAE National Flag",
          description: "All our cards are made and exclusively issued to UAE addresses."
        },
        {
          title: "Support Symbol",
          description: "International symbol representing customer support and assistance services."
        }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentCard = cards[activeCard];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">
              • {currentCard.subtitle}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {currentCard.title}
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Features */}
          <div className="lg:col-span-4 space-y-12">
            {currentCard.leftFeatures.map((feature, index) => (
              <div key={index} className="relative">
                <div className="text-right pr-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {/* Connection Line and Dot */}
                <div className="absolute right-0 top-6 flex items-center">
                  <div className="w-8 h-px bg-blue-600"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Card */}
          <div className="lg:col-span-4 flex justify-center relative">
            <div className="relative">
              <div className="w-96 h-60 rounded-2xl shadow-2xl animate-card-3d overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={currentCard.image} 
                  alt={currentCard.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              
              {/* Connection lines from card to features */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                {/* Left side connection lines */}
                <path d="M 0 50 Q 50 50 100 50" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 0 120 Q 50 120 100 120" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 0 190 Q 50 190 100 190" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.3" />
                
                {/* Right side connection lines */}
                <path d="M 296 50 Q 346 50 396 50" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 296 120 Q 346 120 396 120" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 296 190 Q 346 190 396 190" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-4 space-y-12">
            {currentCard.rightFeatures.map((feature, index) => (
              <div key={index} className="relative">
                <div className="text-left pl-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {/* Connection Line and Dot */}
                <div className="absolute left-0 top-6 flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-8 h-px bg-blue-600"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Description and CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-2">
            {currentCard.description} <strong>{currentCard.validity}</strong>
          </p>
          
          <div className="mt-8">
            <button className="bg-uae-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center">
              Become a card holder
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Card Selector */}
        <div className="mt-16 flex justify-center space-x-4">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCard === index 
                  ? 'bg-uae-green text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {card.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardShowcase;
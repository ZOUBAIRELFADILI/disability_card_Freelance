import React, { useEffect, useState, useRef } from 'react';
import { Users, Award, Clock, Heart, CreditCard, Globe } from 'lucide-react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    cardholders: 0,
    partners: 0,
    emirates: 0,
    satisfaction: 0,
    benefits: 0,
    support: 0
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: CreditCard,
      value: 25000,
      suffix: '+',
      label: 'Active Cardholders',
      description: 'Across all card types',
      color: 'text-uae-green'
    },
    {
      icon: Globe,
      value: 500,
      suffix: '+',
      label: 'Partner Locations',
      description: 'Offering exclusive benefits',
      color: 'text-uae-red'
    },
    {
      icon: Award,
      value: 7,
      suffix: '/7',
      label: 'Emirates Covered',
      description: 'Complete UAE coverage',
      color: 'text-uae-black'
    },
    {
      icon: Heart,
      value: 98,
      suffix: '%',
      label: 'Satisfaction Rate',
      description: 'Customer satisfaction score',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      value: 1000,
      suffix: '+',
      label: 'Benefits Available',
      description: 'Discounts and services',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      value: 24,
      suffix: '/7',
      label: 'Support Available',
      description: 'Round-the-clock assistance',
      color: 'text-orange-600'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        let currentCount = 0;
        const increment = stat.value / steps;
        
        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= stat.value) {
            currentCount = stat.value;
            clearInterval(timer);
          }
          
          const keys = ['cardholders', 'partners', 'emirates', 'satisfaction', 'benefits', 'support'];
          setCounts(prev => ({
            ...prev,
            [keys[index]]: Math.floor(currentCount)
          }));
        }, stepDuration);
      });
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-uae-green via-green-600 to-green-800 relative overflow-hidden">
      {/* UAE Flag Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1/4 bg-uae-red"></div>
        <div className="absolute top-1/4 left-0 w-full h-1/4 bg-white"></div>
        <div className="absolute top-2/4 left-0 w-full h-1/4 bg-uae-black"></div>
        <div className="absolute top-3/4 left-0 w-full h-1/4 bg-uae-green"></div>
        <div className="absolute top-0 left-0 w-1/6 h-full bg-uae-green opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Empowering the UAE Community
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Our commitment to excellence is reflected in the lives we've touched 
            and the comprehensive support network we've built across the Emirates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const countKeys = ['cardholders', 'partners', 'emirates', 'satisfaction', 'benefits', 'support'];
            const countKey = countKeys[index] as keyof typeof counts;
            
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="text-5xl font-bold text-white mb-2">
                    {counts[countKey]}{stat.suffix}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-green-100">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Achievement Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-lg font-semibold text-white mb-2">UAE Government Approved</h3>
              <p className="text-green-100 text-sm">Officially recognized service provider</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="text-lg font-semibold text-white mb-2">Award Winning Service</h3>
              <p className="text-green-100 text-sm">Excellence in disability support</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="text-lg font-semibold text-white mb-2">Community Focused</h3>
              <p className="text-green-100 text-sm">Building inclusive communities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
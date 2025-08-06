import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Partner {
  id: number;
  name: string;
  logo: string | null;
  category: string;
  discount: string;
  location: string;
  description: string;
}

/**
 * PartnersCarousel displays a horizontally scrolling marquee of partner logos.
 * It includes a UAE-flag accent bar at the top to match the Hero section.
 */
const PartnersCarousel: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch partners from API
    const fetchPartners = async () => {
      try {
        const response = await fetch('https://api.ndaid.help/api/partners');
        if (response.ok) {
          const data = await response.json();
          // Take only first 8 partners for the carousel
          setPartners(data.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    // Inject keyframe animation for the horizontal scrolling effect.
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes partners-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      .partners-scroll-container:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  if (loading) {
    return (
      <section className="relative py-8 bg-white">
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="flex-1 bg-uae-red"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-uae-black"></div>
          <div className="flex-1 bg-uae-green"></div>
        </div>
        <p className="text-center text-uae-black text-lg md:text-xl font-medium mt-2 mb-6">
          Backed up by leading brands:
        </p>
        <div className="overflow-hidden">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uae-red"></div>
          </div>
        </div>
      </section>
    );
  }

  // Always duplicate for smooth scrolling animation, but ensure minimum partners for visual appeal
  const minimumPartnersForScroll = 6;
  let displayPartners = [...partners];
  
  // If we have fewer partners, duplicate them to create smooth scrolling
  while (displayPartners.length < minimumPartnersForScroll) {
    displayPartners = [...displayPartners, ...partners];
  }
  
  // Then duplicate again for seamless infinite scroll
  const finalPartners = [...displayPartners, ...displayPartners];

  return (
    <section className="relative py-8 bg-white">
      <div className="absolute top-0 left-0 w-full h-1 flex">
        <div className="flex-1 bg-uae-red"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-uae-black"></div>
        <div className="flex-1 bg-uae-green"></div>
      </div>
      <p className="text-center text-uae-black text-lg md:text-xl font-medium mt-2 mb-6">
        Backed up by leading brands:
      </p>
      <div className="overflow-hidden">
        <div
          className="flex items-center whitespace-nowrap partners-scroll-container"
          style={{ animation: 'partners-scroll 25s linear infinite' }}
        >
          {finalPartners.map((partner, idx) => (
            <Link
              key={`${partner.id}-${idx}`}
              to="/partners"
              className="mx-4 flex-shrink-0"
              aria-label={`Go to partners page`}
            >
              {partner.logo ? (
                <div
                className="relative bg-white rounded-2xl p-4 shadow-md flex items-center justify-center hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
                style={{ width: '12rem', height: '7rem' }}
              >
                {/* Discount Badge */}
                {partner.discount && (
                  <span className="absolute top-2 right-2 bg-gradient-to-r from-green-600 to-green-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                    {partner.discount} OFF
                  </span>
                )}
              
                {/* Partner Logo */}
                {partner.logo ? (
                  <img
                    src={partner.logo.startsWith('http') ? partner.logo : `https://api.ndaid.help/${partner.logo}`}
                    alt={partner.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-green-600 text-lg font-bold">
                    {partner.name}
                  </div>
                )}
              </div>
              
              
              
              ) : (
                <div
                  className="bg-white rounded-md p-3 shadow-sm flex items-center justify-center text-sm font-semibold text-gray-700 hover:shadow-md transition-shadow"
                  style={{ width: '8rem', height: '4.5rem' }}
                >
                  {partner.name}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
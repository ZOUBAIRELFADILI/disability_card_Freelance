import { MapPin, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Partner, partnersApi } from '../api/partnersApi';

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const partnersData = await partnersApi.getPartners();
        // Take only first 6 partners for the home page section
        setPartners(partnersData.slice(0, 6));
      } catch (error) {
        console.error('Error loading partners:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  const categories = [
    { name: "All Partners", count: partners.length, color: "bg-uae-green" },
    { name: "Healthcare", count: partners.filter(p => p.category.toLowerCase().includes('health')).length, color: "bg-uae-red" },
    { name: "Shopping", count: partners.filter(p => p.category.toLowerCase().includes('shop') || p.category.toLowerCase().includes('retail')).length, color: "bg-uae-black" },
    { name: "Transport", count: partners.filter(p => p.category.toLowerCase().includes('transport')).length, color: "bg-blue-600" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enjoy exclusive discounts and benefits at hundreds of partner locations 
            across the UAE with your National Disability Card.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 ${category.color}`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Partner Logo */}
              <div className="h-32 bg-gray-100 overflow-hidden flex items-center justify-center">
                {partner.logo ? (
                  <img
                    src={partner.logo.startsWith('http') ? partner.logo : `https://api.ndaid.help/${partner.logo}`}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-4xl font-bold text-green-600">
                    {partner.name.charAt(0)}
                  </div>
                )}
              </div>
              
              {/* Partner Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-uae-green transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-uae-green" />
                    {partner.location}
                  </div>
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    {partner.category}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {partner.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="bg-uae-green text-white px-3 py-1 rounded-full text-sm font-bold">
                    {partner.discount}
                  </div>
                  <button className="text-uae-green hover:text-green-700 font-medium text-sm transition-colors duration-300">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-uae-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              500+
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Partner Locations</h3>
            <p className="text-gray-600">Across all seven emirates</p>
          </div>
          
          <div className="text-center">
            <div className="bg-uae-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              25%
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Discount</h3>
            <p className="text-gray-600">On products and services</p>
          </div>
          
          <div className="text-center">
            <div className="bg-uae-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              15
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
            <p className="text-gray-600">Different service sectors</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              24/7
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-gray-600">Partner assistance available</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-uae-green to-green-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Want to Become a Partner?
          </h3>
          <p className="text-xl mb-8 text-green-100">
            Join our network of partners and help us create a more inclusive UAE. 
            Reach thousands of potential customers while supporting our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-uae-green font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Partner With Us
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-uae-green transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
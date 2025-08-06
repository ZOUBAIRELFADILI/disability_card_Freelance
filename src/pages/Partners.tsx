import { Handshake, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Partner, partnersApi } from '../api/partnersApi';

const Partners: React.FC = () => {
  const stats = [
    { number: '150+', label: 'Partner Companies' },
    { number: '500+', label: 'Locations' },
    { number: '25%', label: 'Average Discount' },
    { number: '24/7', label: 'Support Available' },
  ];

  // State for dynamic data
  const [partners, setPartners] = useState<Partner[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Load partners and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [partnersData, categoriesData] = await Promise.all([
          partnersApi.getPartners(),
          partnersApi.getCategories()
        ]);
        
        setPartners(partnersData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError('Failed to load partners data');
        console.error('Error loading partners:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredPartners = partners.filter(
    (partner) =>
      (selectedCategory === 'All' || partner.category === selectedCategory) &&
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const displayedPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      {/* Hero Section with new background image */}
      <div className="relative text-white py-20">
        {/* Abu Dhabi skyline with UAE flag */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Abu_Dhabi_Skyline_UAE_Flag.jpg/1280px-Abu_Dhabi_Skyline_UAE_Flag.jpg"
          alt="Abu Dhabi skyline with UAE flag"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for readability and brand colours */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-black/40 to-green-700 opacity-80"></div>
        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Handshake className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Partners
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover the extensive network of UAE businesses offering exclusive benefits to our cardholders
          </p>
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

      {/* Filters */}
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="relative lg:w-1/3">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search partners"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 border rounded-full text-sm transition-colors ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white border-green-600'
                    : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : displayedPartners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No partners found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPartners.map((partner) => (
              <div
                key={partner.id}
                className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {partner.discount && (
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    {partner.discount}
                  </span>
                )}
                {/* Logo area */}
                <div className="flex items-center justify-center bg-green-50 h-32">
                  {partner.logo ? (
                    <img
                      src={partner.logo.startsWith('http') ? partner.logo : `https://api.ndaid.help/${partner.logo}`}
                      alt={partner.name}
                      className="h-20 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.querySelector('.fallback-initial');
                        if (fallback) {
                          (fallback as HTMLElement).style.display = 'block';
                        }
                      }}
                    />
                  ) : null}
                  <span className={`text-5xl text-green-600 ${partner.logo ? 'fallback-initial hidden' : ''}`}>
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>
        )}
      </div>

      {/* Become a Partner CTA (unchanged) */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Become Our Partner
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join our network of partners and help create a more inclusive UAE
            while growing your business
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

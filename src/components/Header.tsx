import { ChevronDown, Heart, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GoogleTranslateWidget from './GoogleTranslateWidget';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      label: 'About Us',
      dropdown: [
        { label: 'About Us', path: '/about' },
        { label: 'CEO Word', path: '/ceo-word' },
        { label: 'Our Services', path: '/our-services' },
      ],
    },
    {
      label: 'Benefits',
      dropdown: [
        { label: 'Disabilities Card', path: '/disabilities-card' },
        { label: 'Carers Card', path: '/carers-card' },
        { label: 'Customer Support Card', path: '/customer-support-card' },
        { label: 'Frequently Asked Questions (FAQ)', path: '/faq' },
      ],
    },
    {
      label: 'Partners',
      dropdown: [
        { label: 'Partners', path: '/partners' },
        { label: 'Privacy Policy', path: '/privacy-policy' },
      ],
    },
    {
      label: 'APPLY NOW',
      dropdown: [
        { label: 'Disabilities Card', path: '/apply-disabilities' },
        { label: 'Carers Card', path: '/apply-carers' },
        { label: 'Customer Support Card', path: '/apply-customer-support' },
      ],
    },
    {
      label: 'Lanyard',
      dropdown: [
        {
          label: 'Verified National Disability Lanyard',
          path: '/verified-lanyard',
        },
        { label: 'Terms and Conditions', path: '/terms-conditions' },
      ],
    },
    {
      label: 'Renew',
      dropdown: [
        { label: 'Disabilities Card', path: '/renew-disabilities' },
        { label: 'Carers Card', path: '/renew-carers' },
        { label: 'Customer Support Card', path: '/renew-customer-support' },
      ],
    },
    { label: 'Donate Now', path: '/donate' },
    { label: 'Become a Franchise', path: '/franchise' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-uae-green text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+971 4 123 4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>National Disability Card Services</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="flex items-center space-x-2">
              <span role="img" aria-label="UAE flag">
                🇦🇪
              </span>
              <span>Serving the UAE Community</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/Logo_VF.png"
                alt="NDAid Logo"
                className="h-20 w-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">NDAid</h1>
                <p className="text-sm text-uae-green">National Disability Aid</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.dropdown ? (
                    // Wrapper includes both the button and the submenu.
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                          item.label === 'APPLY NOW'
                            ? 'bg-uae-red text-white hover:bg-red-700'
                            : 'text-gray-700 hover:text-uae-green hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>

                      {activeDropdown === item.label && (
                        <div className="absolute left-0 top-full pt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-uae-green hover:text-white transition-colors duration-200"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                        location.pathname === item.path
                          ? 'text-uae-green bg-green-50'
                          : 'text-gray-700 hover:text-uae-green hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Google Translate Widget */}
            <div className="hidden lg:block">
              <GoogleTranslateWidget />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-2 bg-gray-50 border-t">
            {navigationItems.map((item) => (
              <div key={item.label} className="py-2">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium transition-colors duration-300 rounded-lg ${
                        item.label === 'APPLY NOW'
                          ? 'bg-uae-red text-white'
                          : 'text-gray-700 hover:text-uae-green hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="mt-2 ml-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-uae-green hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path!}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-300 rounded-lg ${
                      location.pathname === item.path
                        ? 'text-uae-green bg-green-50'
                        : 'text-gray-700 hover:text-uae-green hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Google Translate Widget */}
            <div className="py-4 border-t border-gray-200">
              <div className="px-4">
                <GoogleTranslateWidget />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

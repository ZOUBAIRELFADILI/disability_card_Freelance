import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/Logo.png" 
                alt="NDA Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">NDA</h3>
                <p className="text-sm text-uae-green">National Disability Aid</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The official provider of National Disability Aid services in the UAE, dedicated to 
              creating an inclusive society through comprehensive support services and 
              exclusive benefits for cardholders and their caregivers.
            </p>
            
            {/* UAE Flag */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-6 rounded-sm overflow-hidden border border-gray-600">
                <div className="w-full h-1/3 bg-uae-red"></div>
                <div className="w-full h-1/3 bg-white"></div>
                <div className="w-full h-1/3 bg-uae-black"></div>
                <div className="absolute w-2 h-6 bg-uae-green"></div>
              </div>
              <span className="text-sm text-gray-400">Proudly serving the UAE</span>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-uae-green transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-uae-green transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-uae-green transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-uae-green transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Card Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-uae-green">Our Cards</h4>
            <ul className="space-y-2">
              {[
                { to: '/disabilities-card', label: 'Disabilities Card' },
                { to: '/carers-card', label: 'Carers Card' },
                { to: '/customer-support-card', label: 'Customer Support Card' },
                { to: '/verified-lanyard', label: 'Verified Lanyard' }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-uae-green transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-uae-green">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/our-services', label: 'Our Services' },
                { to: '/partners', label: 'Partners' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-uae-green transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-uae-green">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-uae-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Sheikh Zayed Road<br />
                    Dubai, UAE<br />
                    P.O. Box 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-uae-green" />
                <span className="text-gray-300 text-sm">+971 4 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-uae-green" />
                <span className="text-gray-300 text-sm">info@gcdc.ae</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 NDA - National Disability Aid. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-uae-green text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-gray-400 hover:text-uae-green text-sm transition-colors duration-300">
                Terms & Conditions
              </Link>
              <a href="#" className="text-gray-400 hover:text-uae-green text-sm transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
          
          {/* Government Recognition */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🏛️ Officially recognized by the UAE Ministry of Community Development
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
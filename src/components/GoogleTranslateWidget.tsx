import React, { useEffect, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslateWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', flag: '🇦🇪', nativeName: 'العربية' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' }
  ];

  useEffect(() => {
    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,ar,fr,es',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          },
          'google_translate_element'
        );
        setIsLoaded(true);
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      delete window.googleTranslateElementInit;
    };
  }, []);

  const changeLanguage = (languageCode: string) => {
    if (!window.google || !window.google.translate) return;

    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = languageCode;
      selectElement.dispatchEvent(new Event('change'));
      setCurrentLanguage(languageCode);
      setIsOpen(false);
      
      // Store language preference
      localStorage.setItem('preferredLanguage', languageCode);
    }
  };

  const getCurrentLanguageInfo = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const currentLang = getCurrentLanguageInfo();

  return (
    <div className="relative">
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>
      
      {/* Custom Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-white"
          aria-label="Select Language"
        >
          <Globe className="w-5 h-5" />
          <span className="text-lg">{currentLang.flag}</span>
          <span className="hidden sm:block text-sm font-medium">{currentLang.code.toUpperCase()}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Language Dropdown */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-fade-in-up">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Select Language
              </p>
            </div>
            
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                  currentLanguage === language.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-gray-500">{language.name}</div>
                </div>
                {currentLanguage === language.code && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
            ))}
            
            <div className="px-4 py-2 border-t border-gray-100 mt-2">
              <p className="text-xs text-gray-400 flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                Powered by Google Translate
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default GoogleTranslateWidget;
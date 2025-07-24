import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is the National Disability Card service?",
          answer: "The National Disability Card service provides three types of cards (Disabilities Card, Carers Card, and Customer Support Card) that offer access to discounts, benefits, and support services across the UAE. Our mission is to enhance the quality of life for people with disabilities, their carers, and those needing additional support."
        },
        {
          question: "Who is eligible for these cards?",
          answer: "Eligibility varies by card type: Disabilities Card requires medical documentation of disability status, Carers Card requires proof of caregiving role, and Customer Support Card requires demonstration of need for additional support services. All applicants must be UAE residents with valid Emirates ID."
        },
        {
          question: "How long does the application process take?",
          answer: "Standard applications are processed within 10-15 business days. Complex cases requiring additional documentation may take up to 30 days. You will receive updates via SMS and email throughout the process."
        }
      ]
    },
    {
      category: "Application Process",
      questions: [
        {
          question: "What documents do I need to apply?",
          answer: "Required documents include: Emirates ID, passport-size photograph, medical reports (for Disabilities Card), proof of caregiving relationship (for Carers Card), and any supporting documentation relevant to your application. All documents must be original or certified copies."
        },
        {
          question: "Can I apply online?",
          answer: "Yes, you can start your application online through our website. However, you may need to visit our office for document verification and final processing. We also offer home visit services for those unable to travel."
        },
        {
          question: "Is there an application fee?",
          answer: "The application fee is AED 100 for all card types. This covers processing, card production, and first-year membership. Renewal fees are AED 50. Fee waivers may be available for those demonstrating financial hardship."
        }
      ]
    },
    {
      category: "Card Benefits",
      questions: [
        {
          question: "What discounts and benefits are available?",
          answer: "Benefits include discounts at major retailers (10-50% off), reduced rates for healthcare services, priority access at government offices, free or discounted transportation, educational support, and access to recreational facilities. Benefits vary by card type and partner availability."
        },
        {
          question: "How do I use my card to get discounts?",
          answer: "Simply present your card along with your Emirates ID at participating partner locations. Some partners may require advance booking or have specific terms. Always check with the partner before your visit to confirm current offers and requirements."
        },
        {
          question: "Can family members use my card?",
          answer: "No, cards are non-transferable and can only be used by the named cardholder. However, Carers Cards may include benefits for the person being cared for, and some family discounts may be available at select partners."
        }
      ]
    },
    {
      category: "Card Management",
      questions: [
        {
          question: "How long is my card valid?",
          answer: "Cards are valid for 3 years from the date of issue. You will receive renewal reminders 60 days before expiration. Some medical conditions may require annual reviews for continued eligibility."
        },
        {
          question: "What if I lose my card?",
          answer: "Report lost cards immediately by calling our hotline or visiting our website. A replacement card costs AED 25 and will be issued within 5-7 business days. Your benefits remain active during the replacement period with proper identification."
        },
        {
          question: "How do I update my information?",
          answer: "You can update your contact information online through your account portal. Changes to medical status, address, or other significant information may require documentation and office visit for verification."
        }
      ]
    },
    {
      category: "Partners and Services",
      questions: [
        {
          question: "Which companies are your partners?",
          answer: "Our partners include major UAE retailers like Carrefour, Emirates Airlines, Dubai Mall, ADNOC, healthcare providers, educational institutions, and government services. The full list is available on our website and is regularly updated."
        },
        {
          question: "How can businesses become partners?",
          answer: "Businesses interested in partnering with us can apply through our website or contact our partnership team. We look for companies committed to accessibility and inclusion, offering meaningful benefits to our cardholders."
        },
        {
          question: "Do you offer support services beyond discounts?",
          answer: "Yes, we provide advocacy services, assistance with government applications, connection to support groups, educational workshops, and 24/7 customer support. We also offer home visits for those unable to travel to our offices."
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Find answers to common questions about our disability card services
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms or browse all categories below.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQ.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">{category.category}</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {category.questions.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div key={itemIndex} className="p-6">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full text-left flex items-center justify-between hover:text-green-600 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {item.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="mt-4 text-gray-700 leading-relaxed">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our customer support team is here to help you with any additional questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Contact Support
            </button>
            <button className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
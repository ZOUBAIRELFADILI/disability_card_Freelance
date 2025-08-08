const API_BASE_URL = import.meta.env.VITE_API_URL;
import { ArrowRight, CheckCircle, Clock, Headphones, RefreshCw, Shield } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { trackCard } from '../api/cardApi';

const RenewCustomerSupport = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    firstName: '',
    lastName: '',
    emiratesId: '',
    phoneNumber: '',
    email: '',
    currentSupportType: '',
    renewalReason: '',
    stillRequiresSupport: true,
    hasChanges: false,
    changesDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const validationTimeoutRef = useRef<number | null>(null);
  const [cardValidation, setCardValidation] = useState({
    isValid: false,
    isChecking: false,
    message: ''
  });

  const supportTypes = [
    'General Customer Support',
    'Technical Assistance',
    'Accessibility Support',
    'Communication Support',
    'Emergency Support',
    'Other'
  ];

  const renewalReasons = [
    'Card expiring soon',
    'Lost or damaged card',
    'Change in support needs',
    'Update personal information',
    'Other'
  ];

  const validateCardNumber = async (cardNumber: string) => {
    if (cardNumber.length < 3) {
      setCardValidation({ isValid: false, isChecking: false, message: '' });
      return;
    }

    setCardValidation({ isValid: false, isChecking: true, message: 'Validating card...' });

    try {
      const result = await trackCard(cardNumber);
      
      if (result.found && result.card) {
        // Normalize card type comparison to handle different formats
        const cardType = result.card.cardType.toLowerCase();
        const isCustomerSupportCard = cardType.includes('customer') || cardType.includes('support');
        
        if (!isCustomerSupportCard) {
          setCardValidation({ 
            isValid: false, 
            isChecking: false, 
            message: 'This card is not a Customer Support Card. Please enter a valid Customer Support Card number.' 
          });
          return;
        }

        setCardValidation({ 
          isValid: true, 
          isChecking: false, 
          message: `✓ Valid Customer Support Card found for ${result.card.cardholderName}` 
        });

        // Pre-fill form with available card data
        const [firstName, ...lastNameParts] = result.card.cardholderName.split(' ');
        const lastName = lastNameParts.join(' ');
        
        setFormData(prev => ({
          ...prev,
          firstName: firstName || '',
          lastName: lastName || ''
        }));
      } else {
        setCardValidation({ 
          isValid: false, 
          isChecking: false, 
          message: 'Card not found. Please check your card number and try again.' 
        });
      }
    } catch (error) {
      setCardValidation({ 
        isValid: false, 
        isChecking: false, 
        message: 'Error validating card. Please try again.' 
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });

      // Validate card number when it changes with debouncing
      if (name === 'cardNumber') {
        if (value.length > 3) {
          // Clear previous timeout
          if (validationTimeoutRef.current) {
            clearTimeout(validationTimeoutRef.current);
          }
          // Set new timeout for validation
          validationTimeoutRef.current = setTimeout(() => {
            validateCardNumber(value);
          }, 500);
        } else {
          setCardValidation({ isValid: false, isChecking: false, message: '' });
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if card number is valid before submission
    if (!cardValidation.isValid) {
      setErrorMessage('Please enter a valid Customer Support Card number before submitting the renewal.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/renewal/customer-support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          cardNumber: '',
          firstName: '',
          lastName: '',
          emiratesId: '',
          phoneNumber: '',
          email: '',
          currentSupportType: '',
          renewalReason: '',
          stillRequiresSupport: true,
          hasChanges: false,
          changesDescription: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'An error occurred while submitting your renewal application.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/support_renew.png')" }} // Replace with your image
      >
        {/* Green overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-uae-black opacity-70 via-black/40 to-uae-black opacity-70"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RefreshCw className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Renew Customer Support Card
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
          Continue receiving enhanced assistance and priority support. Renew your 
          Customer Support Card to maintain access to dedicated support services.
          </p>
        </div>
      </section>

      {/* Renewal Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Process</h3>
              <p className="text-gray-600">Streamlined renewal for existing cardholders</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Continuous Support</h3>
              <p className="text-gray-600">No interruption to your priority services</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Headphones className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced Services</h3>
              <p className="text-gray-600">Access to latest support programs and features</p>
            </div>
          </div>
        </div>
      </section>

      {/* Renewal Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Support Card Renewal</h2>
              <p className="text-gray-600">Please provide your current card details and any updates to your support needs</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Card Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Card Information</h3>
                <div className="text-sm text-blue-600 mb-4 bg-blue-50 p-3 rounded-lg">
                  <strong>Note:</strong> Verification is based on your Customer Support Card Number. Please enter your valid Customer Support Card number.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Support Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your current card number (required)"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 ${
                        cardValidation.isChecking ? 'border-blue-300' : 
                        cardValidation.isValid ? 'border-green-300 bg-green-50' : 
                        formData.cardNumber.length > 5 && !cardValidation.isValid ? 'border-red-300 bg-red-50' : 
                        'border-gray-300'
                      }`}
                    />
                    {cardValidation.isChecking && (
                      <p className="text-sm text-blue-600 mt-1 flex items-center">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                        {cardValidation.message}
                      </p>
                    )}
                    {!cardValidation.isChecking && cardValidation.message && (
                      <p className={`text-sm mt-1 ${cardValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                        {cardValidation.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emirates ID (Optional)</label>
                    <input
                      type="text"
                      name="emiratesId"
                      value={formData.emiratesId}
                      onChange={handleInputChange}
                      placeholder="784-XXXX-XXXXXXX-X (optional)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+971 XX XXX XXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Support Needs */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Support Needs</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Support Type *</label>
                  <select
                    name="currentSupportType"
                    required
                    value={formData.currentSupportType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                  >
                    <option value="">Select current support type</option>
                    {supportTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="stillRequiresSupport"
                      checked={formData.stillRequiresSupport}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-800"
                    />
                    <label className="ml-3 text-sm font-medium text-gray-700">
                      I still require customer support services
                    </label>
                  </div>
                </div>
              </div>

              {/* Renewal Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Renewal *</label>
                <select
                  name="renewalReason"
                  required
                  value={formData.renewalReason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                >
                  <option value="">Select reason</option>
                  {renewalReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              {/* Changes Section */}
              <div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="hasChanges"
                    checked={formData.hasChanges}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-800"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700">
                    I have changes to my support needs or personal information
                  </label>
                </div>

                {formData.hasChanges && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please describe the changes *
                    </label>
                    <textarea
                      name="changesDescription"
                      required={formData.hasChanges}
                      rows={4}
                      value={formData.changesDescription}
                      onChange={handleInputChange}
                      placeholder="Describe any changes to your support needs, contact information, or other relevant details..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Important Information */}
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Renewal Process</h4>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span>We'll assess your current support needs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span>Updated support plan may be developed</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span>Your renewed card will be produced and delivered</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span>Priority support services continue without interruption</span>
                  </li>
                </ul>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-700">Renewal application submitted successfully! We will contact you within 48 hours.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <p className="text-red-700">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Renewal Application'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Renewal Information */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Renewal Fee</h3>
              <p className="text-3xl font-bold text-gray-800 mb-2">AED 50</p>
              <p className="text-gray-600">One-time renewal fee for 2-year validity</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time</h3>
              <p className="text-3xl font-bold text-gray-800 mb-2">5-7 Days</p>
              <p className="text-gray-600">Standard processing for renewal applications</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Validity</h3>
              <p className="text-3xl font-bold text-gray-800 mb-2">2 Years</p>
              <p className="text-gray-600">Extended validity period from renewal date</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RenewCustomerSupport;
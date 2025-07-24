import React, { useState } from 'react';
import { Heart, CreditCard, Users, Target, CheckCircle, ArrowRight } from 'lucide-react';

const DonateNow = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isAnonymous: false
  });

  const predefinedAmounts = [50, 100, 250, 500, 1000, 2500];

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'donationAmount') {
      setDonationAmount(value);
    } else if (name === 'donationType') {
      setDonationType(value);
    } else {
      setDonorInfo({
        ...donorInfo,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your generous donation of AED ${donationAmount}! You will be redirected to the secure payment gateway.`);
  };

  const impactAreas = [
    {
      icon: Users,
      title: "Support Services",
      description: "Fund personal support services for individuals with disabilities",
      impact: "AED 100 provides 2 hours of personal support"
    },
    {
      icon: Target,
      title: "Equipment & Aids",
      description: "Provide essential assistive technology and mobility aids",
      impact: "AED 500 helps purchase mobility equipment"
    },
    {
      icon: Heart,
      title: "Caregiver Support",
      description: "Support respite care and training programs for caregivers",
      impact: "AED 250 funds caregiver training workshops"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-uae-red to-red-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Donate Now
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Your generous donation helps us provide essential services and support 
            to individuals with disabilities and their caregivers across the UAE.
          </p>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how your donation directly supports our mission to create an inclusive UAE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-uae-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-uae-red" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{area.title}</h3>
                  <p className="text-gray-600 mb-4">{area.description}</p>
                  <div className="bg-uae-red/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-uae-red">{area.impact}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Donation</h2>
              <p className="text-gray-600">Every contribution makes a difference in someone's life</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Donation Type */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-uae-red transition-colors">
                    <input
                      type="radio"
                      name="donationType"
                      value="one-time"
                      checked={donationType === 'one-time'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-uae-red border-gray-300 focus:ring-uae-red"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">One-time Donation</p>
                      <p className="text-sm text-gray-600">Make a single donation</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-uae-red transition-colors">
                    <input
                      type="radio"
                      name="donationType"
                      value="monthly"
                      checked={donationType === 'monthly'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-uae-red border-gray-300 focus:ring-uae-red"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Monthly Donation</p>
                      <p className="text-sm text-gray-600">Recurring monthly support</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Donation Amount */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Amount (AED)</h3>
                
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border-2 font-medium transition-all ${
                        donationAmount === amount.toString()
                          ? 'border-uae-red bg-uae-red text-white'
                          : 'border-gray-200 text-gray-700 hover:border-uae-red'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">AED</span>
                    <input
                      type="number"
                      name="donationAmount"
                      value={donationAmount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      min="10"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                    />
                  </div>
                </div>
              </div>

              {/* Donor Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={donorInfo.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={donorInfo.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={donorInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={donorInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+971 XX XXX XXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isAnonymous"
                      checked={donorInfo.isAnonymous}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-uae-red border-gray-300 rounded focus:ring-uae-red"
                    />
                    <span className="ml-3 text-sm text-gray-700">Make this donation anonymous</span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <CreditCard className="w-6 h-6 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">Secure Payment Gateway</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Your donation will be processed through our secure payment gateway. 
                    We accept all major credit cards and bank transfers.
                  </p>
                  <div className="flex space-x-4">
                    <div className="bg-white p-2 rounded border">💳 Visa</div>
                    <div className="bg-white p-2 rounded border">💳 Mastercard</div>
                    <div className="bg-white p-2 rounded border">🏦 Bank Transfer</div>
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Tax Deductible Donation</h4>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Your donation is tax-deductible under UAE law</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Official receipt will be provided for tax purposes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>100% of your donation goes directly to our programs</span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={!donationAmount || parseFloat(donationAmount) < 10}
                  className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto ${
                    donationAmount && parseFloat(donationAmount) >= 10
                      ? 'bg-uae-red text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Donate AED {donationAmount || '0'} {donationType === 'monthly' ? '/month' : ''}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Thank You to Our Supporters
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We are grateful to all our donors who make our mission possible
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-uae-red mb-2">500+</div>
              <div className="text-gray-600">Individual Donors</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-uae-red mb-2">AED 2M+</div>
              <div className="text-gray-600">Total Donations</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-uae-red mb-2">1,000+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateNow;
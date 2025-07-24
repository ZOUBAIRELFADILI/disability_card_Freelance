import React, { useState } from 'react';
import { CheckCircle, ArrowRight, RefreshCw, Clock, Shield, Heart } from 'lucide-react';

const RenewCarers = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    firstName: '',
    lastName: '',
    emiratesId: '',
    phone: '',
    email: '',
    careRecipientName: '',
    stillCaregiving: true,
    hasChanges: false,
    changesDescription: '',
    renewalReason: ''
  });

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
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Carers Card renewal application submitted successfully! We will contact you within 48 hours.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-uae-red py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RefreshCw className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Renew Carers Card
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Continue your recognition as a dedicated caregiver. Renew your Carers Card 
            to maintain access to support services and caregiver benefits.
          </p>
        </div>
      </section>

      {/* Renewal Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-uae-red/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-uae-red" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Process</h3>
              <p className="text-gray-600">Streamlined renewal for existing cardholders</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-uae-red/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-uae-red" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Continuous Support</h3>
              <p className="text-gray-600">No interruption to your caregiver services</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-uae-red/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-uae-red" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Updated Benefits</h3>
              <p className="text-gray-600">Access to latest caregiver support programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Renewal Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Carers Card Renewal</h2>
              <p className="text-gray-600">Please provide your current card details and any updates to your caregiving situation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Card Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Card Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Carers Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your current card number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emirates ID *</label>
                    <input
                      type="text"
                      name="emiratesId"
                      required
                      value={formData.emiratesId}
                      onChange={handleInputChange}
                      placeholder="784-XXXX-XXXXXXX-X"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+971 XX XXX XXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                    />
                  </div>
                </div>
              </div>

              {/* Caregiving Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Caregiving Status</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Care Recipient Name *</label>
                  <input
                    type="text"
                    name="careRecipientName"
                    required
                    value={formData.careRecipientName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="stillCaregiving"
                      checked={formData.stillCaregiving}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-uae-red border-gray-300 rounded focus:ring-uae-red"
                    />
                    <label className="ml-3 text-sm font-medium text-gray-700">
                      I am still actively providing care to this person
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red"
                >
                  <option value="">Select reason</option>
                  <option value="expiring">Card is expiring</option>
                  <option value="expired">Card has expired</option>
                  <option value="damaged">Card is damaged</option>
                  <option value="lost">Card was lost</option>
                  <option value="stolen">Card was stolen</option>
                  <option value="update">Need to update information</option>
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
                    className="w-4 h-4 text-uae-red border-gray-300 rounded focus:ring-uae-red"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700">
                    I have changes to my caregiving situation or personal information
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
                      placeholder="Describe any changes to your caregiving situation, contact information, or other relevant details..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-red focus:border-uae-red resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Important Information */}
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-red-900 mb-4">Renewal Process</h4>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>We'll verify your current caregiving status</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Updated documentation may be required</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Your renewed card will be produced and delivered</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Caregiver benefits continue without interruption</span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="px-8 py-4 bg-uae-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
                >
                  Submit Renewal Application
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
              <p className="text-3xl font-bold text-uae-red mb-2">AED 50</p>
              <p className="text-gray-600">One-time renewal fee for 3-year validity</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time</h3>
              <p className="text-3xl font-bold text-uae-red mb-2">5-7 Days</p>
              <p className="text-gray-600">Standard processing for renewal applications</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Validity</h3>
              <p className="text-3xl font-bold text-uae-red mb-2">3 Years</p>
              <p className="text-gray-600">Extended validity period from renewal date</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RenewCarers;
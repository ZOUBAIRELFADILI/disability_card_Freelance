import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { paymentAPI } from '../api/paymentApi';

interface PaymentStepProps {
  amount: number;
  cardType: string;
  applicationId: number;
  applicationType: string;
  paymentData: {
    paymentType: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  onPaymentDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  includeLanyard: boolean;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  amount,
  cardType,
  applicationId,
  applicationType,
  paymentData,
  onPaymentDataChange,
  includeLanyard,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const baseAmount = amount - (includeLanyard ? 20 : 0);
  const lanyardAmount = includeLanyard ? 20 : 0;

  const handleBankTransferConfirm = async () => {
    console.log('=== Starting Payment Process ===');
    console.log('Payment Data:', paymentData);
    console.log('Application Type:', applicationType);
    console.log('Application ID:', applicationId);
    console.log('Amount:', amount);

    if (!paymentData.firstName || !paymentData.lastName || !paymentData.phoneNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const payment = {
        applicationType,
        applicationId,
        firstName: paymentData.firstName,
        lastName: paymentData.lastName,
        phoneNumber: paymentData.phoneNumber,
        baseAmount,
        lanyardAmount,
        totalAmount: amount,
        includeLanyard,
        paymentMethod: 'bank-transfer',
        paymentStatus: 'Confirmed'
      };

      console.log('Creating payment with data:', payment);

      const response = await paymentAPI.createPayment(payment);
      
      console.log('Payment API Response:', response);

      toast.success(`Payment Confirmed! Your ${cardType.toLowerCase()} application and payment have been submitted successfully. We will process your application within 48 hours.`);
      
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);

    } catch (error) {
      console.error('Payment creation failed:', error);
      toast.error('Payment submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h3>
      
      {/* Payment Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Payment Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{cardType}</span>
            <span className="font-medium">AED {baseAmount}</span>
          </div>
          {includeLanyard && (
            <div className="flex justify-between">
              <span className="text-gray-600">Verified Global Disability Lanyard</span>
              <span className="font-medium">AED {lanyardAmount}</span>
            </div>
          )}
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>AED {amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Payment Method
        </label>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="bank-transfer"
              name="paymentType"
              value="bank-transfer"
              checked={paymentData.paymentType === 'bank-transfer'}
              onChange={onPaymentDataChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="bank-transfer" className="ml-3 text-sm font-medium text-gray-700">
              Bank Transfer (Available Now)
            </label>
          </div>
          <div className="flex items-center opacity-50">
            <input
              type="radio"
              id="credit-card"
              name="paymentType"
              value="credit-card"
              disabled
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="credit-card" className="ml-3 text-sm font-medium text-gray-500">
              Credit Card (Coming Soon)
            </label>
          </div>
        </div>
      </div>

      {/* Bank Transfer Form */}
      {paymentData.paymentType === 'bank-transfer' && (
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Bank Transfer Instructions</h5>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Bank:</strong> Emirates NBD</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>IBAN:</strong> AE070260001234567890</p>
              <p><strong>Amount:</strong> AED {amount}</p>
              <p><strong>Reference:</strong> {applicationType}-{applicationId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={paymentData.firstName}
                onChange={onPaymentDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your first name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={paymentData.lastName}
                onChange={onPaymentDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your last name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={paymentData.phoneNumber}
              onChange={onPaymentDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+971 XX XXX XXXX"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleBankTransferConfirm}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Confirm Bank Transfer Payment'}
          </button>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-4">
        <p>• After confirming, please complete the bank transfer using the details above.</p>
        <p>• Your application will be processed once payment is received (usually within 1-2 business days).</p>
        <p>• You will receive a confirmation email with your application details.</p>
      </div>
    </div>
  );
};

export default PaymentStep;

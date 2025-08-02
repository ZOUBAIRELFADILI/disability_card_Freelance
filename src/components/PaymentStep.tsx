import React from 'react';
import { DollarSign, Copy, Phone, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PaymentStepProps {
  amount: number;
  cardType: string;
  paymentData: {
    paymentType: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  onPaymentDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  includeLanyard?: boolean;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  amount,
  cardType,
  paymentData,
  onPaymentDataChange,
  onSubmit,
  isSubmitting = false,
  includeLanyard = false
}) => {
  const companyIBAN = 'GB82WEST12345698765432';

  const copyIBANToClipboard = () => {
    navigator.clipboard.writeText(companyIBAN);
    toast.success('IBAN copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Payment</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            {cardType} Application Fee: <span className="font-bold text-green-600">AED {amount - (includeLanyard ? 20 : 0)}</span>
          </p>
          {includeLanyard && (
            <p className="text-gray-600">
              Verified Lanyard: <span className="font-bold text-blue-600">AED 20</span>
            </p>
          )}
          <p className="text-lg font-bold text-gray-900">
            Total Amount: <span className="text-green-600">AED {amount}</span>
          </p>
        </div>
      </div>

      {/* Company IBAN */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Bank Details</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IBAN Number</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={companyIBAN}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
              />
              <button
                type="button"
                onClick={copyIBANToClipboard}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
            <input
              type="text"
              value="National Disability Aid UAE"
              readOnly
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="text"
              value={`AED ${amount}`}
              readOnly
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Payment Type Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
            <input
              type="radio"
              name="paymentType"
              value="bank-transfer"
              checked={paymentData.paymentType === 'bank-transfer'}
              onChange={onPaymentDataChange}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900">Bank Transfer</p>
              <p className="text-sm text-gray-600">Transfer directly to our bank account</p>
            </div>
          </label>
          
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-not-allowed opacity-60">
            <input
              type="radio"
              name="paymentType"
              value="paypal"
              disabled
              className="w-4 h-4 text-gray-400 border-gray-300"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-500">PayPal</p>
              <p className="text-sm text-gray-400">Coming Soon</p>
            </div>
          </label>
          
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-not-allowed opacity-60">
            <input
              type="radio"
              name="paymentType"
              value="credit-card"
              disabled
              className="w-4 h-4 text-gray-400 border-gray-300"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-500">Credit Card</p>
              <p className="text-sm text-gray-400">Coming Soon</p>
            </div>
          </label>
        </div>
      </div>

      {/* Bank Transfer Form */}
      {paymentData.paymentType === 'bank-transfer' && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-green-900 mb-4">Confirm Bank Transfer Details</h4>
          <p className="text-sm text-green-700 mb-4">
            If you made a bank transfer, please enter your details below to confirm.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={paymentData.firstName}
                onChange={onPaymentDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={paymentData.lastName}
                onChange={onPaymentDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              value={paymentData.phoneNumber}
              onChange={onPaymentDataChange}
              placeholder="+971 XX XXX XXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      )}

      {/* Coming Soon Message for Other Payment Methods */}
      {(paymentData.paymentType === 'paypal' || paymentData.paymentType === 'credit-card') && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center">
          <h4 className="text-lg font-semibold text-yellow-800 mb-2">Coming Soon</h4>
          <p className="text-yellow-700">
            This payment method is not available yet. Please use Bank Transfer for now.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentStep;
import { AlertCircle, ArrowLeft, CreditCard, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCheckoutSession, redirectToCheckout } from '../utils/stripe';

interface PaymentProps {
  amount: number;
  cardType: string;
  applicationData: any;
}

const StripePayment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 300, cardType = 'Disabilities Card', applicationData } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const STRIPE_SERVICE_URL = import.meta.env.VITE_STRIPE_SERVICE_URL || 'http://localhost:3001';

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Check if backend is available first
      const healthCheck = await fetch(`${STRIPE_SERVICE_URL}/health`).catch(() => null);
      
      if (!healthCheck || !healthCheck.ok) {
        throw new Error('Payment service is currently unavailable. Please try again later or contact support.');
      }

      // Create checkout session
      const sessionId = await createCheckoutSession(amount, cardType, applicationData);
      
      // Redirect to Stripe Checkout
      await redirectToCheckout(sessionId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start payment process. Please try again.';
      setError(errorMessage);
      console.error('Payment error:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Application
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Secure payment for your {cardType}</p>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-600">{cardType} Application Fee</span>
            <span className="font-semibold">{amount} AED</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-600">Processing Fee</span>
            <span className="font-semibold">0 AED</span>
          </div>
          <div className="flex justify-between items-center py-3 font-bold text-lg">
            <span>Total</span>
            <span className="text-uae-green">{amount} AED</span>
          </div>
        </div>

        {/* Application Details */}
        {applicationData && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Name:</strong> {applicationData.firstName} {applicationData.lastName}</p>
                <p><strong>Email:</strong> {applicationData.email}</p>
              </div>
              <div>
                <p><strong>Phone:</strong> {applicationData.phone}</p>
                <p><strong>Emirates ID:</strong> {applicationData.emiratesId}</p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Lock className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">Secure Payment with Stripe</span>
          </div>

          <div className="text-center mb-6">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Checkout</h3>
            <p className="text-gray-600">
              You will be redirected to Stripe's secure checkout page to complete your payment.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Test Mode Information</h4>
            <p className="text-blue-800 text-sm mb-2">
              This is a test payment. Use the following test card details:
            </p>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Card Number: 4242 4242 4242 4242</li>
              <li>• Expiry: Any future date (e.g., 12/25)</li>
              <li>• CVV: Any 3 digits (e.g., 123)</li>
              <li>• Name: Any name</li>
            </ul>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-uae-green hover:bg-green-700 transform hover:scale-105'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Redirecting to Stripe...
              </div>
            ) : (
              `Pay ${amount} AED with Stripe`
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Powered by Stripe • Your payment is secured by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePayment;
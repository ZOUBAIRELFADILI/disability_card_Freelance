import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder_key_for_development');

const STRIPE_SERVICE_URL = import.meta.env.VITE_STRIPE_SERVICE_URL || 'http://localhost:3001';

export default stripePromise;

export const createCheckoutSession = async (amount: number, cardType: string, applicationData: any) => {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${STRIPE_SERVICE_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        amount,
        cardType,
        applicationData,
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Payment service timeout. Please check your connection and try again.');
    }
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;
  
  if (!stripe) {
    throw new Error('Stripe failed to initialize');
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    throw error;
  }
};
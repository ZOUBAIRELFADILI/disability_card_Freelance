/* import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const stripe = new Stripe('');

const app = express();

app.use(cors({
  origin: ['https://api.ndaid.help/', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, cardType, applicationData } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aed',
            product_data: {
              name: `${cardType} Application Fee`,
              description: `Application fee for ${cardType}`,
            },
            unit_amount: amount * 100, // Convert to fils (AED cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://api.ndaid.help/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://api.ndaid.help/payment?payment=cancelled`,
      metadata: {
        cardType: cardType,
        applicantName: `${applicationData?.firstName || ''} ${applicationData?.lastName || ''}`,
        emiratesId: applicationData?.emiratesId || '',
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.get('/checkout-session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ error: 'Failed to retrieve checkout session' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Stripe payment server running on port ${PORT}`);
  console.log(`🔗 Frontend should connect to: http://localhost:${PORT}`);
}); */
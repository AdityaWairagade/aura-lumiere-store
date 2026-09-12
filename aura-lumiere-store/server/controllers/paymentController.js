import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Order from '../models/orderModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd', orderId } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error('Invalid payment amount');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // convert to cents
    currency,
    metadata: {
      orderId: orderId || '',
      userId: req.user._id.toString(),
    },
  });

  res.json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

// @desc    Handle Stripe webhook
// @route   POST /api/payments/webhook
// @access  Public (Stripe)
export const stripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody || req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    res.status(400);
    throw new Error(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          isPaid: true,
          paidAt: new Date(),
          status: 'processing',
          paymentResult: {
            id: paymentIntent.id,
            status: paymentIntent.status,
          },
        });
      }
      break;
    }
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

import express from 'express';
import {
  createPaymentIntent,
  stripeWebhook,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Webhook needs raw body — use express.raw for this route
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

router.post('/create-payment-intent', protect, createPaymentIntent);

export default router;

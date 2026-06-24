import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/paymentsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', authenticateToken, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;

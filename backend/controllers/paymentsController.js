import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(req, res) {
    try {
        const { plan } = req.body;
        const userId = req.user.id; // Din middleware JWT

        // TODO: Mapare plan la Stripe price ID
        const session = await stripe.checkout.sessions.create({
            customer_email: req.user.email,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: 'price_placeholder',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: 'https://yourdomain.com/success',
            cancel_url: 'https://yourdomain.com/cancel',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: 'Checkout failed' });
    }
}

export async function handleWebhook(req, res) {
    try {
        // TODO: Implementare webhook handler pentru Stripe events
        const event = stripe.webhooks.constructEvent(
            req.body,
            req.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );

        console.log('Webhook event:', event.type);
        res.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(400).json({ error: 'Webhook failed' });
    }
}

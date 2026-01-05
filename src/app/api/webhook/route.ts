import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { PRODUCTS } from '@/lib/constants';
import { completeOrder, failOrder } from '@/lib/db/orders';
import { prisma } from '@/lib/db';

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2025-12-15.clover',
  });
}

function getProductName(productType: string): string {
  switch (productType) {
    case 'discretionary':
      return PRODUCTS.discretionary.name;
    case 'unit':
      return PRODUCTS.unit.name;
    case 'discretionary-bundle':
      return PRODUCTS.discretionaryBundle.name;
    case 'company-registration':
      return PRODUCTS.companyRegistration.name;
    case 'smsf-bundle':
      return PRODUCTS.smsfBundle.name;
    default:
      return 'Trust Document';
  }
}

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Checkout session expired: ${session.id}`);
      // Could notify the user or log for analytics
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentFailed(paymentIntent);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      console.log(`Charge refunded: ${charge.id}, amount: ${charge.amount_refunded}`);
      // Could send refund confirmation email
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`Payment successful for session: ${session.id}`);

  // Only process if payment is complete
  if (session.payment_status !== 'paid') {
    console.log('Payment not yet complete, skipping');
    return;
  }

  const metadata = session.metadata;
  const productType = metadata?.productType || metadata?.trustType || 'discretionary';
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name || 'Customer';

  // Complete the order in the database
  try {
    await completeOrder(session.id, {
      email: customerEmail || undefined,
      stripePaymentId: session.payment_intent as string,
    });
    console.log(`Order completed in database for session: ${session.id}`);

    // If customer has an account with this email, link the order
    if (customerEmail && !metadata?.userId) {
      const user = await prisma.user.findUnique({
        where: { email: customerEmail },
      });
      if (user) {
        await prisma.order.updateMany({
          where: { stripeSessionId: session.id, userId: null },
          data: { userId: user.id },
        });
        console.log(`Linked guest order to user: ${user.id}`);
      }
    }
  } catch (error) {
    console.error('Failed to update order in database:', error);
  }

  if (!customerEmail) {
    console.log('No customer email found, skipping confirmation email');
    return;
  }

  try {
    await sendOrderConfirmationEmail({
      customerEmail,
      customerName,
      productName: getProductName(productType),
      productType,
      amount: session.amount_total || 0,
      orderId: session.id.substring(0, 14).toUpperCase(),
    });
    console.log(`Order confirmation email sent to ${customerEmail}`);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }

  // Log order for processing
  console.log('Order details:', {
    sessionId: session.id,
    productType,
    customerEmail,
    customerName,
    amount: session.amount_total,
    paymentStatus: session.payment_status,
  });

  // For bundle products, this would trigger the registration process
  if (['discretionary-bundle', 'company-registration', 'smsf-bundle'].includes(productType)) {
    console.log(`Order requires manual processing: ${productType}`);
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment failed: ${paymentIntent.id}`);
  console.log(`Failure reason: ${paymentIntent.last_payment_error?.message}`);

  // In production, you might:
  // - Send failure notification to customer
  // - Log for analytics
  // - Update order status in database

  const customerEmail = paymentIntent.receipt_email;
  if (customerEmail) {
    console.log(`Payment failed notification would be sent to: ${customerEmail}`);
    // Could implement sendPaymentFailedEmail here
  }
}

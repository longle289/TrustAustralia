import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { PRODUCTS } from '@/lib/constants';
import { getOrderByStripeSession, completeOrder } from '@/lib/db/orders';
import { prisma } from '@/lib/db';

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2024-12-18.acacia',
  });
}

// Track sent emails to avoid duplicates (in-memory for simplicity)
const sentEmails = new Set<string>();

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

function getEntityName(productType: string, formData: Record<string, unknown>): string {
  switch (productType) {
    case 'discretionary':
    case 'unit':
    case 'discretionary-bundle':
      return (formData?.trustDetails as Record<string, string>)?.trustName || 'Your Trust';
    case 'company-registration':
      return (formData?.companyDetails as Record<string, string>)?.proposedName || 'Your Company';
    case 'smsf-bundle':
      return (formData?.smsfDetails as Record<string, string>)?.fundName || 'Your SMSF';
    default:
      return 'Your Order';
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Extract details from metadata
    const metadata = session.metadata;
    const productType = metadata?.productType || metadata?.trustType || 'discretionary';
    const formData = metadata?.formData ? JSON.parse(metadata.formData) : {};
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Customer';

    // Ensure order is completed in database (backup to webhook)
    try {
      const existingOrder = await getOrderByStripeSession(sessionId);
      if (existingOrder && existingOrder.status !== 'COMPLETED') {
        await completeOrder(sessionId, {
          email: customerEmail || undefined,
          stripePaymentId: session.payment_intent as string,
        });

        // Link guest order to user if they have an account
        if (customerEmail && !existingOrder.userId) {
          const user = await prisma.user.findUnique({
            where: { email: customerEmail },
          });
          if (user) {
            await prisma.order.update({
              where: { id: existingOrder.id },
              data: { userId: user.id },
            });
          }
        }
      }
    } catch (dbError) {
      console.error('Failed to update order in database:', dbError);
    }

    // Send order confirmation email (only once per session)
    if (customerEmail && !sentEmails.has(sessionId)) {
      try {
        await sendOrderConfirmationEmail({
          customerEmail,
          customerName,
          productName: getProductName(productType),
          productType,
          amount: session.amount_total || 0,
          orderId: sessionId.substring(0, 14).toUpperCase(),
        });
        sentEmails.add(sessionId);

        // Clean up old entries after 1 hour to prevent memory leak
        setTimeout(() => sentEmails.delete(sessionId), 60 * 60 * 1000);
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      trustType: productType,
      trustName: getEntityName(productType, formData),
      amount: (session.amount_total || 0) / 100,
      date: new Date().toLocaleDateString('en-AU'),
      paymentStatus: session.payment_status,
      customerEmail,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRODUCTS } from '@/lib/constants';
import { auth } from '@/lib/auth';
import { createOrder, updateOrderWithStripeSession } from '@/lib/db/orders';

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2024-12-18.acacia',
  });
}

type ProductType = 'discretionary' | 'unit' | 'discretionary-bundle' | 'company-registration' | 'smsf-bundle';

const validProductTypes: ProductType[] = [
  'discretionary',
  'unit',
  'discretionary-bundle',
  'company-registration',
  'smsf-bundle',
];

function getProductByType(type: ProductType) {
  switch (type) {
    case 'discretionary':
      return PRODUCTS.discretionary;
    case 'unit':
      return PRODUCTS.unit;
    case 'discretionary-bundle':
      return PRODUCTS.discretionaryBundle;
    case 'company-registration':
      return PRODUCTS.companyRegistration;
    case 'smsf-bundle':
      return PRODUCTS.smsfBundle;
    default:
      return null;
  }
}

function getCancelUrl(type: ProductType): string {
  switch (type) {
    case 'discretionary':
      return '/create/discretionary';
    case 'unit':
      return '/create/unit';
    case 'discretionary-bundle':
      return '/create/discretionary-bundle';
    case 'company-registration':
      return '/register/company';
    case 'smsf-bundle':
      return '/create/smsf-bundle';
    default:
      return '/';
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const { type, formData } = body;

    // Validate product type
    if (!validProductTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid product type' },
        { status: 400 }
      );
    }

    const product = getProductByType(type as ProductType);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 400 }
      );
    }

    const priceInCents = product.price * 100;

    // Create order in database
    const order = await createOrder({
      userId: session?.user?.id || null,
      email: session?.user?.email || '',
      productType: type,
      productName: product.name,
      amount: priceInCents,
      formData: formData || {},
    });

    const stripe = getStripeClient();

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}${getCancelUrl(type as ProductType)}`,
      customer_email: session?.user?.email || undefined,
      metadata: {
        productType: type,
        formData: JSON.stringify(formData),
        orderId: order.id,
        userId: session?.user?.id || '',
      },
    });

    // Update order with Stripe session ID
    await updateOrderWithStripeSession(order.id, stripeSession.id);

    return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

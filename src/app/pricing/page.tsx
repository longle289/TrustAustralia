import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for Australian trust deeds. Create your Discretionary Trust or Unit Trust online.',
};

export default function PricingPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Simple Pricing
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Transparent, Affordable Pricing
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            One-time payment. No subscriptions. No hidden fees. Download your
            trust deed instantly after purchase.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-2 mb-16">
          {/* Discretionary Trust Card */}
          <Card className="relative flex flex-col border-2 border-primary">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
              Most Popular
            </Badge>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">
                {PRODUCTS.discretionary.name}
              </CardTitle>
              <CardDescription>Also known as a Family Trust</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold text-foreground">
                  ${PRODUCTS.discretionary.price}
                </span>
                <span className="text-muted-foreground ml-2">AUD</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                One-time payment
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {PRODUCTS.discretionary.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" size="lg">
                <Link href="/create/discretionary">
                  Create Discretionary Trust
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Unit Trust Card */}
          <Card className="relative flex flex-col border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{PRODUCTS.unit.name}</CardTitle>
              <CardDescription>Fixed entitlement structure</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold text-foreground">
                  ${PRODUCTS.unit.price}
                </span>
                <span className="text-muted-foreground ml-2">AUD</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                One-time payment
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {PRODUCTS.unit.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link href="/create/unit">
                  Create Unit Trust
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* What's Included */}
        <div className="mx-auto max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            What&apos;s Included
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Professional PDF trust deed document',
              'Simple guided setup wizard',
              'Plain English explanations',
              'Instant download after payment',
              'Email confirmation and receipt',
              'Australian compliant documentation',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg"
              >
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mx-auto max-w-3xl mb-16">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium">Secure Payment</span>
              <span className="text-xs text-muted-foreground">
                via Stripe
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary mb-1">
                10,000+
              </span>
              <span className="text-sm font-medium">Trusts Created</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary mb-1">256</span>
              <span className="text-sm font-medium">Bit SSL Encryption</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Pricing FAQ
          </h2>
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Are there any hidden fees?
              </h3>
              <p className="text-muted-foreground">
                No. The price shown is the total price. There are no additional
                fees, subscriptions, or charges.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Do I need to create an account?
              </h3>
              <p className="text-muted-foreground">
                No. You can complete your purchase as a guest. Your trust deed
                will be available for immediate download after payment.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards (Visa, Mastercard, American
                Express) through our secure payment provider, Stripe.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Can I get a refund?
              </h3>
              <p className="text-muted-foreground">
                Due to the digital nature of our products, we cannot offer
                refunds once the trust deed has been generated and downloaded.
                Please review your information carefully before completing your
                purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

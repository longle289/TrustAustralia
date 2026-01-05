import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Package, Shield, FileText, Building2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Discretionary Trust Bundle - Complete Trust Setup',
  description:
    'Get everything you need to establish a Discretionary Trust with corporate trustee. Includes trust deed, company registration, ABN, TFN, and GST registration.',
};

const benefits = [
  {
    title: 'Complete Solution',
    description:
      'Everything you need in one package - trust deed, corporate trustee company, and all required registrations.',
    icon: Package,
  },
  {
    title: 'Limited Liability',
    description:
      'A corporate trustee provides personal asset protection for directors, separating trust liability from personal assets.',
    icon: Shield,
  },
  {
    title: 'Professional Documents',
    description:
      'Professionally drafted trust deed and company constitution designed for Australian legal and tax requirements.',
    icon: FileText,
  },
  {
    title: 'All Registrations Included',
    description:
      'We handle ABN, TFN, and optional GST registration for your trust, so you can start operating immediately.',
    icon: Receipt,
  },
];

const whatsIncluded = [
  'Discretionary Trust Deed (PDF)',
  'Corporate Trustee company (Pty Ltd)',
  'ASIC company registration',
  'Company constitution',
  'ABN registration for the trust',
  'TFN registration for the trust',
  'Optional GST registration',
  'Trust distribution minute template',
  'Director consent forms',
  'Share certificate template',
];

const whoShouldUse = [
  'Anyone wanting a complete trust setup without coordinating multiple providers',
  'Those who want a corporate trustee for liability protection',
  'Business owners starting a new venture through a trust',
  'Families setting up a structure for asset protection and tax planning',
  'Property investors wanting a professional trust structure',
  'Anyone who doesn\'t already have a company to act as trustee',
];

const comparisonItems = [
  {
    feature: 'Trust Deed',
    deedOnly: true,
    bundle: true,
  },
  {
    feature: 'Corporate Trustee Company',
    deedOnly: false,
    bundle: true,
  },
  {
    feature: 'ASIC Registration',
    deedOnly: false,
    bundle: true,
  },
  {
    feature: 'ABN for Trust',
    deedOnly: false,
    bundle: true,
  },
  {
    feature: 'TFN for Trust',
    deedOnly: false,
    bundle: true,
  },
  {
    feature: 'GST Registration (optional)',
    deedOnly: false,
    bundle: true,
  },
];

export default function DiscretionaryBundlePage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge className="mb-4 bg-primary">
            Most Popular
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Discretionary Trust Bundle
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Complete Trust + Corporate Trustee Setup
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            The all-in-one solution for establishing a Discretionary Trust with a
            corporate trustee. Includes company registration, trust deed, and all
            ATO registrations to get your trust operational.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create/discretionary-bundle">
                Get Started - ${PRODUCTS.discretionaryBundle.price} {PRODUCTS.discretionaryBundle.priceSuffix}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/trusts/discretionary">Trust Deed Only</Link>
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mx-auto max-w-5xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Why Choose the Bundle?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Bundle vs Trust Deed Only
          </h2>
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-medium">Feature</th>
                  <th className="text-center p-4 font-medium">Trust Deed Only</th>
                  <th className="text-center p-4 font-medium bg-primary/5">Bundle</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((item, index) => (
                  <tr key={item.feature} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="p-4 text-muted-foreground">{item.feature}</td>
                    <td className="p-4 text-center">
                      {item.deedOnly ? (
                        <CheckCircle2 className="h-5 w-5 text-accent mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary/5">
                      {item.bundle ? (
                        <CheckCircle2 className="h-5 w-5 text-accent mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-muted/50 font-medium">
                  <td className="p-4">Price</td>
                  <td className="p-4 text-center">${PRODUCTS.discretionary.price}</td>
                  <td className="p-4 text-center bg-primary/5">${PRODUCTS.discretionaryBundle.price} {PRODUCTS.discretionaryBundle.priceSuffix}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* What's Included */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            What&apos;s Included
          </h2>
          <div className="bg-muted/30 rounded-xl p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Who Should Use */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Who Should Choose the Bundle?
          </h2>
          <div className="bg-muted/30 rounded-xl p-6">
            <ul className="space-y-3">
              {whoShouldUse.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Corporate Trustee Explanation */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Why Use a Corporate Trustee?
          </h2>
          <div className="bg-muted/30 rounded-xl p-6 space-y-4 text-muted-foreground">
            <p>
              A <strong>corporate trustee</strong> is a company that acts as the trustee
              of your trust, rather than an individual person. Most accountants and
              lawyers recommend using a corporate trustee for several important reasons:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Limited liability:</strong> Directors of the trustee company have limited personal liability, protecting personal assets from trust-related claims.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Perpetual succession:</strong> The company continues even if directors change, making succession planning easier.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Clear asset separation:</strong> Trust assets are clearly separated from personal assets when held by a company.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Easier administration:</strong> Changing control of the trust is simpler - just change the company directors.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mx-auto max-w-3xl text-center p-8 bg-primary/5 rounded-2xl border-2 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Ready to Get Started?
          </h2>
          <p className="text-3xl font-bold text-primary mb-4">
            ${PRODUCTS.discretionaryBundle.price}{' '}
            <span className="text-lg font-normal text-muted-foreground">
              {PRODUCTS.discretionaryBundle.priceSuffix}
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            Complete the online wizard and we&apos;ll handle everything - company
            registration, trust deed, and all ATO registrations.
          </p>
          <Button size="lg" asChild>
            <Link href="/create/discretionary-bundle">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payment via Stripe &bull; ASIC fee is additional
          </p>
        </div>
      </div>
    </div>
  );
}

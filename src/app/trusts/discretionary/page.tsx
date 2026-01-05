import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users, Shield, Scale, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Discretionary Trust (Family Trust)',
  description:
    'Learn about Discretionary Trusts (Family Trusts) in Australia. Understand benefits, how they work, and create yours online.',
};

const benefits = [
  {
    title: 'Flexible Income Distribution',
    description:
      'The trustee can distribute income to different beneficiaries each year, directing funds to those in lower tax brackets.',
    icon: Scale,
  },
  {
    title: 'Asset Protection',
    description:
      'Assets held in the trust are generally protected from creditors of individual beneficiaries.',
    icon: Shield,
  },
  {
    title: 'Tax Planning',
    description:
      'Distribute income among family members to minimise overall family tax. Ideal for business owners and investors.',
    icon: PiggyBank,
  },
  {
    title: 'Family Wealth Management',
    description:
      'Keep family assets together across generations. Easy to add or remove beneficiaries as family circumstances change.',
    icon: Users,
  },
];

const whoShouldUse = [
  'Families wanting to protect and manage wealth',
  'Small business owners seeking asset protection',
  'Property investors holding investment properties',
  'Professionals wanting to separate personal and business assets',
  'Parents setting up structures for children',
  'Anyone wanting flexible income distribution options',
];

const whatIncluded = [
  'Complete Discretionary Trust Deed (PDF)',
  'Trust establishment clause with settlement sum',
  'Comprehensive beneficiary definitions',
  'Trustee powers and duties',
  'Income and capital distribution provisions',
  'Trustee appointment and removal provisions',
  'Appointer/Guardian provisions',
  'Vesting date clause (80 years)',
];

export default function DiscretionaryTrustPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Most Popular
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Discretionary Trust
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Also known as a Family Trust
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            The most popular trust structure in Australia. Offers maximum
            flexibility for income distribution and strong asset protection for
            families and businesses.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create/discretionary">
                Create Discretionary Trust - ${PRODUCTS.discretionary.price}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/trusts">Compare with Unit Trust</Link>
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mx-auto max-w-5xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Key Benefits
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

        {/* How It Works */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            How a Discretionary Trust Works
          </h2>
          <div className="prose prose-slate max-w-none">
            <div className="bg-muted/30 rounded-xl p-6 space-y-4 text-muted-foreground">
              <p>
                A Discretionary Trust is established when a <strong>settlor</strong>{' '}
                (usually a friend or relative) gives a small amount (typically $10)
                to the <strong>trustee</strong> to hold on trust.
              </p>
              <p>
                The <strong>trustee</strong> (which can be an individual or a
                company) manages the trust assets and has discretion to distribute
                income and capital to <strong>beneficiaries</strong> - a defined
                class of people such as family members and related entities.
              </p>
              <p>
                An <strong>appointer</strong> (sometimes called a principal or
                guardian) has the power to remove and appoint trustees, providing
                ultimate control over the trust.
              </p>
              <p>
                Each financial year, the trustee decides how to distribute the
                trust&apos;s income among the beneficiaries. This flexibility
                allows for tax-effective income splitting among family members.
              </p>
            </div>
          </div>
        </div>

        {/* Who Should Use */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Who Should Use a Discretionary Trust?
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

        {/* What's Included */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            What&apos;s Included in Your Trust Deed
          </h2>
          <div className="bg-muted/30 rounded-xl p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {whatIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mx-auto max-w-3xl text-center p-8 bg-primary/5 rounded-2xl border-2 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Ready to Create Your Discretionary Trust?
          </h2>
          <p className="text-3xl font-bold text-primary mb-4">
            ${PRODUCTS.discretionary.price}{' '}
            <span className="text-lg font-normal text-muted-foreground">
              AUD
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            Complete the simple online wizard and download your trust deed
            instantly.
          </p>
          <Button size="lg" asChild>
            <Link href="/create/discretionary">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payment via Stripe &bull; Instant PDF download
          </p>
        </div>
      </div>
    </div>
  );
}

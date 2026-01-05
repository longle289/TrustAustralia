import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Briefcase, Building, Users2, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Unit Trust',
  description:
    'Learn about Unit Trusts in Australia. Understand how they work for joint ventures, property investments, and create yours online.',
};

const benefits = [
  {
    title: 'Clear Ownership Structure',
    description:
      'Each unit holder owns a defined percentage of the trust. Perfect for tracking contributions and entitlements.',
    icon: PieChart,
  },
  {
    title: 'Ideal for Joint Ventures',
    description:
      'Multiple parties can invest together with clearly defined ownership interests. Easy to buy out or add new investors.',
    icon: Users2,
  },
  {
    title: 'Property Investment Ready',
    description:
      'Popular structure for property syndicates and investment groups. May help avoid foreign land tax surcharges.',
    icon: Building,
  },
  {
    title: 'Simple Exit Strategy',
    description:
      'Unit holders can sell or transfer their units to exit the investment. Much simpler than dissolving a partnership.',
    icon: Briefcase,
  },
];

const whoShouldUse = [
  'Property syndicates and investment groups',
  'Joint ventures between unrelated parties',
  'Business partners with defined ownership splits',
  'Foreign investors (may avoid land tax surcharge)',
  'Groups wanting clear, proportional ownership',
  'Investors planning to add or remove parties later',
];

const whatIncluded = [
  'Complete Unit Trust Deed (PDF)',
  'Trust establishment clause with initial units',
  'Unit holder register provisions',
  'Unit issue, transfer and redemption clauses',
  'Income and capital distribution by unit holding',
  'Trustee powers and duties',
  'Appointer/Guardian provisions',
  'Meeting and voting provisions',
];

export default function UnitTrustPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Fixed Entitlement Structure
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Unit Trust
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Clear ownership through unit holdings
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            A trust structure where beneficiaries hold units representing their
            fixed share of the trust. Ideal for joint ventures, property
            syndicates, and investment groups.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create/unit">
                Create Unit Trust - ${PRODUCTS.unit.price}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/trusts">Compare with Discretionary Trust</Link>
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
            How a Unit Trust Works
          </h2>
          <div className="prose prose-slate max-w-none">
            <div className="bg-muted/30 rounded-xl p-6 space-y-4 text-muted-foreground">
              <p>
                A Unit Trust is established similar to other trusts, but instead
                of discretionary distributions, beneficiaries hold{' '}
                <strong>units</strong> - similar to shares in a company.
              </p>
              <p>
                Each unit represents a fixed proportion of the trust&apos;s
                income and capital. For example, if you hold 50 out of 100 units,
                you&apos;re entitled to 50% of distributions.
              </p>
              <p>
                The <strong>trustee</strong> manages the trust assets, but unlike
                a discretionary trust, they cannot choose who receives
                distributions - it&apos;s determined by unit holdings.
              </p>
              <p>
                <strong>Unit holders</strong> can buy, sell, or transfer their
                units to others (subject to the trust deed terms), making it easy
                to change ownership interests.
              </p>
            </div>
          </div>
        </div>

        {/* Who Should Use */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Who Should Use a Unit Trust?
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
            Ready to Create Your Unit Trust?
          </h2>
          <p className="text-3xl font-bold text-primary mb-4">
            ${PRODUCTS.unit.price}{' '}
            <span className="text-lg font-normal text-muted-foreground">
              AUD
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            Complete the simple online wizard and download your trust deed
            instantly.
          </p>
          <Button size="lg" asChild>
            <Link href="/create/unit">
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

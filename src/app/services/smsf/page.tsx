import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Landmark, Shield, Settings, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'SMSF Trustee Bundle - Self-Managed Super Fund Setup',
  description:
    'Set up your Self-Managed Super Fund (SMSF) with corporate trustee. Includes SMSF trust deed, company registration, and all ATO registrations.',
};

const benefits = [
  {
    title: 'Investment Control',
    description:
      'Choose your own investments including shares, property, term deposits, and more. No restrictions from retail fund managers.',
    icon: Settings,
  },
  {
    title: 'Tax Advantages',
    description:
      'Concessional tax rate of 15% on earnings, and 0% on pension phase assets. CGT discount on assets held over 12 months.',
    icon: TrendingUp,
  },
  {
    title: 'Asset Protection',
    description:
      'A corporate trustee provides limited liability protection. SMSF assets are generally protected from bankruptcy.',
    icon: Shield,
  },
  {
    title: 'Family Flexibility',
    description:
      'Up to 6 members can pool their super together. Great for couples and families wanting to invest together.',
    icon: Users,
  },
];

const whatsIncluded = [
  'SMSF Trust Deed',
  'Corporate Trustee company (Pty Ltd)',
  'ASIC company registration',
  'ABN for the SMSF',
  'TFN for the SMSF',
  'ATO SMSF registration',
  'Member application forms',
  'Trustee consent declarations',
  'Investment strategy template',
  'Rollover request forms',
];

const requirements = [
  'All members must be trustees (or directors of the corporate trustee)',
  'Maximum of 6 members',
  'At least one member must be an Australian resident',
  'Members cannot be employees of other members (unless related)',
  'Fund must be maintained for the sole purpose of providing retirement benefits',
];

const responsibilities = [
  'Prepare and implement an investment strategy',
  'Accept contributions and rollovers from members',
  'Pay benefits to members when eligible',
  'Keep accurate records and minutes',
  'Lodge annual returns with the ATO',
  'Have accounts audited annually by an approved SMSF auditor',
  'Value assets at market value each year',
];

export default function SmsfPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
              <Landmark className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            SMSF Trustee Bundle
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Self-Managed Super Fund + Corporate Trustee
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Take control of your retirement savings with a Self-Managed Super Fund.
            Our complete bundle includes everything you need to establish your SMSF
            with a corporate trustee.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create/smsf-bundle">
                Get Started - ${PRODUCTS.smsfBundle.price} {PRODUCTS.smsfBundle.priceSuffix}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mx-auto max-w-3xl mb-16">
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Important: Seek Professional Advice
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Running an SMSF comes with significant responsibilities and compliance
                  requirements. We strongly recommend speaking with a licensed financial
                  advisor before establishing an SMSF to ensure it&apos;s the right choice
                  for your circumstances. SMSFs are generally only cost-effective for
                  balances above $200,000.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mx-auto max-w-5xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Benefits of an SMSF
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

        {/* What is an SMSF */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            What is an SMSF?
          </h2>
          <div className="bg-muted/30 rounded-xl p-6 space-y-4 text-muted-foreground">
            <p>
              A <strong>Self-Managed Super Fund (SMSF)</strong> is a private superannuation
              fund that you manage yourself. Unlike retail or industry super funds where
              professional fund managers make investment decisions, with an SMSF you have
              complete control over how your retirement savings are invested.
            </p>
            <p>
              SMSFs can have between 1 and 6 members. All members must be trustees of the
              fund (or directors of the corporate trustee). This means you&apos;re responsible
              for all investment decisions and compliance with superannuation law.
            </p>
            <p>
              Our SMSF Trustee Bundle establishes your fund with a <strong>corporate trustee</strong>,
              which is a company that acts as the trustee. This structure is recommended by
              most accountants and advisors because it provides limited liability protection
              and makes administration easier.
            </p>
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
          <p className="mt-4 text-center text-sm text-muted-foreground">
            All-inclusive pricing - includes ASIC fees and GST
          </p>
        </div>

        {/* Requirements */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            SMSF Requirements
          </h2>
          <div className="bg-muted/30 rounded-xl p-6">
            <ul className="space-y-3">
              {requirements.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trustee Responsibilities */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Trustee Responsibilities
          </h2>
          <div className="bg-muted/30 rounded-xl p-6">
            <p className="text-muted-foreground mb-4">
              As an SMSF trustee, you&apos;ll be responsible for:
            </p>
            <ul className="space-y-3">
              {responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            How It Works
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Complete the Online Form', description: 'Enter SMSF details, member information, and trustee company details.' },
              { step: 2, title: 'Review & Pay', description: 'Review your details and complete payment. All fees included in one price.' },
              { step: 3, title: 'We Handle the Registrations', description: 'We register your company with ASIC and your SMSF with the ATO.' },
              { step: 4, title: 'Receive Your Documents', description: 'Get your SMSF trust deed, company documents, and registration confirmations.' },
              { step: 5, title: 'Roll Over Your Super', description: 'Use the rollover forms to transfer your existing super to your new SMSF.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mx-auto max-w-3xl text-center p-8 bg-primary/5 rounded-2xl border-2 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Ready to Set Up Your SMSF?
          </h2>
          <p className="text-3xl font-bold text-primary mb-4">
            ${PRODUCTS.smsfBundle.price}{' '}
            <span className="text-lg font-normal text-muted-foreground">
              {PRODUCTS.smsfBundle.priceSuffix}
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            All-inclusive pricing. Includes SMSF trust deed, corporate trustee company,
            ASIC registration, and all ATO registrations.
          </p>
          <Button size="lg" asChild>
            <Link href="/create/smsf-bundle">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payment via Stripe &bull; No hidden fees
          </p>
        </div>
      </div>
    </div>
  );
}

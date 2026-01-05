import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Building2, Shield, Zap, FileText, Users, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Company Registration - Register an Australian Pty Ltd',
  description:
    'Register your Australian proprietary limited company (Pty Ltd). Fast, affordable company registration with ASIC. Includes constitution and ABN application.',
};

const benefits = [
  {
    title: 'Limited Liability',
    description:
      'Shareholders\' personal assets are protected from business debts and liabilities. Your risk is limited to your investment.',
    icon: Shield,
  },
  {
    title: 'Same-Day Processing',
    description:
      'Most company registrations are processed by ASIC within 24-48 hours, often on the same day.',
    icon: Zap,
  },
  {
    title: 'Professional Documents',
    description:
      'Includes a comprehensive company constitution that covers all standard governance requirements.',
    icon: FileText,
  },
  {
    title: 'Flexible Structure',
    description:
      'Add multiple directors and shareholders. Easy to bring in new partners or transfer ownership.',
    icon: Users,
  },
];

const whatsIncluded = [
  'ASIC company registration',
  'Company constitution',
  'Director appointment documentation',
  'Shareholder register',
  'Share certificate template',
  'ABN application assistance',
  'Registered office setup',
  'Principal place of business setup',
  'ASIC annual review calendar',
  'Compliance checklist',
];

const companyTypes = [
  {
    title: 'Trading Company',
    description: 'For running a business, trading goods or services, and employing staff.',
  },
  {
    title: 'Investment Company',
    description: 'For holding investments such as shares, property, or other assets.',
  },
  {
    title: 'Trustee Company',
    description: 'To act as trustee for a trust (family trust, unit trust, or SMSF).',
  },
  {
    title: 'Holding Company',
    description: 'To hold shares in other companies or manage a group of businesses.',
  },
];

const requirements = [
  'At least one director who is an Australian resident',
  'At least one shareholder (can be same person as director)',
  'A registered office address in Australia',
  'A principal place of business address',
  'Consent from all directors',
];

export default function CompanyRegistrationPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Company Registration
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Australian Pty Ltd Company
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Register your Australian proprietary limited company quickly and
            affordably. We handle the ASIC registration and provide all the
            documents you need to get started.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register/company">
                Register Now - ${PRODUCTS.companyRegistration.price} {PRODUCTS.companyRegistration.priceSuffix}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mx-auto max-w-5xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Benefits of a Pty Ltd Company
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

        {/* Company Types */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Common Uses for a Pty Ltd Company
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {companyTypes.map((type) => (
              <div key={type.title} className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
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

        {/* Requirements */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Requirements
          </h2>
          <div className="bg-muted/30 rounded-xl p-6">
            <p className="text-muted-foreground mb-4">
              To register a Pty Ltd company in Australia, you&apos;ll need:
            </p>
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

        {/* Process Steps */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            How It Works
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Complete the Online Form', description: 'Enter your company details, directors, and shareholders.' },
              { step: 2, title: 'Review & Pay', description: 'Review your details and complete payment securely via Stripe.' },
              { step: 3, title: 'ASIC Lodgement', description: 'We lodge your application with ASIC immediately.' },
              { step: 4, title: 'Receive Your Documents', description: 'Get your ACN, certificate, and all company documents.' },
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

        {/* ASIC Fee Notice */}
        <div className="mx-auto max-w-3xl mb-20">
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Receipt className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  About ASIC Fees
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  The ASIC company registration fee of <strong>$576</strong> is payable
                  in addition to our service fee. This government fee is paid directly
                  to ASIC during the registration process. After registration, there is
                  an annual ASIC review fee (currently $310 for small companies).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mx-auto max-w-3xl text-center p-8 bg-primary/5 rounded-2xl border-2 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Ready to Register Your Company?
          </h2>
          <p className="text-3xl font-bold text-primary mb-4">
            ${PRODUCTS.companyRegistration.price}{' '}
            <span className="text-lg font-normal text-muted-foreground">
              {PRODUCTS.companyRegistration.priceSuffix}
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            Complete the simple online form and we&apos;ll handle the ASIC registration.
            Most companies are registered within 24-48 hours.
          </p>
          <Button size="lg" asChild>
            <Link href="/register/company">
              Register Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payment via Stripe &bull; ASIC fee ($576) additional
          </p>
        </div>
      </div>
    </div>
  );
}

import { Shield, Zap, Lock, BookOpen, BadgeCheck, HeadphonesIcon } from 'lucide-react';

const signals = [
  {
    title: 'Australian Made',
    description:
      'Trust deeds designed specifically for Australian tax and legal requirements.',
    icon: Shield,
  },
  {
    title: 'Instant Delivery',
    description:
      'Download your completed trust deed PDF immediately after payment.',
    icon: Zap,
  },
  {
    title: 'Bank-Level Security',
    description:
      '256-bit SSL encryption and secure payment processing via Stripe.',
    icon: Lock,
  },
  {
    title: 'Plain English',
    description:
      'Clear explanations and guidance throughout the entire process.',
    icon: BookOpen,
  },
  {
    title: 'Professional Quality',
    description:
      'Comprehensive trust deeds used by accountants and financial advisers.',
    icon: BadgeCheck,
  },
  {
    title: 'Email Support',
    description:
      'Questions? Our Australian-based support team is here to help.',
    icon: HeadphonesIcon,
  },
];

export function TrustSignals() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Trust Australia?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;ve helped thousands of Australians create their trust deeds
            with confidence.
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {signals.map((signal) => (
            <div
              key={signal.title}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <signal.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {signal.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { FileText, CreditCard, Download, ClipboardCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Choose Your Trust',
    description:
      'Select between a Discretionary Trust (Family Trust) or Unit Trust based on your needs.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Complete the Wizard',
    description:
      'Answer simple questions about your trust. Plain English guidance at every step.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Secure Payment',
    description:
      'Pay securely with credit card or debit card via Stripe. No account required.',
    icon: CreditCard,
  },
  {
    number: '04',
    title: 'Instant Download',
    description:
      'Download your professionally formatted trust deed PDF immediately.',
    icon: Download,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your trust deed in four simple steps. No legal jargon, no
            complicated forms.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line (hidden on mobile, shown between items on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-0.5 bg-border" />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className="relative mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <step.icon className="h-7 w-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

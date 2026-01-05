import Link from 'next/link';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container-max section-padding py-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <Shield className="mr-2 h-3.5 w-3.5" />
            Trusted by 10,000+ Australians
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Create Your Australian{' '}
            <span className="text-primary">Trust Deed</span> Online
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            Generate professional Discretionary and Unit Trust deeds in minutes.
            Simple guided process, instant download, and affordable pricing.
          </p>

          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Australian Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Instant Download
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              From $165 AUD
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/create/discretionary">
                Create Discretionary Trust
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/trusts">Compare Trust Types</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              Secure payments powered by
            </p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <span className="text-2xl font-bold text-muted-foreground">
                stripe
              </span>
              <span className="text-sm font-semibold text-muted-foreground border rounded px-2 py-1">
                256-bit SSL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

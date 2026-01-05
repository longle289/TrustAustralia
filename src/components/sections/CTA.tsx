import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container-max section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Create Your Trust?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Join thousands of Australians who have created their trust deeds
            online. Simple, affordable, and instant.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/create/discretionary">
                Create Discretionary Trust
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/create/unit">Create Unit Trust</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm opacity-75">
            From $165 AUD &bull; Instant download &bull; No account required
          </p>
        </div>
      </div>
    </section>
  );
}

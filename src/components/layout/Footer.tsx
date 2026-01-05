import Link from 'next/link';
import { Shield } from 'lucide-react';
import { SITE_CONFIG, NAVIGATION, DISCLAIMERS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-max section-padding py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <div className="text-sm text-muted-foreground">
              <p>{SITE_CONFIG.email}</p>
            </div>
          </div>

          {/* Links Columns */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 lg:grid-cols-3">
            {/* Trust Types */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Trust Types
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {NAVIGATION.footer.trusts.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Resources
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {NAVIGATION.footer.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul role="list" className="mt-4 space-y-3">
                {NAVIGATION.footer.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t pt-8">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Important Disclaimer:</strong> {DISCLAIMERS.general}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved. ABN
            placeholder.
          </p>
        </div>
      </div>
    </footer>
  );
}

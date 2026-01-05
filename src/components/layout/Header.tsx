'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/auth';
import { SITE_CONFIG, NAVIGATION } from '@/lib/constants';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-max section-padding" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {NAVIGATION.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Button asChild>
              <Link href="/create/discretionary">Create Trust Deed</Link>
            </Button>
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:bg-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href="/create/discretionary">Create Trust Deed</Link>
              </Button>
              <div className="mt-2">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

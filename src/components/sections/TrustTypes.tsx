import Link from 'next/link';
import { ArrowRight, Users, Package, Building2, Landmark, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS } from '@/lib/constants';

export function TrustTypes() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional document preparation and registration services for Australian businesses.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Discretionary Trust Card */}
          <Card className="relative flex flex-col border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {PRODUCTS.discretionary.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Also known as a Family Trust
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground text-sm mb-6">
                {PRODUCTS.discretionary.description}
              </p>
              <ul className="space-y-2">
                {PRODUCTS.discretionary.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4 pt-6 border-t">
              <div className="text-center">
                <span className="text-3xl font-bold text-foreground">
                  ${PRODUCTS.discretionary.price}
                </span>
                <span className="text-muted-foreground ml-1">AUD</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/create/discretionary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link href="/trusts/discretionary">Learn more</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Discretionary Trust Bundle Card */}
          <Card className="relative flex flex-col border-2 border-primary/30 hover:border-primary/50 transition-colors">
            {PRODUCTS.discretionaryBundle.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
            )}
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {PRODUCTS.discretionaryBundle.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Complete trust setup solution
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground text-sm mb-6">
                {PRODUCTS.discretionaryBundle.description}
              </p>
              <ul className="space-y-2">
                {PRODUCTS.discretionaryBundle.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4 pt-6 border-t">
              <div className="text-center">
                <span className="text-3xl font-bold text-foreground">
                  ${PRODUCTS.discretionaryBundle.price}
                </span>
                <span className="text-muted-foreground ml-1">{PRODUCTS.discretionaryBundle.priceSuffix}</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/create/discretionary-bundle">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link href="/trusts/discretionary-bundle">Learn more</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Company Registration Card */}
          <Card className="relative flex flex-col border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {PRODUCTS.companyRegistration.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Pty Ltd Company Setup
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground text-sm mb-6">
                {PRODUCTS.companyRegistration.description}
              </p>
              <ul className="space-y-2">
                {PRODUCTS.companyRegistration.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4 pt-6 border-t">
              <div className="text-center">
                <span className="text-3xl font-bold text-foreground">
                  ${PRODUCTS.companyRegistration.price}
                </span>
                <span className="text-muted-foreground ml-1">{PRODUCTS.companyRegistration.priceSuffix}</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/register/company">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link href="/services/company-registration">Learn more</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* SMSF Trustee Bundle Card */}
          <Card className="relative flex flex-col border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Landmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {PRODUCTS.smsfBundle.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Self-Managed Super Fund
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground text-sm mb-6">
                {PRODUCTS.smsfBundle.description}
              </p>
              <ul className="space-y-2">
                {PRODUCTS.smsfBundle.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4 pt-6 border-t">
              <div className="text-center">
                <span className="text-3xl font-bold text-foreground">
                  ${PRODUCTS.smsfBundle.price}
                </span>
                <span className="text-muted-foreground ml-1">{PRODUCTS.smsfBundle.priceSuffix}</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/create/smsf-bundle">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link href="/services/smsf">Learn more</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

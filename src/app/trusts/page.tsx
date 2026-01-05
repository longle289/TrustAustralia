import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Compare Trust Types',
  description:
    'Compare Discretionary Trusts and Unit Trusts. Learn which Australian trust structure is right for your needs.',
};

const comparisonData = [
  {
    feature: 'Income Distribution',
    discretionary: 'Flexible - at trustee discretion',
    unit: 'Fixed - based on unit holdings',
    discretionaryCheck: true,
    unitCheck: true,
  },
  {
    feature: 'Asset Protection',
    discretionary: 'Strong protection from creditors',
    unit: 'Limited - units can be claimed',
    discretionaryCheck: true,
    unitCheck: false,
  },
  {
    feature: 'Tax Planning Flexibility',
    discretionary: 'High - distribute to lower tax brackets',
    unit: 'Lower - fixed entitlements',
    discretionaryCheck: true,
    unitCheck: false,
  },
  {
    feature: 'Land Tax Surcharge (Foreign)',
    discretionary: 'May apply in some states',
    unit: 'Generally exempt if units identified',
    discretionaryCheck: false,
    unitCheck: true,
  },
  {
    feature: 'Joint Ventures',
    discretionary: 'Not ideal - unclear ownership',
    unit: 'Excellent - clear ownership via units',
    discretionaryCheck: false,
    unitCheck: true,
  },
  {
    feature: 'Adding New Members',
    discretionary: 'Easy - amend beneficiary classes',
    unit: 'Requires issuing new units',
    discretionaryCheck: true,
    unitCheck: false,
  },
  {
    feature: 'Exit Strategy',
    discretionary: 'Complex - discretionary distributions',
    unit: 'Simple - sell or transfer units',
    discretionaryCheck: false,
    unitCheck: true,
  },
  {
    feature: 'Best For',
    discretionary: 'Families, asset protection, tax planning',
    unit: 'Investments, joint ventures, syndicates',
    discretionaryCheck: true,
    unitCheck: true,
  },
];

export default function TrustsPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Trust Education
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Compare Trust Types
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Understanding the difference between Discretionary Trusts and Unit
            Trusts helps you choose the right structure for your needs.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2 mb-16">
          {/* Discretionary Trust Card */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{PRODUCTS.discretionary.shortName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Also called a Family Trust
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                A flexible trust where the trustee has discretion to distribute
                income and capital among a defined class of beneficiaries. Ideal
                for families seeking asset protection and tax planning
                flexibility.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/create/discretionary">
                    Create Discretionary Trust
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/trusts/discretionary">Learn more</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Unit Trust Card */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{PRODUCTS.unit.shortName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fixed entitlement structure
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                A trust where beneficiaries hold units representing their fixed
                share of the trust&apos;s income and capital. Perfect for joint
                ventures, property syndicates, and investment groups with
                multiple parties.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/create/unit">
                    Create Unit Trust
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/trusts/unit">Learn more</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Side-by-Side Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Feature
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Discretionary Trust
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Unit Trust
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index % 2 === 0 ? 'bg-muted/30' : ''}
                  >
                    <td className="py-4 px-4 font-medium text-foreground">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-2">
                        {row.discretionaryCheck ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {row.discretionary}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-2">
                        {row.unitCheck ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {row.unit}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-3xl text-center mt-16 p-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Still Not Sure?
          </h2>
          <p className="text-muted-foreground mb-6">
            Most individuals and families choose a{' '}
            <strong>Discretionary Trust</strong> for its flexibility in income
            distribution and asset protection. Property investors doing joint
            ventures typically prefer a <strong>Unit Trust</strong> for clear
            ownership.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We recommend consulting with your accountant or financial adviser
            for advice specific to your circumstances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/create/discretionary">
                Create Discretionary Trust
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/create/unit">Create Unit Trust</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

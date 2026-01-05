import { Shield, Clock, FileText, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Shield,
    title: 'Trust & Security',
    description:
      'Your data is protected with bank-level encryption. We never share your information with third parties.',
  },
  {
    icon: Clock,
    title: 'Fast & Efficient',
    description:
      'Get your documents instantly. Our streamlined process means no waiting for lawyers or paperwork.',
  },
  {
    icon: FileText,
    title: 'Professional Quality',
    description:
      'All documents are professionally drafted and regularly reviewed to ensure compliance with Australian law.',
  },
  {
    icon: Users,
    title: 'Australian Focus',
    description:
      'Designed specifically for Australian businesses and families, meeting local legal and tax requirements.',
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container-max section-padding">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
            About Trust Australia
          </h1>
          <p className="text-lg text-muted-foreground">
            We make it simple for Australians to establish trusts, register companies,
            and set up self-managed super funds. Our mission is to provide professional,
            affordable document preparation services that were once only available through
            expensive law firms.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
            <p>
              Trust Australia was founded with a simple goal: to democratise access to
              essential business and wealth structuring documents. We believe that setting
              up a family trust or registering a company shouldn&apos;t require expensive
              legal fees or weeks of waiting.
            </p>
            <p>
              Our team combines expertise in Australian corporate and trust law with
              modern technology to deliver a seamless online experience. We&apos;ve helped
              thousands of Australians establish trusts, register companies, and set up
              SMSFs quickly and affordably.
            </p>
            <p>
              While we provide document preparation services, we always recommend that
              clients seek independent legal and tax advice for their specific circumstances.
              Our documents are professionally drafted templates designed to meet the needs
              of most Australians, but individual situations may require customisation.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">
              Important Notice
            </h3>
            <p className="text-sm text-muted-foreground">
              Trust Australia provides document preparation services only. We are not
              a law firm and do not provide legal, tax, or financial advice. The
              information on this website is general in nature. We recommend consulting
              with qualified professionals for advice specific to your circumstances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

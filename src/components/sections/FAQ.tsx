import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'What is a trust deed?',
    answer:
      'A trust deed is a legal document that establishes a trust. It sets out the rules for how the trust operates, who can benefit from it (beneficiaries), who manages it (trustee), and other important terms. Think of it as the constitution or rulebook for your trust.',
  },
  {
    question: 'What is the difference between a Discretionary Trust and a Unit Trust?',
    answer:
      'A Discretionary Trust (Family Trust) gives the trustee flexibility to decide how income and capital are distributed among beneficiaries. A Unit Trust has fixed entitlements - each unit holder owns a specific percentage of the trust, similar to owning shares in a company. Discretionary Trusts are popular for family asset protection, while Unit Trusts are often used for property investments and joint ventures.',
  },
  {
    question: 'Do I need a lawyer to create a trust deed?',
    answer:
      'While you can create a trust deed without a lawyer, we recommend having your completed trust deed reviewed by a qualified legal or accounting professional before execution. Our service provides the document preparation, but professional review ensures it meets your specific circumstances.',
  },
  {
    question: 'How long does it take to create a trust deed?',
    answer:
      'Our online wizard typically takes 10-15 minutes to complete. Once you finish and make payment, you can download your trust deed PDF immediately. No waiting required.',
  },
  {
    question: 'Is my information secure?',
    answer:
      'Yes. We use 256-bit SSL encryption for all data transmission, and payments are processed securely through Stripe. We do not store your credit card details, and your personal information is handled in accordance with Australian privacy laws.',
  },
  {
    question: 'Can I edit my trust deed after purchase?',
    answer:
      'The trust deed is generated as a PDF based on the information you provide. While you cannot edit the generated document directly, you can make handwritten amendments before signing, or you can create a new trust deed if significant changes are needed.',
  },
];

export function FAQ() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* More Questions CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <Button variant="outline" asChild>
              <Link href="/faq">View all FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

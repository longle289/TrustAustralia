import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is a Discretionary Trust?',
        a: 'A Discretionary Trust (also known as a Family Trust) is a trust where the trustee has discretion over how to distribute income and capital among the beneficiaries. This flexibility makes it popular for family wealth management, asset protection, and tax planning.',
      },
      {
        q: 'What is the difference between a Discretionary Trust and a Unit Trust?',
        a: 'In a Discretionary Trust, the trustee decides how to distribute income among beneficiaries. In a Unit Trust, beneficiaries hold fixed units and receive distributions proportional to their unit holdings. Unit Trusts are often used for investment properties with multiple investors.',
      },
      {
        q: 'Do I need a lawyer to set up a trust?',
        a: 'While you can establish a trust using our document preparation service, we recommend having a qualified legal or tax professional review your trust deed before execution. Our documents are professionally drafted templates, but individual circumstances may require specific modifications.',
      },
      {
        q: 'How long does it take to receive my trust deed?',
        a: 'You will receive your trust deed immediately after completing the online form and payment. The document is available for instant download as a PDF.',
      },
    ],
  },
  {
    category: 'Trust Setup',
    questions: [
      {
        q: 'What is a Settlor?',
        a: 'The Settlor is the person who establishes the trust by providing the initial settlement sum (usually $10). The Settlor should be someone other than a trustee or beneficiary - typically a friend or relative.',
      },
      {
        q: 'What is a Corporate Trustee?',
        a: 'A Corporate Trustee is a company that acts as the trustee of a trust. Using a corporate trustee provides limited liability protection and makes it easier to change control of the trust. Our Discretionary Trust Bundle includes corporate trustee setup.',
      },
      {
        q: 'Who should be the Appointer?',
        a: 'The Appointer (sometimes called Principal or Guardian) has the power to remove and appoint trustees. This role provides ultimate control over the trust and is typically held by the person who wants to maintain control over the trust assets.',
      },
      {
        q: 'Can I have multiple trustees?',
        a: 'Yes, you can have multiple individual trustees or a corporate trustee. Having a corporate trustee is often recommended as it simplifies succession planning and provides limited liability.',
      },
    ],
  },
  {
    category: 'SMSF',
    questions: [
      {
        q: 'What is an SMSF?',
        a: 'A Self-Managed Super Fund (SMSF) is a private superannuation fund that you manage yourself. SMSFs can have up to six members, and all members must be trustees (or directors of the corporate trustee).',
      },
      {
        q: 'Why use a Corporate Trustee for my SMSF?',
        a: 'A corporate trustee provides limited liability protection, perpetual succession (the company continues even if members change), and clearer separation between personal and SMSF assets. Our SMSF Trustee Bundle includes corporate trustee setup.',
      },
      {
        q: 'What registrations are included in the SMSF Bundle?',
        a: 'Our SMSF Trustee Bundle includes: SMSF Trust Deed, Corporate Trustee company registration, ABN and TFN for the SMSF, and ATO SMSF registration.',
      },
    ],
  },
  {
    category: 'Company Registration',
    questions: [
      {
        q: 'What is included in Company Registration?',
        a: 'Our Company Registration service includes ASIC company registration, company constitution, director and shareholder setup, registered office details, and assistance with ABN application.',
      },
      {
        q: 'What are the ASIC fees?',
        a: 'ASIC charges a fee for company registration which is in addition to our service fee. The current ASIC fee is $576 for a standard company registration. This fee is paid directly to ASIC.',
      },
      {
        q: 'How long does company registration take?',
        a: 'Once you complete the online form, we lodge with ASIC immediately. Most company registrations are processed within 24-48 hours, often same-day.',
      },
    ],
  },
  {
    category: 'Payment & Documents',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Due to the nature of digital document delivery, refunds are generally not available once documents have been generated. Please contact us if you have concerns about your order.',
      },
      {
        q: 'What format are the documents?',
        a: 'All trust deeds and documents are delivered as professionally formatted PDF files that you can print and sign.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container-max section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about trusts, company registration, and our services.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${section.category}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-8 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our team is here to help you with any questions about our services.
            </p>
            <a
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

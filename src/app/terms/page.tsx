import { SITE_CONFIG } from '@/lib/constants';

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container-max section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  By accessing and using the {SITE_CONFIG.name} website and services,
                  you accept and agree to be bound by the terms and conditions of this
                  agreement. If you do not agree to these terms, you should not use our
                  services.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Your continued
                  use of the service following any changes constitutes your acceptance
                  of the new terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Description of Services
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  {SITE_CONFIG.name} provides online document preparation services,
                  including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Discretionary Trust Deed preparation</li>
                  <li>Unit Trust Deed preparation</li>
                  <li>Company registration services</li>
                  <li>SMSF setup and documentation</li>
                  <li>Related corporate and trust documentation</li>
                </ul>
                <p>
                  Our services are document preparation services only. We are not a law
                  firm and do not provide legal, tax, or financial advice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Not Legal Advice
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  <strong>Important:</strong> {SITE_CONFIG.name} provides document
                  preparation services only. We do not provide legal, tax, accounting,
                  or financial advice. The information provided on this website and in
                  our documents is general in nature.
                </p>
                <p>
                  You should seek independent professional advice from a qualified
                  lawyer, accountant, or financial advisor before making any decisions
                  based on our documents or the information on this website.
                </p>
                <p>
                  We recommend that all trust deeds and legal documents be reviewed by
                  a qualified legal professional before execution to ensure they meet
                  your specific requirements and circumstances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. User Responsibilities
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Providing accurate and complete information when using our services
                  </li>
                  <li>
                    Ensuring the information you provide is lawful and does not infringe
                    on any third party rights
                  </li>
                  <li>
                    Reviewing all documents carefully before signing or executing them
                  </li>
                  <li>
                    Seeking independent professional advice appropriate to your
                    circumstances
                  </li>
                  <li>
                    Maintaining the confidentiality of your account information
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Payment Terms
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  All prices are displayed in Australian Dollars (AUD) and include GST
                  where applicable. Payment is required at the time of ordering.
                </p>
                <p>
                  Government fees (such as ASIC registration fees) are separate from
                  our service fees and are clearly indicated where applicable. These
                  fees are paid to the relevant government authority.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Refund Policy
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Due to the nature of digital document delivery, refunds are generally
                  not available once documents have been generated and delivered.
                </p>
                <p>
                  If you believe there is an error in your documents, please contact us
                  within 7 days of purchase and we will work with you to resolve the
                  issue. We may, at our discretion, provide corrected documents or issue
                  a refund.
                </p>
                <p>
                  Government fees paid to ASIC or the ATO are non-refundable once
                  lodgement has occurred.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Intellectual Property
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  All content on this website, including text, graphics, logos, and
                  document templates, is the property of {SITE_CONFIG.name} and is
                  protected by Australian and international copyright laws.
                </p>
                <p>
                  Documents purchased from us are licensed for your personal or business
                  use only. You may not resell, redistribute, or make available our
                  document templates to third parties.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. Limitation of Liability
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  To the maximum extent permitted by law, {SITE_CONFIG.name} shall not
                  be liable for any indirect, incidental, special, consequential, or
                  punitive damages, or any loss of profits or revenues, whether incurred
                  directly or indirectly, or any loss of data, use, goodwill, or other
                  intangible losses.
                </p>
                <p>
                  Our total liability for any claims arising from your use of our
                  services shall not exceed the amount you paid for the specific
                  service giving rise to the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                9. Governing Law
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  These terms and conditions are governed by and construed in accordance
                  with the laws of Australia. Any disputes arising from these terms or
                  your use of our services shall be subject to the exclusive jurisdiction
                  of the courts of Australia.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                10. Contact Us
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <ul className="list-none space-y-2">
                  <li>Email: {SITE_CONFIG.email}</li>
                  <li>Phone: {SITE_CONFIG.phone}</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

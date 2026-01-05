import { SITE_CONFIG } from '@/lib/constants';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container-max section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Disclaimer
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          {/* Important Notice Box */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Important Notice
                </h2>
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  {SITE_CONFIG.name} provides document preparation services only.
                  We are not a law firm and do not provide legal, tax, or financial
                  advice. Please read this disclaimer carefully before using our
                  services.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Nature of Services
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  {SITE_CONFIG.name} is a document preparation service. We provide
                  template legal documents and assist with the preparation and lodgement
                  of various registrations with government authorities such as ASIC
                  and the ATO.
                </p>
                <p>
                  <strong>We are not:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A law firm or legal practice</li>
                  <li>An accounting firm</li>
                  <li>A financial planning or advisory service</li>
                  <li>A tax agent or registered tax practitioner</li>
                </ul>
                <p>
                  We do not provide legal advice, tax advice, financial advice, or
                  any other professional advice. The information on this website and
                  in our documents is general in nature and may not be suitable for
                  your specific circumstances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. No Solicitor-Client Relationship
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Your use of {SITE_CONFIG.name} does not create a solicitor-client
                  relationship, accountant-client relationship, or any other professional
                  advisory relationship. We do not owe you any duty of care that would
                  arise from such a relationship.
                </p>
                <p>
                  Any communication with us, whether by email, phone, or through our
                  website, is not privileged and should not be treated as confidential
                  legal communication.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Seek Independent Professional Advice
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  <strong>
                    We strongly recommend that you seek independent professional advice
                    before:
                  </strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Establishing a trust or any other legal structure</li>
                  <li>Registering a company</li>
                  <li>Setting up a self-managed superannuation fund (SMSF)</li>
                  <li>Executing any legal document</li>
                  <li>Making decisions that may have legal or tax implications</li>
                </ul>
                <p>
                  A qualified lawyer can review your specific circumstances and advise
                  whether our template documents are suitable for your needs, or whether
                  modifications are required.
                </p>
                <p>
                  A qualified accountant or tax advisor can advise on the tax implications
                  of any structure you establish.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. Template Documents
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Our trust deeds, company constitutions, and other documents are
                  professionally drafted templates designed to meet the needs of most
                  Australians in common situations. However:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    They may not be suitable for complex or unusual circumstances
                  </li>
                  <li>
                    They may not address all issues relevant to your specific situation
                  </li>
                  <li>
                    Laws and regulations change, and our templates may not reflect the
                    most recent changes at any given time
                  </li>
                  <li>
                    Different states and territories may have specific requirements
                    that are not addressed in our standard documents
                  </li>
                </ul>
                <p>
                  You are responsible for ensuring that any documents you use are
                  appropriate for your circumstances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Accuracy of Information
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  While we make every effort to ensure the information on our website
                  is accurate and up-to-date, we make no warranties or representations
                  about:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The accuracy, completeness, or reliability of any information</li>
                  <li>The suitability of our services for any particular purpose</li>
                  <li>
                    The legal validity or enforceability of any documents we provide
                  </li>
                </ul>
                <p>
                  Information on this website should not be relied upon as a substitute
                  for professional advice tailored to your specific circumstances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Tax and Financial Considerations
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Trusts, companies, and SMSFs have significant tax and financial
                  implications. The choice of structure, the terms of trust deeds,
                  and the operation of these entities can have substantial effects on:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Income tax liability</li>
                  <li>Capital gains tax</li>
                  <li>Stamp duty</li>
                  <li>Land tax</li>
                  <li>Asset protection</li>
                  <li>Estate planning</li>
                  <li>Centrelink and government benefits</li>
                </ul>
                <p>
                  We do not provide advice on these matters. You must consult with
                  qualified tax and financial professionals before making decisions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Limitation of Liability
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  To the maximum extent permitted by law, {SITE_CONFIG.name}, its
                  directors, employees, and agents:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Exclude all liability for any loss or damage (including direct,
                    indirect, consequential, or incidental loss or damage) arising
                    from the use of our services or documents
                  </li>
                  <li>
                    Make no warranties about the accuracy, reliability, or suitability
                    of our services
                  </li>
                  <li>
                    Are not responsible for any actions you take or fail to take based
                    on information provided through our services
                  </li>
                </ul>
                <p>
                  Our liability for any claim is limited to the amount you paid for
                  the specific service giving rise to the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. Your Responsibility
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>By using our services, you acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You have read and understood this disclaimer</li>
                  <li>
                    You are responsible for seeking appropriate professional advice
                  </li>
                  <li>
                    You are responsible for ensuring any documents are suitable for
                    your purposes
                  </li>
                  <li>
                    You accept full responsibility for any decisions you make based
                    on our services or information
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                9. Contact Us
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  If you have any questions about this disclaimer or our services,
                  please contact us:
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

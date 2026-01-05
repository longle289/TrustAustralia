import { SITE_CONFIG } from '@/lib/constants';

export default function PrivacyPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container-max section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Introduction
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  {SITE_CONFIG.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to
                  protecting your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you use our website
                  and services.
                </p>
                <p>
                  We comply with the Australian Privacy Principles (APPs) contained in
                  the Privacy Act 1988 (Cth) and applicable state and territory privacy
                  legislation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Information We Collect
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>We may collect the following types of information:</p>

                <h3 className="text-lg font-medium text-foreground mt-6">
                  Personal Information
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, address, and contact details</li>
                  <li>Date of birth</li>
                  <li>Tax File Number (TFN) where required for registrations</li>
                  <li>Australian Business Number (ABN)</li>
                  <li>Director and shareholder information for company registrations</li>
                  <li>Trust beneficiary and trustee information</li>
                  <li>Payment information (processed securely through Stripe)</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground mt-6">
                  Technical Information
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Device information</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Prepare trust deeds and other legal documents</li>
                  <li>Process company and SMSF registrations with ASIC and the ATO</li>
                  <li>Process payments securely</li>
                  <li>Communicate with you about your orders and our services</li>
                  <li>Respond to your enquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. How We Share Your Information
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Government authorities:</strong> ASIC, ATO, and other
                    relevant bodies for the purpose of processing registrations
                  </li>
                  <li>
                    <strong>Payment processors:</strong> Stripe for secure payment
                    processing
                  </li>
                  <li>
                    <strong>Service providers:</strong> Third-party services that help
                    us operate our business (e.g., cloud hosting, email services)
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> When required by law or to
                    protect our rights
                  </li>
                </ul>
                <p>
                  We do not sell, rent, or trade your personal information to third
                  parties for marketing purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Data Security
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We implement appropriate technical and organisational measures to
                  protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS encryption for all data transmission</li>
                  <li>Secure, encrypted storage of sensitive data</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls limiting who can view your information</li>
                  <li>PCI-DSS compliant payment processing through Stripe</li>
                </ul>
                <p>
                  While we take reasonable steps to protect your information, no method
                  of transmission over the internet or electronic storage is 100%
                  secure. We cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Data Retention
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We retain your personal information for as long as necessary to
                  provide our services and comply with our legal obligations. This
                  includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Document records: Retained for 7 years as required by Australian
                    tax law
                  </li>
                  <li>
                    Transaction records: Retained for 7 years for tax and accounting
                    purposes
                  </li>
                  <li>
                    Communication records: Retained for 2 years or as required for
                    ongoing service
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Your Rights
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>Under Australian privacy law, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal retention requirements)</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the details below.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. Cookies and Tracking
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Our website uses cookies and similar tracking technologies to improve
                  your experience. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Essential cookies:</strong> Required for the website to
                    function properly
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Help us understand how visitors
                    use our website
                  </li>
                  <li>
                    <strong>Functional cookies:</strong> Remember your preferences and
                    settings
                  </li>
                </ul>
                <p>
                  You can control cookies through your browser settings. Note that
                  disabling certain cookies may affect the functionality of our website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                9. Third-Party Links
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Our website may contain links to third-party websites. We are not
                  responsible for the privacy practices or content of these sites. We
                  encourage you to read the privacy policies of any third-party websites
                  you visit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                10. Changes to This Policy
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We may update this Privacy Policy from time to time. We will notify
                  you of any changes by posting the new policy on this page and updating
                  the &quot;Last updated&quot; date.
                </p>
                <p>
                  We encourage you to review this Privacy Policy periodically for any
                  changes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                11. Contact Us
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  If you have any questions about this Privacy Policy or our privacy
                  practices, please contact us:
                </p>
                <ul className="list-none space-y-2">
                  <li>Email: {SITE_CONFIG.email}</li>
                  <li>Phone: {SITE_CONFIG.phone}</li>
                </ul>
                <p className="mt-4">
                  You may also lodge a complaint with the Office of the Australian
                  Information Commissioner (OAIC) at{' '}
                  <a
                    href="https://www.oaic.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.oaic.gov.au
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

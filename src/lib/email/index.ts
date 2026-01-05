import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'Trust Australia <noreply@trustaustralia.com.au>';
const SUPPORT_EMAIL = process.env.EMAIL_TO || 'support@trustaustralia.com.au';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface OrderConfirmationData {
  customerEmail: string;
  customerName: string;
  productName: string;
  productType: string;
  amount: number;
  orderId: string;
}

export async function sendContactFormEmail(data: ContactFormData) {
  const { name, email, subject, message } = data;

  // Send notification to support
  const supportEmail = await resend.emails.send({
    from: FROM_EMAIL,
    to: SUPPORT_EMAIL,
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">New Contact Form Submission</h2>
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #718096; font-size: 12px; margin-top: 20px;">
          This email was sent from the Trust Australia contact form.
        </p>
      </div>
    `,
  });

  // Send confirmation to customer
  const confirmationEmail = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `We've received your message - Trust Australia`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">Thank you for contacting us</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you within 1-2 business days.</p>
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Your message:</strong></p>
          <p style="white-space: pre-wrap; color: #4a5568;">${message}</p>
        </div>
        <p>If your matter is urgent, please call us at <strong>1300 TRUST AU</strong>.</p>
        <p>Best regards,<br>The Trust Australia Team</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="color: #718096; font-size: 12px;">
          Trust Australia | <a href="https://trustaustralia.com.au" style="color: #3182ce;">trustaustralia.com.au</a>
        </p>
      </div>
    `,
  });

  return { supportEmail, confirmationEmail };
}

export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  const { customerEmail, customerName, productName, productType, amount, orderId } = data;

  const productDescriptions: Record<string, string> = {
    'discretionary': 'Your Discretionary Trust Deed is ready for download.',
    'unit': 'Your Unit Trust Deed is ready for download.',
    'discretionary-bundle': 'Your Discretionary Trust Bundle order is being processed. We will register your corporate trustee company with ASIC and complete all ATO registrations.',
    'company-registration': 'Your company registration is being processed. We will lodge with ASIC and you should receive your ACN within 24-48 hours.',
    'smsf-bundle': 'Your SMSF Trustee Bundle order is being processed. We will register your corporate trustee company with ASIC and complete all ATO and SMSF registrations.',
  };

  const nextSteps: Record<string, string[]> = {
    'discretionary': [
      'Download your trust deed from the success page',
      'Print the trust deed and have it signed by the settlor and trustee',
      'Have the settlor provide the settlement sum (usually $10) to the trustee',
      'Store the original signed trust deed safely',
      'Consider having the deed reviewed by a legal professional',
    ],
    'unit': [
      'Download your trust deed from the success page',
      'Print the trust deed and have it signed by the settlor and trustee',
      'Have the settlor provide the settlement sum (usually $10) to the trustee',
      'Issue unit certificates to unit holders',
      'Store the original signed trust deed safely',
    ],
    'discretionary-bundle': [
      'We will register your corporate trustee company with ASIC (24-48 hours)',
      'You will receive your company documents and ACN via email',
      'We will apply for the trust ABN and TFN with the ATO',
      'You will receive your trust deed for signing',
      'Once all registrations are complete, your trust will be ready to operate',
    ],
    'company-registration': [
      'We will lodge your company registration with ASIC',
      'You should receive your ACN within 24-48 hours',
      'We will email you all company documents including your constitution',
      'We will assist with your ABN application',
      'Store your company documents safely',
    ],
    'smsf-bundle': [
      'We will register your corporate trustee company with ASIC',
      'We will register your SMSF with the ATO',
      'You will receive your SMSF trust deed and company documents',
      'Use the rollover forms to transfer your existing super',
      'Appoint an SMSF auditor for your annual audit requirements',
    ],
  };

  const description = productDescriptions[productType] || 'Your order has been received.';
  const steps = nextSteps[productType] || [];

  const email = await resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: `Order Confirmation - ${productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a365d; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Order Confirmed</h1>
        </div>

        <div style="padding: 30px;">
          <p>Hi ${customerName},</p>
          <p>Thank you for your order with Trust Australia!</p>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a365d;">Order Details</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Amount Paid:</strong> $${(amount / 100).toFixed(2)} AUD</p>
          </div>

          <p>${description}</p>

          ${steps.length > 0 ? `
            <h3 style="color: #1a365d;">Next Steps</h3>
            <ol style="padding-left: 20px;">
              ${steps.map(step => `<li style="margin-bottom: 10px;">${step}</li>`).join('')}
            </ol>
          ` : ''}

          <div style="background-color: #ebf8ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3182ce;">
            <p style="margin: 0; color: #2c5282;">
              <strong>Need help?</strong> Reply to this email or contact us at support@trustaustralia.com.au
            </p>
          </div>

          <p>Best regards,<br>The Trust Australia Team</p>
        </div>

        <div style="background-color: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; font-size: 12px; margin: 0;">
            Trust Australia | <a href="https://trustaustralia.com.au" style="color: #3182ce;">trustaustralia.com.au</a><br>
            This is an automated email. Please do not reply directly unless you need assistance.
          </p>
        </div>
      </div>
    `,
  });

  // Also notify support of the order
  await resend.emails.send({
    from: FROM_EMAIL,
    to: SUPPORT_EMAIL,
    subject: `New Order: ${productName} - ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">New Order Received</h2>
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px;">
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Product:</strong> ${productName}</p>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)} AUD</p>
        </div>
        <p style="color: #718096; font-size: 12px; margin-top: 20px;">
          ${productType.includes('bundle') || productType === 'company-registration'
            ? '<strong style="color: #e53e3e;">Action Required:</strong> This order requires manual processing (ASIC registration, etc.)'
            : 'This is a trust deed only order - no action required.'}
        </p>
      </div>
    `,
  });

  return email;
}

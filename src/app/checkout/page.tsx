'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const validProductTypes = [
  'discretionary',
  'unit',
  'discretionary-bundle',
  'company-registration',
  'smsf-bundle',
];

function getFormDataKey(type: string): string {
  switch (type) {
    case 'discretionary':
      return 'trustForm_discretionary';
    case 'unit':
      return 'trustForm_unit';
    case 'discretionary-bundle':
      return 'trustForm_discretionary-bundle';
    case 'company-registration':
      return 'companyForm';
    case 'smsf-bundle':
      return 'smsfForm';
    default:
      return '';
  }
}

function getReturnUrl(type: string): string {
  switch (type) {
    case 'discretionary':
      return '/create/discretionary';
    case 'unit':
      return '/create/unit';
    case 'discretionary-bundle':
      return '/create/discretionary-bundle';
    case 'company-registration':
      return '/register/company';
    case 'smsf-bundle':
      return '/create/smsf-bundle';
    default:
      return '/';
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const type = searchParams.get('type');

  useEffect(() => {
    if (!type || !validProductTypes.includes(type)) {
      router.push('/');
      return;
    }

    // Get form data from session storage
    const formDataKey = getFormDataKey(type);
    const formDataString = sessionStorage.getItem(formDataKey);

    if (!formDataString) {
      setError('Form data not found. Please complete the form again.');
      return;
    }

    const formData = JSON.parse(formDataString);

    // Create checkout session
    const createCheckoutSession = async () => {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, formData }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const { url } = await response.json();

        // Redirect to Stripe Checkout
        if (url) {
          window.location.href = url;
        }
      } catch (err) {
        console.error('Checkout error:', err);
        setError('Failed to initiate payment. Please try again.');
      }
    };

    createCheckoutSession();
  }, [type, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Checkout Error
          </h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => router.push(getReturnUrl(type || 'discretionary'))}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Return to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Preparing Payment
        </h1>
        <p className="text-muted-foreground">
          Redirecting to secure payment...
        </p>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}

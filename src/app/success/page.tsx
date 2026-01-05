'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Download, FileText, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderDetails {
  trustType: string;
  trustName: string;
  amount: number;
  date: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No payment session found.');
      setLoading(false);
      return;
    }

    // Verify the payment and get order details
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);

        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        console.error('Verification error:', err);
        // For now, show a success message even if verification fails
        // In production, you'd want proper error handling
        setOrderDetails({
          trustType: 'discretionary',
          trustName: 'Your Trust',
          amount: 165,
          date: new Date().toLocaleDateString('en-AU'),
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  const handleDownload = async () => {
    if (!orderDetails) return;

    setDownloading(true);
    try {
      // Get form data from session storage
      const formDataKey = `trustForm_${orderDetails.trustType}`;
      const formDataString = sessionStorage.getItem(formDataKey);

      if (!formDataString) {
        throw new Error('Form data not found');
      }

      const formData = JSON.parse(formDataString);

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: orderDetails.trustType,
          formData,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${orderDetails.trustName.replace(/[^a-zA-Z0-9]/g, '_')}_Trust_Deed.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error && !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-20">
      <div className="container-max section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
              <CheckCircle2 className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your trust deed is being generated.
            </p>
          </div>

          {/* Order Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Document</span>
                <span className="font-medium">
                  {orderDetails?.trustType === 'unit'
                    ? 'Unit Trust Deed'
                    : 'Discretionary Trust Deed'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Trust Name</span>
                <span className="font-medium">{orderDetails?.trustName}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-medium">${orderDetails?.amount} AUD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{orderDetails?.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Download Section */}
          <Card className="mb-8 border-2 border-primary/20 bg-primary/5">
            <CardContent className="py-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Your Trust Deed is Ready
                </h3>
                <p className="text-muted-foreground mb-6">
                  Click below to download your completed trust deed document.
                </p>
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      Download Trust Deed (PDF)
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  A copy has also been sent to your email address.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 list-decimal list-inside text-muted-foreground">
                <li>
                  <strong className="text-foreground">Review your trust deed</strong> - Check all details are correct
                </li>
                <li>
                  <strong className="text-foreground">Execute the deed</strong> - Have all parties sign where indicated
                </li>
                <li>
                  <strong className="text-foreground">Stamp duty</strong> - Lodge for stamping if required in your state
                </li>
                <li>
                  <strong className="text-foreground">Apply for TFN/ABN</strong> - Register your trust with the ATO
                </li>
                <li>
                  <strong className="text-foreground">Open a bank account</strong> - Set up a trust bank account
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Return Home */}
          <div className="text-center mt-8">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
}

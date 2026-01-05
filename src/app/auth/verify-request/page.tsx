import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
  title: 'Check Your Email | Trust Australia',
  description: 'Check your email for a magic link to sign in',
};

export default function VerifyRequestPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container-max section-padding">
        <div className="flex flex-col items-center gap-6">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We&apos;ve sent you a magic link to sign in. Click the link in
                your email to continue.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Didn&apos;t receive an email?</strong>
                  <br />
                  Check your spam folder or{' '}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    try again
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
          <Link href="/" className="text-sm text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

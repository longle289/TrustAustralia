'use client';

import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

const errorMessages: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have access to this resource.',
  Verification: 'The verification link has expired or has already been used.',
  Default: 'An error occurred during authentication.',
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Default';
  const message = errorMessages[error] || errorMessages.Default;

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        <CardTitle className="text-2xl">Authentication Error</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{message}</p>
        <div className="flex flex-col gap-2">
          <Button asChild>
            <Link href="/auth/login">Try again</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go to home</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container-max section-padding">
        <div className="flex flex-col items-center gap-6">
          <Suspense
            fallback={
              <div className="h-[300px] w-full max-w-md bg-muted animate-pulse rounded-lg" />
            }
          >
            <ErrorContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

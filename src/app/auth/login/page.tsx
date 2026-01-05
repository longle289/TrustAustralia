import { Suspense } from 'react';
import { LoginForm } from '@/components/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Sign In | Trust Australia',
  description: 'Sign in to your Trust Australia account',
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container-max section-padding">
        <div className="flex flex-col items-center gap-6">
          <Suspense fallback={<div className="h-[300px] w-full max-w-md bg-muted animate-pulse rounded-lg" />}>
            <LoginForm />
          </Suspense>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account? Simply enter your email above to create
            one.
          </p>
          <Link
            href="/"
            className="text-sm text-primary hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

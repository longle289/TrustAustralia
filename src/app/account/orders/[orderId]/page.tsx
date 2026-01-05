import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getOrderById } from '@/lib/db/orders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, Calendar, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'Order Details | Trust Australia',
  description: 'View order details',
};

function getStatusVariant(
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'COMPLETED':
      return 'default';
    case 'PROCESSING':
      return 'secondary';
    case 'FAILED':
      return 'destructive';
    default:
      return 'outline';
  }
}

function formatProductType(type: string): string {
  const typeMap: Record<string, string> = {
    DISCRETIONARY: 'Discretionary Trust',
    UNIT: 'Unit Trust',
    DISCRETIONARY_BUNDLE: 'Discretionary Trust Bundle',
    COMPANY_REGISTRATION: 'Company Registration',
    SMSF_BUNDLE: 'SMSF Bundle',
  };
  return typeMap[type] || type;
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/account/orders');
  }

  const order = await getOrderById(orderId, session.user.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/account/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to orders
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{order.productName}</h1>
          <p className="text-muted-foreground">
            Order #{order.id.substring(0, 8).toUpperCase()}
          </p>
        </div>
        <Badge variant={getStatusVariant(order.status)} className="text-sm">
          {order.status.toLowerCase()}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Product</span>
              <p className="font-medium">{formatProductType(order.productType)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Order ID</span>
              <p className="font-mono text-sm">{order.id}</p>
            </div>
            {order.stripeSessionId && (
              <div>
                <span className="text-sm text-muted-foreground">
                  Payment Reference
                </span>
                <p className="font-mono text-sm">
                  {order.stripeSessionId.substring(0, 20)}...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Amount</span>
              <p className="text-2xl font-bold">
                ${(order.amount / 100).toFixed(2)} AUD
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      {order.status === 'COMPLETED' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button disabled>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <p className="text-sm text-muted-foreground self-center">
                Document generation will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help */}
      <Card>
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            Need help with this order?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

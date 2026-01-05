import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserOrders } from '@/lib/db/orders';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FileText, ExternalLink, Plus } from 'lucide-react';

export const metadata = {
  title: 'Order History | Trust Australia',
  description: 'View your order history and download documents',
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

export default async function OrderHistoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/account/orders');
  }

  const orders = await getUserOrders(session.user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order History</h1>
          <p className="text-muted-foreground">
            View and download your trust deeds and documents.
          </p>
        </div>
        <Button asChild>
          <Link href="/create/discretionary">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Link>
        </Button>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first trust deed to get started.
            </p>
            <Button asChild>
              <Link href="/create/discretionary">Create Trust Deed</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{order.productName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(order.amount / 100).toFixed(2)}
                      </p>
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status.toLowerCase()}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/account/orders/${order.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

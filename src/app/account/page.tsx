import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserOrders } from '@/lib/db/orders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Plus, Mail } from 'lucide-react';

export const metadata = {
  title: 'Account Dashboard | Trust Australia',
  description: 'Manage your Trust Australia account',
};

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/account');
  }

  const orders = await getUserOrders(session.user.id);
  const completedOrders = orders.filter((o) => o.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Manage your trust deeds and account settings.
        </p>
      </div>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Email</span>
              <p className="font-medium">{session.user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders or Empty State */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first trust deed to get started.
              </p>
              <Button asChild>
                <Link href="/create/discretionary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Trust Deed
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('en-AU')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(order.amount / 100).toFixed(2)}
                    </p>
                    <p
                      className={`text-sm ${
                        order.status === 'COMPLETED'
                          ? 'text-green-600'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {order.status.toLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
              {orders.length > 3 && (
                <div className="text-center pt-2">
                  <Button variant="outline" asChild>
                    <Link href="/account/orders">View all orders</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/create/discretionary">
                <Plus className="h-4 w-4 mr-2" />
                New Discretionary Trust
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/create/unit">New Unit Trust</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register/company">Register Company</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import Link from 'next/link';
import { Settings, FileText, User } from 'lucide-react';

const accountNav = [
  { name: 'Dashboard', href: '/account', icon: User },
  { name: 'Order History', href: '/account/orders', icon: FileText },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-8 lg:py-12">
      <div className="container-max section-padding">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-lg border p-4">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account
              </h2>
              <nav className="space-y-1">
                {accountNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

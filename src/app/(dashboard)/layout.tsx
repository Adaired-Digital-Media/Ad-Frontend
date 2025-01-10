import DashboardLayout from '@/layouts/dashboard/layout';
import CartDrawer from '@/app/shared/ecommerce/cart/cart-drawer';
import { CartProvider } from '@/store/quick-cart/cart.context';
import { SessionProvider } from 'next-auth/react';

export default function DefaultDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartProvider>
        <DashboardLayout>{children}</DashboardLayout>
        {/* <CartDrawer /> */}
      </CartProvider>
    </SessionProvider>
  );
}

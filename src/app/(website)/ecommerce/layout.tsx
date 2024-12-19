import CartDrawer from '@/app/shared/ecommerce/cart/cart-drawer';
import { CartProvider } from '@/store/quick-cart/cart.context';
import { SessionProvider } from 'next-auth/react';
export default function Ecommercelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </SessionProvider>
  );
}

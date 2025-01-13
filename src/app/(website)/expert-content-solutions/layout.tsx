import CartDrawer from '@/app/shared/ecommerce/cart/cart-drawer';
import { CartProvider } from '@/store/quick-cart/cart.context';
import { SessionProvider } from 'next-auth/react';
import { ReactLenis } from '@core/utils/lenis';
export default function Ecommercelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ReactLenis root>
      <SessionProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </SessionProvider>
    // </ReactLenis>
  );
}

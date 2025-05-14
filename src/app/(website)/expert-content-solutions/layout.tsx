import CartDrawer from '@/app/shared/ecommerce/cart/cart-drawer';
import { CartProvider } from '@/store/quick-cart/cart.context';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import WhatsappFloatingIcon from '@core/components/floating-social-icons/whatsapp';
import SkypeFloatingIcon from '@core/components/floating-social-icons/skype';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
export default function Ecommercelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartProvider>
        <SkypeFloatingIcon
          className="bottom-20"
          skypeID="https://teams.live.com/l/invite/FEAiHSAKe2uSNPyRwE"
        />
        <WhatsappFloatingIcon phoneNumber="918907400008" />
        {children}
        <CartDrawer />
      </CartProvider>
    </SessionProvider>
  );
}

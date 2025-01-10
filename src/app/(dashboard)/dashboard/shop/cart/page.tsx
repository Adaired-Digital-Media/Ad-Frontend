import CartTemplate from '@/app/shared/ecommerce/cart';
import { metaObject } from '@/config/site.config';
export const metadata = {
  ...metaObject('Cart'),
};

export default function CartPage() {
  return (
    <>
      <CartTemplate />
    </>
  );
}

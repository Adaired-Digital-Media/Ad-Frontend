'use client';
import { cn } from '@core/utils/class-names';
import { Button, Title } from 'rizzui';
import OrderProducts from './order-products';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/store/quick-cart/cart.context';

export default function OrderSummery({
  isLoading,
  className,
}: {
  className?: string;
  isLoading?: boolean;
}) {
  const params = useParams();
  const { cartItems, addItemToCart } = useCart();

  return (
    <div
      className={cn(
        'sticky top-24 mt-8 @5xl:col-span-4 @5xl:mt-0 @6xl:col-span-3 2xl:top-28',
        className
      )}
    >
      <div className="rounded-lg border border-muted @5xl:rounded-none @5xl:border-none @5xl:px-0">
        <div className="flex items-center justify-between rounded-tl-[15px] rounded-tr-[15px] bg-[#EBF5FF] p-5">
          <Title as="h3" className="font-poppins text-[22px] font-semibold">
            Cart ({cartItems?.length}{' '}
            {cartItems?.length > 1 ? 'Items' : 'Items'} In Cart)
          </Title>

          <Link href={routes.eCommerce.cart}>
            <Button
              as="span"
              variant="text"
              className="h-auto w-auto p-0 text-primary underline hover:text-gray-1000"
            >
              Edit Cart
            </Button>
          </Link>
        </div>
        <div className="rounded-bl-[15px] rounded-br-[15px] border border-t-0 p-5">
          <OrderProducts
            addItemToCart={addItemToCart}
            // removeItemFromCart={removeItemFromCart}
            // clearItemFromCart={clearItemFromCart}
            items={cartItems}
            className="mb-5 border-b border-muted pb-5"
          />

          {cartItems.length > 0 ? (
            <Button
              type="submit"
              isLoading={isLoading}
              className="mt-3 w-full text-base @md:h-12"
            >
              {params?.id ? 'Update Order' : 'Place Order'}
            </Button>
          ) : (
            <Link href={routes.eCommerce.shop}>
              <Button
                as="span"
                className="mt-3 w-full text-base @md:h-12"
              >{`Back to Store`}</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

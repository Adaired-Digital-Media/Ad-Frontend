'use client';

import { cn } from '@core/utils/class-names';
import { Title } from 'rizzui';
import Button from '@web-components/Button';
import OrderProducts from './order-products';
import { routes } from '@/config/routes';
import { useCart } from '@/store/quick-cart/cart.context';
// import { useParams } from 'next/navigation';

export default function OrderSummery({
  className,
}: {
  className?: string;
  isLoading?: boolean;
}) {
  // const params = useParams();
  const { products } = useCart();

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
            Cart ({products?.length} {products?.length > 1 ? 'Items' : 'Item'}{' '}
            In Cart)
          </Title>
        </div>
        <div className="flex min-h-[270px] flex-col rounded-bl-[15px] rounded-br-[15px] border border-t-0 p-5">
          <div className="flex-1">
            <OrderProducts items={products} className="h-auto" />
          </div>

          {products.length > 0 ? (
            <Button
              title={'View Cart'}
              className="flex w-full justify-center bg-black hover:bg-black"
              textClassName="text-white"
              svgInnerClassName="!text-black"
              svgClassName="bg-white"
              type="button"
              navigateTo={routes?.eCommerce?.cart}
            />
          ) : (
            <Button
              title="Back to Store"
              className="flex w-full justify-center bg-black hover:bg-black"
              textClassName="text-white"
              svgInnerClassName="!text-black"
              svgClassName="bg-white"
              type="button"
              navigateTo={routes?.eCommerce?.products}
            />
          )}
        </div>
      </div>
    </div>
  );
}

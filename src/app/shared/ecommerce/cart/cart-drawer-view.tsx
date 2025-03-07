'use client';

import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import isEmpty from 'lodash/isEmpty';
import OrderProducts from '@/app/shared/ecommerce/checkout/order-products';
import { toCurrency } from '@core/utils/to-currency';
import { Title, Text, Button, EmptyProductBoxIcon } from 'rizzui';
import { cn } from '@core/utils/class-names';
import { routes } from '@/config/routes';
import { CartItem } from '@/types';
import DrawerHeader from '@/app/shared/drawer-header';

type CartDrawerViewProps = {
  items: CartItem[];
  setOpenDrawer: (id: boolean) => void;
};

export default function CartDrawerView({
  items,
  setOpenDrawer,
}: CartDrawerViewProps) {
  const router = useRouter();

  // Calculate total price dynamically
  const total = items.reduce((acc, item) => acc + (item?.totalPrice ?? 0), 0);

  const isCartEmpty = isEmpty(items);

  return (
    <div className="flex h-full w-full flex-col z-[2247483648] ">
      <DrawerHeader
        heading="Shopping Cart"
        onClose={() => setOpenDrawer(false)}
      />

      {isCartEmpty ? (
        <div className="grid h-full place-content-center">
          <EmptyProductBoxIcon className="mx-auto h-auto w-52 text-gray-400" />
          <Title as="h5" className="mt-6 text-center">
            Your cart is empty
          </Title>
          <Text className="mt-1 text-center">Start Shopping!!</Text>
        </div>
      ) : (
        <OrderProducts
          items={items}
          className="mb-5 gap-0 divide-y border-b border-gray-100"
          itemClassName="px-4 py-0.5 md:px-6"
          onClick={() => setOpenDrawer(false)}
        />
      )}

      {isCartEmpty ? (
        <div className="px-4 py-5">
          <Button
            className="w-full"
            variant="flat"
            onClick={() => {
              setOpenDrawer(false);
              router.push(routes.eCommerce.products);
            }}
          >
            Back To Shop
          </Button>
        </div>
      ) : (
        <Link
          href={routes?.eCommerce?.cart}
          className={cn(
            'mx-4 mb-6 mt-auto flex items-center justify-between rounded-md bg-primary px-5 py-2 font-medium text-primary-foreground md:mx-6'
          )}
          onClick={() => {
            setOpenDrawer(false);
          }}
        >
          Checkout
          <span className="-mr-3 inline-flex rounded-md bg-primary-lighter p-2 px-4 text-primary-dark">
            {toCurrency(total)}
          </span>
        </Link>
      )}
    </div>
  );
}

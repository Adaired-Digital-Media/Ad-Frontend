'use client';

import { Form } from '@/@core/ui/rizzui-ui/form';
import SmallWidthContainer from '@/app/(website)/components/SmallWidthContainer';
import { routes } from '@/config/routes';
import { useCart } from '@/store/quick-cart/cart.context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Empty, EmptyProductBoxIcon, Title, Text, Input, Button } from 'rizzui';
import { ProductSkeleton } from '@/app/(website)/components/Skeletons/ProductSkeleton';
import { toCurrency } from '@/@core/utils/to-currency';

import dynamic from 'next/dynamic';

const CartProduct = dynamic(() => import('./cart-product'), {
  loading: () => <ProductSkeleton />,
  ssr: false,
});

type FormValues = {
  couponCode: string;
};

export default function CartPageWrapper() {
  const { cartItems } = useCart();

  return (
    <SmallWidthContainer className="@container">
      <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="@5xl:col-span-8 @6xl:col-span-7">
          {cartItems.length ? (
            cartItems.map((item, idx) => (
              <CartProduct key={idx} product={item}  />
            ))
          ) : (
            <Empty
              image={<EmptyProductBoxIcon />}
              text="No Product in the Cart"
            />
          )}
        </div>
        <div className="sticky top-24 mt-10 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
          <CartCalculations />
        </div>
      </div>
    </SmallWidthContainer>
  );
}

function CheckCoupon() {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset({ couponCode: '' });
  };

  return (
    <Form<FormValues>
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { couponCode: '' },
      }}
      className="w-full"
    >
      {({ register, formState: { errors }, watch }) => (
        <>
          <div className="relative flex items-end">
            <Input
              type="text"
              placeholder="Enter coupon code"
              inputClassName="text-sm"
              className="w-full"
              label={<Text>Do you have a promo code?</Text>}
              {...register('couponCode')}
              error={errors.couponCode?.message}
            />
            <Button
              type="submit"
              className="ms-3"
              disabled={watch('couponCode') ? false : true}
            >
              Apply
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
// total cart balance calculation
function CartCalculations() {
  const router = useRouter();
  const { cartItems } = useCart();

  // Calculate total price dynamically
  const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  return (
    <div>
      <Title
        as="h2"
        className="border-b border-muted pb-4 text-center text-xl font-medium"
      >
        Order Summary
      </Title>
      <div className="mt-6 grid grid-cols-1 gap-4 @md:gap-6">
        {cartItems.map((item) => (
          <div
            key={item?.productId}
            className="flex items-center justify-between"
          >
            <Title as="h3" className="mb-1 text-base font-semibold">
              <Link href={routes.eCommerce.productDetails(item.productId)}>
                {item?.productName}
              </Link>
            </Title>
            <div className="text-right">{toCurrency(item?.totalPrice)}</div>
          </div>
        ))}

        {/* <CheckCoupon /> */}
        <div className="mt-3 flex items-center justify-between border-t border-muted py-4 font-semibold text-gray-1000">
          Total
          <span className="font-medium text-gray-1000">
            {toCurrency(total)}
          </span>
        </div>
        <Link href={routes.eCommerce.checkout}>
          <Button
            size="xl"
            rounded="pill"
            onClick={() => router.push(routes.eCommerce.checkout)}
            className="w-full"
          >
            Proceed To Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}

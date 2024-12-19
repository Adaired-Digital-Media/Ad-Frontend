'use client';

import { Form } from '../../../../@core/ui/rizzui-ui/form';
import SmallWidthContainer from '@/app/(website)/components/SmallWidthContainer';
import { routes } from '@/config/routes';
import { useCart } from '@/store/quick-cart/cart.context';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Empty, EmptyProductBoxIcon, Title, Text, Input, Button } from 'rizzui';
import { ProductSkeleton } from '@/app/(website)/components/Skeletons/ProductSkeleton';
import { toCurrency } from '../../../../@core/utils/to-currency';
import { loadStripe } from '@stripe/stripe-js';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { cn } from '../../../../@core/utils/class-names';

const CartProduct = dynamic(() => import('./cart-product'), {
  loading: () => <ProductSkeleton />,
  ssr: false,
});

type FormValues = {
  couponCode: string;
};

export default function CartPageWrapper() {
  const { cartItems } = useCart();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    );
    setIsLoading(true);
    try {
      const orderData = {
        paymentMethod: 'Stripe',
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/orders/create`,
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (response.status !== 201) throw new Error('Failed to create order');

      const order = response.data;
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: order.sessionId,
        });
      }
    } catch (error) {
      alert('Failed to create order');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length <= 0) {
    return (
      <SmallWidthContainer className="@container">
        <Empty image={<EmptyProductBoxIcon />} text="No Product in the Cart" />
      </SmallWidthContainer>
    );
  }

  return (
    <SmallWidthContainer className="@container">
      <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div
          className={cn(
            `${cartItems.length < 0 ? '@5xl:col-span-12 @6xl:col-span-12' : '@5xl:col-span-8 @6xl:col-span-7'}`
          )}
        >
          {cartItems.length ? (
            cartItems.map((item, idx) => (
              <CartProduct key={idx} product={item} />
            ))
          ) : (
            <Empty
              image={<EmptyProductBoxIcon />}
              text="No Product in the Cart"
            />
          )}
        </div>

        <div className="sticky top-24 mt-10 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
          <CartCalculations
            handleSubmit={handleCheckout}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            session={session}
          />
        </div>
      </div>
    </SmallWidthContainer>
  );
}

// total cart balance calculation
function CartCalculations({
  handleSubmit,
  isLoading,
  session,
  setIsLoading,
}: any) {
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
              <Link
                // href={routes.eCommerce.productDetails(item.productId)}
                href={''}
              >
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

        {session ? (
          <Button
            size="xl"
            rounded="pill"
            onClick={handleSubmit}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Processing Order...' : 'Proceed to Checkout'}
          </Button>
        ) : (
          <Button
            size="xl"
            rounded="pill"
            onClick={() => {
              setIsLoading(true);
              router.push(routes.auth.signIn);
            }}
            className="w-full"
            isLoading={isLoading}
          >
            Login to Checkout
          </Button>
        )}
      </div>
    </div>
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

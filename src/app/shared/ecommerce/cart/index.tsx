'use client';

import { Form } from '@core/ui/rizzui-ui/form';
import SmallWidthContainer from '@/app/(website)/components/SmallWidthContainer';
import { routes } from '@/config/routes';
import { useCart } from '@/store/quick-cart/cart.context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Empty, EmptyProductBoxIcon, Title, Text, Input, Button } from 'rizzui';
import { toCurrency } from '@core/utils/to-currency';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { cn } from '@core/utils/class-names';
import { usePathname } from 'next/navigation';
import PageHeader from '@/app/shared/page-header';
import CartProduct from './cart-product';
import { CartTemplateSkeleton } from '@/app/(website)/components/Skeletons/CartTemplateSkeleton';
import toast from 'react-hot-toast';
import { PiCheckCircleDuotone, PiXCircleDuotone } from 'react-icons/pi';
type FormValues = {
  couponCode: string;
};

export default function CartPageWrapper() {
  const pathname = usePathname();
  const { products, isSyncing = false } = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [areProductsLoaded, setAreProductsLoaded] = useState(false);
  const [couponData, setCouponData] = useState<{
    originalTotal?: number;
    couponDiscount?: number;
    finalPrice?: number;
    couponCode?: string;
    appliedTo?: string;
    productDiscounts?: { [key: string]: number };
  }>({
    originalTotal: undefined,
    couponDiscount: 0,
    finalPrice: undefined,
    couponCode: undefined,
    appliedTo: undefined,
    productDiscounts: {},
  });

  const isDashboard = pathname.includes('/dashboard');
  const TagName = !isDashboard ? SmallWidthContainer : 'div';

  const pageHeader = isDashboard
    ? {
        title: 'Cart',
        breadcrumb: [
          {
            href: routes?.userDashboard?.dashboard,
            name: 'Dashboard',
          },
          {
            name: 'Cart',
          },
        ],
      }
    : {
        title: 'Cart',
        breadcrumb: [
          {
            name: 'Home',
          },
          {
            href: routes?.userDashboard?.dashboard,
            name: 'E-Commerce',
          },
          {
            name: 'Cart',
          },
        ],
      };

  // Fetch user's IP address
  const getUserIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP:', error);
      return null;
    }
  };

  const handleCheckout = async (couponCode?: string) => {
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    );
    setIsLoading(true);
    try {
      // Fetch user's IP
      const ip = await getUserIp();
      if (!ip) {
        console.error('Could not fetch user IP');
        setIsLoading(false);
        return;
      }

      const orderData = {
        paymentMethod: 'Stripe',
        ip: ip,
        couponCode: couponCode || undefined,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/orders/create`,
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      // if (response.status !== 201) throw new Error('Failed to create order');
      if (response.data.redirectUrl)
        return router.push(response.data.redirectUrl);

      const order = response.data;
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: order.sessionId,
        });
      }
    } catch (error: any) {
      console.error(error.response.data.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle loading state with isSyncing to prevent flickering
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSyncing) {
      setAreProductsLoaded(false);
    } else if (products.length > 0) {
      setAreProductsLoaded(true);
    } else {
      setAreProductsLoaded(false);
      timer = setTimeout(() => {
        if (products.length === 0) {
          setAreProductsLoaded(true);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [products, isSyncing]);

  if (!areProductsLoaded || isSyncing) {
    return (
      <TagName className="@container">
        <CartTemplateSkeleton />
      </TagName>
    );
  }

  if (areProductsLoaded && !isSyncing && products.length <= 0) {
    return (
      <TagName className="@container">
        <Empty
          image={<EmptyProductBoxIcon />}
          text="No Product in the Cart"
          className="p-20"
        />
      </TagName>
    );
  }

  return (
    <>
      {isDashboard && (
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
          isDashboard={isDashboard}
        />
      )}
      <TagName className="min-h @container">
        <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
          <div
            className={cn(
              `${products.length < 0 ? '@5xl:col-span-12 @6xl:col-span-12' : '@5xl:col-span-8 @6xl:col-span-7'}`
            )}
          >
            {products.length &&
              products.map((item) => (
                <CartProduct
                  key={item._id}
                  product={item}
                  couponData={couponData}
                />
              ))}
          </div>

          <div className="sticky top-24 mt-10 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
            <CartCalculations
              handleSubmit={handleCheckout}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              session={session}
              pathname={pathname}
              couponData={couponData}
              setCouponData={setCouponData}
            />
          </div>
        </div>
      </TagName>
    </>
  );
}

// total cart balance calculation
function CartCalculations({
  handleSubmit,
  isLoading,
  session,
  setIsLoading,
  pathname,
  couponData,
  setCouponData,
}: any) {
  const router = useRouter();
  const { products } = useCart();

  const total = products.reduce((acc, item) => acc + (item.totalPrice ?? 0), 0);
  const displayTotal = Math.max(couponData.finalPrice ?? total, 0);
  const originalPrice = couponData.originalTotal ?? null;
  const discountPrice = couponData.couponDiscount ?? 0;
  const productDiscounts = couponData.productDiscounts ?? {};

  const onCheckoutClick = () => {
    handleSubmit(couponData.couponCode);
  };
  return (
    <div className={cn('rounded-lg border border-dashed p-6 shadow-sm')}>
      <Title
        as="h2"
        className="border-b border-muted pb-4 text-center text-xl font-medium"
      >
        Order Summary
      </Title>
      <div className="mt-6 grid grid-cols-1 gap-4 @md:gap-6">
        {products.map((item) => {
          const productDiscount =
            productDiscounts[item?.product?._id as string] || 0;
          const discountedPrice =
            productDiscount > 0
              ? Math.max((item.totalPrice as number) - productDiscount, 0)
              : item.totalPrice;

          return (
            <div key={item?._id} className="flex items-center justify-between">
              <Title as="h3" className="mb-1 text-base font-semibold">
                {item?.product?.name}
              </Title>
              <div className="text-right">
                {productDiscount > 0 ? (
                  <>
                    <span className="text-gray-900">
                      {toCurrency(discountedPrice as number)}
                    </span>
                    <del className="ps-1.5 text-[13px] font-normal text-gray-500">
                      {toCurrency(item.totalPrice as number)}
                    </del>
                  </>
                ) : (
                  toCurrency(item.totalPrice as number)
                )}
              </div>
            </div>
          );
        })}

        <CheckCoupon
          cartData={products}
          onCouponApplied={setCouponData}
          couponData={couponData}
        />

        <div className="mt-3 border-t border-muted py-4 font-semibold text-gray-1000">
          {/* <div className="flex items-center justify-between">
            Discount:
            <div className="mt-2 flex items-center font-semibold text-gray-900">
              {toCurrency(discountPrice)}
            </div>
          </div> */}
          <div className="flex items-center justify-between">
            Total:
            <div className="mt-2 flex items-center font-semibold text-gray-900">
              {toCurrency(displayTotal)}
              {originalPrice !== null && originalPrice !== displayTotal && (
                <del className="ps-1.5 text-[13px] font-normal text-gray-500">
                  {toCurrency(originalPrice)}
                </del>
              )}
            </div>
          </div>
        </div>

        {session ? (
          <Button
            size="xl"
            rounded="pill"
            onClick={onCheckoutClick}
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
              router.push(
                `${routes.auth.signIn}?callbackUrl=${encodeURIComponent(pathname)}`
              );
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

function generateCouponMessage(couponDetails: any, discount: number): string[] {
  const messages: string[] = [];

  // Applicability
  if (couponDetails.couponApplicableOn === 'allProducts') {
    messages.push('Applies to all products in your cart.');
  }

  if (
    couponDetails.couponApplicableOn === 'specificProducts' &&
    couponDetails.specificProducts?.length
  ) {
    messages.push(
      `Applies to: ${couponDetails.specificProducts.map((p: any) => p.name).join(', ')}.`
    );
  }

  // Discount
  if (couponDetails.discountType === 'percentage') {
    let discountMsg = `Offers ${couponDetails.discountValue}% off`;
    if (couponDetails.maxDiscountAmount) {
      discountMsg += `, up to ${toCurrency(couponDetails.maxDiscountAmount)}.`;
    } else {
      discountMsg += '.';
    }
    messages.push(discountMsg);
  } else if (couponDetails.discountType === 'flat') {
    messages.push(
      `Offers a flat discount of ${toCurrency(couponDetails.discountValue)}.`
    );
  }

  // Current Discount
  messages.push(`You saved ${toCurrency(discount)} on this order.`);

  // Conditions
  if (
    couponDetails.couponType === 'quantityBased' &&
    couponDetails.minQuantity
  ) {
    messages.push(
      `Requires a minimum of ${couponDetails.minQuantity} item${couponDetails.minQuantity > 1 ? 's' : ''}.`
    );
  }
  if (couponDetails.minOrderAmount) {
    messages.push(
      `Requires a minimum order of ${toCurrency(couponDetails.minOrderAmount)}.`
    );
  }
  if (couponDetails.maxWordCount) {
    messages.push(
      `Applicable for items up to ${couponDetails.maxWordCount} words.`
    );
  }

  return messages;
}

function CheckCoupon({
  cartData,
  onCouponApplied,
  couponData,
}: {
  cartData: any;
  onCouponApplied: (data: {
    originalTotal?: number;
    couponDiscount?: number;
    finalPrice?: number;
    couponCode?: string;
    appliedTo?: string;
    productDiscounts?: { [key: string]: number };
  }) => void;
  couponData: any;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code?: string;
    discount?: number;
    details?: any;
  } | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const totalPrice = cartData.reduce(
      (acc: number, item: any) => acc + (item.totalPrice ?? 0),
      0
    );
    const totalQuantity = cartData.length;

    const payload = {
      code: data.couponCode,
      localCart: {
        products: cartData,
        totalPrice,
        totalQuantity,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/coupons/apply`,
        payload
      );
      if (response.status === 200) {
        setReset({ couponCode: '' });
        setAppliedCoupon({
          code: payload.code,
          discount: response.data.couponDiscount,
          details: response.data.couponDetails,
        });
        onCouponApplied({
          originalTotal: response.data.originalTotal,
          couponDiscount: response.data.couponDiscount,
          finalPrice: response.data.finalPrice,
          couponCode: payload.code || undefined,
          appliedTo: response.data.appliedTo,
          productDiscounts: response.data.productDiscounts,
        });
        toast.success('Coupon applied successfully');
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || 'Unknown error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setReset({ couponCode: '' });
    onCouponApplied({
      originalTotal: undefined,
      couponDiscount: 0,
      finalPrice: undefined,
      couponCode: undefined,
      appliedTo: undefined,
      productDiscounts: {},
    });
    toast.success('Coupon removed');
  };

  // Function to revalidate coupon
  const revalidateCoupon = async () => {
    if (!couponData?.couponCode) return;

    try {
      const totalPrice = cartData.reduce(
        (acc: number, item: any) => acc + (item.totalPrice ?? 0),
        0
      );
      const totalQuantity = cartData.length;

      const payload = {
        code: couponData.couponCode,
        localCart: {
          products: cartData,
          totalPrice,
          totalQuantity,
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/coupons/apply`,
        payload
      );

      if (response.status === 200) {
        onCouponApplied({
          originalTotal: response.data.originalTotal,
          couponDiscount: response.data.couponDiscount,
          finalPrice: response.data.finalPrice,
          couponCode: couponData.couponCode,
          appliedTo: response.data.appliedTo,
          productDiscounts: response.data.productDiscounts,
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Unknown error';
      if (
        errorMessage.includes('Invalid or expired coupon') ||
        errorMessage.includes('Minimum order amount')
      ) {
        setAppliedCoupon(null);
        setReset({ couponCode: '' });
        onCouponApplied({
          originalTotal: undefined,
          couponDiscount: 0,
          finalPrice: undefined,
          couponCode: undefined,
          appliedTo: undefined,
          productDiscounts: {},
        });
        toast.error('Coupon no longer valid with current cart');
      } else {
        console.warn(
          'Revalidation failed, preserving existing coupon data:',
          errorMessage
        );
      }
    }
  };
  // const revalidateCoupon = async () => {
  //   if (!couponData?.couponCode) return;

  //   try {
  //     const totalPrice = cartData.reduce(
  //       (acc: number, item: any) => acc + (item.totalPrice ?? 0),
  //       0
  //     );
  //     const totalQuantity = cartData.length;

  //     const payload = {
  //       code: couponData.couponCode,
  //       localCart: {
  //         products: cartData,
  //         totalPrice,
  //         totalQuantity,
  //       },
  //     };

  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/coupons/apply`,
  //       payload
  //     );

  //     if (response.status === 200) {
  //       onCouponApplied({
  //         originalTotal: response.data.originalTotal,
  //         couponDiscount: response.data.couponDiscount,
  //         finalPrice: response.data.finalPrice,
  //         couponCode: couponData.couponCode,
  //         appliedTo: response.data.appliedTo,
  //         productDiscounts: response.data.productDiscounts,
  //       });
  //     }
  //   } catch (error: any) {
  //     // Remove coupon if validation fails
  //     setAppliedCoupon(null);
  //     setReset({ couponCode: '' });
  //     onCouponApplied({
  //       originalTotal: undefined,
  //       couponDiscount: 0,
  //       finalPrice: undefined,
  //       couponCode: undefined,
  //       appliedTo: undefined,
  //       productDiscounts: {},
  //     });
  //     toast.error('Coupon no longer valid with current cart');
  //   }
  // };

  // Revalidate coupon when cartData changes
  useEffect(() => {
    if (couponData?.couponCode) {
      revalidateCoupon();
    }
  }, [cartData]);

  return (
    <>
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
                isLoading={isLoading}
              >
                Apply
              </Button>
            </div>
          </>
        )}
      </Form>

      {appliedCoupon && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PiCheckCircleDuotone className="mr-2 h-5 w-5 text-green-600" />
              <Text className="font-semibold text-green-800">
                Coupon Applied: {appliedCoupon.code}
              </Text>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-red-600 hover:text-red-800"
              aria-label="Remove coupon"
            >
              <PiXCircleDuotone className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
            {generateCouponMessage(
              appliedCoupon.details,
              couponData.couponDiscount || 0
            ).map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

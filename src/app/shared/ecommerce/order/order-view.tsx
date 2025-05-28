'use client';

import Image from 'next/image';
import { PiCheckBold } from 'react-icons/pi';
import OrderViewProducts from '@/app/shared/ecommerce/order/order-products/order-view-products';
import { Title, Text, Avatar } from 'rizzui';
import { cn } from '@core/utils/class-names';
import { toCurrency } from '@core/utils/to-currency';
import { formatDate } from '@core/utils/format-date';
import { Session } from "next-auth";

const orderStatus = [
  { id: 'Pending', label: 'Order Pending' },
  { id: 'Processing', label: 'Order Processing' },
  { id: 'Confirmed', label: 'Order Confirmed' },
  { id: 'Completed', label: 'Order Completed' },
] as const;

const Images = [
  {
    id: 1,
    paymentMethod: {
      name: 'MasterCard',
      image:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/master.png',
    },
  },
  {
    id: 2,
    paymentMethod: {
      name: 'PayPal',
      image:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/paypal.png',
    },
  },
  {
    id: 2,
    paymentMethod: {
      name: 'Stripe',
      image:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/stripe.png',
    },
  },
];

function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Title
        as="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
      >
        {title}
      </Title>
      <div
        className={cn(
          'rounded-lg border border-muted px-5 @sm:px-7 @5xl:rounded-xl',
          childrenWrapperClass
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function OrderView({
  order,
  session,
}: {
  order: any;
  session: Session;
}) {
  // Find the matching payment method image
  const matchedPayment = Images.find(
    (image) => image.paymentMethod.name === order.paymentMethod
  );
  const paymentImage =
    matchedPayment?.paymentMethod.image || '/default-payment.png';
  const paymentName =
    matchedPayment?.paymentMethod.name || order.paymentMethod || 'Unknown';

  const currentStatusIndex = orderStatus.findIndex(
    (item) => item.id === order.status
  );
  return (
    <div className="@container">
      <div className="flex flex-wrap justify-center items-center border-b border-t border-gray-300 py-4 font-medium text-gray-700 @5xl:justify-start">
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          {/* March 07, 2025 at 10:30 am */}
          {formatDate(order.createdAt, 'MMMM D, YYYY')} at{' '}
          {formatDate(order.createdAt, 'h:mm A')}
        </span>
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          <span className="font-bold"> {order?.totalQuantity} </span> Items
        </span>
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          Total :{' '}
          <span className="font-bold">{toCurrency(order.finalPrice)}</span>
        </span>

        <span
          className={cn(
            `my-2 ms-5 rounded-3xl border-r border-muted px-2.5 py-1 text-xs first:ps-0 last:border-r-0`,
            order?.paymentStatus === 'Paid'
              ? 'bg-green-lighter'
              : 'bg-red-lighter',
            order?.paymentStatus === 'Paid'
              ? 'text-green-dark'
              : 'text-red-dark'
          )}
        >
          {order?.paymentStatus}
        </span>
      </div>
      <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          <div className="pb-5">
            <OrderViewProducts order={order} />
            <div className="border-t border-muted pt-7 @5xl:mt-3">
              <div className="ms-auto max-w-lg space-y-6">
                <div className="flex justify-between font-medium">
                  Subtotal <span>{toCurrency(order.totalPrice)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  Discount <span>{toCurrency(order.couponDiscount)}</span>
                </div>
                <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                  Total <span>{toCurrency(order.finalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
          {order.paymentStatus === 'Paid' && (
            <div className="">
              <Title
                as="h3"
                className="mb-3.5 text-base font-semibold @5xl:mb-5 @7xl:text-lg"
              >
                Transactions
              </Title>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7">
                  <div className="flex w-1/3 items-center">
                    <div className="shrink-0">
                      <Image
                        src={paymentImage}
                        alt={order?.paymentMethod}
                        height={60}
                        width={60}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col ps-4">
                      <Text as="span" className="font-lexend text-gray-700">
                        Payment
                      </Text>
                      <span className="pt-1 text-[13px] font-normal text-gray-500">
                        Via {paymentName}
                      </span>
                    </div>
                    <div className="w-1/3 text-end">
                      {order.finalPrice}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            title="Order Status"
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="ms-2 w-full space-y-7 border-s-2 border-gray-100">
              {orderStatus.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    'relative ps-6 text-sm font-medium',
                    "before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-['']",
                    "after:absolute after:-start-px after:top-5 after:h-10 after:w-0.5 after:content-[''] last:after:hidden",
                    index <= currentStatusIndex &&
                      'before:bg-primary after:bg-primary',
                    index > currentStatusIndex && 'after:bg-gray-100'
                  )}
                >
                  {index <= currentStatusIndex && (
                    <span className="absolute -start-1.5 top-1 text-white">
                      <PiCheckBold className="h-auto w-3" />
                    </span>
                  )}

                  {item.label}
                </div>
              ))}
            </div>
          </WidgetCard>

          <WidgetCard
            title="Customer Details"
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="relative flex aspect-square h-16 w-16 shrink-0 items-center justify-center @5xl:h-20 @5xl:w-20">
              <Avatar
                name={session?.user?.name || order?.userId?.name}
                className=""
                size="xl"
                src={session.user.image || order?.userId?.image}
              />
            </div>
            <div className="flex flex-col justify-center ps-4 @5xl:ps-6">
              <Title
                as="h3"
                className="mb-2.5 text-base font-semibold @7xl:text-lg"
              >
                {session.user.name}
              </Title>
              <Text as="p" className="mb-2 break-all last:mb-0">
                {session.user.email}
              </Text>
              {/* <Text as="p" className="mb-2 last:mb-0">
              {session.user.contact}
              </Text> */}
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}

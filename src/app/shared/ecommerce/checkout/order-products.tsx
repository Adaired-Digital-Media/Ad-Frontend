'use client';
import Image from 'next/image';
import { cn } from '@core/utils/class-names';
import { Empty, Title } from 'rizzui';
import { CartItem } from '@/types';
import SimpleBar from '@core/ui/simplebar';
import { PiMinus, PiPlus, PiTrash } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { toCurrency } from '@core/utils/to-currency';

export default function OrderProducts({
  items,
  className,
  itemClassName,
  showControls,
  onClick,
}: {
  items: CartItem[];
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
  onClick?: () => void;
}) {
  if (!items.length) {
    return (
      <div className="pb-3">
        <Empty />
      </div>
    );
  }

  return (
    <SimpleBar
      className={cn('h-[calc(100vh_-_170px)] pb-3', className)}
      onClick={onClick && onClick}
    >
      <div className={cn('grid gap-3.5')}>
        {items.map((item) => {
          return (
            <div
              key={item._id}
              className={cn(
                'group relative flex items-center justify-between',
                itemClassName
              )}
            >
              <div className="flex w-full items-center justify-between rounded-lg border p-[10px] pe-3">
                <div className="flex items-center">
                  <figure className="relative aspect-[4.5/4.5] w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src={item.product.featuredImage as string}
                      alt={'icon'}
                      fill
                      priority
                      className="h-full w-full p-2"
                    />
                  </figure>
                  <div className="ps-3">
                    <Title as="h3" className="mb-1 text-base font-semibold">
                      <Link
                        href={{
                          pathname: routes?.eCommerce?.contentProductForm(item.product.slug),
                          query: { id: item._id },
                        }}
                      >
                        {item?.product.name}
                      </Link>
                    </Title>
                    <div className="font-poppins text-sm text-[#3a3a3a]">
                      {item.quantity} Qty
                    </div>
                    {showControls && (
                      <QuantityControl
                        product={item}
                        addItemToCart={() => {}}
                        removeItemFromCart={() => {}}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <Title
                    as="h3"
                    className="mb-1 font-nunito text-[22px] font-bold text-[#279B25]"
                  >
                    {toCurrency(item?.totalPrice as number)}
                  </Title>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SimpleBar>
  );
}

function QuantityControl({
  product,
  addItemToCart,
  removeItemFromCart,
}: {
  product: CartItem;
  addItemToCart: (item: CartItem, quantity: number) => void;
  removeItemFromCart: (id: number) => void;
}) {
  return (
    <div className="mt-2 inline-flex items-center rounded bg-gray-100 p-0.5 text-xs">
      <button
        title="Decrement"
        className="grid h-5 w-5 place-content-center rounded"
        // onClick={() => removeItemFromCart(product._id)}
      >
        <PiMinus className="h-3 w-3" />
      </button>
      <span className="grid w-8 place-content-center">{product?.quantity}</span>
      <button
        title="Decrement"
        className="grid h-5 w-5 place-content-center rounded bg-gray-100"
        onClick={() => addItemToCart(product, 1)}
      >
        <PiPlus className="h-3 w-3" />
      </button>
    </div>
  );
}

function RemoveItem({
  product,
  className,
  clearItemFromCart,
}: {
  product: CartItem;
  className?: string;
  clearItemFromCart: (id: string) => void;
}) {
  return (
    <button
      className={cn('', className)}
      onClick={() => clearItemFromCart(product.product._id)}
    >
      <PiTrash className="h-6 w-6" />
    </button>
  );
}

'use client';
import Image from 'next/image';
import { cn } from '@core/utils/class-names';
import { Empty } from 'rizzui';
import { CartItem } from '@/types';
import SimpleBar from '@core/ui/simplebar';
import { PiTrash } from 'react-icons/pi';

export default function OrderProducts({
  items,
  className,
  itemClassName,
}: {
  items: CartItem[];
  className?: string;
  itemClassName?: string;
}) {
  if (!items.length) {
    return (
      <div className="pb-3">
        <Empty />
      </div>
    );
  }

  return (
    <SimpleBar className={cn('pb-3', className)}>
      <div className={cn('grid gap-3.5', className)}>
        {items.map((item) => {
          return (
            <div
              key={item.productId}
              className={cn(
                'group relative flex items-center justify-between',
                itemClassName
              )}
            >
              <div className="flex items-center pe-3">
              <figure className="relative aspect-[4/4.5] w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw"
                  className="h-full w-full object-cover"
                />
                </figure>
              </div>
              <h4>{item?.productName}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Total Price: {item.totalPrice}</p>
            </div>
          );
        })}
      </div>
    </SimpleBar>
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
      onClick={() => clearItemFromCart(product.productId)}
    >
      <PiTrash className="h-6 w-6" />
    </button>
  );
}

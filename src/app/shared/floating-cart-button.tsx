'use client';

import { cn } from '@core/utils/class-names';
import { Icon } from '@iconify/react';
import { Badge } from 'rizzui';
import { useCart } from '@/store/quick-cart/cart.context';

type FloatingCartProps = {
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function FloatingCartButton({
  className,
  ...props
}: FloatingCartProps) {
  const { products } = useCart();
  const formattedCartCount = products?.length
    ? products.length.toString()
    : '0';
  return (
    <button
      className={cn(
        'group/cartButton fixed end-0 top-1/2 z-[100] flex -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-bl-[10px] rounded-tl-[10px] bg-[#1C5B98] p-2 pr-6 pt-5 text-xs font-semibold text-primary-foreground shadow-[0_25px_50px_-12px_#000000]',
        className
      )}
      {...props}
    >
      <div className="relative inline-flex">
        <Icon
          icon="mdi:cart-outline"
          className="h-[30px] w-[30px] transition-all duration-150 group-hover/cartButton:rotate-[-10deg]"
        />
        <Badge
          size="sm"
          enableOutlineRing
          className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
        >
          {formattedCartCount}
        </Badge>
      </div>
    </button>
  );
}

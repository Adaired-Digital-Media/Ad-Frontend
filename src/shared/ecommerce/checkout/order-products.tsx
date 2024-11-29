import { cn } from '@core/utils/class-names';
import { generateSlug } from '@core/utils/generate-slug';
import { toCurrency } from '@core/utils/to-currency';
import { routes } from '@/config/routes';
import Image from 'next/image';
import Link from 'next/link';
import { PiMinus, PiPlus, PiTrash } from 'react-icons/pi';
import { Empty, Title } from 'rizzui';
import { CartItem } from '@/types';

export default function OrderProducts({
  items,
  className,
  showControls,
  itemClassName,
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
}: {
  items: CartItem[];
  className?: string;
  showControls?: boolean;
  itemClassName?: string;
  clearItemFromCart: (itemId: string) => void;
  addItemToCart: (item: CartItem, quantity: number) => void;
  removeItemFromCart: (id: number) => void;
}) {
  if (!items.length) {
    return (
      <div className="pb-3">
        <Empty />
      </div>
    );
  }
  return <>hello World</>;
}

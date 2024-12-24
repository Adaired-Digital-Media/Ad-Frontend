'use client';

import React from 'react';
import { useCart } from '@/store/quick-cart/cart.context';
import { ActionIcon } from 'rizzui';
import { PiMinusBold, PiPlusBold } from 'react-icons/pi';
import { CartItem } from '@/types';

interface QuantityInputProps {
  product: CartItem;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ product }) => {
  const { increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="inline-flex items-center rounded-lg border border-muted px-1.5 hover:border-gray-1000">
      <ActionIcon
        title="Decrement"
        size="sm"
        variant="flat"
        className="h-auto px-1 py-[5px]"
        onClick={() => decreaseQuantity(product._id as string)}
      >
        <PiMinusBold className="h-4 w-4" />
      </ActionIcon>
      <input
        type="number"
        className="h-full w-12 border-none text-center outline-none focus:ring-0 dark:bg-gray-50 sm:w-20"
        value={product.quantity}
        readOnly
      />
      <ActionIcon
        title="Increment"
        size="sm"
        variant="flat"
        className="h-auto px-1 py-1.5"
        onClick={() => increaseQuantity(product._id as string)}
      >
        <PiPlusBold className="h-3.5 w-3.5" />
      </ActionIcon>
    </div>
  );
};

export default QuantityInput;

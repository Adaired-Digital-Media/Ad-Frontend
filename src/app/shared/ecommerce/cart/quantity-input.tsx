import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '@/store/quick-cart/cart.context';
import { ActionIcon } from 'rizzui';
import { PiMinusBold, PiPlusBold } from 'react-icons/pi';
import { CartItem } from '@/types';

interface QuantityInputProps {
  product: CartItem;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ product }) => {
  const { updateCartItem, removeCartItem } = useCart();
  const isFreeProduct = product?.product?.slug.includes('free');

  // States to track the action and debounced quantity
  const [debouncedQuantity, setDebouncedQuantity] = useState(product.quantity);
  const [action, setAction] = useState<string | null>(null);

  const debouncedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce the quantity update based on the action
  useEffect(() => {
    if (action && debouncedQuantity !== product.quantity) {
      if (debouncedTimeoutRef.current) {
        clearTimeout(debouncedTimeoutRef.current);
      }
      debouncedTimeoutRef.current = setTimeout(() => {
        if (action === 'INCREMENT') {
          updateCartItem(product?._id, { action: 'INCREMENT' });
        } else if (action === 'DECREMENT') {
          updateCartItem(product?._id, { action: 'DECREMENT' });
        }
        // Reset the action after the update
        setAction(null);
      }, 200);
    }

    return () => {
      if (debouncedTimeoutRef.current) {
        clearTimeout(debouncedTimeoutRef.current);
      }
    };
  }, [action, debouncedQuantity, product.quantity, updateCartItem]);

  const handleDecrement = () => {
    if (product.quantity === 1) {
      removeCartItem(product?._id as string);
    } else {
      setAction('DECREMENT');
      setDebouncedQuantity(product.quantity - 1);
    }
  };

  const handleIncrement = () => {
    setAction('INCREMENT');
    setDebouncedQuantity(product.quantity + 1);
  };

  return (
    <div className="inline-flex items-center rounded-lg border border-muted px-1.5 hover:border-gray-1000">
      <ActionIcon
        title="Decrement"
        size="sm"
        variant="flat"
        className="h-auto px-1 py-[5px]"
        onClick={handleDecrement}
        disabled={isFreeProduct || product.quantity === 1}
      >
        <PiMinusBold className="h-4 w-4" />
      </ActionIcon>
      <input
        type="number"
        className="h-full w-12 border-none text-center outline-none focus:ring-0 dark:bg-gray-50 sm:w-20"
        // value={product?.quantity}
        value={debouncedQuantity}
        readOnly
        disabled={isFreeProduct}
      />
      <ActionIcon
        title="Increment"
        size="sm"
        variant="flat"
        className="h-auto px-1 py-1.5"
        onClick={handleIncrement}
        disabled={isFreeProduct}
      >
        <PiPlusBold className="h-3.5 w-3.5" />
      </ActionIcon>
    </div>
  );
};

export default QuantityInput;

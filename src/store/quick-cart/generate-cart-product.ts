import { Product, CartItem } from '@/types';
import { FieldValues } from 'react-hook-form';

export function generateCartProduct({
  product,
  data,
  price,
}: {
  product: Product;
  data: FieldValues;
  price: number;
}): CartItem {
  return {
    _id: crypto.randomUUID(),
    product,
    wordCount: Number(data?.wordCount) || 0,
    quantity: Number(data?.quantity) || 1,
    additionalInfo: data?.additionalInfo || '',
    totalPrice: price,
  };
}
import { Product } from '@/types';
import { FieldValues } from 'react-hook-form';

export function generateCartProduct({
  product,
  data,
  price,
}: {
  product: Product;
  data: FieldValues;
  price: number;
}) {

  return {
    _id: crypto.randomUUID(),
    product: product,
    wordCount: data?.wordCount,
    quantity: data?.quantity,
    additionalInfo: data?.additionalInfo,
    totalPrice: price,
  };
}

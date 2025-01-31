import { Product } from '@/types';
import { FieldValues } from 'react-hook-form';

export function generateCartProduct({
  product,
  data,
  price,
  session,
}: {
  product: Product;
  data: FieldValues;
  price: number;
  session: any;
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

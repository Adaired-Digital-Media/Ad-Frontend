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
    productId: product._id,
    wordCount: parseInt(data.wordCount || '100'),
    quantity: parseInt(data.quantity || '1'),
    pricePerUnit: product.pricePerUnit,
    totalPrice: price,
    productType: data.productType || 'OneTime',
  };
}

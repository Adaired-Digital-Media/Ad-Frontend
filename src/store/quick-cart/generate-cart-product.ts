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
    productName: product.name,
    wordCount: parseInt(data.wordCount || '100'),
    quantity: parseInt(data.quantity || '1'),
    additionalInfo: data.additionalInfo || '',
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    pricePerUnit: product.pricePerUnit,
    totalPrice: price,
    productType: data.productType || 'OneTime',
  };
}

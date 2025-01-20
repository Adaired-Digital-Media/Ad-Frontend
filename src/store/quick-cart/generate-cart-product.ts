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
    _id: product._id || '',
    productId: product._id,
    productName: product.name,
    category: product.subCategory[0].name,
    productSlug: product.slug,
    productImage: product.featuredImage,
    wordCount: parseInt(data.wordCount),
    quantity: parseInt(data.quantity),
    additionalInfo: data.additionalInfo,
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    pricePerUnit: product.pricePerUnit,
    totalPrice: price,
    orderType: data.orderType || 'OneTime',
    isFreeProduct: product.isFreeProduct,
  };
}

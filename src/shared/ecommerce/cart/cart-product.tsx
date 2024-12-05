'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { CartItem, Product } from '@/types';

function CartProduct({ product }: { product: CartItem }) {
  const [fetchedProduct, setFetchedProduct] = useState<Product>();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URI}/product/read-product?query=${product.productId}`
        );
        if (res.status === 200) {
          setFetchedProduct(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    }

    fetchProduct();
  }, [product.productId]);

  return (
    <div className="grid grid-cols-12 items-start gap-4 border-b border-muted py-6 first:pt-0 sm:flex sm:gap-6 2xl:py-8">
      <figure className="col-span-4 sm:max-w-[180px]">
        <Image
          src={fetchedProduct?.featuredImage || ''}
          alt={fetchedProduct?.name || 'Icon'}
          width={180}
          height={180}
          className="aspect-square w-full rounded-lg bg-gray-100"
        />
      </figure>
      <div className="col-span-8 sm:col-span-6">
        <h3 className="font-medium">{fetchedProduct?.name}</h3>
      </div>
    </div>
  );
}

export default CartProduct;

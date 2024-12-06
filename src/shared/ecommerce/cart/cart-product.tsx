'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { CartItem, Product } from '@/types';
import QuantityInput from './quantity-input';
import Link from 'next/link';
import { Title, Text } from 'rizzui';
import { routes } from '@/config/routes';
import { toCurrency } from '@core/utils/to-currency';
import RemoveItem from './remove-item';

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
          src={'https://picsum.photos/180'}
          alt={'icon'}
          width={180}
          height={180}
          className="aspect-square w-full rounded-lg bg-gray-100 object-cover"
        />
      </figure>

      <div className="col-span-8 sm:block sm:w-full">
        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:items-center sm:justify-between">
          <Title
            as="h3"
            className="truncate text-base font-medium transition-colors hover:text-primary 3xl:text-lg"
          >
            <Link
              href={routes.eCommerce.productDetails(
                fetchedProduct?.slug as string
              )}
            >
              {product?.productName}
            </Link>
          </Title>
          <span className="inline-block text-sm font-semibold text-gray-1000 sm:font-medium md:text-base 3xl:text-lg">
            {toCurrency(product.pricePerUnit)}
          </span>
        </div>
        <Text className="mt-1 w-full max-w-xs truncate leading-6 2xl:max-w-lg">
          {product?.pricePerUnit}
        </Text>

        <div className="mt-3 hidden items-center justify-between xs:flex sm:mt-6">
          <QuantityInput product={product} />
          <div className="flex items-center gap-4">
            {/* <AddToWishList /> */}
            <RemoveItem
              productID={product?._id || product?.productId}
              placement="bottom-end"
            />
          </div>
        </div>
      </div>
      <div className="col-span-full flex items-center justify-between xs:hidden">
        <QuantityInput product={product} />
      </div>
    </div>
  );
}

export default CartProduct;

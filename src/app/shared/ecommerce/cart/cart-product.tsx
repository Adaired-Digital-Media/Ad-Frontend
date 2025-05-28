'use client';
import Image from 'next/image';
import { CartItem } from '@/types';
import Link from 'next/link';
import { Title } from 'rizzui';
import { toCurrency } from '@core/utils/to-currency';
import QuantityInput from './quantity-input';
import RemoveItem from './remove-item';
import { routes } from '@/config/routes';

function CartProduct({
  product,
  couponData,
}: {
  product: CartItem;
  couponData?: any;
}) {
  // Get the discount for this product from productDiscounts, if it exists
  const productDiscount =
    couponData?.productDiscounts?.[product?.product?._id] || 0;
  // Calculate the discounted price
  const discountedPrice = Math.max(
    (product.totalPrice as number) - productDiscount,
    0
  );
  return (
    <div className="grid grid-cols-12 items-start gap-4 border-b border-muted py-6 first:pt-0 sm:flex sm:gap-6 2xl:py-8">
      <figure className="col-span-4 sm:max-w-[180px]">
        <Image
          src={product?.product?.featuredImage as string}
          alt={'icon'}
          width={180}
          height={180}
          className="h-full w-full rounded-lg bg-gray-100 p-2"
        />
      </figure>

      <div className="col-span-8 sm:block sm:w-full">
        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:items-center sm:justify-between">
          <Title
            as="h3"
            className="truncate text-base font-medium transition-colors hover:text-primary 3xl:text-lg"
          >
            <Link
              href={{
                pathname: routes?.eCommerce?.contentProductForm(
                  product.product.slug
                ),
                query: { id: product._id },
              }}
            >
              {product?.product?.name}
            </Link>
          </Title>
          <div>
            <span className="inline-block text-sm font-semibold text-gray-500 sm:font-medium md:text-base 3xl:text-lg">
              Total :
            </span>{' '}
            <span className="inline-block text-sm font-semibold text-gray-1000 sm:font-medium md:text-base 3xl:text-lg">
              {/* {toCurrency(product?.totalPrice as number)} */}
              {productDiscount > 0 ? (
                <>
                  <span className="text-gray-900">
                    {toCurrency(discountedPrice as number)}
                  </span>
                  <del className="ps-1.5 text-[13px] font-normal text-gray-500">
                    {toCurrency(product.totalPrice as number)}
                  </del>
                </>
              ) : (
                toCurrency(product.totalPrice as number)
              )}
            </span>
          </div>
        </div>

        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-3 sm:mt-4 sm:gap-x-8">
          <li className="flex items-end gap-2 text-gray-500">
            <span>Price :</span>
            <span className="text-sm font-bold text-gray-1000">
              {toCurrency(product?.product?.pricePerUnit)} / 100 words
            </span>
          </li>
          <li className="flex items-end gap-2 text-gray-500">
            <span>Quantity :</span>
            <span className="text-sm font-bold text-gray-1000">
              {product?.quantity}
            </span>
          </li>
          <li className="flex items-end gap-2 text-gray-500">
            <span>Word Count :</span>
            <span className="text-sm font-bold text-gray-1000">
              {product?.wordCount} each
            </span>
          </li>
        </ul>

        <div className="mt-3 hidden items-center justify-between xs:flex sm:mt-6">
          <QuantityInput product={product} />
          <div className="flex items-center gap-4">
            <RemoveItem cartItemId={product?._id} placement="bottom-end" />
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

import { routes } from '@/config/routes';
import { cn } from '@core/utils/class-names';
import React from 'react';
import { Title } from 'rizzui';
import Button from '../Button';
import { Skeleton } from '@/@core/ui/shadcn-ui/skeleton';

type Props = {};

const ProductFormSkeleton = (props: Props) => {
  return (
    <div>
      <div
        className={cn(
          `flex flex-col items-center justify-between gap-5 rounded-tl-[15px] rounded-tr-[15px] bg-black px-10 py-5 xs:flex-row xs:gap-0`
        )}
      >
        <Title
          as="h3"
          className={cn(
            `font-poppins text-2xl font-semibold text-white xs:text-[22px]`
          )}
        >
          Shopping Cart
        </Title>
        <Button
          title="Continue Shopping"
          className="bg-white"
          svgInnerClassName="text-[#F89520]"
          svgClassName=" bg-black"
          type="button"
          navigateTo={routes.eCommerce.products}
        />
      </div>
      <div
        className={cn(
          `rounded-bl-[15px] rounded-br-[15px] border border-t-0 border-[#DBDBDB] p-10 pt-5`
        )}
      >
        <div
          className={cn(
            `flex flex-col items-center justify-between gap-2 border-b-2 border-dashed border-[#1B5A96] pb-[15px] xs:flex-row xs:gap-0`
          )}
        >
          <div
            className={cn(
              `flex flex-col items-center gap-3 xs:flex-row xs:gap-6`
            )}
          >
            <figure className="relative aspect-[4.5/4.5] w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
              <Skeleton />
            </figure>
            <figure
              className={cn(
                `relative h-8 w-32 shrink-0 rounded-lg bg-gray-100`
              )}
            >
              <Skeleton />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormSkeleton;

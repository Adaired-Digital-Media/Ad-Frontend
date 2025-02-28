import { routes } from '@/config/routes';
import { cn } from '@core/utils/class-names';
import React from 'react';
import { Title } from 'rizzui';
import Button from '../Button';
import { Skeleton } from '@core/ui/skeleton';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';

const ProductFormSkeleton = () => {
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
            `grid grid-cols-2 items-center gap-3 border-b-2 border-dashed border-[#1B5A96] pb-5`
          )}
        >
          <div className={cn(`flex items-center gap-3`)}>
            <Skeleton className="h-14 w-14 flex-shrink-0 rounded-full" />
            <Skeleton className="h-10 w-4/5 flex-shrink-0 rounded" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-10 w-1/2 flex-shrink-0" />
          </div>
        </div>
        <div className="my-5 space-y-10">
          <SelectLoader />
          <SelectLoader />
          <div>
            <Skeleton className="mb-1.5 h-4 w-28 rounded" />
            <Skeleton className="h-40 w-full rounded" />
          </div>
        </div>

        <div className={cn(`flex flex-col gap-5 sm:flex-row sm:gap-10`)}>
          <Button
            title={'Add To Cart'}
            className="flex w-full justify-center bg-[#1B5A96] md:w-1/2"
            svgInnerClassName="!text-[#1B5A96]"
            svgClassName="bg-white"
            textClassName="text-white"
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFormSkeleton;

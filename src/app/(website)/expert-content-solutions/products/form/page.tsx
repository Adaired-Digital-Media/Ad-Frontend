import { cn } from '@core/utils/class-names';
import { ProductForm as PForm } from '@/app/shared/ecommerce/product/product-form';
import SmallWidthContainer from '@/app/(website)/components/SmallWidthContainer';
import dynamic from 'next/dynamic';

const OrderSummery = dynamic(
  () => import('@/app/shared/ecommerce/checkout/order-summery'),
  {
    ssr: false,
  }
);

const ProductForm = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const productId = Array.isArray(searchParams['id']) ? searchParams['id'][0] : searchParams['id'];

  return (
    <>
      <div className="flex h-8 sm:h-10 md:h-[60px] justify-end bg-[#F1F8FF]">
        <div className="h-8 sm:h-10 md:h-[60px] w-8/12 sm:w-9/12 md:w-11/12 max-w-[600px] rounded-bl-full rounded-tl-full bg-[#D2E9FF]"></div>
      </div>
      <SmallWidthContainer
        className={cn(
          'isomorphic-form mx-auto flex w-full flex-grow flex-col @container [&_label.block>span]:font-medium max-sm:py-5'
        )}
      >
        <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
          <div className="gap-4 @container @5xl:col-span-8 @5xl:pb-12 @5xl:pe-7 @6xl:col-span-7 @7xl:pe-12">
            <PForm
              isEditMode={!!productId}
              productId={productId}
            />
          </div>
          <OrderSummery />
        </div>
      </SmallWidthContainer>
    </>
  );
};

export default ProductForm;

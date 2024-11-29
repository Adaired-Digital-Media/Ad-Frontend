import { cn } from '@core/utils/class-names';
import SmallWidthContainer from '@/app/(website)/components/SmallWidthContainer';
import OrderSummery from '@/shared/ecommerce/checkout/order-summery';
const ProductForm = () => {
  return (
    <>
      <div className="flex h-[60px] justify-end bg-[#F1F8FF]">
        <div className="h-[60px] w-11/12 max-w-[600px] rounded-bl-full rounded-tl-full bg-[#D2E9FF]"></div>
      </div>
      <SmallWidthContainer
        className={cn(
          'isomorphic-form isomorphic-form mx-auto flex w-full flex-grow flex-col @container [&_label.block>span]:font-medium'
        )}
      >
        <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
          <div className="gap-4 @container @5xl:col-span-8 @5xl:pb-12 @5xl:pe-7 @6xl:col-span-7 @7xl:pe-12">
            Form
          </div>
      
            <OrderSummery />
      
        </div>
      </SmallWidthContainer>
    </>
  );
};

export default ProductForm;

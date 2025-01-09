import { auth } from '@/auth';
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

interface ProductFormProps {
  params: { slug: string };
  searchParams: { edit?: string };
}

const ProductForm = async ({ params, searchParams }: ProductFormProps) => {
  const session = await auth();

  const { slug } = params;

  // Check if we are in edit mode by looking for `/edit`
  const isEditMode = searchParams.edit === 'true';

  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/product/read-product?query=${slug}`
  );
  const product = await productRes.json();

  const formRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/product/form/read-form?formId=${product?.data?.formId}`
  );
  const form = await formRes.json();

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
            {/* <PForm
              form={form}
              product={product?.data}
              session={session || { user: null, expires: null }}
            /> */}

            {isEditMode ? (
              // Show the edit form
              <h1 className="text-2xl font-bold">Edit Product</h1>
            ) : (
              // Show the create form
              <PForm
                form={form}
                product={product?.data}
                session={session || { user: null, expires: null }}
              />
            )}
          </div>

          <OrderSummery />
        </div>
      </SmallWidthContainer>
    </>
  );
};

export default ProductForm;

import { cn } from '@core/utils/class-names';
import { ProductForm as PForm } from '@/app/shared/ecommerce/product/product-form';
import SmallWidthContainer from '@/app/(website)/components/SmallWidthContainer';
import dynamic from 'next/dynamic';

const OrderSummery = dynamic(
  () => import('@/app/shared/ecommerce/checkout/order-summery'),
  { ssr: false }
);

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI || '';

async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/product/read-product?status=active`, {
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch products');
  const { data } = await response.json();
  return data;
}

async function fetchForm(formId: string) {
  const response = await fetch(
    `${API_BASE_URL}/product/form/read-form?formId=${formId}`,
    {
      cache: 'no-store',
    }
  );
  if (!response.ok) throw new Error('Failed to fetch form');
  return await response.json();
}

interface ProductFormParams {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductForm = async ({ params, searchParams }: ProductFormParams) => {
  const productSlug = params.slug;
  const productId = Array.isArray(searchParams['id'])
    ? searchParams['id'][0]
    : searchParams['id'];

  const initialProducts = await fetchProducts();

  // Find product by slug, default to first product if not found
  const initialSelectedProduct =
    initialProducts.find((p: any) => p.slug === productSlug) ??
    initialProducts[0];

  const initialForm = initialSelectedProduct?.formId
    ? await fetchForm(initialSelectedProduct.formId)
    : null;

  return (
    <>
      <div className="flex h-8 justify-end bg-[#F1F8FF] sm:h-10 md:h-[60px]">
        <div className="h-8 w-8/12 max-w-[600px] rounded-bl-full rounded-tl-full bg-[#D2E9FF] sm:h-10 sm:w-9/12 md:h-[60px] md:w-11/12"></div>
      </div>
      <SmallWidthContainer
        className={cn(
          'isomorphic-form mx-auto flex w-full flex-grow flex-col @container max-sm:py-5 [&_label.block>span]:font-medium'
        )}
      >
        <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
          <div className="gap-4 @container @5xl:col-span-8 @5xl:pb-12 @5xl:pe-7 @6xl:col-span-7 @7xl:pe-12">
            <PForm
              isEditMode={!!productId}
              initialProducts={initialProducts}
              initialForm={initialForm}
              initialSelectedProduct={initialSelectedProduct}
            />
          </div>
          <OrderSummery />
        </div>
      </SmallWidthContainer>
    </>
  );
};

export default ProductForm;
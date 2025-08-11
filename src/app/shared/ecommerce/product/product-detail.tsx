'use client';

import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const params = useParams();
  // const product =
  //   modernProductsGrid.find(
  //     (item) => generateSlug(item.title) === params.slug
  //   ) ?? modernProductsGrid[0];

  return (
    <div className="@container">
      <div className="@3xl:grid @3xl:grid-cols-12">
        <div className="col-span-7 mb-7 @container @lg:mb-10 @3xl:pe-10">
          {/* <ProductDetailsGallery /> */}
          Product Details
        </div>
        <div className="col-span-5 @container">
          {/* <ProductDetailsSummery product={product} />
            <ProductDeliveryOptions />
            <ProductDetailsDescription />
            <ProductDetailsReview /> */}
        </div>
      </div>
      {/* <ProductDetailsRelatedProducts /> */}
    </div>
  );
}

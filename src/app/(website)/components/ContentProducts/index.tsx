'use client';
import { Product } from '@/types';
import { cn } from '@/@core/utils/class-names';
import IconBox from '@core/components/iconBox';
import { routes } from '@/config/routes';
import { Empty, EmptyProductBoxIcon } from 'rizzui';
import SmallContainer from '../SmallWidthContainer';
import IconList from '@core/components/iconList';
import { ProductSectionDetails } from '@core/data/website/Landingpage';
import parse from 'html-react-parser';
import { useAtom } from 'jotai';
import { selectedContentProductAtom } from '@/store/atoms/selectedContentProductAtom';
import { useEffect } from 'react';
import { useMedia } from '@core/hooks/use-media';

export const ProductSection = ({ products }: { products: Product[] }) => {
  const [selectedProduct, setSelectedProduct] = useAtom(
    selectedContentProductAtom
  );
  const isMedium = useMedia('(max-width: 1200px)', false);

  // Debug atom value and validate persistence
  useEffect(() => {
    // Validate if stored product still exists in products list
    if (
      selectedProduct &&
      !products.find((p) => p._id === selectedProduct._id)
    ) {
      setSelectedProduct(products[0]);
    }
  }, [selectedProduct, products, setSelectedProduct]);

  return (
    <div className={cn(`bg-[#F6FBFF]`)} id="products">
      <SmallContainer>
        <div className={cn(`space-y-[15px] pb-[40px] text-center`)}>
          <IconList
            icon={ProductSectionDetails.subHeadingIconUrl}
            title={ProductSectionDetails.subHeadingText}
            isSvg={ProductSectionDetails.isSvg}
            containerClassName={`bg-[#FFF] rounded-[8px] pr-4 relative`}
            iconContainerClassName={`bg-[#F39019] h-[40px] w-[40px] rounded-full flex items-center justify-center ring-4 ring-offset-0 ring-white absolute`}
            iconClassName={`h-[22px] w-[22px] text-white`}
            titleClassName={`text-[#424242] font-poppins text-base font-regular pl-[35px] py-1`}
          />
          <div className={cn(`m-auto max-w-[661px] font-poppins`)}>
            {parse(ProductSectionDetails.title)}
          </div>
        </div>
        <div
          className={cn(
            // `grid gap-x-4 gap-y-4 xs:grid-cols-2 md:grid-cols-3 opt-md:grid-cols-4 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-6 xl:gap-x-[42px] xl:gap-y-[42px] mx-auto`

            `flex flex-wrap justify-center gap-x-4 gap-y-4`,
            `xs:[&>*]:w-[calc(50%-0.5rem)]`, // 2 columns
            `md:[&>*]:w-[calc(33.333%-0.667rem)]`, // 3 columns
            `lg:[&>*]:w-[calc(25%-1.125rem)]`, // 4 columns
            `xl:[&>*]:w-[calc(25%-2rem)]`, // 4 columns with larger gaps
            `transition-all lg:gap-x-6 lg:gap-y-6 xl:gap-x-[42px] xl:gap-y-[42px]`
          )}
        >
          {products.length > 0 ? (
            products
              .filter((product) => product.status === 'active')
              .map((product) =>
                typeof product === 'object' ? (
                  <IconBox
                    key={product._id}
                    icon={product.featuredImage}
                    isSvg={true}
                    isFromCloudinary={true}
                    title={product.name}
                    buttonText={'Order Now'}
                    boxLink={routes.eCommerce.contentProductForm(product.slug)}
                    buttonLink={routes.eCommerce.contentProductForm(
                      product.slug
                    )}
                    buttonClassName={`bg-[#424242] rounded-full mt-4 xs:mt-4 sm:mt-5 opt-md:mt-8 xl:mt-[55px] block xl:hidden xl:group-hover:block mx-auto`}
                    containerClassName={`text-center p-5 sm:p-3 md:p-5 xl:p-[30px] rounded-[20px] bg-white aspect-square w-auto w-full h-full max-h-[286px] max-w-[286px] flex flex-col items-center justify-center hover:shadow-4xl transition-all duration-300 group`}
                    titleClassName={`font-poppins text-base opt-md:text-lg 2xl:text-[20px] font-medium text-black `}
                    iconContainerClassName={`pb-[15px]`}
                    btnSize={isMedium ? 'sm' : 'md'}
                    onClick={() => setSelectedProduct(product)}
                  />
                ) : null
              )
          ) : (
            <Empty
              image={<EmptyProductBoxIcon />}
              text="No Products in this category"
            />
          )}
        </div>
      </SmallContainer>
    </div>
  );
};

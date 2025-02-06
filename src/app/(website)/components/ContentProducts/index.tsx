'use client';
import { ProductCategory, Product } from '@/types';
import { cn } from '@/@core/utils/class-names';
import IconBox from '@core/components/iconBox';
import { routes } from '@/config/routes';
import { Empty, EmptyProductBoxIcon } from 'rizzui';
import SmallContainer from '../SmallWidthContainer';
import IconList from '@core/components/iconList';
import { ProductSectionDetails } from '@core/data/website/Landingpage';
import parse from 'html-react-parser';
import { Tabs } from '@core/ui/aceternity-ui/tabs';
import { useAtom } from 'jotai';
import {
  contentProductsAtom,
  selectedContentProductAtom,
} from '@/store/atoms/selectedContentProductAtom';

export const ProductSection = ({
  categories,
  products,
}: {
  categories: ProductCategory[];
  products: Product[];
}) => {
  const [, setSelectedProduct] = useAtom(selectedContentProductAtom);
  const [, setAllProducts] = useAtom(contentProductsAtom);
  if (products) {
    setAllProducts(products);
  }
  const tabs = categories
    .filter((category) => category.slug !== 'free-products')
    .map((category: ProductCategory) => ({
      title: category.name,
      value: category.slug,
      content: (
        <div
          className={cn(
            `grid gap-x-4 gap-y-4 xs:grid-cols-2 md:grid-cols-3 opt-md:grid-cols-4 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-6 xl:gap-x-[42px] xl:gap-y-[42px]`
          )}
        >
          {Array.isArray(category.products) && category.products.length > 0 ? (
            category.products.map((product) =>
              typeof product === 'object' ? (
                <div
                  className="flex h-full w-full items-center justify-center"
                  key={product._id}
                >
                  <IconBox
                    key={product._id}
                    icon={product.featuredImage}
                    isSvg={true}
                    isFromCloudinary={true}
                    title={product.name}
                    buttonText={'Order Now'}
                    boxLink={routes.eCommerce.contentProductForm}
                    buttonLink={routes.eCommerce.contentProductForm}
                    buttonClassName={`bg-[#424242] rounded-full mt-10 xs:mt-4 sm:mt-10 lg:mt-[55px] lg:hidden lg:group-hover:block mx-auto`}
                    containerClassName={`text-center p-5 sm:p-3 md:p-5 lg:p-[30px] rounded-[20px] bg-white aspect-square w-auto w-full h-full max-h-[286px] flex flex-col items-center justify-center hover:shadow-4xl transition-all duration-300 group`}
                    titleClassName={`font-poppins text-lg sm:text-[20px] font-medium text-black `}
                    iconContainerClassName={`pb-[15px]`}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
              ) : null
            )
          ) : (
            <Empty
              image={<EmptyProductBoxIcon />}
              text="No Products in this category"
            />
          )}
        </div>
      ),
    }));

  return (
    <section className={cn(`bg-[#F6FBFF]`)} id="products">
      <SmallContainer className="py-0">
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
        <Tabs
          tabs={tabs}
          containerClassName={cn(`md:bg-white sm:rounded-full`)}
          contentClassName={`p-2`}
          tabClassName={cn(`flex-1 bg-white`)}
          tabContentClassName={cn(`font-poppins text-[17px] font-medium`)}
          activeTabClassName={cn(`bg-[#1C5B98] `)}
          activeTabContentClassName={cn(`text-white`)}
        />
      </SmallContainer>
    </section>
  );
};

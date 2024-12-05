import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Empty, EmptyProductBoxIcon } from 'rizzui';
import { cn } from '@core/utils/class-names';
import parse from 'html-react-parser';
import { Icon } from '@iconify/react';
import { Tabs } from '@core/ui/aceternity-ui/tabs';
import TwoColumnGrid from '@core/components/twoColumnGrid';
import SmallContainer from '@/app/(website)/components/SmallWidthContainer';
import IconBox from '@core/components/iconBox';
import IconList from '@core/components/iconList';
import { ProductCategory } from '@/types';
import { routes } from '@/config/routes';
import { generateSlug } from '@core/utils/generate-slug';
import {
  HeroSectionDetails,
  StandOutSectionDetails,
  ApproachSectionDetails,
  SurferSEOSectionDetails,
  ProductSectionDetails,
} from '@core/data/website/Landingpage';
const Landing = () => {
  return (
    <>
      <HeroSection />
      <StandOutSection />
      <ProductSection />
      <ApproachSection />
      <SurferSEOSection />
      <ContactUsSection />
    </>
  );
};
export default Landing;
const HeroSection = () => {
  return (
    <div
      className={cn(
        `flex items-end justify-center overflow-hidden bg-[#FFF9F1]`
      )}
    >
      {' '}
      <SmallContainer className="relative z-[2] grid !py-0 3xl:pb-0 3xl:pt-14">
        {' '}
        <div
          className={cn(
            `absolute bottom-1/2 left-[calc(100%-280px)] h-[calc(100%+145px)] w-full translate-y-1/2 rounded-tl-[250px] bg-[#FFDCB2] xl:h-[calc(100%+105px)] 2xl:h-full`
          )}
        ></div>
        <div
          className={cn(
            `absolute bottom-1/2 left-[calc(100%-250px)] h-[calc(100%+145px)] w-full translate-y-1/2 rounded-tl-[250px] bg-[#F39019] xl:h-[calc(100%+105px)] 2xl:h-full`
          )}
        ></div>
        <TwoColumnGrid className={cn(`relative z-[2] m-0 place-items-center`)}>
          {' '}
          <div className={cn(`xl:py-28`)}>
            {' '}
            <h1
              className={cn(
                `font-poppins font-bold text-black lg:text-[38px] lg:leading-[52px] xl:text-[42px] xl:leading-[58px]`
              )}
            >
              {' '}
              {HeroSectionDetails.title}{' '}
            </h1>{' '}
            <p className={cn(`pt-[15px] text-base`)}>
              {' '}
              {HeroSectionDetails.description}{' '}
            </p>{' '}
            <div className={cn(`flex items-center space-x-10 pt-10`)}>
              {' '}
              <Link href={HeroSectionDetails.buttonLink || ''}>
                {' '}
                <Button
                  className={cn(
                    `rounded-full bg-[#424242] px-6 py-6 font-poppins text-lg font-medium text-white`
                  )}
                >
                  {' '}
                  {HeroSectionDetails.buttonText}{' '}
                </Button>{' '}
              </Link>{' '}
              <Link
                href={`tel:${HeroSectionDetails.phoneNumber}`}
                className={cn(`flex items-center justify-start space-x-2`)}
              >
                {' '}
                <div
                  className={cn(
                    `flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F39019] p-3`
                  )}
                >
                  {' '}
                  <Icon
                    icon="mage:phone-call-fill"
                    color="#fff"
                    className={cn(`h-6 w-6`)}
                  />{' '}
                </div>{' '}
                <p className={cn(`font-poppins text-base font-light`)}>
                  {' '}
                  Call Us <br />{' '}
                  <span
                    className={cn(`font-poppins font-semibold text-[#000000]`)}
                  >
                    {' '}
                    {HeroSectionDetails.phoneNumber}{' '}
                  </span>{' '}
                </p>{' '}
              </Link>{' '}
            </div>{' '}
          </div>{' '}
          <div
            className={cn(
              `lg:scale-[1.3] lg:pt-16 xl:scale-[1.2] xl:pt-10 2xl:scale-100 3xl:-mr-20 4xl:-mr-32`
            )}
          >
            {' '}
            <Image
              src={HeroSectionDetails.imageUrl || ''}
              alt="Hero Image"
              width={700}
              height={600}
              quality={100}
              priority
              className={cn(`object-contain`)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />{' '}
          </div>{' '}
        </TwoColumnGrid>{' '}
      </SmallContainer>{' '}
    </div>
  );
};
const StandOutSection = () => {
  return (
    <SmallContainer>
      {' '}
      <TwoColumnGrid>
        {' '}
        <div className={cn(`h-full w-full rounded-2xl bg-[#EDEDED]`)} />{' '}
        <div className={cn(`space-y-[15px]`)}>
          {' '}
          <IconList
            icon={StandOutSectionDetails.subHeadingIconUrl}
            title={StandOutSectionDetails.subHeadingText}
            isSvg={StandOutSectionDetails.isSvg}
            containerClassName={`bg-[#F3F3F3] rounded-[8px] pr-4 relative`}
            iconContainerClassName={`bg-[#F39019] h-[40px] w-[40px] rounded-full flex items-center justify-center ring-4 ring-offset-0 ring-white absolute`}
            iconClassName={`h-[18px] w-[18px] text-white`}
            titleClassName={`text-[#424242] font-poppins text-base font-regular pl-[35px] py-1`}
          />{' '}
          <h2 className={cn(`bhw_h2`)}>{StandOutSectionDetails.title}</h2>{' '}
          <div className={cn(`space-y-[10px] text-[#424242]`)}>
            {' '}
            {parse(StandOutSectionDetails.description)}{' '}
          </div>
          {StandOutSectionDetails?.listItems?.map((text: string) => (
            <IconList
              key={text.slice(0, 1)}
              icon={`/assets/icons/boxTick.svg`}
              title={text}
              isSvg={true}
              containerClassName={`p-0`}
              titleClassName={`font-nunito font-semibold text-base xl:text-lg`}
            />
          ))}{' '}
        </div>{' '}
      </TwoColumnGrid>{' '}
    </SmallContainer>
  );
};
const ProductSection = async () => {
  const categoryData = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URI}/product/category/read-category?identifier=content-writing&children=true&childrenProducts=true&products=true`
  );
  const categories: ProductCategory[] = categoryData.data.data.children || [];
  const tabs = categories.map((category: ProductCategory) => ({
    title: category.name,
    value: category.slug,
    content: (
      <div
        className={cn(`grid grid-cols-4 gap-x-[62px] gap-y-[41px]`)}
      >
        {' '}
        {Array.isArray(category.products) && category.products.length > 0 ? (
          category.products.map((product) =>
            typeof product === 'object' ? (
              <IconBox
                key={product._id}
                icon={product.featuredImage}
                isSvg={true}
                title={product.name}
                buttonText={'Order Now'}
                buttonLink={routes.eCommerce.productForm(
                  String(product.slug ?? generateSlug(product.name))
                )}
                buttonClassName={`bg-[#424242] rounded-full mt-[55px] hidden group-hover:block mx-auto`}
                containerClassName={`text-center p-[30px] rounded-[20px] bg-white max-h-[286px] min-h-[286px] min-w-[286px] flex flex-col items-center justify-center hover:shadow-4xl transition-all duration-300 group`}
                titleClassName={`font-poppins text-[20px] font-medium text-black `}
                iconContainerClassName={`pb-[15px]`}
              />
            ) : null
          )
        ) : (
          <Empty
            image={<EmptyProductBoxIcon />}
            text="No Products in this category"
          />
        )}{' '}
      </div>
    ),
  }));
  return (
    <section className={cn(`bg-[#F6FBFF]`)} id="products">
      {' '}
      <SmallContainer>
        {' '}
        <div className={cn(`space-y-[15px] pb-[40px] text-center`)}>
          {' '}
          <IconList
            icon={ProductSectionDetails.subHeadingIconUrl}
            title={ProductSectionDetails.subHeadingText}
            isSvg={ProductSectionDetails.isSvg}
            containerClassName={`bg-[#FFF] rounded-[8px] pr-4 relative`}
            iconContainerClassName={`bg-[#F39019] h-[40px] w-[40px] rounded-full flex items-center justify-center ring-4 ring-offset-0 ring-white absolute`}
            iconClassName={`h-[22px] w-[22px] text-white`}
            titleClassName={`text-[#424242] font-poppins text-base font-regular pl-[35px] py-1`}
          />{' '}
          <div className={cn(`m-auto max-w-[661px] font-poppins`)}>
            {' '}
            {parse(ProductSectionDetails.title)}{' '}
          </div>{' '}
        </div>{' '}
        <Tabs
          tabs={tabs}
          containerClassName={cn(`bg-white rounded-full`)}
          tabClassName={cn(`flex-1`)}
          tabContentClassName={cn(`font-poppins text-[17px] font-medium`)}
          activeTabClassName={cn(`bg-[#1C5B98] `)}
          activeTabContentClassName={cn(`text-white`)}
        />{' '}
      </SmallContainer>{' '}
    </section>
  );
};
const ApproachSection = () => {
  return (
    <SmallContainer>
      {' '}
      <>
        {' '}
        <h2 className={cn(`bhw_h2`)}>{ApproachSectionDetails.title}</h2>{' '}
        <p className={cn(`pt-[10px] text-[#424242]`)}>
          {' '}
          {ApproachSectionDetails.description}{' '}
        </p>{' '}
      </>
      <div className={cn(`grid grid-cols-2 gap-x-10 gap-y-[30px] pt-[30px]`)}>
        {' '}
        {ApproachSectionDetails.iconList.map((iconBox, idx) => {
          return (
            <IconBox
              key={idx}
              icon={iconBox.icon}
              isSvg={true}
              title={iconBox.title}
              description={iconBox.description}
              containerClassName={`shadow-3xl p-[25px] flex gap-[15px] items-start justify-between rounded-[15px]`}
              titleClassName={`font-poppins text-[#121212] text-xl font-semibold leading-7 tracking-tight`}
              descriptionClassName={`leading-[27px] text-[#424242] `}
              iconContainerClassName={`flex-none h-[50px] w-[50px]`}
              iconClassName={`h-[50px] w-[50px]`}
            />
          );
        })}{' '}
      </div>{' '}
    </SmallContainer>
  );
};
const SurferSEOSection = () => {
  return (
    <section className={cn('overflow-hidden bg-[#FFFBF5]')}>
      {' '}
      <SmallContainer>
        {' '}
        <h2
          className={cn(
            'flex items-center justify-center gap-2 font-poppins text-3xl font-semibold capitalize leading-[48px]'
          )}
        >
          {' '}
          <Image
            src={SurferSEOSectionDetails.icon}
            alt="Surfer SEO Icon"
            height={32}
            width={32}
            className={cn('flex-none')}
          />{' '}
          {parse(SurferSEOSectionDetails.title)}{' '}
        </h2>
        <TwoColumnGrid
          className={cn(
            `relative grid-cols-7 gap-x-12 from-[#fef0df] from-0% to-[#fffbf5] to-100% pt-12 before:absolute before:left-[calc(100%-330px)] before:top-10 before:h-full before:w-1/2 before:rounded-bl-[15px] before:rounded-tl-[21px] before:bg-gradient-to-r`
          )}
        >
          {' '}
          <div className="col-span-4 flex h-full w-full flex-col items-start space-y-8">
            {' '}
            {SurferSEOSectionDetails.iconList.map((iconBox, idx) => (
              <IconBox
                key={idx}
                icon={iconBox.icon}
                isSvg={false}
                title={iconBox.title}
                description={iconBox.description}
                containerClassName="flex gap-2.5 items-start"
                titleClassName="font-poppins leading-7 tracking-tight text-xl font-semibold"
                descriptionClassName="leading-[27px] text-[#424242] pt-2 text-base"
                iconClassName="h-[22px] w-[22px] rotate-[270deg] mt-1"
              />
            ))}{' '}
          </div>
          <div className="col-span-3 flex h-full w-full items-end">
            {' '}
            <div className="relative">
              {' '}
              {SurferSEOSectionDetails.images.map((surferImage, idx) => (
                <div
                  key={idx}
                  className={cn(
                    `${idx === 0 ? '' : 'absolute -right-24 -top-14'}`
                  )}
                >
                  {' '}
                  <Image
                    src={surferImage.src}
                    alt={surferImage.alt}
                    width={idx === 0 ? 473 : 222}
                    height={idx === 0 ? 271 : 243}
                    quality={100}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />{' '}
                </div>
              ))}{' '}
            </div>{' '}
          </div>{' '}
        </TwoColumnGrid>{' '}
      </SmallContainer>{' '}
    </section>
  );
};
const ContactUsSection = () => {
  return (
    <SmallContainer>
      {' '}
      <TwoColumnGrid className={cn(`gap-x-20`)}>
        {' '}
        <div className={cn(`h-full w-full rounded-2xl bg-[#EDEDED]`)}>
          {' '}
          {/* TODO:Add Image */}{' '}
        </div>
        <div className={cn(`h-full w-full pr-5`)}>
          {' '}
          <div className={cn(`h-full w-full rounded-[15px] border p-10`)}>
            {' '}
            <div className={cn(`text-center`)}>
              {' '}
              <h2
                className={cn(
                  `font-poppins text-[28px] font-semibold text-[#1c5b98]`
                )}
              >
                {' '}
                Contact Us Today!{' '}
              </h2>{' '}
              <div
                className={cn(`m-auto my-[10px] h-[1px] w-[92px] bg-[#d9d9d9]`)}
              />{' '}
              <p
                className={cn(
                  `m-auto max-w-[430px] pb-[20px] text-base text-[#424242]`
                )}
              >
                {' '}
                Ready to Elevate Your Content? Let’s amplify your brand and
                drive results{' '}
              </p>{' '}
            </div>
            {/* <LandingPageForm /> */}{' '}
          </div>{' '}
        </div>{' '}
      </TwoColumnGrid>{' '}
    </SmallContainer>
  );
};

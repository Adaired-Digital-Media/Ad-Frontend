import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@web-components/Icons';
import MaxWidthWrapper from '@/app/(website)/components/MaxWidthWrapper';
import BannerSlider from '@/app/(website)/components/BannerSlider';
import CldImage from '@/app/(website)/components/CloudinaryImageComponent';
import Button from '@/app/(website)/components/Button';
import parse from 'html-react-parser';
import { InfiniteMovingCards } from '../../@core/ui/aceternity-ui/infinite-moving-cards';
import { HoverEffect } from '../../@core/ui/aceternity-ui/card-hover-effect';
import HomepageForm from './components/forms/HomepageForm';

// Data
import {
  AboutSectionData,
  AwardsSectionData,
  ContactSectionData,
  GrowthSectionData,
  LogoSliderSectionData,
  ServiceSectionData,
} from '../../@core/data/website/Homepage';
export default function HomePage() {
  return (
    <>
      <BannerSlider />
      <ManageGrid />
      <About />
      <LogoSlider />
      <Services />
      <Growth />
      <Awards />
      <Contact />
    </>
  );
}

const ManageGrid = () => {
  return (
    <section className="flex items-center justify-between pt-6 transition-all">
      <div className="hidden md:block">
        <CldImage
          height={300}
          width={150}
          src="Static Website Images/Splash_left"
          alt="Splash Left Image"
        />
      </div>
      <MaxWidthWrapper>
        <div className="flex flex-col items-center text-center">
          <h2 className="font-dm text-3xl font-normal md:text-4xl">
            {' '}
            Digital Marketing Services For The Most Ambitious Enterprises
          </h2>
          <div className="relative py-6">
            <div className="absolute left-[-100px] top-1/2 h-px w-20 -translate-y-1/2 transform bg-[#A7A9AC]"></div>
            <div className="absolute right-[-100px] top-1/2 h-px w-20 -translate-y-1/2 transform bg-[#A7A9AC]"></div>
            <Icons.NimbusMarketing className="h-14 w-14 rounded-full bg-[#8EC640] p-2 text-white" />
          </div>

          <p className="max-w-[900px] font-nunito text-base sm:text-xl md:text-2xl">
            We work with businesses that want to engage better, dominate SERPs,
            and achieve more than just website traffic.
          </p>
        </div>
      </MaxWidthWrapper>
      <div className="hidden md:block">
        <CldImage
          height={300}
          width={150}
          src="Static Website Images/Splash_right"
          alt="Splash Left Image"
        />
      </div>
    </section>
  );
};

const About = () => {
  const {
    image,
    subTitle,
    title,
    description,
    points,
    cursive,
    btnText,
    btnHref,
  } = AboutSectionData;

  return (
    <section className="py-6 md:py-12">
      <MaxWidthWrapper className="flex flex-col gap-10 lg:flex-row">
        {/* Image Section */}
        <div className="mx-auto flex-1">
          <div className="relative h-full max-w-lg overflow-hidden lg:max-w-full">
            <CldImage
              src={image}
              alt="About Image"
              height={400}
              width={650}
              className="rounded-lg object-cover"
              loading="lazy" // Lazy load images
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-2 text-center md:text-left">
          <h3 className="relative inline font-nunito text-lg text-[#515151] sm:text-xl md:pl-20">
            <div className="absolute -left-full top-1/2 h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC] md:left-0"></div>
            <div className="absolute -right-full top-1/2 h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC] font-nunito md:hidden"></div>
            {subTitle}
          </h3>

          <h2 className="font-dm text-[1.688rem] font-normal md:text-4xl">
            {title}
          </h2>
          <p className="hyphens-auto py-3 text-justify font-nunito text-base sm:text-lg">
            {description}
          </p>

          {/* Points Section */}
          <div className="flex flex-col gap-5 py-6 sm:flex-row">
            {points.map((point, index) => (
              <div
                key={index}
                className="flex flex-col items-center border p-4 md:items-start md:border-none md:p-0"
              >
                <CldImage
                  src={point.icon}
                  alt="Information Icon"
                  height={60}
                  width={60}
                  className="mb-2 rounded-lg border p-2"
                  loading="lazy" // Lazy load images
                />
                <h3 className="relative py-2 font-nunito text-xl font-semibold">
                  <div className="absolute bottom-1 left-1/2 h-0.5 w-14 -translate-x-1/2 rounded-lg bg-[#c0c2c5] md:left-0 md:translate-x-0"></div>
                  {point.title}
                </h3>
                <p className="hyphens-auto text-justify font-nunito text-base sm:text-lg">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="py-2 font-baby text-lg font-semibold sm:text-2xl">
            {parse(cursive)}
          </div>

          <Button
            title={btnText}
            className="mt-5 bg-white text-black border border-gray-200"
            svgClassName="bg-[#F89520]"
            type="button"
            navigateTo={btnHref}
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const LogoSlider = () => {
  const { title, description, logos } = LogoSliderSectionData;
  return (
    <section className="bg-[#f8f8f8] py-6 sm:py-12">
      <MaxWidthWrapper className="flex flex-col items-center text-center">
        <h2 className="py-2 font-dm text-2xl font-normal md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mb-4 max-w-[1000px] py-2 font-nunito text-base sm:text-lg">
          {description}
        </p>
        <div className="w-full py-2 antialiased">
          <InfiniteMovingCards
            items={logos}
            direction="left"
            speed="slow"
            itemClassName="border border-[#E5E5E5] bg-white grayscale hover:grayscale-0 px-2 py-2 sm:py-5 sm:px-8"
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const Services = () => {
  const { subtitle, title, description, services } = ServiceSectionData;
  return (
    <section className="py-6 lg:py-12">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="relative inline px-4 font-nunito text-lg text-[#515151]">
            <div className="absolute left-full top-1/2 h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC]"></div>
            <div className="absolute right-full top-1/2 h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC]"></div>
            {subtitle}
          </h3>
          <h2 className="py-2 font-dm text-[1.688rem] font-normal md:text-4xl">
            {title}
          </h2>
          <p className="max-w-[900px] py-2 font-nunito text-base sm:text-lg">
            {description}
          </p>
        </div>

        <HoverEffect items={services} />
      </MaxWidthWrapper>
    </section>
  );
};

const Growth = () => {
  const {
    images,
    subTitle,
    title,
    description,
    description_II,
    features,
    pinkBorderText,
    btnHref,
    btnText,
  } = GrowthSectionData;
  return (
    <section className="py-7 sm:py-14">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 lg:flex-row lg:items-start xl:gap-36">
        <div className="relative ml-2 mr-4 flex-1 lg:ml-2 lg:mr-0">
          {images.map((img, index) => (
            <div key={index} className={img.className ? img.className : ''}>
              <CldImage
                src={img.src}
                alt={img.alt}
                height={img.height}
                width={img.width}
              />
            </div>
          ))}
        </div>
        <div className="flex-1">
          <h3 className="relative inline pl-16 font-nunito text-lg text-[#515151] md:pl-20">
            <div className="absolute left-0 top-1/2 h-px w-12 -translate-y-1/2 transform bg-[#A7A9AC] md:w-16" />
            {subTitle}
          </h3>
          <h2 className="py-2 font-dm text-[1.688rem] font-normal md:text-4xl">
            {title}
          </h2>
          <p className="py-2 font-nunito text-base sm:text-lg">{description}</p>
          <ul className="grid gap-3 py-2 text-left sm:grid-cols-2 sm:gap-0">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-1 border p-2 font-nunito text-lg sm:border-none"
              >
                <Icons.PinkArrowMarker className="text-[#BC1D8D]" />
                {feature}
              </li>
            ))}
          </ul>
          <p className="py-2 font-nunito text-base sm:text-lg">
            {description_II}
          </p>
          <p className="border-l-8 border-[#BC1D8D] bg-[#FFF9FD] px-2 py-2 font-nunito text-base sm:text-lg">
            {pinkBorderText}
          </p>
          <Button
            title={btnText}
            className="mt-5 bg-white text-black border border-gray-200"
            svgClassName="bg-[#F89520]"
            type="button"
            navigateTo={btnHref}
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const Awards = () => {
  return (
    <section className="py-6 sm:py-12">
      <MaxWidthWrapper>
        <div className="w-full py-2 antialiased">
          <InfiniteMovingCards
            items={AwardsSectionData}
            direction="right"
            speed="slow"
            itemClassName=" w-20 sm:w-32 h-auto md:w-40 px-2 py-2 sm:py-5 sm:px-8"
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const Contact = () => {
  const { title, description, contactDetails } = ContactSectionData;
  return (
    <section className="pt-6 sm:pt-12">
      <div className="bg-[#f8f8f8] pt-4 lg:bg-white lg:pt-0">
        <MaxWidthWrapper>
          <h2 className="py-2 font-dm text-4xl font-normal md:text-5xl lg:max-w-xl lg:text-6xl xl:text-7xl">
            {title}
          </h2>
        </MaxWidthWrapper>
      </div>
      <div className="bg-[#f8f8f8] pb-8 md:pb-4">
        <MaxWidthWrapper className="flex flex-col gap-10 pb-6 lg:flex-row lg:py-6">
          <div className="flex-1 space-y-5">
            <p className="py-2 font-nunito text-lg text-[#515151] sm:text-xl md:text-2xl">
              {description}
            </p>
            <div className="grid grid-cols-1 items-center space-y-6 sm:grid-cols-2 lg:grid-cols-1">
              {contactDetails.map(({ href, imageSrc, alt, text }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-row items-center gap-4 sm:flex-col lg:flex-row"
                >
                  <Image src={imageSrc} height={40} width={40} alt={alt} />
                  <p className="text-left font-nunito text-lg font-semibold sm:text-center lg:text-left lg:text-2xl">
                    {text}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1 lg:relative">
            <div className="w-full rounded-lg border-4 border-[#f8f8f8] lg:-mt-44">
              <HomepageForm />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

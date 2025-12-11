'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@web-components/Icons';
import MaxWidthWrapper from '@/app/(website)/components/MaxWidthWrapper';
import BannerSlider from '@/app/(website)/components/BannerSlider';
import CldImage from '@/app/(website)/components/CloudinaryImageComponent';
import parse from 'html-react-parser';
import { InfiniteMovingCards } from '../../@core/ui/aceternity-ui/infinite-moving-cards';
import { HoverEffect } from '../../@core/ui/aceternity-ui/card-hover-effect';
import HomepageForm from './components/forms/HomepageForm';
import img from '../../../public/assets/images/hero_image_bhw.png';
import expectImg from '../../../public/not-found.png';

import win from '../../../public/assets/icons/win.png';
import { IoCheckmark } from 'react-icons/io5';

// Data
import {
  AboutSectionData,
  AwardsSectionData,
  ContactSectionData,
  ExpectSectionData,
  GrowthSectionData,
  LogoSliderSectionData,
  ServiceSectionData,
  WhyChooseSectionData,
  CaseStudySectionData,
} from '../../@core/data/website/Homepage';
import HereComponent from './components/HereComponent';
import Heading from './common/Heading';
import Button from './common/Button';
import { useState } from 'react';
import serviceBg from '../../../public/assets/images/home/service-bg-img.png';
import serviceBgOpecity from '../../../public/assets/images/home/serviceBg.png';
import WhyChooseBgOpecity from '../../../public/assets/images/home/Why_Choose_bg_Opecety.png';
import WhyChooseTopVector from '../../../public/assets/images/home/WhyChooseTopVector.png';
import WhyChooseBottomVector from '../../../public/assets/images/home/WhyChooseBottomVector.png';
import ChooseIcon from '../../../public/assets/icons/Group 26.png';
import ChooseIcon2 from '../../../public/assets/icons/Group 1000004066.png';

import seo from '../../../public/assets/images/home/seo.png';
import queen from '../../../public/assets/icons/Queen.png';
import curve from '../../../public/assets/icons/curve_Imag.png';

import { service } from '@/data/zoho-leads-create';
import studiesImg from '../../../public/assets/images/home/studies.png';
import testimonialBg from '../../../public/assets/images/home/testimonial-bg.png';

import { IoIosArrowRoundForward } from 'react-icons/io';

export default function HomePage() {
  return (
    <>
      {/* <BannerSlider /> */}
      <HereComponent />
      {/* <ManageGrid /> */}
      <About />
      <Awards />
      <Services />
      <Expect />
      <WhyChoose />
      <CaseStudy />
      <Testimonial />
      <LogoSlider />
      <Growth />
      <Contact />
    </>
  );
}

const ManageGrid = () => {
  return (
    <section className="flex items-center justify-between bg-slate-200 py-6 pt-6 transition-all">
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
    <section className="">
      <MaxWidthWrapper className="py-[8rem]">
        <Heading
          subTitle={'ABOUT US'}
          title={'Every Brand Has A Story, '}
          span="And We’re Here To Tell It Better!"
          description={''}
        />

        <div className="relative grid grid-cols-1 gap-5 pt-5 md:grid-cols-2">
          {/* Image Section */}
          <div className="mx-auto flex-1">
            <div className="h-full max-w-lg overflow-hidden lg:max-w-full">
              <Image
                src={img}
                alt="About Image"
                height={507}
                width={642}
                className="rounded-lg border-[#e3e3e3] p-1"
              />
              <Image
                src={win}
                alt="About Image"
                height={87}
                width={92}
                className="absolute bottom-0 left-[44.25%]"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-2 text-center md:text-left">
            {/* Points Section */}
            <div className="gap-5 py-6 sm:flex-row">
              {points.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-3 h-6 w-2 bg-[#FB9100]"></div>

                  <div>
                    <div className="relative py-2 font-nunito text-xl font-semibold">
                      <div className="absolute bottom-1 left-1/2 h-0.5 w-14 -translate-x-1/2 rounded-lg text-black md:left-0 md:translate-x-0"></div>
                      <p className="font-nunito text-sm font-[600] text-black">
                        {' '}
                        {point.title}
                      </p>
                    </div>
                    <p className="font-nunito text-sm font-[400] text-[#262626]">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="py-2 text-xs font-semibold text-[#1B5A96]">
              {parse(cursive)}
            </div>

            <Button
              name={'Read More'}
              type="button"
              navigateTo={btnHref}
              className="mt-9"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
const Expect = () => {
  const { image, subTitle, title, description, points, para2, records } =
    ExpectSectionData;

  return (
    <section className="">
      <MaxWidthWrapper className="py-[8rem]">
        <Heading subTitle={subTitle} title={title} span="" description={''} />

        <div className="relative flex justify-between gap-2 pt-5">
          {/* Image Section */}
          <div className="h-full w-[45%] overflow-hidden">
            <Image
              src={expectImg}
              alt="About Image"
              height={507}
              width={642}
              className="rounded-lg border-[#e3e3e3] p-1"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-2 text-center md:text-left">
            <p className="font-nunito text-sm font-normal">{description}</p>
            {/* Points Section */}
            <div className="grid grid-cols-2 gap-2 py-6 sm:flex-row">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex gap-2 rounded-lg border border-[#FFCA8B] p-[1.25rem]"
                >
                  <Image
                    src={queen}
                    width={30}
                    height={24}
                    alt="queen"
                    className="mb-auto"
                  />
                  <p className="my-auto font-nunito text-sm font-[500] text-[#000000]">
                    {point.title}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-nunito text-sm font-normal">{para2}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          {records?.map((record, idx) => {
            const isLast = idx === records.length - 1;

            return (
              <div
                key={idx}
                className={`${!isLast && 'border-r border-[#FB9100w]'}`}
              >
                <p className="text-center font-nunito text-[36px] font-[600] text-[#101C3A]">
                  {record.number}+
                </p>
                <p className="text-center font-nunito text-sm text-[#656565]">
                  {record.name}
                </p>
              </div>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const WhyChoose = () => {
  const { subTitle, title, description, points } = WhyChooseSectionData;
  const [isHover, setIsHover] = useState<number | null>(1);
  return (
    <section className="relative py-6 lg:py-[14rem]">
      <Image
        src={serviceBg}
        fill
        width={undefined}
        height={undefined}
        alt="d"
        className="object-cover"
        priority
      />
      <Image
        src={WhyChooseBgOpecity}
        fill
        width={undefined}
        height={undefined}
        alt="d"
        className="object-cover"
        priority
      />

      {/* ---- Top Curve Overlay ---- */}
      <div className="pointer-events-none absolute left-0 top-0 h-[132px] w-full">
        <Image
          src={WhyChooseTopVector}
          alt="top curve"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ---- Bottom Curve Overlay ---- */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[132px] w-full">
        <Image
          src={WhyChooseBottomVector}
          alt="bottom curve"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-20">
        <MaxWidthWrapper>
          <Heading
            subTitle={subTitle}
            title={title}
            span={''}
            description={description}
            isStyped={true}
            isVarticle={true}
          />
          <div className="mt-[4rem] grid grid-cols-1 gap-[2rem] md:grid-cols-4">
            {points?.map((item, idx: any) => {
              const lastCard = idx === points.length - 1;
              const isSecond = idx === 1;
              const hovered = isHover === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setIsHover(idx)}
                  onMouseLeave={() => setIsHover(1)}
                  className="relative"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    {/* ICON CIRCLE */}
                    <div className="relative flex h-[6rem] w-[6rem] items-center justify-center rounded-full border border-white backdrop-blur-md">
                      <Image
                        src={hovered ? ChooseIcon2 : ChooseIcon}
                        width={70}
                        height={70}
                        alt=""
                        className={`absolute bottom-0 rounded-full object-contain p-[1rem] ${hovered ? 'bg-[#FF9E2C] text-white' : 'bg-white'} `}
                      />
                    </div>

                    {/* CARD */}
                    <div
                      className={`mt-[-2.5rem] h-[340px] w-[296px] cursor-pointer rounded-3xl px-[1.5rem] pb-[1.5rem] pt-[3rem] transition-all duration-300 ${hovered ? 'bg-white text-black' : 'bg-[#1A5A9621] text-white'} `}
                    >
                      <p
                        className={`font-nunito text-[24px] ${hovered ? 'font-[600]' : 'font-normal'}`}
                      >
                        {item?.title}
                      </p>

                      <p className={`pt-[1rem] font-nunito text-xs`}>
                        {item?.description}
                      </p>
                    </div>
                  </div>

                  {/* CURVE LINE */}
                  {!lastCard && (
                    <Image
                      src={curve}
                      width={144}
                      height={134}
                      alt="top curve"
                      className={`absolute left-[80%] top-1 ${isSecond ? 'rotate-180' : ''} `}
                      priority
                    />
                  )}
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

const CaseStudy = () => {
  const { image, subTitle, title, span, description, studies } =
    CaseStudySectionData;

  return (
    <section className="">
      <MaxWidthWrapper className="py-[6rem]">
        <Heading
          subTitle={subTitle}
          title={title}
          span={span}
          description={''}
        />
        <div className="grid grid-cols-1 gap-7 py-[1.5rem] md:grid-cols-3">
          {studies?.map((study, idx) => {
            return (
              <div
                key={idx}
                className={`rounded-3xl p-[1.5rem]`}
                style={{ backgroundColor: study.bgColor }}
              >
                <Image src={studiesImg} width={400} height={258} alt="" />
                <div className="flex gap-2 py-[1rem]">
                  {study?.labels?.map((label) => {
                    return (
                      <p className="rounded-full bg-white px-[1rem] py-[0.25rem] text-xs text-black">
                        {label}
                      </p>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-nunito text-[24px] font-[500] text-[#101C3A]">
                    {study.title}
                  </p>
                  <div className="flex items-center justify-end">
                    <IoIosArrowRoundForward
                      size={40}
                      className="rounded-full bg-white p-1"
                      style={{ transform: 'rotate(310deg)' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-[2rem] flex items-center justify-center">
          <Button name="View All Studies" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const Testimonial = () => {
  const { subTitle, title, description, points } = WhyChooseSectionData;
  const [isHover, setIsHover] = useState<number | null>(1);
  return (
    <section className="relative bg-[#FFFBF6] py-6 lg:py-[6rem]">
      <div className="relative z-20">
        <MaxWidthWrapper>
          <Heading
            subTitle={"Testimonial"}
            title={"What Our Clients Say"}
            span={''}
            description={description}
            isStyped={true}
            isVarticle={true}
            isBgWhite={true}
          />
          {/* <div className="mt-[4rem] grid grid-cols-1 gap-[2rem] md:grid-cols-4">
            {points?.map((item, idx: any) => {
              const lastCard = idx === points.length - 1;
              const isSecond = idx === 1;
              const hovered = isHover === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setIsHover(idx)}
                  onMouseLeave={() => setIsHover(1)}
                  className="relative"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="relative flex h-[6rem] w-[6rem] items-center justify-center rounded-full border border-white backdrop-blur-md">
                      <Image
                        src={hovered ? ChooseIcon2 : ChooseIcon}
                        width={70}
                        height={70}
                        alt=""
                        className={`absolute bottom-0 rounded-full object-contain p-[1rem] ${hovered ? 'bg-[#FF9E2C] text-white' : 'bg-white'} `}
                      />
                    </div>

                    <div
                      className={`mt-[-2.5rem] h-[340px] w-[296px] cursor-pointer rounded-3xl px-[1.5rem] pb-[1.5rem] pt-[3rem] transition-all duration-300 ${hovered ? 'bg-white text-black' : 'bg-[#1A5A9621] text-white'} `}
                    >
                      <p
                        className={`font-nunito text-[24px] ${hovered ? 'font-[600]' : 'font-normal'}`}
                      >
                        {item?.title}
                      </p>

                      <p className={`pt-[1rem] font-nunito text-xs`}>
                        {item?.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </MaxWidthWrapper>
      </div>
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
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="relative py-6 lg:py-[6rem]">
      <Image
        src={serviceBg}
        fill
        width={undefined}
        height={undefined}
        alt="d"
        className="object-cover"
        priority
      />
      <Image
        src={serviceBgOpecity}
        fill
        width={undefined}
        height={undefined}
        alt="d"
        className="object-cover"
        priority
      />
      <div className="relative z-20">
        <MaxWidthWrapper>
          <Heading
            subTitle={subtitle}
            title={title}
            span={''}
            description={description}
            isStyped={true}
          />

          {/* Main layout */}
          <div className="z-20 mt-[2.5rem] flex rounded-3xl bg-white">
            {/* LEFT SIDE - TABS */}
            <div className="z-20 w-[32%] px-[4rem] py-[2.5rem]">
              {services?.map((service, idx) => (
                <p
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`my-6 w-[440px] cursor-pointer rounded-full border-4 px-6 py-3 text-md ${
                    activeTab === idx
                      ? 'border-[#EAF5FF] bg-[#1B5A96] py-4 text-white'
                      : 'border-[#EAF5FF] bg-white text-black'
                  } `}
                >
                  {service.title}
                </p>
              ))}
            </div>

            {/* RIGHT SIDE - ACTIVE TAB CONTENT */}
            <div className="relative col-span-2 rounded-3xl bg-[#EAF5FF] pl-[8rem] pr-[2.5rem] pt-[4rem]">
              <p className="mb-4 font-nunito text-2xl font-[600] text-black">
                {services[activeTab].title}
              </p>

              <p className="mb-6 font-nunito text-sm text-[#262626]">
                {services[activeTab].description}
              </p>

              <div className="ml-6 list-disc space-y-2">
                {services[activeTab].list?.map((item, i) => (
                  <div key={i} className="flex gap-2 text-black">
                    <IoCheckmark
                      size={25}
                      className="rounded-full bg-[#1EAD0B] p-1 text-sm text-white"
                    />
                    <span className="font-nunito font-[500] text-[#262626]">
                      {' '}
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 right-[2.5rem] flex items-center justify-center">
                <Image src={seo} width={482} height={327} alt="sf" />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
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
            className="mt-5 border border-gray-200 bg-white text-black"
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
    <section className="bg-[#FAFDFF] py-6 sm:py-12">
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

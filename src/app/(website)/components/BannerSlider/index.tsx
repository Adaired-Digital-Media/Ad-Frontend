'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundImage, { Data } from './BackgroundImage';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Button from '../Button';
import { gsap } from 'gsap';

const BannerSlider = () => {
  const [data, setData] = useState<Data[]>(sliderData);
  const [currentIndex, setCurrentIndex] = useState<number>(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data.length]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      '#line1',
      { strokeDasharray: '200', strokeDashoffset: '200' },
      { strokeDashoffset: '0', duration: 2, ease: 'power2.inOut' }
    )
      .fromTo(
        '#icon1',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.inOut' }
      )
      .fromTo(
        '#icon2',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.inOut' }
      )
      .fromTo(
        '#icon3',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.inOut' }
      )
      .fromTo(
        '#line2',
        { strokeDasharray: '200', strokeDashoffset: '200' },
        { strokeDashoffset: '0', duration: 2, ease: 'power2.inOut' }
      );
  }, []);

  return (
    <AnimatePresence>
      <div className="relative flex min-h-[400px] items-end py-24 md:min-h-[500px] lg:min-h-[90dvh]">
        <BackgroundImage
          currentData={data[currentIndex]}
          nextData={data[(currentIndex + 1) % data.length]}
        />
        <div className="absolute inset-0 h-full w-full bg-black opacity-25">
          {/* Overlay */}
        </div>
        {/* <div className="absolute top-1/2 right-0 2xl:right-unset 2xl:left-4 3xl:left-10 4xl:left-24 transform -translate-y-1/2 text-white hidden 2xl:flex flex-col items-center justify-center space-y-10 transition-all duration-300">
          <svg width="2" height="200" xmlns="http://www.w3.org/2000/svg">
            <line
              id="line1"
              x1="1"
              y1="0"
              x2="1"
              y2="200"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          <div className="flex flex-col space-y-10">
            <Link href={process.env.NEXT_PUBLIC_FACEBOOK_URL || ""}>
              <Icons.Facebook
                className="h-8 w-8 3xl:h-10 2xl:w-10"
                id="icon1"
              />
            </Link>
            <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || ""}>
              <Icons.Instagram
                className="h-8 w-8 3xl:h-10 2xl:w-10"
                id="icon2"
              />
            </Link>
            <Link href={process.env.NEXT_PUBLIC_TWITTER_URL || ""}>
              <Icons.Twitter className="h-8 w-8 3xl:h-10 2xl:w-10" id="icon3" />
            </Link>
          </div>

          <svg width="2" height="200" xmlns="http://www.w3.org/2000/svg">
            <line
              id="line2"
              x1="1"
              y1="0"
              x2="1"
              y2="200"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div> */}
        <MaxWidthWrapper className="z-10 flex flex-col items-center text-center text-white lg:items-start lg:text-left">
          <p className="z-[200] max-w-96 font-dm text-lg before:h-0.5 before:w-12 before:bg-white before:content-[''] md:text-xl">
            {data[currentIndex].subHead}
          </p>

          <h1 className="z-[200] max-w-[34rem] font-dm font-normal text-4xl text-white sm:text-5xl md:text-6xl lg:max-w-2xl xl:max-w-[52rem] xl:text-7xl">
            {data[currentIndex].title}
          </h1>

          <Button
            title="Request a callback"
            textClassName="text-base md:text-lg"
            className="mt-5 bg-white text-black"
            svgClassName="bg-[#F89520] text-base md:test-3xl"
            type="button"
            navigateTo="/contact"
          />
        </MaxWidthWrapper>
      </div>
    </AnimatePresence>
  );
};

export default BannerSlider;

const sliderData: Data[] = [
  {
    img: 'Static Website Images/BannerImage_1',
    title: 'Digital Marketing Agency That Turns Businesses Into Brands',
    subHead: 'Adaired Digital Media',
  },
  {
    img: 'Static Website Images/BannerImage_2',
    title: 'Digital Marketing Agency That Turns Businesses Into Brands',
    subHead: 'Adaired Digital Media',
  },
  {
    img: 'Static Website Images/BannerImage_3',
    title: 'Digital Marketing Agency That Turns Businesses Into Brands',
    subHead: 'Adaired Digital Media',
  },
];

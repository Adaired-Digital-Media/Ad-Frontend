'use client';
import React, { useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import bgImage from '../../../../../public/assets/images/home/bgImage.png';
import bgGrid from '../../../../../public/assets/images/home/bg_grid.png';
import bgImag2 from '../../../../../public/assets/images/home//bgImag2.png';

import cartoonMegaphones from '../../../../../public/assets/images/home/cartoon-megaphones.png';
// import headerImage from '../../../../../public/assets/images/home/headerImage.png';
import headerImage from '../../../../../public/assets/images/home/headerImage (2).png';

import star from '../../../../../public/assets//icons/star.png';

import Image from 'next/image';
import Button from '../../common/Button';
import GetQuoteModal from '../popup/GetQuoteModal';

const HereComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <Image
        src={bgImage}
        fill
        width={undefined}
        height={undefined}
        alt="d"
        className="object-cover"
        priority
      />
      <Image
        src={bgImag2}
        fill
        width={undefined}
        height={undefined}
        alt="d"
        className="object-cover"
        priority
      />

      <MaxWidthWrapper className="py-[2rem] lg:py-[8rem]">
        <Image
          src={bgGrid}
          fill
          width={undefined}
          height={undefined}
          alt="d"
          className="object-cover"
          priority
        />
        <Image
          src={headerImage}
          width={1220}
          height={240}
          alt="32"
          className="hidden lg:block"
        />
        <div className="mt-4 flex gap-2 font text-xs text-black lg:mt-20">
          <Image src={star} width={18} height={17} alt="d" />
          <span className="">WELCOME TO ADAIRED</span>
        </div>
        <div className="gap- grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex">
            <div className="w-[80%] lg:w-[70%]">
              <h1 className="mt-4">
                The Driving Force Behind the Brands That Lead
              </h1>
            </div>
            <div className="absolute right-0 top-0 lg:right-[25%]">
              <div className="relative h-[5rem] w-[5rem] animate-scale-up delay-300 lg:h-[7rem] lg:w-[7rem]">
                <Image
                  src={cartoonMegaphones}
                  fill
                  alt="32"
                  className="lg:top-1/5 absolute right-0 top-[10%] object-contain lg:right-[60%]"
                />
              </div>
            </div>
          </div>
          <div className="pt-4 lg:pt-0">
            <p className="">
              In a world where thousands of brands compete for a moment's
              attention, being seen isn’t enough. You want to be remembered,
              right? And that’s where Adaired Digital Media comes in. Offering a
              full-service, 360° digital strategy for your business, helping you
              rise above the noise and claim your space in the digital world.
            </p>
            <div className="flex gap-2 py-4">
              <p className="text-xxs text-black lg:text-sm">
                <span className="animate-bounce"> 🚀</span> Transform Your
                Business
              </p>
              <p className="text-xxs text-black lg:text-sm">
                <span className="animate-bounce"> 🎯</span> Engage & Grow
              </p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              name="Get a Quote"
              className="mt-3"
            />
          </div>
        </div>
      </MaxWidthWrapper>
      {<GetQuoteModal isOpen={open} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default HereComponent;

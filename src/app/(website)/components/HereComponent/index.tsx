'use client';
import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import bgImage from '../../../../../public/assets/images/home/bgImage.png';
import bgGrid from '../../../../../public/assets/images/home/bg_grid.png';
import bgImag2 from '../../../../../public/assets/images/home//bgImag2.png';

import cartoonMegaphones from '../../../../../public/assets/images/home/cartoon-megaphones.png';
import headerImage from '../../../../../public/assets/images/home/headerImage.png';
import star from '../../../../../public/assets//icons/star.png';

import Image from 'next/image';
import Button from '../../common/Button';

const HereComponent = () => {
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

      <MaxWidthWrapper className="py-[8rem]">
        <Image
          src={bgGrid}
          fill
          width={undefined}
          height={undefined}
          alt="d"
          className="object-cover"
          priority
        />
        <Image src={headerImage} width={1220} height={240} alt="32" />
        <div className="mt-20 flex gap-2 font-nunito text-xs text-black">
          <Image src={star} width={18} height={17} alt="d" />
          <span>WELCOME TO ADAIRED</span>
        </div>
        <div className="gap- grid grid-cols-1 md:grid-cols-2">
          <div className="relative flex">
            <div>
              <p className="md:text-lg2 mt-4 text-lg font-medium leading-tight text-black">
                Digital Agency That
                <br></br> <span className="flex gap-2">Turns Businesses </span>
                Into Brands{' '}
              </p>
            </div>
            <Image
              src={cartoonMegaphones}
              width={128}
              height={100}
              alt="32"
              className="absolute right-1/4 top-1/3 mr-5 mt-1"
            />
          </div>
          <div className="">
            <p className="text-xs text-black">
              We’re a digital agency that transforms businesses into brands.
              With the perfect blend of strategy and creativity, we help you
              stand out, connect with your audience, and grow with impact.
            </p>
            <div className="flex gap-2 py-4">
              <p className="text-xs text-black">🚀 Transform Your Business</p>
              <p className="text-xs text-black">🎯 Engage & Grow</p>
            </div>
            <Button name="Book A Demo" className="mt-3" />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HereComponent;

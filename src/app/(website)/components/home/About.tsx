import { AboutSectionData } from '@/@core/data/website/Homepage';
import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import Image from 'next/image';
import Button from '../../common/Button';
import img from '../../../../../public/assets/images/home/aboutus.png';
import about_graph from '../../../../../public/assets/images/home/about_graph.png';
import Mask from '../../../../../public/assets/images/home/Mask group.png';
import check from '../../../../../public/assets/icons/blue_check.png';

import { PiSealCheckBold } from 'react-icons/pi';
import {
  useImageReveal,
  useZoomOnView,
} from '@/@core/hooks/useScrollAnimations';

const About = () => {
  const { subTitle, title, points, description, cursive } = AboutSectionData;
  const { ref: imageRef, className: imageClass } = useImageReveal({
    direction: 'left',
    delay: 350,
  });

  const { ref: zoomRef, className: zoomClass } = useZoomOnView({
    delay: 200,
    once: true,
  });

  return (
    <section className="">
      <MaxWidthWrapper className="pb-[8rem] pt-[3rem] lg:py-[4rem] xl:py-[6rem]">
        <div className="flex flex-col-reverse gap-[3rem] lg:flex-row lg:justify-between lg:gap-[5.25rem]">
          {/* Image Section */}
          <div className="relative mx-auto flex-1">
            {/* CENTER IMAGE */}
            <div
              ref={imageRef}
              className={`flex items-center justify-center p-3 ${imageClass}`}
            >
              <Image
                src={img}
                alt="About Image"
                width={581}
                height={554}
                className="h-[14rem] w-[14rem] rounded-lg md:h-[34.625rem] md:w-[36.313rem] lg:h-[34.625rem] lg:w-[36.313rem]"
              />
            </div>
            <div className="absolute left-[-1rem] top-[2rem] flex animate-zoomPulse gap-2 rounded-xl border-[1px] border-[#000000]/10 bg-[#FFFFFF] px-2 py-1 lg:left-0 lg:top-14 lg:px-4 lg:py-2">
              <Image
                src={check}
                width={18}
                height={18}
                alt="check "
                className="my-auto"
              />
              <p className="my-auto font-outfit text-[12px] text-[#000000] lg:text-[15.62px]">
                100% Business Growth
              </p>
            </div>
            {/* MASK – TOP RIGHT */}
            <Image
              src={Mask}
              alt="Mask Image"
              width={246}
              height={136}
              className="absolute right-[-3rem] top-[-2rem] -z-10 lg:right-6 lg:top-[-2rem]"
            />

            {/* MASK – BOTTOM LEFT */}
            <Image
              src={Mask}
              alt="Mask Image"
              width={246}
              height={136}
              className="absolute bottom-[-1.8rem] left-[-3rem] -z-10 lg:bottom-[2.5rem] lg:left-5"
            />

            {/* ABOUT GRAPH – BOTTOM RIGHT */}
            <div ref={zoomRef} className={`${zoomClass}`}>
              <Image
                src={about_graph}
                alt="Graph Image"
                width={276}
                height={215}
                // ref={zoomRef}
                className={`absolute bottom-[-2.25rem] right-[-2rem] h-[7rem] w-[8rem] md:bottom-[-3.25rem] md:right-[-3rem] md:h-[14.063rem] md:w-[17.25rem] lg:bottom-[-3rem] lg:right-0`}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-2 text-left lg:text-left">
            {/* Points Section */}
            <Heading
              subTitle={subTitle}
              title={title}
              span=""
              description={description}
              isPara2={true}
              description2={` We've helped brands transform their digital presences, build loyal
              audiences, and exceed their growth goals. When you work with us,
              you are investing in outcomes rather than simply marketing.`}
            />

            <div className="gap-5 space-y-8 py-6 sm:flex-row">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 lg:flex-row lg:items-start"
                >
                  {/* ICON */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#FEE9CC99]">
                    <Image
                      src={point.icon}
                      alt={point.title}
                      width={35}
                      height={35}
                      className="object-contain"
                    />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h4 className="text-center text-xs font-bold lg:text-left">
                      {point.title}
                    </h4>
                    <p className="mt-1 text-center font-montserrat text-xs lg:text-left">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default About;

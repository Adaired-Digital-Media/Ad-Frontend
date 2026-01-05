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
      <MaxWidthWrapper className="py-[2rem] lg:py-[8rem]">
        <div className="flex justify-between gap-[5.25rem]">
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
                className="rounded-lg"
              />
            </div>
            <div className="absolute left-0 top-14 flex animate-zoomPulse gap-2 rounded-xl border-[1px] border-[#000000]/10 bg-[#FFFFFF] px-4 py-2">
              <Image
                src={check}
                width={18}
                height={18}
                alt="check "
                className="my-auto"
              />
              <p className="my-auto font-outfit text-[15.62px] text-[#000000]">
                100% Business Growth
              </p>
            </div>
            {/* MASK – TOP RIGHT */}
            <Image
              src={Mask}
              alt="Mask Image"
              width={246}
              height={136}
              className="absolute -top-9 right-6 -z-10"
            />

            {/* MASK – BOTTOM LEFT */}
            <Image
              src={Mask}
              alt="Mask Image"
              width={246}
              height={136}
              className="absolute -bottom-4 left-5 -z-10"
            />

            {/* ABOUT GRAPH – BOTTOM RIGHT */}
            <div ref={zoomRef} className={`${zoomClass}`}>
              <Image
                src={about_graph}
                alt="Graph Image"
                width={276}
                height={215}
                // ref={zoomRef}
                className={`absolute -bottom-10 right-0`}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-2 text-center lg:text-left">
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
                <div key={index} className="flex items-start gap-4">
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
                    <h4 className="text-xs font-bold">{point.title}</h4>
                    <p className="mt-1 font-montserrat text-xs">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* 
            <div className="py-2 text-xs font-semibold text-[#1B5A96] lg:text-sm">
              {cursive}
            </div>

            <Button
              href={'/about'}
              name={'See What’s Next'}
              width={true}
              className="mt-9"
            /> */}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default About;

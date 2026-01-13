import { SolutionsSectionData } from '@/@core/data/website/Homepage';
import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import Image from 'next/image';
import img from '../../../../../public/assets/images/home/solutions.png';
import about_graph from '../../../../../public/assets/images/home/about_graph.png';
import Mask from '../../../../../public/assets/images/home/Mask group.png';
import check from '../../../../../public/assets/icons/blue_check.png';

import {
  useImageReveal,
  useZoomOnView,
} from '@/@core/hooks/useScrollAnimations';
import SaveAndCancel from '../../common/SaveAndCancel';

const Solutions = () => {
  const { subTitle, title, points, description, cursive } =
    SolutionsSectionData;
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
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:gap-[3rem] xl:gap-[5rem]">
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
                width={625}
                height={470}
                className="my-[2rem] h-[14rem] w-[14rem] rounded-lg md:h-[34.625rem] md:w-[36.313rem] lg:h-[18rem] lg:w-[20rem] xl:h-[25.375rem] xl:w-[39.063rem]"
              />
            </div>
            {/* MASK – TOP RIGHT */}
            <Image
              src={Mask}
              alt="Mask Image"
              width={246}
              height={136}
              className="absolute right-[-3rem] top-[-2rem] -z-10 lg:right-0 lg:top-0"
            />

            {/* MASK – BOTTOM LEFT */}
            <Image
              src={Mask}
              alt="Mask Image"
              width={246}
              height={136}
              className="absolute bottom-[-1.6rem] left-[-3rem] -z-10 lg:bottom-0 lg:left-0"
            />
          </div>

          {/* Content Section */}
          <div className="my-auto flex-1 text-left lg:text-left">
            {/* Points Section */}
            <Heading
              subTitle={`Total Transparency. Zero "Black Box" Marketing`}
              title={
                'Most clients have no idea what their agency actually does all day. You get a PDF once a month and a bill.'
              }
              span=""
              description={
                'But with us, you get 24/7 access to your campaign pulse. We combine advanced tracking tools with human insight to show you exactly how $1 of spend becomes $5 of revenue.'
              }
            />

            <div className="hidden gap-5 space-y-8 py-6 sm:flex-row">
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
            <SaveAndCancel
              name={'Get Your Free Marketing Audit'}
              isIcon={true}
              isFullWidth={true}
              className="mt-[2rem] w-[20rem]"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Solutions;

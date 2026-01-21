import { SolutionsSectionData } from '@/@core/data/website/Homepage';
import React, { useState } from 'react';
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
import GetQuoteModal from '../popup/GetQuoteModal';

const Solutions = () => {
  const [open, setOpen] = useState(false);
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
                className="my-[2rem] h-[14rem] w-[14rem] rounded-lg md:h-[34.625rem] md:w-[36.313rem] lg:h-[18rem] lg:w-[20rem] xl:h-[25.375rem] xl:w-[39.063rem] 1360:w-[25rem] 1400:w-[27rem] 1600:w-[32rem] 1680:h-[25.375rem] 1680:w-[34rem] 3xl:h-[25.375rem] 3xl:w-[39.063rem]"
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
              subTitle={subTitle}
              title={title}
              span=""
              description={description}
            />
            <SaveAndCancel
              name={'Get Your Free Website Audit'}
              isIcon={true}
              buttonWidth={'w-[22rem] 1360:w-[18rem] 1400:w-[22rem]'}
              handleClick={() => setOpen(!open)}
              className="rem] mt-[2rem]"
            />
          </div>
        </div>
      </MaxWidthWrapper>

      <GetQuoteModal isOpen={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default Solutions;

'use client';
import { TestimonialSectionData } from '@/@core/data/website/Homepage';
import { useEffect, useState } from 'react';
import Heading from '../../common/Heading';
import { MdOutlineStar } from 'react-icons/md';
import Image from 'next/image';
import google from '../../../../../public/assets/upwork.png';
import useIsMobile from '@/@core/hooks/useIsMobile';

import img_1 from '../../../../../public/assets/testimonial/testimonial_1.png';
import img_2 from '../../../../../public/assets/testimonial/testimonial_2.png';
import img_3 from '../../../../../public/assets/testimonial/testimonial_3.png';
import img_4 from '../../../../../public/assets/testimonial/testimonial_4.png';
import img_5 from '../../../../../public/assets/testimonial/testimonial_5.png';
import img_6 from '../../../../../public/assets/testimonial/testimonial_6.png';
const Testimonial = () => {
  const isMobile = useIsMobile();
  const { subTitle, title, description, testimonials } = TestimonialSectionData;
  const [isHover, setIsHover] = useState<number | null>(1);
  // const VISIBLE_CARDS = 3;
  const VISIBLE_CARDS = isMobile ? 1 : 3;

  const total = testimonials.length;
  const testimonialData = [img_1, img_2, img_3, img_4, img_5, img_6];
  // clone first cards
  const slides = [...testimonials, ...testimonials.slice(0, VISIBLE_CARDS)];

  const [index, setIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  return (
    <section className="relative bg-gradient-to-b from-[#05121E] to-[#1A5A96] bg-cover bg-no-repeat py-[3rem] lg:py-[4rem] xl:py-[6rem]">
      <div className="relative z-20">
        <div className="flex w-[100%] justify-center">
          <Heading
            subTitle={subTitle}
            title={title}
            span={''}
            description={description}
            isInCenter={true}
            className="w-[90%] lg:w-[65%]"
          />
        </div>
        <div className="flex justify-center">
          <div className="relative w-[90%] overflow-x-hidden pt-[2.5rem]">
            {/* Track */}
            <div
              className={`flex ${
                enableTransition
                  ? 'transition-transform duration-700 ease-in-out'
                  : ''
              }`}
              style={{
                transform: `translateX(-${index * (100 / VISIBLE_CARDS)}%)`,
              }}
            >
              {slides.map((testimonial: any, idx: number) => (
                <div
                  className={`relative shrink-0 px-[1rem] ${
                    isMobile ? 'basis-full' : 'basis-1/3'
                  }`}
                >
                  <div
                    onClick={() =>
                      window.open(
                        'https://www.upwork.com/agencies/1064740584575918080/',
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                    className="h-full min-h-[290px] transform-gpu rounded-2xl border-[5px] border-transparent bg-white p-[2.5rem] transition-all duration-300 ease-out will-change-transform hover:scale-[1.03] hover:border-[#1B5A96] lg:p-[1.5rem] xl:p-[2rem]"
                  >
                    <div className="flex justify-between pt-[2rem]">
                      <div className="absolute left-10 top-10 lg:left-4 lg:top-4 xl:left-10 xl:top-10">
                        <p className="text-sm font-medium text-[#108A00]">
                          {testimonial.name}
                        </p>
                        <p className="text-sm font-medium text-[#108A00]">
                          {testimonial.span}
                        </p>
                        <div className="my-1 flex gap-1 lg:gap-0 xl:gap-1">
                          <span className="my-auto flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <MdOutlineStar
                                key={i}
                                size={16}
                                className="text-[#FB9100]"
                              />
                            ))}
                          </span>
                          <p className="my-auto text-xxs text-[#000000]">
                            <span> 5 </span>
                            <span className="blur-[2.5px]">
                              {' '}
                              Sep 22, 2025 - Dec 19, 2025
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="absolute right-10 top-10 h-[25px] w-[95px] lg:right-0 lg:top-4 xl:right-10 xl:top-10">
                        <Image
                          src={google}
                          width={95}
                          height={25}
                          alt="Google"
                          unoptimized
                          className="xl-h-[25px] lg-h-[20px] lg:w-[65px] xl:w-[95px]"
                        />
                      </div>
                    </div>
                    <p className="pt-[4rem] text-xxs text-[#262626]">
                      {testimonial.description}
                    </p>
                    <span className="pt-3 blur-[2.5px]">
                      $300.00 Fixed Price
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {total > VISIBLE_CARDS && (
              <div className="mt-[4rem] flex justify-center gap-2">
                {Array.from({ length: total }).map((_, i) => {
                  const activeIndex = index % total;
                  return (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        activeIndex === i ? 'bg-[#FB9100]' : 'bg-gray-300'
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

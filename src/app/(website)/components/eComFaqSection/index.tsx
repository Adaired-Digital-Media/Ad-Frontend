'use client';

import { cn } from '@core/utils/class-names';
import SmallContainer from '../SmallWidthContainer';
import { Accordion } from 'rizzui';
import { GoDotFill } from 'react-icons/go';
import { FAQSectionDetails } from '@core/data/website/Landingpage';
import { HiChevronDown } from "react-icons/hi2";

export const FAQSection = () => {
  return (
    <div className={cn('overflow-hidden bg-[#F6FBFF]')} id="faqs">
      <SmallContainer>
        <h2
          className={cn(
            `font-poppins text-[30px] font-semibold leading-[48px]`
          )}
        >
          Frequently Asked Questions
        </h2>
        <div className={cn(`pt-6`)}>
          {FAQSectionDetails.map((item) => (
            <Accordion
              key={item.title}
              className="border-b first-of-type:border-t"
            >
              <Accordion.Header>
                {({ open }) => (
                  <div className="flex w-full cursor-pointer items-center justify-between py-5 font-nunito text-xl font-semibold">
                    <div className={cn(`flex items-center`)}>
                      <GoDotFill className="mr-2 h-3 w-3" />
                      <p className='text-left'>{item.title}</p>
                    </div>
                    <HiChevronDown
                      className={cn(
                        'h-5 w-5 -rotate-0 transform transition-transform duration-300 font-thin',
                        open && '-rotate-180 text-[#1C5B98]'
                      )}
                      strokeWidth={1}
                    />
                  </div>
                )}
              </Accordion.Header>
              <Accordion.Body className="mx-6 mb-7 font-nunito text-base font-normal text-[#424242]">
                {item.content}
              </Accordion.Body>
            </Accordion>
          ))}
        </div>
      </SmallContainer>
    </div>
  );
};

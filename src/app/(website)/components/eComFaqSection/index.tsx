'use client';

import { cn } from '@core/utils/class-names';
import SmallContainer from '../SmallWidthContainer';
import { Accordion } from 'rizzui';
import { FaChevronDown } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { FAQSectionDetails } from '@/@core/data/website/Landingpage';

export const FAQSection = () => {
  return (
    <div className={cn('overflow-hidden bg-[#F6FBFF]')}>
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
                      {item.title}
                    </div>
                    <FaChevronDown
                      className={cn(
                        'h-5 w-5 -rotate-0 transform transition-transform duration-300',
                        open && '-rotate-180 text-[#1C5B98]'
                      )}
                    />
                  </div>
                )}
              </Accordion.Header>
              <Accordion.Body className="mx-6 mb-7 font-nunito text-xl font-normal text-[#424242]">
                {item.content}
              </Accordion.Body>
            </Accordion>
          ))}
        </div>
      </SmallContainer>
    </div>
  );
};

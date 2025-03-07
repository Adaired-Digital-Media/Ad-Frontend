'use client';

import { cn } from '@core/utils/class-names';
import SmallContainer from '../SmallWidthContainer';
import { GoDotFill } from 'react-icons/go';
import { FAQSectionDetails } from '@core/data/website/Landingpage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@core/ui/shadcn-ui/accordion';

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
          <Accordion type="single" collapsible className="w-full">
            {FAQSectionDetails.map((item, index) => (
              <AccordionItem value={item.title}>
                <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between py-5 font-nunito text-xl font-semibold no-underline hover:no-underline">
                  <div className={cn(`flex items-center`)}>
                    <p className="text-left">{item.title}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    `font-nunito text-base font-normal text-[#424242]`
                  )}
                >
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SmallContainer>
    </div>
  );
};

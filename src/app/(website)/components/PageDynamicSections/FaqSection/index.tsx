'use client';
import React from 'react';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
import { cn } from '@core/utils/class-names';
import parse from 'html-react-parser';
import { Accordion } from 'rizzui';
import { BsChevronDown } from 'react-icons/bs';

type FAQ = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  faqs: FAQ[];
};

const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  return (
    <div className="space-y-3">
      <h2 className="font-nunito text-2xl font-semibold leading-snug text-gray-900 md:text-[38px]">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq) => {
        return (
          <Accordion
            key={faq.question}
            className="mx-8 border-b last-of-type:border-b-0"
          >
            <Accordion.Header>
              {({ open }) => (
                <div className="flex w-full cursor-pointer items-center justify-between py-5 text-xl font-semibold font-nunito">
                  {faq.question}
                  <BsChevronDown
                    className={cn(
                      'h-5 w-5 -rotate-90 transform transition-transform duration-300',
                      open && '-rotate-0'
                    )}
                  />
                </div>
              )}
            </Accordion.Header>
              <Accordion.Body className="mb-7 font-nunito text-base">{parse(faq.answer)}</Accordion.Body>
          </Accordion>
        );
      })}
    </div>
  );
};

export default FaqSection;

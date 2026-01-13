import React, { useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import { FAQSSectionData } from '@/@core/data/website/Homepage';
import { MdAdd } from 'react-icons/md';
import { GrFormSubtract } from 'react-icons/gr';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { subTitle, title, description, faqs } = FAQSSectionData;

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="overflow-visible py-[3rem] lg:py-[4rem] xl:py-[6rem]">
      <MaxWidthWrapper className="space-y-[3rem] overflow-visible">
        <div className="flex w-[100%] justify-center">
          <Heading
            subTitle={subTitle}
            title={title}
            span=""
            description={description}
            isBgWhite
            isInCenter
            className="w-[100%] lg:w-[90%]"
          />
        </div>

        <div className="space-y-6 px-4 md:px-12 lg:px-[22%]">
          {faqs?.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="grid grid-cols-5 rounded-2xl border-[2px] border-[#000000]/20 p-[1rem] lg:p-[2rem]"
              >
                {/* Content */}
                <div className="col-span-4 space-y-4">
                  <h5>{faq.title}</h5>
                  {isOpen && <p>{faq.description}</p>}
                </div>

                {/* Toggle Button */}
                <div
                  onClick={() => toggleFAQ(idx)}
                  className="flex cursor-pointer justify-end"
                >
                  <span
                    className={`mb-auto w-fit rounded-full p-1 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#FB9100] text-white'
                        : 'border-[1px] border-black'
                    } `}
                  >
                    {isOpen ? (
                      <GrFormSubtract size={28} />
                    ) : (
                      <MdAdd size={28} />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default FAQ;

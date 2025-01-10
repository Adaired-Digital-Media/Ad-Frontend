'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from '@core/utils/class-names';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import parse from 'html-react-parser';
import { Icons } from '@web-components/Icons';

type StickyScrollProps = {
  colorScheme: string;
  data: {
    title: string;
    description: string;
    listItems: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
};

const StickyScroll = ({ colorScheme, data }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end start'],
  });

  const cardLength = data.listItems.length + 3;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = data.listItems.map(
      (_, index) => index / cardLength
    );
    const closesBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closesBreakpointIndex);
  });

  return (
    <section
      ref={ref}
      className={cn(
        `no-visible-scrollbar sticky h-fit overflow-y-auto bg-gray-100 lg:h-[37rem] lg:py-10`
      )}
    >
      <MaxWidthWrapper
        className={cn(
          `relative flex flex-col justify-between gap-5 lg:flex-row`
        )}
      >
        <div
          className={cn(
            `sticky top-0 w-full overflow-hidden py-5 lg:top-10 lg:h-60 lg:max-w-xl lg:py-0`
          )}
        >
          <h2
            className={cn(
              `font-nunito text-2xl font-semibold leading-snug lg:text-[38px]`
            )}
          >
            {data.title}
          </h2>
          <div>{parse(data.description)}</div>
        </div>

        <div className={cn(`div relative flex items-start px-4`)}>
          <div className={cn(`max-w-2xl space-y-10 lg:space-y-16`)}>
            {data.listItems.map((item, index) => (
              <div
                className="relative z-10 cursor-pointer rounded-sm shadow-2xl"
                key={item.title}
              >
                <div
                  className="border__before absolute left-2 top-2 z-[-1] h-full w-full rounded-lg border"
                  style={{
                    borderColor: colorScheme,
                  }}
                ></div>
                <motion.div
                  initial={{
                    color: '#000',
                  }}
                  animate={{
                    color: activeCard === index ? colorScheme : '#000',
                  }}
                  className={cn(
                    `space-y-3 rounded-sm bg-white py-5 pl-5 pr-5 md:pr-12`
                  )}
                >
                  <div className={cn(`flex items-center gap-4`)}>
                    <Icons.bulbIcon className={cn(`w-15 h-15 flex-shrink-0`)} />
                    <h2
                      className={cn(
                        `font-nunito text-lg font-semibold md:text-2xl`
                      )}
                    >
                      {item.title}
                    </h2>
                  </div>
                  <p
                    className="hyphens-auto text-justify text-base sm:hyphens-none sm:text-left sm:text-lg"
                    style={{ color: '#000' }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
            <div className={cn(`h-10`)} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default StickyScroll;

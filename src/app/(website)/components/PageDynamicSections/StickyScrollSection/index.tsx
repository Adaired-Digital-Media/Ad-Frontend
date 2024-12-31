"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn, hexToHexWithOpacity } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import parse from "html-react-parser";
import { Icons } from "@/components/Icons";

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
    offset: ["start start", "end start"],
  });

  const cardLength = data.listItems.length + 3;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
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
        `h-fit lg:h-[37rem] sticky overflow-y-auto bg-gray-100 no-visible-scrollbar lg:py-10`
      )}
    >
      <MaxWidthWrapper
        className={cn(
          `flex flex-col gap-5 justify-between relative lg:flex-row`
        )}
      >
        <div
          className={cn(
            `top-0 lg:h-60 w-full lg:max-w-xl sticky lg:top-10 py-5 lg:py-0 overflow-hidden`
          )}
        >
          <h2
            className={cn(
              `text-2xl lg:text-[38px] leading-snug font-semibold font-nunito `
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
                className="relative z-10 shadow-2xl rounded-sm cursor-pointer "
                key={item.title}
              >
                <div
                  className="absolute h-full w-full border z-[-1] top-2 left-2 rounded-lg border__before"
                  style={{
                    borderColor: colorScheme,
                  }}
                ></div>
                <motion.div
                  initial={{
                    color: "#000",
                  }}
                  animate={{
                    color: activeCard === index ? colorScheme : "#000",
                  }}
                  className={cn(
                    `bg-white py-5 pl-5 pr-5 md:pr-12 rounded-sm space-y-3 `
                  )}
                >
                  <div className={cn(`flex items-center gap-4`)}>
                    <Icons.bulbIcon className={cn(`w-15 h-15 flex-shrink-0`)} />
                    <h2
                      className={cn(
                        `text-lg md:text-2xl font-semibold font-nunito`
                      )}
                    >
                      {item.title}
                    </h2>
                  </div>
                  <p
                    className="text-justify hyphens-auto text-base sm:hyphens-none sm:text-left sm:text-lg "
                    style={{ color: "#000" }}
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

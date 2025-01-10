"use client";
import MaxWidthWrapper from "@web-components/MaxWidthWrapper";
import { cn,  } from "@core/utils/class-names";
import { hexToHexWithOpacity } from "@core/utils/hexToHexWithOpacity";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";

type GridSectionProps = {
  colorScheme: string;
  data: any;
};

const GridSection = ({ colorScheme, data }: GridSectionProps) => {
  const bgColor = hexToHexWithOpacity(colorScheme, 0.08);
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section
      className="grid_layout py-16"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <MaxWidthWrapper>
        <h2 className="text-2xl leading-snug lg:text-[38px]">{data.title}</h2>
        <p className="lg:w-5/6">{data.description}</p>
        <div
          className={cn(
            `grid grid-cols-1 md:grid-cols-2 py-10`,
            data.cardsLayout && data.cardsLayout === "3x3"
              ? "lg:grid-cols-3"
              : "lg:grid-cols-4"
          )}
        >
          {data.cards.map((card: any, idx: number) => (
            <div
              key={card?.title}
              className="relative group  block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-neutral-200 block  rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Card className="card">
                <Image src={card.image} alt={"Icon"} width={48} height={48} />
                <CardTitle className="relative after:absolute after:content-[''] after:left-0 after:-bottom-1.5 after:h-0.5 after:w-1/4 after:bg-[#d9d9d9] ">
                  {card.title}
                </CardTitle>
                <CardDescription>{parse(card.description)}</CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default GridSection;

export const Card = ({
  className,
  children,
  colorScheme,
}: {
  className?: string;
  children: React.ReactNode;
  colorScheme?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-5 overflow-hidden bg-white  group-hover:border-slate-700 relative z-20 shadow-xl card",
        className
      )}
      style={{
        border: `1px solid ${colorScheme}`
      }}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "font-poppins font-bold tracking-wide mt-4 text-lg ",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "text-[#515151] tracking-wide leading-relaxed text-sm mt-3",
        className
      )}
    >
      {children}
    </div>
  );
};

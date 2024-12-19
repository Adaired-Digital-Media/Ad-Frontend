'use client';
import { cn } from '../../utils/class-names';
import { hexToHexWithOpacity } from '../../utils/hexToHexWithOpacity';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Button from '@/app/(website)/components/Button';
import { useRouter } from 'nextjs-toploader/app';
import CldImage from '@/app/(website)/components/CloudinaryImageComponent';

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    list: string[];
    mainSvg: string;
    hoverSvg: string;
    accentColor?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {items.map((item, idx) => {
        const lightenedColor = hexToHexWithOpacity(item.accentColor || '', 0.7);
        return (
          <div
            key={item?.link}
            className="group relative block h-full w-full cursor-pointer px-2 py-2 sm:p-4"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => router.push(item.link)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute bottom-1 left-1 block h-[90%] w-[90%] dark:bg-slate-800/[0.8]"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 1.5 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.1 },
                  }}
                  style={{
                    backgroundColor: lightenedColor,
                  }}
                />
              )}
            </AnimatePresence>
            <Card
              className={`group flex max-h-[400px] min-h-[450px] flex-col items-center justify-center p-4 text-center`}
              style={{
                borderColor: item.accentColor,
              }}
            >
              <div>
                <CldImage
                  src={item.mainSvg}
                  alt="Service Image"
                  height={120}
                  width={120}
                />
              </div>
              <CardTitle className="sm:font-2xl font-nunito text-lg">
                {item.title}
              </CardTitle>
              <CardDescription className="mt-2 font-nunito text-base text-zinc-800">
                {item.description}
              </CardDescription>
              <div
                className="absolute bottom-5 right-0 h-5 w-5"
                style={{
                  backgroundColor: lightenedColor,
                }}
              />
              <div
                style={{
                  backgroundColor: item.accentColor,
                }}
                className="absolute bottom-0 right-0 h-5 w-5 transition-all duration-300 group-hover:h-full group-hover:w-full"
              >
                <div className="hidden p-4 text-left text-white group-hover:block xl:p-6">
                  <div>
                    <Image
                      src={item.hoverSvg}
                      alt="Service Image"
                      height={80}
                      width={80}
                      className="text-white"
                    />
                  </div>
                  <h3 className="py-1 font-nunito text-xl text-white xl:py-2">
                    {item.title}
                  </h3>
                  <ul className="list-disc pl-5 text-white marker:text-white">
                    {item.list.map((listItem, index) => {
                      return (
                        <li className="text-base text-white" key={index}>
                          {listItem}
                        </li>
                      );
                    })}
                  </ul>
                  <Button
                    title="View More"
                    className="bg-white text-black sm:mt-2 lg:mt-4"
                    svgClassName="bg-[#F89520] "
                    type="button"
                    navigateTo={item.link}
                  />
                </div>
              </div>
              <div
                className="absolute bottom-0 right-5 h-5 w-5"
                style={{
                  backgroundColor: lightenedColor,
                }}
              />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const Card = ({
  props,
  className,
  children,
  style,
}: {
  props?: any;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn(
        'relative z-20 h-full w-full overflow-hidden border p-4',
        className
      )}
      style={style}
      {...props}
    >
      {children}
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
    <h3 className={cn('mt-4 font-bold tracking-wide', className)}>
      {children}
    </h3>
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
    <p
      className={cn(
        'mt-8 text-sm leading-relaxed tracking-wide text-zinc-400',
        className
      )}
    >
      {children}
    </p>
  );
};

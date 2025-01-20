import React from 'react';
import { cn } from '@core/utils/class-names';
import { Icons } from '@web-components/Icons';

const Box = ({
  colorScheme,
  className,
  children,
  style,
}: {
  colorScheme?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-[4px] border-2 bg-white p-3',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

const Circle = ({
  className,
  children,
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn(
        'z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

interface CrossLayoutProps {
  data: {
    body: {
      point_1: string;
      point_2: string;
      point_3: string;
      point_4: string;
      colorScheme: string;
    };
  };
  colorScheme: string;
}

export function CrossLayout({ data, colorScheme }: CrossLayoutProps) {
  const body = data?.body;

  return (
    <>
      <div className="relative">
        <div className="flex justify-between pb-8">
          <Box
            className="box1 after:content=[''] basis-[45%] justify-end text-sm after:absolute after:-bottom-3 after:-right-12 after:z-[-1] after:h-0.5 after:w-14 after:rotate-[30deg] after:bg-[#000] xl:text-lg"
            colorScheme={colorScheme}
          >
            <p className="text-start">{body.point_1}</p>
            <Icons.PinkArrowMarker
              className={`ml-1 rotate-180`}
              style={{
                color: colorScheme,
              }}
            />
          </Box>
          <Box
            className="box2 after:content=[''] basis-[45%] justify-start text-sm after:absolute after:-bottom-3 after:-left-12 after:z-[-1] after:h-0.5 after:w-14 after:rotate-[-30deg] after:bg-[#000] xl:text-lg"
            colorScheme={colorScheme}
          >
            <Icons.PinkArrowMarker
              className="mr-1"
              style={{
                color: colorScheme,
              }}
            />
            <p className="text-start">{body.point_2}</p>
          </Box>
        </div>

        <Circle
          className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 xl:size-24"
          style={{
            backgroundColor: colorScheme,
            borderColor: colorScheme,
            color: 'white',
            transition: 'background-color 0.2s ease, color 0.2s ease',
          }}
        >
          <Icons.openai />
        </Circle>

        <div className="flex justify-between pt-8">
          <Box
            className="box3 after:content=[''] basis-[45%] justify-end text-sm after:absolute after:-right-12 after:-top-3 after:z-[-1] after:h-0.5 after:w-14 after:rotate-[-30deg] after:bg-[#000] xl:text-lg"
            colorScheme={colorScheme}
          >
            <p className="text-start">{body.point_3}</p>
            <Icons.PinkArrowMarker
              className="custom-hover ml-1 rotate-180"
              style={{
                color: colorScheme,
              }}
            />
          </Box>
          <Box
            className="box4 after:content=[''] basis-[45%] justify-start text-sm after:absolute after:-left-12 after:-top-3 after:z-[-1] after:h-0.5 after:w-14 after:rotate-[30deg] after:bg-[#000] xl:text-lg"
            colorScheme={colorScheme}
          >
            <Icons.PinkArrowMarker
              className="mr-1"
              style={{
                color: colorScheme,
              }}
            />
            <p className="text-start">{body.point_4}</p>
          </Box>
        </div>
      </div>
    </>
  );
}

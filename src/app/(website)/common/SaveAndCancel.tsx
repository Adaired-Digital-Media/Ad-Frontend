import { Button } from '@headlessui/react';
import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
export interface ISaveAndCancel {
  name: string;
  className?: string;
  is2ndButton?: boolean;
  isIcon?: boolean;
  isBgWhite?: boolean;
  is2BgWhite?: boolean;
  is2Icon?: boolean;
  button2Name?: string;
  isFullWidth?: boolean;
  handleClick?: () => void;
  handleClick2?: () => void;
}
const SaveAndCancel = ({
  name,
  className,
  is2ndButton,
  isIcon,
  isBgWhite,
  is2BgWhite,
  is2Icon,
  button2Name,
  isFullWidth,
  handleClick,
  handleClick2,
}: ISaveAndCancel) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className={`${className} flex gap-2 lg:gap-4`}>
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={handleClick}
        className={`font-Outfi flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[60px] py-[0.75rem] text-xxs font-normal transition-all duration-300 ease-out active:scale-95 xl:text-xs 1366:text-[14px] 1400:text-[14px] 1470:text-[14px] 1600:text-[18px] 1680:text-[18px] ${
          isBgWhite
            ? isHover
              ? 'border border-[#FB9100] bg-[#FB9100] text-white'
              : 'border border-[#111111] bg-white text-[#111111]'
            : isHover
              ? 'bg-[#D17900] text-white'
              : 'bg-[#FB9100] text-white'
        } ${isFullWidth ? 'md:w-full' : 'md:w-[180px] xl:w-[220px]'} `}
      >
        {name}
        {isIcon && (
          <IoIosArrowRoundForward
            size={25}
            className={`${isHover ? 'rotate-[360deg] transition-all duration-300 ease-out active:scale-95' : 'rotate-[310deg]'}`}
          />
        )}
      </button>
      {is2ndButton && (
        <button
          onClick={handleClick2}
          className={`font-Outfi 1440:text-[14px] group flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[60px] py-[0.75rem] text-xxs font-normal transition-all duration-300 ease-out active:scale-95 xl:text-xs 1366:text-[14px] 1470:text-[14px] 1600:text-[18px] 1680:text-[18px] ${isFullWidth ? 'md:w-full' : 'md:w-[180px] xl:w-[220px]'} ${
            is2BgWhite
              ? 'border border-[#111111] bg-white text-[#111111] hover:bg-[#1A5A96] hover:text-white'
              : 'bg-[#FB9100] text-white hover:bg-[#1A5A96]'
          } `}
        >
          {button2Name}

          {is2Icon && (
            <IoIosArrowRoundForward
              size={25}
              className="rotate-[310deg] transition-transform duration-300 group-hover:rotate-[360deg]"
            />
          )}
        </button>
      )}
    </div>
  );
};

export default SaveAndCancel;

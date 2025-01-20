import React from 'react';
import Skype from '@core/components/icons/skype';
import { cn } from '@/@core/utils/class-names';
import Link from 'next/link';
type Props = {
  skypeID?: string;
  className?: string;
  buttonClassName?: string;
};

const SkypeFloatingIcon = ({
  skypeID = 'skype:live:.cid.46cf67c456a5bb0c?chat',
  className,
  buttonClassName,
}: Props) => {
  return (
    <Link href={skypeID} target="_blank" className="relative">
      <div
        className={cn(
          `w-15 h-15 after:animate-skypeFloatingPulse fixed bottom-5 left-5 z-[9998] flex cursor-pointer select-none items-center justify-center rounded-full bg-[#00AFF0] shadow-lg after:absolute after:h-[55px] after:w-[55px] after:rounded-full after:border-inherit after:shadow-lg after:content-[''] ${className}`
        )}
        aria-hidden="true"
      >
        <Skype
          className={cn(
            `h-[55px] w-[55px] p-[0.2rem] text-white ${buttonClassName}`
          )}
        />
      </div>
    </Link>
  );
};

export default SkypeFloatingIcon;

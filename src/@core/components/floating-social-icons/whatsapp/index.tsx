import React from 'react';
import Whatsapp from '@core/components/icons/whatsapp';
import { cn } from '@/@core/utils/class-names';
import Link from 'next/link';
type Props = {
  phoneNumber?: string;
  className?: string;
  buttonClassName?: string;
};

const WhatsappFloatingIcon = ({
  phoneNumber = '1234567890',
  className,
  buttonClassName,
}: Props) => {
  return (
    <Link
      href={`https://api.whatsapp.com/send/?phone=${phoneNumber}`}
      target="_blank"
      className="relative  z-[99999]"
    >
      <div
        className={cn(
          `scale-[0.85] sm:scale-100 w-15 h-15 after:shadow-[0 0 0 0 rgba(37, 211, 101, 0)] after:animate-whatsappFloatingPulse fixed bottom-2.5 left-5 z-[9998] flex cursor-pointer select-none items-center justify-center rounded-full bg-[#25d366] shadow-lg after:absolute after:h-[55px] after:w-[55px] after:rounded-full after:border-inherit after:content-[''] ${className}`
        )}
        aria-hidden="true"
      >
        <Whatsapp
          fill="#fff"
          className={cn(`width-[55px] h-[55px] p-[0.5rem] ${buttonClassName}`)}
        />
      </div>
    </Link>
  );
};

export default WhatsappFloatingIcon;

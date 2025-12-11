import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';

const Button = ({ name,className }: any) => {
  return (
    <Link
      href="/contact"
      className={`${className} gap- relative my-auto flex w-fit rounded-[60px] bg-custom-gradient py-[11px] pl-[28px] pr-[20px] font-nunito text-xs font-normal text-[#FFFFFF]`}
    >
      <p className="my-auto">{name}</p>
      <IoIosArrowRoundForward
        size={30}
        className="my-auto transform"
        style={{ transform: 'rotate(310deg)' }}
      />
    </Link>
  );
};

export default Button;

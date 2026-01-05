'use client';

import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useState } from 'react';

/* --------------------
   Button animation hook
-------------------- */
export const useButtonAnimation = () => {
  const [hovered, setHovered] = useState(false);

  return {
    handlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
    textClass:
      'transition-transform duration-300 ease-out group-hover:translate-x-1',
    iconClass:
      'transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:rotate-[360deg]',
  };
};

/* --------------------
   Button component
-------------------- */
export interface IButton {
  href?: string;
  name: string;
  className?: string;
  width?: boolean;
  onClick?: () => void;
}

const Button = ({
  href,
  name,
  className = '',
  width = false,
  onClick,
}: IButton) => {
  const anim = useButtonAnimation();

  const baseClass = `group relative flex ${
    width ? 'w-full' : 'w-fit'
  } items-center justify-center gap-2
  overflow-hidden rounded-[60px]
  bg-custom-gradient px-[28px] py-[0.75rem]
  font- text-xs font-normal text-white
  transition-transform duration-200 active:scale-95

  /* TOP BORDER (left → right) */
  before:absolute before:top-0 before:left-0
  before:h-[2px] before:w-0x
  before:bg-yellow-400
  before:transition-all before:duration-500
  group-hover:before:w-full

  /* BOTTOM BORDER (right → left) */
  after:absolute after:bottom-0 after:right-0
  after:h-[2px] after:w-0
  after:bg-yellow-400
  after:transition-all after:duration-500
  group-hover:after:w-full

  ${className}`;

  const content = (
    <>
      <span className={`text-[14px] md:text-xs ${anim.textClass}`}>{name}</span>
      <IoIosArrowRoundForward
        size={25}
        className={`rotate-[310deg] ${anim.iconClass}`}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClass} {...anim.handlers}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass} {...anim.handlers}>
      {content}
    </button>
  );
};

export default Button;

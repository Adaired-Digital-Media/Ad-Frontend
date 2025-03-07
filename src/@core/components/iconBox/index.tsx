'use client';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '../../utils/class-names';
import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import { Button } from 'rizzui';
import { useRouter } from 'nextjs-toploader/app';
import CldImage from '@/app/(website)/components/CloudinaryImageComponent';

interface IIconBox {
  boxLink?: string;
  icon: string;
  isSvg?: boolean;
  isFromCloudinary?: boolean;
  iconContainerClassName?: string;
  iconClassName?: string;
  title: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  buttonText?: string;
  buttonLink?: string;
  target?: string;
  buttonClassName?: string;
  containerClassName?: string;
  onClick?: () => void;
}

const IconBox: FC<IIconBox> = ({
  boxLink,
  icon,
  isSvg,
  isFromCloudinary,
  iconContainerClassName,
  iconClassName,
  title,
  titleClassName,
  description,
  descriptionClassName,
  buttonText,
  buttonLink,
  target,
  buttonClassName,
  containerClassName,
  onClick,
  ...rest
}) => {
  const router = useRouter();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push(boxLink ?? '');
  };
  return (
    <>
      <div
        role="button"
        onClick={boxLink ? handleClick : undefined}
        className={cn(`${containerClassName}`)}
        {...rest}
      >
        <div className={cn(`inline-block ${iconContainerClassName}`)}>
          {isFromCloudinary ? (
            <CldImage
              format={isSvg ? 'svg' : undefined}
              src={icon}
              alt="icon"
              height={32}
              width={32}
              className={cn(`min-w-[50px] min-h-[50px] h-full w-full shrink-0 ${iconClassName}`)}
            />
          ) : isSvg ? (
            <Image
              src={icon}
              alt="icon"
              height={32}
              width={32}
              className={cn(`min-w-[50px] min-h-[50px] h-full w-full shrink-0 ${iconClassName}`)}
            />
          ) : (
            <Icon
              icon={icon}
              className={cn(`h-full w-full shrink-0 ${iconClassName}`)}
            />
          )}
        </div>
        <div>
          <h3 className={cn(`${titleClassName}`)}>{title}</h3>
          {description && (
            <p className={cn(`${descriptionClassName}`)}>{description}</p>
          )}
          {buttonText && (
            <Link href={buttonLink || ''} target={target}>
              <Button className={cn(`${buttonClassName}`)} type="button">
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default IconBox;

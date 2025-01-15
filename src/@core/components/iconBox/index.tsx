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
}) => {
  const router = useRouter();
  return (
    <>
      <div
        role="button"
        onClick={() => router.push(boxLink || '')}
        className={cn(`${containerClassName}`)}
      >
        <div className={cn(`inline-block ${iconContainerClassName}`)}>
          {isFromCloudinary ? (
            <CldImage
              format={isSvg ? 'svg' : undefined}
              src={icon}
              alt="icon"
              height={32}
              width={32}
              className={cn(`h-full w-full ${iconClassName}`)}
            />
          ) : isSvg ? (
            <Image
              src={icon}
              alt="icon"
              height={32}
              width={32}
              className={cn(`h-full w-full ${iconClassName}`)}
            />
          ) : (
            <Icon
              icon={icon}
              className={cn(`h-full w-full ${iconClassName}`)}
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

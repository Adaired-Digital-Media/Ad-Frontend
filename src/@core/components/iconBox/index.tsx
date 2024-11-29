"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@core/utils/class-names";
import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { Button } from "rizzui";

interface IIconBox {
  icon: string;
  isSvg?: boolean;
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
  icon,
  isSvg,
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
  return (
    <>
      <div className={cn(`${containerClassName}`)}>
        <div className={cn(`inline-block ${iconContainerClassName}`)}>
          {isSvg ? (
            <Image
              src={icon}
              alt={"icon"}
              height={32}
              width={32}
              className={cn(`w-full h-full ${iconClassName} `)}
            />
          ) : (
            <Icon
              icon={icon}
              className={cn(`w-full h-full ${iconClassName}`)}
            />
          )}
        </div>
        <div>
          <h3 className={cn(`${titleClassName}`)}>{title}</h3>
          {description && (
            <p className={cn(`${descriptionClassName}`)}>{description}</p>
          )}
          {buttonText && (
            <Link href={buttonLink || ""} target={target}>
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

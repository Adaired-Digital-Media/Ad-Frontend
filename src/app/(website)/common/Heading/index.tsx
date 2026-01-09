import Image from 'next/image';
import React from 'react';
import star from '../../../../../public/assets/icons/star.png';
import blue_star from '../../../../../public/assets/icons/blue_star.png';

export interface IHeading {
  subTitle: String;
  title: String;
  span: String;
  isH1?: boolean;
  description?: String;
  isInCenter?: boolean;
  isVarticle?: boolean;
  isBgWhite?: boolean;
  className?: string;
  isDecVarticle?: boolean;
  description2?: string;
  isPara2?: boolean;
}
const Heading = ({
  subTitle,
  title,
  span,
  description,
  isInCenter,
  isVarticle,
  isBgWhite,
  className,
  isH1,
  isDecVarticle,
  description2,
  isPara2,
}: IHeading) => {
  return (
    <div className={className}>
      {isInCenter ? (
        <div className="">
          <div className="md:flex` w- block gap-3">
            <div className="flex justify-center">
              <div
                className={` ${isBgWhite ? 'border-[#000000]/50 bg-[#FFFFFF]' : 'border-[#FFFFFF]/50 bg-transparent'} flex w-fit justify-center gap-3 rounded-full border-[0.71px] px-[1rem] py-[0.25rem]`}
              >
                <Image
                  src={star}
                  width={18}
                  height={17}
                  alt=""
                  className="mb-auto"
                />
                <span
                  className={`my-auto font-montserrat text-[10px] font-normal uppercase lg:text-[14px] ${isBgWhite ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}
                >
                  {subTitle}
                </span>
                {/* <div className="mb-auto mt-3 h-0.5 w-24 bg-[#D7EBFF]"></div> */}
              </div>
            </div>
            <div className="mt-[1px] md:mt-[15px]">
              {isH1 ? (
                <h1
                  className={`capitalize ${isBgWhite ? 'text-[#111111]' : 'text-[#FFFFFF]'} text-center`}
                >
                  {title} <br></br>
                  {span}
                </h1>
              ) : (
                <h2
                  className={`capitalize ${isBgWhite ? 'text-[#111111]' : 'text-[#FFFFFF]'} text-center`}
                >
                  {title} <br></br>
                  {span}
                </h2>
              )}
            </div>
          </div>
          <div className="px-0 lg:px-[20%]">
            <p
              className={`${isBgWhite ? 'text-[#000000]' : 'text-[#FFFFFF]'} py-4 text-center`}
            >
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`${isDecVarticle && 'grid grid-cols-1 lg:grid-cols-2 lg:gap-[10rem]'}`}
        >
          <div className="md:flex` block w-fit gap-3">
            <div className="flex w-fit gap-3 rounded-full border-[0.71px] border-[#000000]/20 px-[1rem] py-[0.25rem]">
              <Image
                src={star}
                width={18}
                height={17}
                alt=""
                className="mb-auto"
              />
              <span className="my-auto font-montserrat text-[10px] font-normal uppercase text-[#000000] lg:text-[14px]">
                {subTitle}
              </span>
              {/* <div className="mb-auto mt-3 h-0.5 w-24 bg-[#D7EBFF]"></div> */}
            </div>
            <div className="mt-[0.8rem] md:mt-[8px] lg:mt-[0.5rem]">
              {isH1 ? (
                <h1 className='capitalize'>
                  {title} <br></br>
                  {span}
                </h1>
              ) : (
                <h2 className="capitalize">
                  {title} <br></br>
                  {span}
                </h2>
              )}
            </div>
          </div>
          <div className={`${isDecVarticle && 'pt-[1rem]'}`}>
            <p className="pt-4">{description}</p>
            {isPara2 && <p className="py-4">{description2}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Heading;

import Image from 'next/image';
import React from 'react';
import star from '../../../../../public/assets/icons/star.png';
export interface IHeading {
  subTitle: String;
  title: String;
  span: String;
  description: String;
  isStyped?: boolean;
  isVarticle?: boolean;
  isBgWhite?: boolean;
}
const Heading = ({
  subTitle,
  title,
  span,
  description,
  isStyped,
  isVarticle,
  isBgWhite,
}: IHeading) => {
  return (
    <div className=" ">
      {isStyped ? (
        <div>
          <div
            className={`flex w-fit items-center gap-3 ${isBgWhite ? 'text-black' : 'text-white'} ${
              isVarticle ? 'mx-auto' : ''
            }`}
          >
            <Image
              src={star}
              width={18}
              height={17}
              alt=""
              className="mb-auto mt-1"
            />
            <p className="font-nunito text-xs">{subTitle}</p>
            <div className="my-auto h-0.5 w-24 bg-[#D7EBFF]"></div>
          </div>

          {isVarticle ? (
            <div
              className={`px-[15%] text-center ${isBgWhite ? 'text-black' : 'text-white'} `}
            >
              <p className="pt-4 font-nunito text-lg2 font-medium">
                {title} <br />
                {span}
              </p>
              <p
                className={`py-3 font-nunito text-sm ${isBgWhite ? 'text-black' : 'text-white'} `}
              >
                {description}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">
              <div
                className={`col-span-2 w-[60%] leading-[60px] ${isBgWhite ? 'text-black' : 'text-white'} `}
              >
                <p className="pt-4 font-nunito text-lg2 font-medium">
                  {title} <br />
                  {span}
                </p>
              </div>
              <p className="py-3 font-nunito text-sm text-white">
                {description}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex w-fit gap-3">
            <Image
              src={star}
              width={18}
              height={17}
              alt=""
              className="mb-auto mt-1"
            />
            <p> {subTitle}</p>
            <div className="mb-auto mt-3 h-0.5 w-24 bg-[#D7EBFF]"></div>
            <div className="mt-[-20px] leading-[60px]">
              <p className="font-nunito text-lg2 font-medium text-black">
                {title} <br></br>
                {span}
              </p>
            </div>
          </div>
          <p className="hyphens-auto py-3 text-justify font-nunito text-base sm:text-lg">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Heading;

"use client";
import { cn } from "@core/utils/class-names";
import Link from "next/link";
import React from "react";
import { Icons } from "@web-components/Icons";
import { hexToHexWithOpacity } from "@core/utils/hexToHexWithOpacity";

type CTAProps = {
  colorScheme: string;
  title: string;
};

const CTA = ({ colorScheme, title }: CTAProps) => {
  const bg_overlay = hexToHexWithOpacity(colorScheme, 0.72);

  return (
    <section
      className={cn(
        `bg-[url('https://res.cloudinary.com/adaired/image/upload/f_auto,q_auto/v1/Static%20Website%20Images/CTA-image')] bg-no-repeat bg-cover flex justify-center items-center relative min-h-[200px] md:min-h-[307px] min-w-full rounded-[30px]`
      )}
    >
      <div
        className="cta_overlay absolute w-full h-full rounded-[30px]"
        style={{
          backgroundColor: bg_overlay,
        }}
      ></div>
      <div className="z-10 flex items-center justify-center flex-col space-y-7 p-5 text-center">
        <h2
          className={cn(
            `leading-snug font-nunito font-extrabold text-3xl md:text-4xl xl:text-5xl text-white capitalize`
          )}
        >
          {title}
        </h2>

        <Link
          href={"tel:+918907200008"}
          className="bg-white flex justify-start items-center gap-3 min-w-[262px] px-4 py-3 rounded-2xl"
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.3"
              y="0.3"
              width="51.4"
              height="51.4"
              rx="25.7"
              stroke="#CACACA"
              strokeWidth="0.6"
            />
            <path
              d="M30.75 21.2493L37.0833 14.9159M37.0833 14.9159V19.6659M37.0833 14.9159H32.3333"
              stroke={colorScheme}
              fill={colorScheme}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31.6301 30.0343L30.9097 30.7943C30.9097 30.7943 29.1949 32.5977 24.5162 27.672C19.8374 22.7462 21.5522 20.9428 21.5522 20.9428L22.0066 20.4631C23.1244 19.2851 23.2305 17.3946 22.2536 16.0139L20.2586 13.1908C19.0489 11.4808 16.7135 11.256 15.3281 12.7143L12.8439 15.3283C12.1583 16.0519 11.6991 16.9877 11.7545 18.0279C11.897 20.6879 13.0339 26.4085 19.3735 33.0854C26.0979 40.1629 32.4075 40.4447 34.9868 40.1898C35.8038 40.1107 36.5131 39.6689 37.0847 39.0672L39.333 36.6986C40.853 35.0994 40.4255 32.3602 38.4812 31.2424L35.457 29.5008C34.1809 28.7677 32.6276 28.983 31.6301 30.0327V30.0343Z"
              fill="#060606"
            />
          </svg>
          <div>
            <span className="block text-sm font-nunito">For More Information</span>
            <span
              className="block text-lg lg:text-xl xl:text-[26px] font-bold font-nunito"
              style={{
                color: colorScheme,
              }}
            >
              Book A Call
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CTA;

"use client";
import React from "react";
import Image from "next/image";
import MaxWidthWrapper from "@web-components/MaxWidthWrapper";
import { cn } from "@core/utils/class-names";
type ImageWithIconboxProps = {
  colorScheme: string;
  data: any;
};

const ImageWithIconbox = ({ colorScheme, data }: ImageWithIconboxProps) => {
  const bgColor = data.bgColor;
  return (
    <section
      className={`ImageWithIconbox py-20`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <MaxWidthWrapper
        className={cn(
          `flex gap-10 flex-col lg:flex-row  ${
            data.layout === "leftImage" && "flex-row-reverse"
          }`
        )}
      >
        <div className="w-full lg:w-1/2 space-y-3">
          <h2
            className={`text-2xl lg:text-[38px] leading-snug font-nunito font-semibold`}
          >
            {data.title}
          </h2>
          <div className="space-y-6">
            {data.cards.map((card: any) => (
              <div key={card.title} className="flex items-center gap-5">
                <div>
                  <Image src={card.image} alt="alt" width={66} height={66} />
                </div>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-full grid place-items-center">
            <Image src={data.imgUrl} alt="alt" width={642} height={550} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ImageWithIconbox;

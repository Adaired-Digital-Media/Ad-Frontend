"use client";
import React, { CSSProperties } from "react";
import Image from "next/image";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";
import Button from "@web-components/Button";


type ImageWithDetailedFeatureDescriptionProps = {
  colorScheme: string;
  data: {
    layout: string;
    imgUrl: string;
    title: string;
    description: string;
    buttonInnerText: string;
    buttonLink: string;
  };
};

const ImageWithDetailedFeatureDescription = ({
  data,
  colorScheme,
}: ImageWithDetailedFeatureDescriptionProps) => {

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.name === "ul"
      ) {
        const children = Array.from(domNode.children) as DOMNode[];
        return (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domToReact(children, options)}
          </ul>
        );
      }
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.name === "li"
      ) {
        const children = Array.from(domNode.children) as DOMNode[];
        return (
          <li className="flex gap-2 items-center">
            {/* <Icons.rightIcon fill={colorScheme} className="icon_right" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ "--dynamic-color": colorScheme } as CSSProperties}
            >
              <path
                d="M15.4 11.199C16.2 10.599 16.2 9.39801 15.4 8.79801L9.398 4.30201C8.409 3.56201 6.998 4.26701 6.998 5.50201L6.998 14.497C6.998 15.733 8.41 16.438 9.398 15.697L15.4 11.199Z"
                // fill="var(--dynamic-color)"
                fill={colorScheme}
              />

              <rect
                x="3"
                y="4"
                width="2"
                height="12"
                rx="1"
                fill="currentColor"
              />
            </svg>

            {domToReact(children, options)}
          </li>
        );
      }
    },
  };

  return (
    <div
      className={`flex gap-10 flex-col lg:flex-row ${
        data.layout === "rightImage" && "flex-row-reverse"
      }`}
    >
      <div className="w-full lg:w-1/2">
        <div className="w-full grid place-items-center">
          <Image src={data.imgUrl} alt="alt" width={676} height={521} />
        </div>
      </div>
      <div className="w-full lg:w-1/2 space-y-3">
        <h2
          className={`text-2xl lg:text-[38px] leading-snug font-nunito font-semibold`}
        >
          {data.title}
        </h2>
        <div className="space-y-4 font-nunito text-lg">{parse(data.description, options)}</div>
        <div>
          <Button
            title={data.buttonInnerText}
            className="bg-white hover:bg-white border border-gray-200"
            svgClassName="bg-[#F89520]"
            type="button"
            navigateTo={data.buttonLink || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageWithDetailedFeatureDescription;

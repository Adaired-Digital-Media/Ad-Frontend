import React from "react";
import Image from "next/image";
import { hexToHexWithOpacity } from "@core/utils/hexToHexWithOpacity";
import parse from "html-react-parser";
import CldImage from "../../CloudinaryImageComponent";

type TwoColumnFeatureSectionProps = {
  colorScheme: string;
  data: any;
};

const TwoColumnFeatureSection: React.FC<TwoColumnFeatureSectionProps> = ({
  colorScheme,
  data,
}) => {
  const color = hexToHexWithOpacity(colorScheme, 0.04);
  const underLineColor = hexToHexWithOpacity(colorScheme, 0.15);
  const body = data.body;

  return (
    <div className="space-y-3">
      <h2
        className={`text-2xl md:text-[38px] leading-snug font-nunito font-semibold `}
      >
        {body.title}
      </h2>
      <div className="text-justify hyphens-auto text-base sm:hyphens-none sm:text-left sm:text-lg space-y-3 font-nunito">
        {parse(body.description_1)}
      </div>
      <div
        className={`flex-1 flex flex-col md:flex-row items-stretch gap-5 lg:gap-14 py-3`}
      >
        {body.featuredSection.map((section: any) => {
          return (
            <div key={section.title}>
              <FeatureCard
                title={section.title}
                description={section.description}
                color={color}
                colorScheme={colorScheme}
                underLineColor={underLineColor}
              />
            </div>
          );
        })}
      </div>

      <div className="text-justify hyphens-auto text-base sm:hyphens-none sm:text-left sm:text-lg space-y-3">
        {parse(body.description_2)}
      </div>
      <CldImage src={body.imgUrl} alt="alt" width={965} height={477}  />
    </div>
  );
};

export default TwoColumnFeatureSection;

type FeatureCardProps = {
  title: string;
  description: string;
  color: string;
  colorScheme: string;
  underLineColor: string;
};

const FeatureCard = ({
  title,
  description,
  color,
  colorScheme,
  underLineColor,
}: FeatureCardProps) => {
  return (
    <div
      className="border border-dashed rounded-lg p-4 flex gap-4 flex-col sm:flex-row justify-center shadow-lg h-full w-full"
      style={{
        backgroundColor: color,
        borderColor: colorScheme,
      }}
    >
      <div className="flex-shrink-0">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="57"
            height="57"
            rx="4.5"
            stroke={colorScheme}
            strokeOpacity="0.15"
          />
          <g clipPath="url(#clip0_1204_7167)">
            <path
              d="M15.5701 44.7814C14.9508 44.6573 14.382 44.3527 13.9354 43.9059C13.4889 43.4591 13.1846 42.8902 13.0608 42.2707C12.9588 41.7551 12.9854 41.2222 13.1383 40.7193C13.2912 40.2164 13.5656 39.7589 13.9373 39.3872C14.3089 39.0155 14.7665 38.7411 15.2694 38.5882C15.7723 38.4354 16.3051 38.4088 16.8208 38.5107C17.44 38.6347 18.0086 38.9392 18.4552 39.3857C18.9017 39.8322 19.2061 40.4009 19.3301 41.0201C19.4321 41.5357 19.4055 42.0685 19.2526 42.5715C19.0997 43.0744 18.8253 43.5319 18.4537 43.9036C18.082 44.2753 17.6245 44.5497 17.1215 44.7025C16.6186 44.8554 16.0858 44.8834 15.5701 44.7814ZM41.1808 19.2254C40.5616 19.1014 39.9929 18.797 39.5464 18.3504C39.0999 17.9039 38.7955 17.3352 38.6715 16.7161C38.5695 16.2004 38.5961 15.6676 38.749 15.1646C38.9018 14.6617 39.1762 14.2042 39.5479 13.8325C39.9196 13.4608 40.3771 13.1864 40.8801 13.0336C41.383 12.8807 41.9158 12.8541 42.4315 12.9561C43.0507 13.0801 43.6193 13.3845 44.0658 13.831C44.5124 14.2775 44.8168 14.8462 44.9408 15.4654C45.0428 15.981 45.0161 16.5139 44.8633 17.0168C44.7104 17.5197 44.436 17.9772 44.0643 18.3489C43.6926 18.7206 43.2351 18.995 42.7322 19.1479C42.2293 19.3007 41.6964 19.3274 41.1808 19.2254ZM29.0288 20.8814C30.5581 20.8814 31.9875 21.3134 33.2021 22.0587L36.6488 18.6121C34.1879 16.7826 31.1512 15.8991 28.0929 16.1229C25.0347 16.3467 22.1589 17.6629 19.9906 19.8312C17.8223 21.9995 16.5061 24.8753 16.2823 27.9335C16.0585 30.9918 16.942 34.0285 18.7715 36.4894L22.2195 33.0414C21.4776 31.8309 21.0718 30.4446 21.0439 29.0252C21.016 27.6058 21.3669 26.2046 22.0605 24.9659C22.7542 23.7272 23.7655 22.6957 24.9903 21.9778C26.2151 21.2599 27.6091 20.8814 29.0288 20.8814ZM35.8381 24.6947C36.7754 26.2243 37.1704 28.0249 36.9595 29.8064C36.7486 31.5878 35.9441 33.2464 34.6756 34.5149C33.4072 35.7834 31.7486 36.5879 29.9671 36.7988C28.1856 37.0096 26.3851 36.6146 24.8555 35.6774L21.4075 39.1241C23.8683 40.9536 26.9051 41.837 29.9633 41.6132C33.0216 41.3894 35.8973 40.0732 38.0656 37.9049C40.2339 35.7366 41.5501 32.8608 41.7739 29.8026C41.9978 26.7443 41.1143 23.7076 39.2848 21.2467L35.8381 24.6947Z"
              fill={colorScheme}
            />
          </g>
          <defs>
            <clipPath id="clip0_1204_7167">
              <rect
                width="32"
                height="32"
                fill="white"
                transform="translate(13 12.8682)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div>
        <div className="pb-1">
          <h3 className="text-xl font-bold font-nunito">{title}</h3>
          <div
            className="h-0.5 w-16 "
            style={{
              background: underLineColor,
            }}
          ></div>
        </div>
        <p className="text-gray-600 font-nunito text-base">{description}</p>
      </div>
    </div>
  );
};

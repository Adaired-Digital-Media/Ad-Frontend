import React from "react";
import { CrossLayout } from "./CrossLayout";
import parse from "html-react-parser";

type KeyFeatureCrossLayoutProps = {
  colorScheme: string;
  data: any;
};

const KeyFeatureCrossLayout = ({
  data,
  colorScheme,
}: KeyFeatureCrossLayoutProps) => {
  const body = data?.body;

  return (
    <div className="space-y-3">
      <h2 className={`text-2xl md:text-[38px] leading-snug font-nunito font-semibold `}>{body.title}</h2>
      <div className="text-justify hyphens-auto text-base sm:hyphens-none sm:text-left sm:text-lg space-y-3">
        {parse(body.description)}
      </div>
      <div className="pt-5">
        <CrossLayout data={data} colorScheme={colorScheme} />
      </div>
    </div>
  );
};

export default KeyFeatureCrossLayout;

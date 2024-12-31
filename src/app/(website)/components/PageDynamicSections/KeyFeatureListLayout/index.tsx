import React from "react";
import parse from "html-react-parser";
import { Icons } from "@web-components/Icons";

type KeyFeatureListLayoutProps = {
  colorScheme: string;
  data: any;
};

const KeyFeatureListLayout = ({
  data,
  colorScheme,
}: KeyFeatureListLayoutProps) => {
  return (
    <section className="space-y-3">
      <h2 className={`text-2xl md:text-[38px] leading-snug font-nunito font-semibold `}>
        {data.title}
      </h2>
      <div className="text-justify hyphens-auto text-base sm:hyphens-none sm:text-left sm:text-lg space-y-3">
        {parse(data.description)}
      </div>
      <div className="grid grid-cols-4 gap-6 ">
        {data.listItems.map((item: any) => (
          <div
            key={item.item}
            className="flex items-center gap-2 bg-[#f6f6f6] rounded-md p-2"
          >
            <Icons.PinkArrowMarker />
            {item.item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatureListLayout;

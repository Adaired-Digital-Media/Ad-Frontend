"use client";
import { cn,  } from "@core/utils/class-names";
import { hexToHexWithOpacity } from "@core/utils/hexToHexWithOpacity";
import React, { useState } from "react";
import Switch from "@core/ui/shadcn-ui/big-switch";

type ProcessSectionProps = {
  colorScheme: string;
  data: {
    title: string;
    description: string;
    onboarding: {
      step: string;
      description: string;
    }[];
    implementation: {
      step: string;
      description: string;
    }[];
  };
};

const ProcessSection = ({
  colorScheme = "#ccc",
  data,
}: ProcessSectionProps) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const bgColor = hexToHexWithOpacity(colorScheme, 0.08);

  const renderSteps = (steps: { step: string; description: string }[]) => {
    return steps.map((stepData, index) => (
      <div key={index} className="flex">
        <h4
          className={cn(
            `-mr-9 -mt-5 text-5xl transition duration-500  ${
              isOn ? "translate-x-28 translate-y-32" : ""
            }`
          )}
        >
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </h4>
        <div
          className={cn(
            `relative h-64 w-64 overflow-hidden bg-white rounded-full outline-offset-4 outline-dashed outline-1 border p-2 flex justify-center items-center group/modal-btn`
          )}
        >
          <div
            className={cn(
              `${
                isOn ? "translate-x-80" : ""
              } text-center transition duration-500`
            )}
          >
            <h4 className="text-lg font-bold font-nunito">{stepData.step}</h4>
            <p className="text-base leading-5">{stepData.description}</p>
          </div>
          <div
            className={cn(
              `-translate-x-80 ${
                isOn ? "translate-x-0" : ""
              } text-center absolute p-7 transition duration-500`
            )}
          >
            <h4 className="text-lg font-bold font-nunito">{stepData.step}</h4>
            <p className="text-base leading-5">{stepData.description}</p>
          </div>
        </div>
        <h4
          className={cn(
            `-mr-9 -mt-5 text-5xl transition duration-500 -z-10 ${
              !isOn ? "-translate-x-28 translate-y-32" : ""
            }`
          )}
        >
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </h4>
      </div>
    ));
  };

  return (
    <section
      className={cn(`rounded-[50px] text-center px-20 pt-8 pb-28`)}
      style={{
        background: bgColor,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="capitalize inline-flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full dot"
            style={{
              background: colorScheme,
            }}
          ></div>
          <p>How we work</p> 
          <div
            className="h-2 w-2 rounded-full dot"
            style={{
              background: colorScheme,
            }}
          ></div>
        </div>
        <h2 className="text-2xl lg:text-[38px] font-nunito leading-snug">
          {data.title}
        </h2>
        <div
          className="max-w-4xl "
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
      <div className={cn(`inline-flex gap-8 items-center`)}>
        <h3>Onboarding</h3>
        <Switch
          isOn={isOn}
          toggleSwitch={toggleSwitch}
          colorScheme={colorScheme}
        />
        <h3>Implementation</h3>
      </div>
      <div className={cn(`flex gap-10 justify-center pt-10`)}>
        {isOn ? renderSteps(data.implementation) : renderSteps(data.onboarding)}
      </div>
    </section>
  );
};

export default ProcessSection;

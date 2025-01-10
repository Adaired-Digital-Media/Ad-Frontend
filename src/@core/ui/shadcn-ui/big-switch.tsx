import React from "react";

interface SwitchProps {
  colorScheme: string;
  isOn: boolean;
  toggleSwitch: () => void;
}

const Switch: React.FC<SwitchProps> = ({ colorScheme, isOn, toggleSwitch }) => {
  return (
    <div
      className={`bg-gray-300 relative w-40 h-12 rounded-full cursor-pointer transition-colors duration-500 `}
      style={{
        background: isOn ? colorScheme : "#515151",
      }}
      onClick={toggleSwitch}
    >
      <div
        className={`absolute top-1.5 left-1.5 w-9 h-9 bg-white rounded-full transition-transform duration-500 ${
          isOn ? "transform translate-x-28" : ""
        }`}
      ></div>
    </div>
  );
};

export default Switch;

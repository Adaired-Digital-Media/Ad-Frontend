import React from 'react';
export interface InputFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  label?: string;
}
export const star = {
  value: '*',
};
const InputField = ({
  name,
  value,
  handleChange,
  placeholder,
  className,
  maxLength,
  label,
}: InputFieldProps) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      className={`${className} w-full rounded-[0.5rem] border-none bg-[#F8F8F8] px-4 py-3 text-xxs xl:text-xs font-normal text-[#000000] outline-none placeholder:text-[#323232B2] focus:border-[#000000]`}
      placeholder={`${placeholder} ${star.value}`}
    />
  );
};

export default InputField;

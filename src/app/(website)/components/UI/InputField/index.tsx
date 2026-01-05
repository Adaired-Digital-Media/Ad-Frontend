import React from 'react';
export interface InputFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}
const InputField = ({
  name,
  value,
  handleChange,
  placeholder,
  className,
}: InputFieldProps) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className={`${className} w-full rounded-md border-none bg-[#F8F8F8] px-4 py-3 text-xs font-normal text-black outline-none placeholder:text-[#A3A3A3] focus:border-[#000000]`}
      placeholder={placeholder}
    />
  );
};

export default InputField;

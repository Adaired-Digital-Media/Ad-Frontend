import React from 'react';
export interface InputFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  error?: string;
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
  error,
}: InputFieldProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={`${className} w-full rounded-[0.5rem] border-none bg-[#F8F8F8] px-4 py-3 text-xxs font-normal text-[#000000] outline-none placeholder:text-[#323232B2] focus:border-[#000000] xl:text-xs`}
        placeholder={`${placeholder} ${star.value}`}
      />
      {error && (
        <span className="absolute bottom-[-15] left-4 w-[100%] text-[12px] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;

import React from 'react';

export interface SelectFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

const SelectField = ({
  name,
  value,
  handleChange,
  options,
  placeholder,
  className,
}: SelectFieldProps) => {
  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className={`${className} w-full rounded-md border-none bg-[#F8F8F8] px-4 py-3 text-xs font-normal text-black outline-none placeholder:text-[#A3A3A3] focus:border-[#000000]`}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;

'use client';

import React, { useState } from 'react';
import CountryList from 'country-list-with-dial-code-and-flag';
import Flag from '../Flag';
import { MdArrowDropDown } from 'react-icons/md';

interface InputFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  error?: string;
  required?: boolean;
}

const PhoneInputField = ({
  name,
  value,
  handleChange,
  placeholder,
  className,
  maxLength,
  error,
  required,
}: InputFieldProps) => {
  const countries = CountryList.getAll();
  const defaultUSA = countries.find((c) => c.code === 'US') || countries[0];

  const [selected, setSelected] = useState(defaultUSA);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Flag dropdown */}
      <div className="absolute left-0 top-0">
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex cursor-pointer items-center gap-1 px-2 py-3"
          >
            <Flag emoji={selected.flag} />
            <MdArrowDropDown
              className={`transition ${open ? 'rotate-180' : ''}`}
            />
          </div>

          {open && (
            <div className="absolute z-20 mt-2 max-h-60 w-[18rem] overflow-auto rounded-md bg-white shadow">
              {countries.map((c) => (
                <div
                  key={c.code}
                  onClick={() => {
                    setSelected(c);
                    setOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-blue-700 hover:text-white"
                >
                  <Flag emoji={c.flag} />
                  <span className="flex-1 text-xs">{c.name}</span>
                  <span className="text-xs">{c.dial_code}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Phone input (digits only) */}
      <input
        type="text"
        name={name}
        value={`${selected.dial_code} ${value}`}
        onChange={(e) => {
          // Remove dial code before sending to parent
          const phoneOnly = e.target.value.replace(
            `${selected.dial_code} `,
            ''
          );

          // Allow only digits
          if (!/^\d*$/.test(phoneOnly)) return;

          handleChange({
            ...e,
            target: {
              ...e.target,
              name,
              value: phoneOnly,
            },
          });
        }}
        maxLength={15}
        className={`${className} w-full rounded-[0.5rem] border-none bg-[#F8F8F8] py-3 pl-[3rem] text-xxs font-normal text-[#000000] outline-none placeholder:text-[#323232B2] focus:border-[#000000] xl:text-xs`}
      />

      {error && (
        <span className="absolute bottom-[-15] left-4 w-[100%] text-[12px] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default PhoneInputField;

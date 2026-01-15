import React from 'react';

export interface MessageFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}

const MessageField = ({
  name,
  value,
  handleChange,
  placeholder,
  className,
  rows,
}: MessageFieldProps) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`${className} w-full rounded-[0.5rem] border-none bg-[#F8F8F8] px-4 py-3 text-xxs font-normal text-[#000000] outline-none placeholder:text-[#323232B2] focus:border-[#000000] lg:text-xs`}
      rows={rows ?? 5}
    />
  );
};

export default MessageField;

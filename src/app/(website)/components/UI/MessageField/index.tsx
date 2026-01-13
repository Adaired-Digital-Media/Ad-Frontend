import React from 'react';

export interface MessageFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const MessageField = ({
  name,
  value,
  handleChange,
  placeholder,
  className,
}: MessageFieldProps) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`${className} w-full rounded-[0.5rem] text-xxs xl:text-xs border-none bg-[#F8F8F8] px-4 py-3 font-normal text-black outline-none placeholder:text-[#A3A3A3] focus:border-[#000000]`}
      rows={5}
    />
  );
};

export default MessageField;

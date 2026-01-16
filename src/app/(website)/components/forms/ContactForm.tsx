'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../UI/InputField';
import SelectField from '../UI/SelectField';
import MessageField from '../UI/MessageField/MessageField';
import SaveAndCancel from '../../common/SaveAndCancel';
import chat from '../../../../../public/assets/icons/chat.png';
import { useReCaptcha } from 'next-recaptcha-v3';
import PhoneInputField from '../UI/InputField/PhoneInputField';
import validators from '@/@core/utils/validators';

const ContactForm = () => {
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});

  const router = useRouter();
  const { executeRecaptcha } = useReCaptcha();

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'phone' && !/^\d*$/.test(value)) return;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validators[name as keyof typeof validators](value),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validators.email(inputValue.email),
      phone: validators.phone(inputValue.phone),
    };

    setErrors(newErrors);

    // check if any error exists
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleClick = async () => {
    if (!validateForm()) return;
    try {
      const token = await executeRecaptcha('contact_page_form');

      const payload = {
        ...inputValue,
        gRecaptchaToken: token,
      };

      const response = await fetch('/api/zoho/leadRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Submission failed');

      setInputValue({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

      setErrors({});
      router.push('/thankyou');
    } catch (error) {
      console.error(error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="mt-[1rem] h-full w-full flex-1 space-y-8 rounded-2xl p-[1.5rem] text-center shadow-[0_0_20px_rgba(66,71,76,0.08)] md:mt-0 lg:p-[2rem] lg:text-left xl:p-14">
      <div className="flex justify-between">
        <div>
          <h3 className="text-left font-poppins text-[22px] font-semibold text-[#111111]">
            Let’s Start Your Success Journey
          </h3>
          <p className="pt-3 text-left text-[14px] text-[#666666]">
            Fill out the form, and let’s turn your business goals into reality.
          </p>
        </div>
        <Image
          src={chat}
          width={111}
          height={73}
          alt="chat"
          className="mb-auto"
        />
      </div>
      <div>
        <InputField
          className="my-4"
          name="name"
          value={inputValue.name}
          handleChange={handleChange}
          placeholder="Name"
          required={false}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <InputField
            name="email"
            value={inputValue.email}
            handleChange={handleChange}
            placeholder="Email"
            required={true}
            error={errors.email}
          />
          <PhoneInputField
            name="phone"
            maxLength={10}
            value={inputValue.phone}
            handleChange={handleChange}
            placeholder="Phone No"
            required={true}
            error={errors.phone}
          />
        </div>

        <SelectField
          className="my-4"
          name="service"
          value={inputValue.service}
          handleChange={handleChange}
          placeholder="Service"
          options={[
            {
              label: 'Web Design & Development',
              value: 'Web Design & Development',
            },
            { label: 'Graphic Design', value: 'Graphic Design' },
            {
              label: 'Paid Media & Advertising',
              value: 'Paid Media & Advertising',
            },
            {
              label: 'Search Engine Optimization',
              value: 'Search Engine Optimization',
            },
            {
              label: 'Strategic Social Media Management',
              value: 'Strategic Social Media Management',
            },
            {
              label: 'Content Marketing',
              value: 'Content Marketing',
            },
          ]}
        />

        <MessageField
          name="message"
          value={inputValue.message}
          handleChange={handleChange}
          placeholder="Message"
          className="my-2"
        />
      </div>

      <SaveAndCancel
        name="Submit"
        handleClick={handleClick}
        isFullWidth
        isIcon
      />
    </div>
  );
};

export default ContactForm;

'use client';

import { IoClose } from 'react-icons/io5';
import InputField from '../../UI/InputField';
import get_a_Quote from '../../../../../../public/assets/images/get_a_Quote.png';
import Image from 'next/image';
import MessageField from '../../UI/MessageField/MessageField';
import SaveAndCancel from '@/app/(website)/common/SaveAndCancel';
import { Icons } from '@web-components/Icons';

import Link from 'next/link';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { first } from 'lodash';
import validators from '@/@core/utils/validators';
interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetQuoteModal = ({ isOpen, onClose }: GetQuoteModalProps) => {
  const router = useRouter();
  if (!isOpen) return null;
  const { executeRecaptcha } = useReCaptcha();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
  });
  const [inputValue, setInputValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Allow only numbers in phone field
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
      firstName: validators.firstName(inputValue.firstName),
      lastName: validators.lastName(inputValue.lastName),
      email: validators.email(inputValue.email),
      phone: validators.phone(inputValue.phone),
      website: validators.website(inputValue.website),
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
        name: inputValue.firstName + ' ' + inputValue.lastName,
        email: inputValue.email,
        phone: inputValue.phone,
        website: inputValue.website,
        message: inputValue.message,
        gRecaptchaToken: token,
      };

      const response = await fetch('/api/zoho/leadRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Submission failed');

      setInputValue({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
        message: '',
      });

      router.push('/thankyou');
    } catch (error) {
      console.error(error);
      alert('Failed to submit form. Please try again.');
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 rounded-2xl bg-[#FFFFFF] p-6 shadow-xl md:w-[w-95%] lg:w-[95%] 1600:w-[70%] 3xl:w-[60%]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <IoClose size={22} />
        </button>

        {/* Modal Content */}
        <div className="flex justify-between gap-3">
          <div className="relative w-[40%]">
            <Image
              src={get_a_Quote}
              alt="get_a_Quote"
              className="object-contain"
            />
            <div className="absolute bottom-6 left-6 w-[80%] md:bottom-[16rem] lg:bottom-[9rem] 1400:bottom-[3rem]">
              <p className="text-[28px] font-medium leading-[35px] text-[#FFFFFF]">
                Achieve Higher Conversions by Solving Issues Early
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={process.env.NEXT_PUBLIC_TWITTER_URL || '/'}
                  className="group/x hover:bg-theme-orange rounded-full bg-white p-2"
                >
                  <Icons.Twitter className="text-[#1B5A96] group-hover/x:text-[#FB9100]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '/'}
                  className="group/insta hover:bg-theme-orange rounded-full bg-white p-2"
                >
                  <Icons.Instagram className="text-[#1B5A96] group-hover/insta:text-[#FB9100]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '/'}
                  className="group/fb hover:bg-theme-orange rounded-full bg-white p-2"
                >
                  <Icons.Facebook className="text-[#1B5A96] group-hover/fb:text-[#FB9100]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '/'}
                  className="group/in hover:bg-theme-orange rounded-full bg-white p-2"
                >
                  <Icons.LinkedIn className="text-[#1B5A96] group-hover/in:text-[#FB9100]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_GOOGLE_URL || '/'}
                  className="group/in hover:bg-theme-orange rounded-full bg-white p-2"
                >
                  <Icons.Google className="text-[#1B5A96] group-hover/in:text-[#FB9100]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[60%] p-[2rem]">
            <h3>See How Your Website Performs</h3>
            <p className="text-[15px] font-medium text-[#323232]">
              Find performance gaps limiting your website’s visibility and
              effectiveness.
            </p>
            <div className="py-[2rem]">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  placeholder="First name"
                  name={'firstName'}
                  value={inputValue.firstName}
                  handleChange={handleChange}
                  error={errors.firstName}
                />
                <InputField
                  placeholder="Last name"
                  name={'lastName'}
                  value={inputValue.lastName}
                  handleChange={handleChange}
                  error={errors.lastName}
                />
                <InputField
                  placeholder="Email"
                  name={'email'}
                  value={inputValue.email}
                  handleChange={handleChange}
                  error={errors.email}
                />
                <InputField
                  placeholder="Phone no"
                  name={'phone'}
                  value={inputValue.phone}
                  handleChange={handleChange}
                  error={errors.phone}
                  maxLength={10}
                />
              </div>
              <InputField
                placeholder="Website URL"
                name={'website'}
                value={inputValue.website}
                handleChange={handleChange}
                className="my-4"
                error={errors.website}
              />

              <MessageField
                name={'message'}
                value={inputValue.message}
                rows={6}
                handleChange={handleChange}
                placeholder="Write message"
              />
            </div>
            <SaveAndCancel
              name={'Analyze Now'}
              isFullWidth={true}
              isIcon={true}
              className="text-[16px]"
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuoteModal;

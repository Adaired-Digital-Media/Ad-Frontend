'use client';

import { IoClose } from 'react-icons/io5';
import InputField from '../../UI/InputField';
import get_a_Quote from '../../../../../../public/assets/images/get_a_Quote.png';
import Image from 'next/image';
import MessageField from '../../UI/MessageField/MessageField';
import SaveAndCancel from '@/app/(website)/common/SaveAndCancel';
import { Icons } from '@web-components/Icons';

import Link from 'next/link';
interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetQuoteModal = ({ isOpen, onClose }: GetQuoteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-[60%] rounded-2xl bg-[#FFFFFF] p-6 shadow-xl">
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
            <div className="absolute bottom-6 left-6 w-[80%]">
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
                  name={''}
                  value={''}
                  handleChange={function (
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <InputField
                  placeholder="Last name"
                  name={''}
                  value={''}
                  handleChange={function (
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <InputField
                  placeholder="Email"
                  name={''}
                  value={''}
                  handleChange={function (
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <InputField
                  placeholder="Phone no"
                  name={''}
                  value={''}
                  handleChange={function (
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>
              <InputField
                placeholder="Website URL"
                name={''}
                value={''}
                handleChange={function (
                  e: React.ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
                className="my-[0.8rem]"
              />
              <MessageField
                name={''}
                value={''}
                rows={6}
                handleChange={function (
                  e: React.ChangeEvent<HTMLTextAreaElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
                placeholder="Write message"
              />
            </div>
            <SaveAndCancel
              name={'Analyze Now'}
              isFullWidth={true}
              isIcon={true}
              className="text-[16px]"
              handleClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuoteModal;

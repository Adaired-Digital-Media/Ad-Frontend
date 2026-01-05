'use client';

import { IoClose } from 'react-icons/io5';
import InputField from '../../UI/InputField';

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
      <div className="relative z-50 w-[95%] max-w-[600px] rounded-2xl bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <IoClose size={22} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold">
          Get a Perfect Quote <span>👋</span>
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Tell us about your project and hear back from our team in 1–2 business
          days.
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* About You */}
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              Tell Us About You
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField
                name={''}
                value={''}
                handleChange={function (
                  e: React.ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <InputField
                name={''}
                value={''}
                handleChange={function (
                  e: React.ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <InputField
                name={''}
                value={''}
                handleChange={function (
                  e: React.ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <InputField
                name={''}
                value={''}
                handleChange={function (
                  e: React.ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
          </div>

          {/* About Project */}
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              Tell Us About Your Project
            </p>

            <textarea
              placeholder="What's your project all about?*"
              rows={3}
              className="input resize-none"
            />

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <select className="input">
                <option>Select your Services*</option>
                <option>SEO</option>
                <option>PPC</option>
                <option>Web Development</option>
              </select>

              <select className="input">
                <option>Select your budget range*</option>
                <option>$1k – $5k</option>
                <option>$5k – $10k</option>
                <option>$10k+</option>
              </select>

              <select className="input md:col-span-2">
                <option>When do you want to start?*</option>
                <option>Immediately</option>
                <option>Within 1 month</option>
                <option>Later</option>
              </select>
            </div>
          </div>

          {/* Upload */}
          <div className="rounded-xl border border-dashed bg-blue-50 p-4 text-center text-sm text-gray-600">
            Attach one file you feel would be useful
            <br />
            <span className="text-xs text-gray-400">
              (doc, pdf, png, jpg – max 10mb)
            </span>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-400">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Let’s Go 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetQuoteModal;

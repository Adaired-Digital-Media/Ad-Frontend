import MaxWidthWrapper from '@web-components/MaxWidthWrapper/';
// import { TypingAnimation } from "@core/ui/shadcn-ui/typing-animation";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Thank you for reaching out to Adaired!',
};

const Thankyou = () => {
  const words = [
    {
      text: 'Thanks',
      className: 'font-dm',
    },
    {
      text: 'for',
      className: 'font-dm',
    },
    {
      text: 'reaching',
      className: 'font-dm',
    },
    {
      text: 'out',
      className: 'font-dm',
    },
    {
      text: 'Adaired!',
      className: 'font-dm text-[#1B5A96]',
    },
  ];

  const text = [
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
    {
      text: "We'll",
    },
  ];
  return (
    <MaxWidthWrapper className="flex h-[85vh] flex-col items-center justify-center">
      {/* <main className=""> */}
      <div className="pb-5">
        <Image
          src="/assets/images/thankyou.svg"
          alt="Thank you Image"
          width={200}
          height={200}
          draggable={false}
        />
      </div>
      <div className="pb-24 text-center">
        <h1 className="font-dm text-5xl">Thanks for reaching out!</h1>
        <p>
          We&apos;ll be in touch shortly and look forward to discussing how
          Adaired can best support your business.
        </p>
      </div>
      <Link
        href={`/`}
        className="flex items-center justify-center font-semibold text-[#1B5A96]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 6 10"
          className="mr-1 h-3 w-3 fill-[#1B5A96]"
        >
          <path
            id="arrow-1"
            d="M1.204 9.895l4.673-4.576a.48.48 0 0 0 0-.641L1.204.104a.344.344 0 0 0-.53.044L.091.92a.462.462 0 0 0 .041.6l3.542 3.4a.112.112 0 0 1 0 .159L.134 8.48a.444.444 0 0 0-.131.291.448.448 0 0 0 .089.309l.584.771a.346.346 0 0 0 .53.045l-.002-.002z"
          />
        </svg>
        <span>Go back to Home page</span>
      </Link>
      {/* </main> */}
    </MaxWidthWrapper>
  );
};

export default Thankyou;

import SmallWidthContainer from '@web-components/SmallWidthContainer';
import CldImage from '@web-components/CloudinaryImageComponent';
import { Separator } from '@core/ui/shadcn-ui/separator';
import { cn } from '@core/utils/class-names';
import Link from 'next/link';

const EcomFooter = () => {
  return (
    <footer className={cn(`bg-[#1C5B98]`)}>
      <SmallWidthContainer className="flex flex-col py-4 xl:py-4 2xl:py-10 3xl:py-10">
        <div className="flex flex-col items-center justify-start gap-10 sm:flex-row sm:gap-0">
          <div className="flex w-full sm:w-auto flex-col justify-center pr-0 sm:pr-10 md:pr-20 opt-md:pr-24">
            <CldImage
              src="Footer_Logo_pGEMx"
              alt="Footer Logo"
              height={70}
              width={183}
              className="m-auto sm:m-0 rounded-lg object-cover"
            />
            <Separator
              orientation="horizontal"
              className="mt-5 w-full sm:hidden"
            />
          </div>
          <Separator orientation="vertical" className="hidden h-20 sm:block" />
          <div className="w-full sm:w-auto sm:ml-auto">
            <ul className="flex flex-col items-center gap-3 font-poppins  text-white sm:inline-flex sm:flex-row md:gap-5 text-base">
              <Link href="/expert-content-solutions">
                <li>Home</li>
              </Link>
              <Link href="/expert-content-solutions#products">
                <li>Services</li>
              </Link>
              <Link href="/expert-content-solutions#faqs">
                <li>FAQs</li>
              </Link>
              <Link href="/expert-content-solutions#products">
                <li>Pricing</li>
              </Link>
              <Link href="/expert-content-solutions#contact">
                <li
                  className={cn(`rounded-full bg-white px-4 py-2 text-black`)}
                >
                  Contact Us
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <Separator className="mb-5 mt-10" />
        <div className={cn(`m-auto font-poppins text-lg leading-7 text-white`)}>
          <p className='text-sm'>© 2025 Adaired–All Rights Reserved</p>
        </div>
      </SmallWidthContainer>
    </footer>
  );
};

export default EcomFooter;

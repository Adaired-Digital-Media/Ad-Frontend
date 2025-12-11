import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@web-components/Icons';
import { Separator } from '@core/ui/shadcn-ui/separator';
import { cn } from '@core/utils/class-names';
import NewsLetter from '@web-components/forms/NewsLetter';
import FooterTop from './FooterTop';
import footer_brand_logo from '../../../../../public/assets/brand_logo.png'
import CldImage from '../../components/CloudinaryImageComponent';
// import dynamic from "next/dynamic";

// const NewsLetter = dynamic(() => import("@/forms/NewsLetter"), {
//   loading: () => <p>Loading...</p>,
// });
// #1B5A96
const WebFooter = () => {
  return (
    <>
      <footer className="bg-footer-gradient font-nunito text-white py-12">
        <MaxWidthWrapper className="px-4">
          <div
            className={cn(
              `flex flex-wrap items-center justify-between gap-y-2 py-6 lg:flex-nowrap lg:gap-5`
            )}
          >
            <FooterTop />
          </div>

          <div className="mx-auto grid grid-cols-1 gap-5 border-t pt-6 md:grid-cols-12">
            <div className="col-span-12 lg:col-span-4">
              <Link href="/">
                <Image
                  src={footer_brand_logo}
                  width={174}
                  height={65}
                  alt="Footer Logo"
                  priority
                />
              </Link>
              <p className="mt-6 text-xs font-nunito">
                AdAired Digital Media is a digital marketing company located in
                Mohali. We are a team of marketing and design experts who are
                committed to your online growth.{' '}
              </p>
              <div className="mt-6 hidden lg:block">
                <div className="mt-4 flex gap-2">
                  <Link
                    href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '/'}
                    className="group/fb rounded-full bg-white p-2 hover:bg-theme-orange"
                  >
                    <Icons.Facebook className="text-[#1B5A96] group-hover/fb:text-white " />
                    <span className="sr-only">
                      Visit Adaired Digital &apos; s Facebook page
                    </span>
                  </Link>
                  <Link
                    href={process.env.NEXT_PUBLIC_TWITTER_URL || '/'}
                    className="group/x rounded-full bg-white p-2 hover:bg-theme-orange"
                  >
                    <Icons.Twitter className="text-[#1B5A96] group-hover/x:text-white" />
                    <span className="sr-only">
                      Visit Adaired Digital &apos; s Facebook page
                    </span>
                  </Link>
                  <Link
                    href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '/'}
                    className="group/insta rounded-full bg-white p-2 hover:bg-theme-orange"
                  >
                    <Icons.Instagram className="text-[#1B5A96] group-hover/insta:text-white" />
                    <span className="sr-only">
                      Visit Adaired Digital &apos; s Facebook page
                    </span>
                  </Link>
                  <Link
                    href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '/'}
                    className="group/in rounded-full bg-white p-2 hover:bg-theme-orange"
                  >
                    <Icons.LinkedIn className="text-[#1B5A96] group-hover/in:text-white" />
                    <span className="sr-only">
                      Visit Adaired Digital &apos; s Facebook page
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 lg:col-span-2">
              <h3 className="relative font-nunito text-md font-semibold tracking-wide text-white after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-16 after:bg-[#FB9100] after:content-[''] lg:text-2xl">
                Useful Links
              </h3>
              <ul
                className={cn(
                  `mt-6 text-xs font-nunito space-y-2 transition-colors duration-200 hover:[&>li]:text-theme-orange`
                )}
              >
                <li>
                  <Link href="/" className="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className=""
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-5 lg:col-span-3">
              <h3 className="relative font-nunito text-md font-semibold tracking-wide text-white after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-16 after:bg-[#FB9100] after:content-[''] lg:text-2xl">
                Services
              </h3>
              <ul
                className={cn(
                  `mt-6 space-y-2 text-xs font-nunito transition-colors duration-200 hover:[&>li]:text-theme-orange`
                )}
              >
                <li>
                  <Link
                    href="/services/web-designing-and-development"
                    className=""
                  >
                    Website Designing & Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/search-engine-optimization" className="">
                    Search Engine Optimization (SEO)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/digital-marketing-company-usa"
                    className=""
                  >
                    Digital Marketing Services USA
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/digital-marketing-company-india"
                    className=""
                  >
                    Digital Marketing Company India
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo-company-usa" className="">
                    SEO Services USA
                  </Link>
                </li>
                <li>
                  <Link href="/services/web-development-company-usa" className="">
                    Web Development Company USA
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <h3 className="relative font-nunito text-md font-semibold tracking-wide text-white after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-16 after:bg-[#FB9100] after:content-[''] lg:text-2xl">
                Subscribe
              </h3>
              <p className="mt-6 text-xs font-nunito">
                Share your email address to subscribe to Adaired&apos;s
                newsletter.
              </p>
              <NewsLetter />
            </div>
            <div className="col-span-12 mt-6 lg:hidden">
              <h3 className="font-nunito text-lg font-semibold tracking-wide text-white lg:text-2xl">
                Follow Us
              </h3>
              <div className="mt-4 flex gap-2">
                <Link
                  href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '/'}
                  className="rounded-lg bg-white p-2"
                >
                  <Icons.Facebook className="text-[#1B5A96]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_TWITTER_URL || '/'}
                  className="rounded-lg bg-white p-2"
                >
                  <Icons.Twitter className="text-[#1B5A96]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '/'}
                  className="rounded-lg bg-white p-2"
                >
                  <Icons.Instagram className="text-[#1B5A96]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '/'}
                  className="rounded-lg bg-white p-2"
                >
                  <Icons.LinkedIn className="text-[#1B5A96]" />
                  <span className="sr-only">
                    Visit Adaired Digital &apos; s Facebook page
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="mt-6 border-t text-white flex flex-col-reverse items-center justify-center py- text-center md:flex-row md:justify-between">
            <div>
              Copyright © {new Date().getFullYear()} - AdAired Digital Media
            </div>
            <div className="flex gap-5 py-2 sm:gap-1 sm:bg-transparent">
              <Link href="/terms-and-conditions">Terms & Conditions </Link>
              <span className="hidden sm:block">/</span>
              <div className="sm:hidden">
                <Separator orientation="vertical" />
              </div>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div> */}
        </MaxWidthWrapper>
      </footer>
      <MaxWidthWrapper>
        <div className="bg-white text-black flex flex-col-reverse items-center justify-center py- text-center md:flex-row md:justify-between">
          <div className='text-xs font-nunito'>
            Copyright © {new Date().getFullYear()} - AdAired Digital Media
          </div>
          <div className="text-xs font-nunito flex gap-5 py-2 sm:gap-1 sm:bg-transparent">
            <Link href="/terms-and-conditions">Terms & Conditions </Link>
            <span className="hidden sm:block">/</span>
            <div className="sm:hidden">
              <Separator orientation="vertical" />
            </div>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default WebFooter;

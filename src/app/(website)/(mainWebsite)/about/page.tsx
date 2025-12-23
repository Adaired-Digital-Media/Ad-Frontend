import React from 'react';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import PageBanner from '@web-components/PageBanner';
import BlogCards from '@web-components/BlogCard/BlogCards';
import TestimonialSlider from '@web-components/TestimonialSlider';
import { Icons } from '@web-components/Icons';
import Process from '@web-components/Timeline/Process';
import type { Metadata } from 'next';
import CldImage from '@web-components/CloudinaryImageComponent';

export const metadata: Metadata = {
  title: 'Unveiling Adaired: Our History, Team, and Vision | Learn About Us',
  description:
    "Get to know Adaired better! Know our history, the people who make it happen, and the goals we aspire to. Experience Adaired's dedication to innovation.",
  alternates: {
    canonical: 'https://www.adaired.com/about',
  },
};
// export async function getBlogsData() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read?limit=3`,
//     {
//       cache: 'no-store', // IMPORTANT for runtime pages
//     }
//   );
//   const data = await res.json();
//   return data.data;
// }

export async function getBlogsData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read?limit=3`,
      {
        cache: 'no-store', // IMPORTANT for runtime pages
      }
    );

    if (!res.ok) {
      console.error('Blog fetch failed:', res.status);
      return [];
    }

    const data = await res.json();
    return data?.data ?? [];
  } catch (error) {
    console.error('getBlogsData error:', error);
    return [];
  }
}

const About = async () => {
  const blogs = await getBlogsData();
  return (
    <div>
      <PageBanner title="About Us" />
      <IntroSection />
      <WorkStation />
      <ProcessSection />
      <TestimonialSlider />
      <BlogCards blogs={blogs} />
    </div>
  );
};

export default About;

const IntroSection = () => {
  return (
    <>
      <section className="py-6 md:py-12">
        <MaxWidthWrapper className="grid grid-cols-1 flex-col gap-10 lg:grid-cols-2 lg:flex-row">
          <div className="mx-auto flex-grow-0">
            <div className="w-full max-w-lg lg:max-w-full">
              <CldImage
                src="Static Website Images/about"
                alt="About Image"
                height={500}
                width={800}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="flex-grow-0 space-y-2 p-2 text-center md:text-left">
            <h5 className="relative inline font-nunito text-lg text-[#515151] sm:text-xl md:pl-20">
              <div className="absolute -left-1/4 top-1/2 h-px w-10 -translate-y-1/2 transform bg-[#A7A9AC] sm:-left-1/3 sm:w-12 md:left-0 md:w-16"></div>
              <div className="absolute -right-1/4 top-1/2 h-px w-10 -translate-y-1/2 transform bg-[#A7A9AC] sm:-right-1/3 sm:w-12 md:hidden md:w-16"></div>
              Adaired Digital Media
            </h5>
            <h2 className="text-[1.688rem] md:text-4xl">
              A Marketing Firm Driven To Accelerate Your Business Growth
            </h2>
            <p className="text-justify text-base sm:text-lg md:text-left">
              Founded in 2015, Adaired is a versatile digital marketing firm
              that empowers businesses to thrive online through its time-tested
              and effective digital marketing services. We are more than just
              another industry survivor; we are creators, inventors, and
              catalysts for your company&apos;s growth. We stand out by
              consistently delivering innovative solutions, pushing limits, and
              redefining the idea of success.
            </p>
            <div className="grid grid-cols-1 flex-col gap-5 sm:grid-cols-2 sm:flex-row">
              <div className="flex flex-col items-center border p-4 md:items-start md:border-none md:p-0">
                <CldImage
                  src="Static Website Images/homepage_about2"
                  alt="Workstation"
                  height={60}
                  width={60}
                  className="mb-2 rounded-lg border p-2"
                />
                <h3 className="relative py-2 font-nunito text-xl font-semibold">
                  <div className="absolute bottom-1 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-lg bg-[#A7A9AC] md:left-0 md:translate-x-0"></div>
                  Innovative Mindset
                </h3>
                <p className="text-base sm:text-lg">
                  Known for our innovative mindset, Adaired&apos;s qualified
                  digital marketers use creativity to craft tailored strategies
                  that meet your unique needs and goals.
                </p>
              </div>
              <div className="flex flex-col items-center border p-4 md:items-start md:border-none md:p-0">
                <CldImage
                  src="Static Website Images/homepage_about1"
                  alt=""
                  height={60}
                  width={60}
                  className="mb-2 rounded-lg border p-2"
                />
                <h3 className="relative py-2 font-nunito text-xl font-semibold">
                  <div className="absolute bottom-1 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-lg bg-[#A7A9AC] md:left-0 md:translate-x-0"></div>
                  Data-Driven Strategies
                </h3>
                <p className="text-base sm:text-lg">
                  Adaired utilizes in-depth analysis of consumer behavior and
                  market research to develop data-backed strategies for ongoing
                  company success.
                </p>
              </div>
            </div>
            <p className="font-baby text-lg font-semibold sm:text-2xl">
              &quot;The internet is becoming the town square for the global
              village of tomorrow.&quot; -
              <i className="text-[#92288D]">Bill Gates</i>
            </p>
            <p className="hidden text-base sm:text-lg xl:block">
              At Adaired, we know very well how to turn visitors into leads,
              leads into customers, and customers into business promoters. Our
              comprehensive services aid businesses to grow online, increase
              exposure, and ultimately become the leader in the industry.
            </p>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="space-y-2 py-2">
          <p className="text-base sm:text-lg xl:hidden">
            At Adaired, we know very well how to turn visitors into leads, leads
            into customers, and customers into business promoters. Our
            comprehensive services aid businesses to grow online, increase
            exposure, and ultimately become the leader in the industry.
          </p>
          <p className="text-base sm:text-lg">
            We believe that a visually appealing website with decent traffic or
            a handful of social media followers is not an indicator of a
            successful digital marketing campaign. True success lies in making a
            company a brand, creating a lasting impression on the audience, and
            building loyalty among the audience for that brand.
          </p>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export const ProcessSection = () => {
  return (
    <section className="pb-20">
      <MaxWidthWrapper className="text-center">
        <div className="flex flex-col items-center">
          <div className="relative inline px-4 font-nunito text-lg text-[#515151]">
            <div className="absolute left-full top-1/2 h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC]"></div>
            <div className="absolute right-full top-1/2 h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC]"></div>
            How We Work
          </div>
          <h2 className="py-1 text-[1.688rem] md:text-4xl">Our Process</h2>
          <p className="max-w-[900px] pb-10 text-base sm:text-lg">
            No need to settle for okay when we can serve you the best! Our
            strategies are meticulously crafted to spark creativity, boost
            engagement, and achieve the impossible.
          </p>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="hidden lg:block lg:max-w-screen-lg xl:max-w-[1440px]">
        <div className="relative min-h-[28rem]">
          <div className="work-process__box_1 work-process_1 absolute bottom-[-5%] left-0 flex max-w-56 cursor-pointer flex-col justify-center break-words border p-3 text-center lg:min-h-40 lg:max-w-72 xl:bottom-0 xl:left-[5%] xl:max-w-72 2xl:left-0 2xl:max-w-sm">
            <h3>Discovery and Planning</h3>
            <p className="text-base">
              Research the business&apos;s landscape, target audience, and
              specific goals to create a roadmap, ensuring a solid foundation
              for success.
            </p>
          </div>
          <div className="work-process__icon_1 absolute bottom-16 left-11 flex max-w-64 -translate-y-1/2 flex-col justify-center border p-3 text-center lg:min-h-40 lg:max-w-72 xl:bottom-1/4 xl:left-[12%] xl:max-w-72 2xl:left-[6%] 2xl:max-w-sm">
            <h3>Strategic Execution</h3>
            <p className="text-base">
              Seamlessly execute tailored strategies to elevate your brand and
              maximize your digital impact.
            </p>
          </div>
          <div className="absolute left-1/2 flex max-w-64 -translate-x-1/2 flex-col justify-center border p-3 text-center lg:top-[20%] lg:min-h-40 lg:max-w-72 xl:top-0 xl:max-w-72 2xl:max-w-sm">
            <h3>Comprehensive Analysis</h3>
            <p className="text-base">
              As the campaigns unfold, conduct in-depth analyses to measure
              performance, user engagement, and campaign effectiveness.
            </p>
          </div>
          <div className="absolute bottom-16 right-11 flex max-w-64 -translate-y-1/2 flex-col justify-center border p-3 text-center lg:min-h-40 lg:max-w-72 xl:bottom-1/4 xl:right-[12%] xl:max-w-72 2xl:right-[6%] 2xl:max-w-sm">
            <h3>Ongoing Optimization</h3>
            <p className="text-base">
              Continuously optimize campaigns based on emerging trends, user
              behavior, and platform algorithms to remain adaptive and
              impactful.
            </p>
          </div>
          <div className="absolute bottom-[-5%] right-0 flex max-w-64 flex-col justify-center border p-3 text-center lg:min-h-40 lg:max-w-72 xl:bottom-0 xl:right-[5%] xl:max-w-72 2xl:right-0 2xl:max-w-sm">
            <h3>Evaluation and Reporting</h3>
            <p className="text-base">
              Regular evaluation and reporting provide valuable insights into
              strategy effectiveness, progress tracking, and decision-making.
            </p>
          </div>

          <div className="l absolute bottom-[-3.5rem] left-1/2 w-full max-w-xs -translate-x-1/2 lg:max-w-md xl:max-w-xl">
            <Icons.WorkProcess className="h-full w-full" />
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="lg:hidden">
        <Process />
      </MaxWidthWrapper>
    </section>
  );
};

const WorkStation = () => {
  return (
    <MaxWidthWrapper className="grid gap-y-10 py-12 sm:grid-cols-2 sm:gap-x-10 lg:gap-x-24 lg:py-20">
      <div>
        <div>
          <CldImage
            src="Static Website Images/workstation"
            alt="About Image"
            height={600}
            width={800}
            className="rounded-lg"
          />
        </div>
        <div className="z-1 relative mx-auto -mt-9 w-4/5 border bg-white px-8 py-5 text-center lg:-mt-14 lg:px-12 lg:py-8">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-4xl">
            Our Workstation
          </h2>
          <div className="absolute -bottom-3 -left-3 h-8 w-8 border-b-4 border-l-4 border-[#BC1D8D] lg:-bottom-5 lg:-left-5 lg:h-12 lg:w-12"></div>
          <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-4 border-r-4 border-[#BC1D8D] lg:-bottom-5 lg:-right-5 lg:h-12 lg:w-12"></div>
        </div>
      </div>
      <div>
        <div>
          <CldImage
            src="Static Website Images/Team"
            alt="About Image"
            height={600}
            width={800}
            className="rounded-lg"
            enhance
          />
        </div>
        <div className="z-1 relative mx-auto -mt-9 w-4/5 border bg-white px-8 py-5 text-center lg:-mt-14 lg:px-12 lg:py-8">
          <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-4xl">
            40+Team Members
          </h2>
          <div className="absolute -bottom-3 -left-3 h-8 w-8 border-b-4 border-l-4 border-[#BC1D8D] lg:-bottom-5 lg:-left-5 lg:h-12 lg:w-12"></div>
          <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-4 border-r-4 border-[#BC1D8D] lg:-bottom-5 lg:-right-5 lg:h-12 lg:w-12"></div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

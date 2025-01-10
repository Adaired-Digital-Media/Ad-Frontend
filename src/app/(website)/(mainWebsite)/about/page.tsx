import React from "react";
import Image from "next/image";
import MaxWidthWrapper from "@web-components/MaxWidthWrapper";
import PageBanner from "@web-components/PageBanner";
import BlogCards from "@web-components/BlogCard/BlogCards";
import TestimonialSlider from "@web-components/TestimonialSlider";
import { Icons } from "@web-components/Icons";
import Process from "@web-components/Timeline/Process";
import type { Metadata } from "next";
import CldImage from "@web-components/CloudinaryImageComponent";

export const metadata: Metadata = {
  title: "Unveiling Adaired: Our History, Team, and Vision | Learn About Us",
  description:
    "Get to know Adaired better! Know our history, the people who make it happen, and the goals we aspire to. Experience Adaired's dedication to innovation.",
  alternates: {
    canonical: "https://www.adaired.com/about",
  },
};
const About = () => {
  return (
    <div>
      <PageBanner title="About Us" />
      <IntroSection />
      <WorkStation />
      <ProcessSection />
      <TestimonialSlider />
      <BlogCards />
    </div>
  );
};

export default About;

const IntroSection = () => {
  return (
    <>
      <section className="py-6 md:py-12">
        <MaxWidthWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-col lg:flex-row">
          <div className=" mx-auto flex-grow-0">
            <div className="max-w-lg lg:max-w-full w-full">
              <CldImage
                src="Static Website Images/about"
                alt="About Image"
                height={500}
                width={800}
                sizes="50vw"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className=" text-center p-2 md:text-left space-y-2 flex-grow-0">
            <h5 className=" sm:text-xl inline font-nunito text-[#515151] relative md:pl-20 text-lg">
              <div className="absolute top-1/2 -left-1/4 sm:-left-1/3 md:left-0 transform -translate-y-1/2 bg-[#A7A9AC] h-px w-10 sm:w-12 md:w-16"></div>
              <div className="md:hidden absolute top-1/2 -right-1/4 sm:-right-1/3 transform -translate-y-1/2 bg-[#A7A9AC] h-px w-10 sm:w-12 md:w-16"></div>
              Adaired Digital Media
            </h5>
            <h2 className="text-[1.688rem] md:text-4xl ">
              A Marketing Firm Driven To Accelerate Your Business Growth
            </h2>
            <p className=" text-base sm:text-lg text-justify md:text-left">
              Founded in 2015, Adaired is a versatile digital marketing firm
              that empowers businesses to thrive online through its time-tested
              and effective digital marketing services. We are more than just
              another industry survivor; we are creators, inventors, and
              catalysts for your company&apos;s growth. We stand out by
              consistently delivering innovative solutions, pushing limits, and
              redefining the idea of success.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-col sm:flex-row">
              <div className="flex flex-col items-center border p-4 md:p-0 md:border-none md:items-start ">
                <CldImage
                  src="Static Website Images/homepage_about2"
                  alt="Workstation"
                  height={60}
                  width={60}
                  className="border rounded-lg p-2 mb-2"
                />
                <h3 className="relative py-2 font-nunito font-semibold text-xl">
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 md:translate-x-0  md:left-0 bg-[#A7A9AC] h-0.5 w-16 rounded-lg"></div>
                  Innovative Mindset
                </h3>
                <p className="text-base sm:text-lg">
                  Known for our innovative mindset, Adaired&apos;s qualified
                  digital marketers use creativity to craft tailored strategies
                  that meet your unique needs and goals.
                </p>
              </div>
              <div className="flex flex-col items-center border p-4 md:p-0 md:border-none md:items-start ">
                <CldImage
                  src="Static Website Images/homepage_about1"
                  alt=""
                  height={60}
                  width={60}
                  className="border rounded-lg p-2 mb-2 "
                />
                <h3 className="relative py-2 font-nunito font-semibold text-xl">
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 bg-[#A7A9AC] h-0.5 w-16 rounded-lg"></div>
                  Data-Driven Strategies
                </h3>
                <p className="text-base sm:text-lg">
                  Adaired utilizes in-depth analysis of consumer behavior and
                  market research to develop data-backed strategies for ongoing
                  company success.
                </p>
              </div>
            </div>
            <p className="font-baby text-lg sm:text-2xl font-semibold ">
              &quot;The internet is becoming the town square for the global
              village of tomorrow.&quot; -
              <i className="text-[#92288D]">Bill Gates</i>
            </p>
            <p className="text-base sm:text-lg hidden xl:block">
              At Adaired, we know very well how to turn visitors into leads,
              leads into customers, and customers into business promoters. Our
              comprehensive services aid businesses to grow online, increase
              exposure, and ultimately become the leader in the industry.
            </p>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="py-2 space-y-2">
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
          <h5 className="inline font-nunito text-[#515151] relative px-4 text-lg">
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 bg-[#A7A9AC] h-px w-16"></div>
            <div className="absolute top-1/2 right-full transform -translate-y-1/2 bg-[#A7A9AC] h-px w-16"></div>
            How We Work
          </h5>
          <h2 className="text-[1.688rem] md:text-4xl py-1">Our Process</h2>
          <p className=" pb-10 text-base sm:text-lg max-w-[900px]">
            No need to settle for okay when we can serve you the best! Our
            strategies are meticulously crafted to spark creativity, boost
            engagement, and achieve the impossible.
          </p>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="hidden lg:block xl:max-w-[1440px] lg:max-w-screen-lg">
        <div className="relative min-h-[28rem]">
          <div className="work-process__box_1 flex flex-col justify-center absolute lg:min-h-40 bottom-[-5%] xl:bottom-0 left-0 xl:left-[5%] 2xl:left-0 2xl:max-w-sm xl:max-w-72 lg:max-w-72 max-w-56 break-words border text-center p-3 cursor-pointer work-process_1">
            <h3>Discovery and Planning</h3>
            <p className="text-base">
              Research the business&apos;s landscape, target audience, and
              specific goals to create a roadmap, ensuring a solid foundation
              for success.
            </p>
          </div>
          <div className="flex flex-col justify-center absolute lg:min-h-40 left-11 xl:left-[12%] 2xl:left-[6%] bottom-16 xl:bottom-1/4 -translate-y-1/2 2xl:max-w-sm xl:max-w-72 lg:max-w-72 max-w-64 border text-center p-3 work-process__icon_1">
            <h3>Strategic Execution</h3>
            <p className="text-base">
              Seamlessly execute tailored strategies to elevate your brand and
              maximize your digital impact.
            </p>
          </div>
          <div className="flex flex-col justify-center absolute lg:min-h-40 left-1/2 -translate-x-1/2 lg:top-[20%] xl:top-0 2xl:max-w-sm xl:max-w-72 lg:max-w-72 max-w-64 border text-center p-3">
            <h3>Comprehensive Analysis</h3>
            <p className="text-base">
              As the campaigns unfold, conduct in-depth analyses to measure
              performance, user engagement, and campaign effectiveness.
            </p>
          </div>
          <div className="flex flex-col justify-center absolute lg:min-h-40 right-11 xl:right-[12%] 2xl:right-[6%] bottom-16 xl:bottom-1/4 -translate-y-1/2 2xl:max-w-sm xl:max-w-72 lg:max-w-72 max-w-64 border text-center p-3">
            <h3>Ongoing Optimization</h3>
            <p className="text-base">
              Continuously optimize campaigns based on emerging trends, user
              behavior, and platform algorithms to remain adaptive and
              impactful.
            </p>
          </div>
          <div className="flex flex-col justify-center absolute lg:min-h-40 bottom-[-5%] xl:bottom-0 right-0 xl:right-[5%] 2xl:right-0 2xl:max-w-sm xl:max-w-72 lg:max-w-72 max-w-64 border text-center p-3">
            <h3>Evaluation and Reporting</h3>
            <p className="text-base">
              Regular evaluation and reporting provide valuable insights into
              strategy effectiveness, progress tracking, and decision-making.
            </p>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-3.5rem] w-full max-w-xs lg:max-w-md xl:max-w-xl l">
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
    <MaxWidthWrapper className="grid sm:grid-cols-2 gap-y-10 sm:gap-x-10 lg:gap-x-24 py-12 lg:py-20">
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
        <div className="bg-white py-5 px-8 lg:py-8 lg:px-12 border mx-auto -mt-9 lg:-mt-14 text-center w-4/5 relative z-1 ">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-4xl ">
            Our Workstation
          </h2>
          <div className="absolute -left-3 -bottom-3 lg:-left-5  lg:-bottom-5 border-l-4 border-b-4 border-[#BC1D8D] h-8 w-8 lg:h-12 lg:w-12"></div>
          <div className="absolute -right-3 -bottom-3 lg:-right-5  lg:-bottom-5 border-r-4 border-b-4 border-[#BC1D8D] h-8 w-8 lg:h-12 lg:w-12"></div>
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
        <div className="bg-white py-5 px-8 lg:py-8 lg:px-12 border mx-auto -mt-9 lg:-mt-14 text-center w-4/5 relative z-1 ">
          <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-4xl ">
            40+Team Members
          </h2>
          <div className="absolute -left-3 -bottom-3 lg:-left-5  lg:-bottom-5 border-l-4 border-b-4 border-[#BC1D8D] h-8 w-8 lg:h-12 lg:w-12"></div>
          <div className="absolute -right-3 -bottom-3 lg:-right-5  lg:-bottom-5 border-r-4 border-b-4 border-[#BC1D8D] h-8 w-8 lg:h-12 lg:w-12"></div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

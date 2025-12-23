import { Icons } from '@web-components/Icons';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import PageBanner from '@web-components/PageBanner';
import { hexToHexWithOpacity } from '@core/utils/hexToHexWithOpacity';
import { cn } from '@core/utils/class-names';
import Image from 'next/image';
import React from 'react';
import parse from 'html-react-parser';
import type { Metadata } from 'next';
//update
// export async function generateStaticParams() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/case-studies/all`
//   ).then((res) => res.json());
//   const CaseStudies = res.result;
//   return CaseStudies.map((CaseStudy: any) => ({
//     slug: CaseStudy.slug.toString(),
//   }));
// }
export async function generateStaticParams() {
  try {
    const API_URL = process.env.OLD_API_URI;

    if (!API_URL) {
      console.warn("OLD_API_URI not defined at build time");
      return [];
    }

    const res = await fetch(
      `${API_URL}/api/v1/case-studies/all`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch case studies:", res.status);
      return [];
    }

    const data = await res.json();
    const caseStudies = data?.result ?? [];

    return caseStudies.map((cs: any) => ({
      slug: String(cs.slug),
    }));
  } catch (error) {
    console.error("generateStaticParams(case-studies) failed:", error);
    return [];
  }
}

async function getCaseStudyData({ slug }: { slug: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/case-studies/${slug}`
  );
  const data = await res.json();
  return data.result;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getCaseStudyData({
    slug: params.slug,
  });
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URI}`),
    title: data.metaTitle
      ? data.metaTitle
      : `Adaired Case Studies: See How We Help Businesses Thrive`,
    description: data.metaDescription
      ? data.metaDescription
      : `Discover how Adaired transformed businesses like yours with simple, engaging case studies highlighting real success. Know how we can support your goals now!`,
    alternates: {
      canonical: `/case-studies/${params.slug}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

async function fetchCaseStudyCategory({ slug }: { slug: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/case-studies-category/getCaseStudiesCategory/${slug}`,
    {
      method: 'GET',
    }
  );
  const data = await res.json();
  return data.result;
}

async function page({ params }: { params: { slug: string } }) {
  const caseStudyData = await getCaseStudyData(params);
  const caseStudyCategory = await fetchCaseStudyCategory({
    slug: caseStudyData.category,
  });

  return (
    <>
      <PageBanner title="Case Study" />
      <Introsection
        subHeading={caseStudyData.subHeading}
        caseStudyName={caseStudyData.caseStudyName}
        caseStudyDescription={caseStudyData.caseStudyDescription}
        caseStudyImage={caseStudyData.caseStudyImage}
        colorScheme={caseStudyData.colorScheme}
      />
      <Aboutsection
        aboutProjectDescription={caseStudyData.aboutProjectDescription}
        challengesImage={caseStudyData.challengesImage}
        challengesDescription={caseStudyData.challengesDescription}
        solutionsImage={caseStudyData.solutionsImage}
        challengesAndSolutions={caseStudyData.challengesAndSolutions}
      />
      <TechnologiesUsedsection
        technologiesUsedTitle={caseStudyData.technologiesUsedTitle}
        technologiesUsedDescription={caseStudyData.technologiesUsedDescription}
        technologiesUsed={caseStudyData.technologiesUsed}
        categoryData={caseStudyCategory.technologies}
      />
      <Goalssection
        goalsTitle={caseStudyData.goalsTitle}
        goalsDescription={caseStudyData.goalsDescription}
        goalImage={caseStudyData.goalImage}
        growthBox={caseStudyData.growthBox}
        colorScheme={caseStudyData.colorScheme}
        objectives={caseStudyData.objectives}
        stratergy={caseStudyData.stratergy}
      />
      <Resultsection
        resultDescription={caseStudyData.resultDescription}
        resultFinalDescription={caseStudyData.resultFinalDescription}
        colorScheme={caseStudyData.colorScheme}
        resultBox={caseStudyData.resultBox}
      />
    </>
  );
}

export default page;

interface IntrosectionProps {
  subHeading: string;
  caseStudyName: string;
  caseStudyDescription: string;
  caseStudyImage: string;
  colorScheme: string;
}
const Introsection = ({
  subHeading,
  caseStudyName,
  caseStudyDescription,
  caseStudyImage,
  colorScheme,
}: IntrosectionProps) => {
  const themeColor = hexToHexWithOpacity(colorScheme, 0.5);
  return (
    <section className="py-6 lg:py-12">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center text-center">
          <h5 className="relative inline px-4 font-nunito text-base text-[#515151] sm:text-lg">
            <div className="absolute left-full top-1/2 hidden h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC] sm:block"></div>
            <div className="absolute right-full top-1/2 hidden h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC] sm:block"></div>
            {subHeading}
          </h5>
          <h2 className="py-2 text-[1.688rem] md:text-4xl">{caseStudyName}</h2>
          <p className="hyphens-auto py-2 text-justify text-base sm:text-center sm:text-lg">
            {caseStudyDescription}
          </p>
        </div>
      </MaxWidthWrapper>
      <div className="relative">
        <MaxWidthWrapper>
          <div className="relative z-10 flex items-center justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${caseStudyImage}`}
              alt="hero image"
              priority
              width={1000}
              height={400}
              blurDataURL={`${process.env.NEXT_PUBLIC_IMG_URL}${caseStudyImage}`}
            />
          </div>
        </MaxWidthWrapper>
        <div className="absolute bottom-0 left-0 z-0 h-full w-full">
          <svg
            viewBox="0 0 1920 391"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0"
          >
            <path
              d="M0 237.762C541.5 -74.738 1431 -83.738 1920 237.762V390.262H0V237.762Z"
              fill={themeColor}
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

interface AboutsectionProps {
  aboutProjectDescription: string;
  challengesImage: string;
  solutionsImage: string;
  challengesDescription: string;
  challengesAndSolutions: any;
}
const Aboutsection = ({
  aboutProjectDescription,
  challengesImage,
  solutionsImage,
  challengesDescription,
  challengesAndSolutions,
}: AboutsectionProps) => {
  return (
    <section className="pb-6 lg:pb-12">
      <MaxWidthWrapper className="pb-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="py-2 text-[1.688rem] md:text-4xl">
            About the project
          </h2>
          <p className="hyphens-auto py-2 text-justify text-base sm:text-center sm:text-lg">
            {aboutProjectDescription}
          </p>
        </div>
      </MaxWidthWrapper>
      <section className={cn('flex flex-col-reverse lg:flex-row')}>
        <div className="flex w-full justify-end lg:w-1/2">
          <div className="space-y-4 px-4 py-4 lg:max-w-[720px] lg:p-10 lg:pl-6">
            <h2 className="text-[1.688rem] md:text-4xl">The Challenges</h2>
            <p className="hyphens-auto text-justify text-base sm:text-left sm:text-lg">
              {challengesDescription}
            </p>
            <ul className="space-y-4">
              {challengesAndSolutions.map((item: any) => (
                <li
                  key={item.title}
                  className="flex gap-1 border px-1 py-2 text-base sm:text-lg"
                >
                  <Icons.CharmSquareTick className="mt-1 shrink-0" />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cover w-full lg:w-1/2">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${challengesImage}`}
            alt="hero image"
            width={1000}
            height={400}
            blurDataURL={`${process.env.NEXT_PUBLIC_IMG_URL}${challengesImage}`}
            className="h-full w-full object-cover"
          />
        </div>
      </section>
      <section className={cn('flex flex-col lg:flex-row')}>
        <div className="w-full lg:w-1/2">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${solutionsImage}`}
            alt="hero image"
            width={1000}
            height={400}
            blurDataURL={`${process.env.NEXT_PUBLIC_IMG_URL}${solutionsImage}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="space-y-4 px-4 py-4 lg:max-w-[720px] lg:p-10 lg:pr-6">
            <h2 className="text-[1.688rem] md:text-4xl">The Solutions</h2>
            <p className="hyphens-auto text-justify text-base sm:text-left sm:text-lg">
              {challengesDescription}
            </p>
            <ul className="space-y-4">
              {challengesAndSolutions.map((item: any, index: number) => (
                <li key={item.content}>
                  <div className="flex gap-2">
                    {/* <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-[#BC1D8D] border-b-4 border-b-transparent shrink-0" /> */}
                    <h3>{index + 1}.</h3>
                    <div className="text-base sm:text-lg">
                      {parse(item.content)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};

interface TechnologiesUsedsectionProps {
  technologiesUsedTitle: string;
  technologiesUsedDescription: string;
  technologiesUsed: string[];
  categoryData: any;
}
const TechnologiesUsedsection = ({
  technologiesUsedTitle,
  technologiesUsedDescription,
  technologiesUsed,
  categoryData,
}: TechnologiesUsedsectionProps) => {
  return (
    <section className="pb-6 lg:pb-12">
      <MaxWidthWrapper className="space-y-3">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="py-2 text-[1.688rem] md:text-4xl">
            {technologiesUsedTitle}
          </h2>
          <p className="hyphens-auto py-2 text-justify text-base sm:text-center sm:text-lg">
            {technologiesUsedDescription}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {technologiesUsed.map((item) => {
            const category = categoryData.find(
              (category: any) => category._id === item
            );
            return (
              <div
                key={item}
                className="flex min-h-32 items-center justify-center rounded-lg border p-6"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${category.icon}`}
                  alt="Technology used image"
                  width={150}
                  height={150}
                  blurDataURL={`${process.env.NEXT_PUBLIC_IMG_URL}${category.icon}`}
                />
              </div>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

interface GoalssectionProps {
  goalsTitle: string;
  goalsDescription: string;
  goalImage: string;
  growthBox: any;
  colorScheme: string;
  objectives: any;
  stratergy: any;
}
const Goalssection = ({
  goalsTitle,
  goalsDescription,
  goalImage,
  growthBox,
  colorScheme,
  objectives,
  stratergy,
}: GoalssectionProps) => {
  const themeColor = hexToHexWithOpacity(colorScheme, 0.5);
  const rgbaToHex = (rgba: string): string => {
    const hexValues = rgba
      .match(/\d+(?:\.\d+)?/g)
      ?.slice(0, 4) // Capture decimals for alpha
      .map((x: string, index: number) => {
        if (index === 3) {
          // Handle alpha: convert decimal to integer between 0-255
          const alpha = Math.round(parseFloat(x) * 255);
          return alpha.toString(16).padStart(2, '0');
        } else {
          return parseInt(x).toString(16).padStart(2, '0');
        }
      });

    return '#' + (hexValues?.join('') ?? '');
  };

  const hexColor = rgbaToHex(themeColor);

  return (
    <section
      className={`${cn('relative py-6 lg:py-12')} ${hexColor ? 'bg-[' + hexColor + ']' : ''} ${hexColor ? 'lg:bg-transparent' : ''} `}
    >
      <div className="absolute left-0 top-0 hidden h-full w-full lg:block">
        <svg
          viewBox="0 0 1920 1242"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-0"
        >
          <path
            d="M0 0H1920V899.5C1920 1088.66 1766.66 1242 1577.5 1242H342.5C153.343 1242 0 1088.66 0 899.5V0Z"
            fill={themeColor}
          />
        </svg>
      </div>
      <MaxWidthWrapper className="relative z-10">
        <div className="flex flex-col items-center justify-center pb-6 text-center lg:bg-none">
          <h2 className="py-2 text-[1.688rem] md:text-4xl">{goalsTitle}</h2>
          <p className="hyphens-auto py-2 text-justify text-base sm:text-center sm:text-lg">
            {goalsDescription}
          </p>
        </div>
        <div className="flex flex-col gap-10 pb-10 lg:flex-row lg:gap-20 lg:bg-none xl:gap-32">
          <div className="space-y-3 rounded-2xl bg-white p-6 shadow-2xl sm:p-10">
            <h2 className="text-[1.688rem] md:text-4xl">Objectives</h2>
            <ul>
              {objectives.map((item: any, index: number) => (
                <li
                  key={item.title}
                  className="hyphens-auto text-justify sm:hyphens-none sm:text-left"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-0 w-0 shrink-0 border-b-4 border-l-8 border-t-4 border-b-transparent border-l-[#BC1D8D] border-t-transparent" />
                      <h3>{index + 1}</h3>
                    </div>
                    <p className="text-base sm:text-lg">{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 rounded-2xl bg-white p-6 shadow-2xl sm:p-10">
            <h2 className="text-[1.688rem] md:text-4xl">Stratergy</h2>
            <ul>
              {stratergy.map((item: any, index: number) => (
                <li
                  key={item.title}
                  className="hyphens-auto text-justify sm:hyphens-none sm:text-left"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-0 w-0 shrink-0 border-b-4 border-l-8 border-t-4 border-b-transparent border-l-[#BC1D8D] border-t-transparent" />
                      <h3>{index + 1}</h3>
                    </div>
                    <p className="text-base sm:text-lg">{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="shadow-2xl sm:shadow-none">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${goalImage}`}
            alt="goals image"
            width={1400}
            height={400}
            blurDataURL={`${process.env.NEXT_PUBLIC_IMG_URL}${goalImage}`}
          />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:-mt-20 sm:grid-cols-3 lg:px-10">
          {growthBox.map((item: any) => (
            <div
              className="relative flex flex-col items-center justify-center rounded-3xl border bg-white p-5 shadow-2xl sm:shadow-none md:space-y-1 lg:p-10"
              style={{
                borderColor: colorScheme,
              }}
              key={item.title}
            >
              <Icons.UpArrow
                className="absolute -top-6 rounded-full border p-2 text-5xl text-white"
                style={{
                  backgroundColor: colorScheme,
                  borderColor: colorScheme,
                }}
              />
              <h2
                className="text-center text-xl sm:text-2xl md:text-4xl"
                style={{
                  color: colorScheme,
                }}
              >
                {item.title}
              </h2>
              <p className="text-center text-base md:text-lg">{item.content}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

interface ResultsectionProps {
  resultDescription: string;
  colorScheme: string;
  resultBox: any;
  resultFinalDescription: string;
}
const Resultsection = ({
  resultDescription,
  resultBox,
  colorScheme,
  resultFinalDescription,
}: ResultsectionProps) => {
  return (
    <section className="py-6 lg:py-12">
      <MaxWidthWrapper className="space-y-5">
        <h2 className="inline-block text-[1.688rem] md:text-4xl">
          Result:
          <div
            className="h-0.5 w-full"
            style={{
              backgroundColor: colorScheme,
            }}
          />
        </h2>
        <p className="hyphens-auto text-justify sm:hyphens-none sm:text-left">
          {resultDescription}
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {resultBox.map((item: any) => (
            <div
              className="flex gap-3 space-y-1 border bg-white p-5"
              style={{
                borderColor: colorScheme,
              }}
              key={item.title}
            >
              <Icons.SimpleIcon
                style={{
                  borderColor: colorScheme,
                }}
                className="shrink-0 rounded-lg border p-2 text-5xl"
              />
              <div>
                <h3 className="font-nunito text-xl font-bold">
                  {item.title}
                  <div
                    className="h-0.5 w-10"
                    style={{
                      backgroundColor: colorScheme,
                    }}
                  />
                </h3>
                <p
                  className="text-base sm:text-lg"
                  style={{
                    color: colorScheme,
                  }}
                >
                  {item.percentage}
                </p>
                <p className="text-base sm:text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="hyphens-auto text-justify text-base sm:hyphens-none sm:text-left sm:text-lg">
          {resultFinalDescription}
        </p>
      </MaxWidthWrapper>
    </section>
  );
};

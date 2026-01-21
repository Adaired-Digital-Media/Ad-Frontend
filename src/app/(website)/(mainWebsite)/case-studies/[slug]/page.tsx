'use client';
import PageBanner from '@web-components/PageBanner';
import TestimonialSlider from '@web-components/TestimonialSlider';
import BlogCards from '@web-components/BlogCard/BlogCards';
import CaseStudyCards from '@web-components/CaseStudyCards';
import { Suspense, useEffect, useState } from 'react';
import type { Metadata } from 'next';
import { Base3URL, BaseURL } from '@/baseUrl';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import MaxWidthWrapper from '@/app/(website)/components/MaxWidthWrapper';
import SaveAndCancel from '@/app/(website)/common/SaveAndCancel';
import { LuCircleCheckBig } from 'react-icons/lu';

interface CaseStudy {
  title: string;
  description: string;
  image: string;
  bodyData: any[];
}

const CaseStudies = () => {
  const { slug } = useParams(); // ✅ SLUG HERE
  const [caseStudies, setCaseStudies] = useState<CaseStudy | null>(null);
  const getData = async () => {
    const res = await axios.get(
      `https://backend-ts-wo0v.onrender.com/case-study/slug/${slug}`
    );
    setCaseStudies(res?.data?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(caseStudies, 'caseStudies>>>>>>>>>>>>>>>>>jds');
  return (
    <>
      <PageBanner title="Case Studies" />
      <Suspense fallback={<p>Loading feed...</p>}>
        <MaxWidthWrapper className="py-[3rem] lg:py-[4rem] xl:py-[6rem]">
          <div>
            <h2 className="mb-3 text-2xl font-bold leading-[3rem]">
              {caseStudies?.title}
            </h2>
            <p>{caseStudies?.description}</p>
            <div className="relative h-[20rem] w-full">
              {caseStudies?.image && (
                <div className="relative h-[20rem] w-full">
                  <Image
                    src={caseStudies.image}
                    alt={caseStudies.title || 'case study image'}
                    fill
                    className="mt-2 object-contain"
                  />
                </div>
              )}
            </div>
            {caseStudies?.bodyData?.map((item: any, index: number) => (
              <div key={index} className="mt-6">
                {item?.heading && (
                  <h2 className="mb-2 text-xl font-semibold">{item.heading}</h2>
                )}

                {item?.description && <p>{item.description}</p>}
                {item?.lists &&
                  item?.lists?.map((item: any) => {
                    return (
                      <div className="flex gap-2 space-y-3">
                        <LuCircleCheckBig
                          size={25}
                          className="my-auto text-[#FB9100]"
                        />
                        <p className="my-auto">{item}</p>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </Suspense>
    </>
  );
};

export default CaseStudies;

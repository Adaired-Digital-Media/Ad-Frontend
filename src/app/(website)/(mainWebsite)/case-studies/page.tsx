'use client';
import PageBanner from '@web-components/PageBanner';
import { getBlogsData, ProcessSection } from '../about/page';
import TestimonialSlider from '@web-components/TestimonialSlider';
import BlogCards from '@web-components/BlogCard/BlogCards';
import CaseStudyCards from '@web-components/CaseStudyCards';
import { Suspense, useEffect, useState } from 'react';
import type { Metadata } from 'next';
import { Base3URL, BaseURL } from '@/baseUrl';
import Blogs from '../../components/home/Blogs';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import axios from 'axios';
import Image from 'next/image';
import SaveAndCancel from '../../common/SaveAndCancel';
import { useRouter } from 'next/navigation';
//hello
const CaseStudies = () => {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState([0]);
  const getData = async () => {
    const res = await axios.get(
      `https://backend-ts-wo0v.onrender.com/case-study/`
    );
    setCaseStudies(res?.data?.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <PageBanner title="Case Studies" />
      <Suspense fallback={<p>Loading feed...</p>}>
        <MaxWidthWrapper className="py-[3rem] lg:py-[4rem] xl:py-[6rem]">
          {caseStudies.map((caseStudy: any, index) => (
            <div
              key={index}
              className={`my-[2rem] flex flex-col gap-[4rem] rounded-[0.35rem] border-[0.71px] border-[#000000]/5 px-[4rem] py-[3rem] md:flex-row ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* LEFT / TEXT */}
              <div className="relative w-full md:w-1/2">
                <span className="rounded-[0.25rem] bg-green-500 px-[1rem] py-[0.25rem] text-xxs text-[#ffffff]">
                  Summry
                </span>
                <h2 className="mb-3 font-medium">About the project</h2>
                <p>{caseStudy.projectDescription}</p>
                <SaveAndCancel
                  name={'View Case Study'}
                  isIcon={true}
                  handleClick={() =>
                    router.push(`/case-studies/${caseStudy?.slug}`)
                  }
                  buttonWidth={'!w-[16.5rem]'}
                  className="absolute bottom-10 left-0"
                />
              </div>

              {/* RIGHT / IMAGE */}
              <div className="w-full md:w-1/2">
                <h2 className="mb-3 text-2xl font-bold leading-[3rem]">
                  {caseStudy.title}
                </h2>
                <p>{caseStudy.description}</p>
                <div className="relative h-[20rem] w-full">
                  <Image
                    src={caseStudy.image}
                    alt="img"
                    fill
                    className="mt-2 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </MaxWidthWrapper>
      </Suspense>
      {/* <ProcessSection /> */}
      <TestimonialSlider />
      {/* <BlogCards blogs={blogs} /> */}
      <Blogs />
    </>
  );
};

export default CaseStudies;

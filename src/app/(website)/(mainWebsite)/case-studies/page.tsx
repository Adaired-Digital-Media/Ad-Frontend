import PageBanner from "@/components/PageBanner";
import { ProcessSection } from "../about/page";
import TestimonialSlider from "@/components/TestimonialSlider";
import BlogCards from "@/components/BlogCard/BlogCards";
import CaseStudyCards from "@/components/CaseStudyCards";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adaired Case Studies: See How We Help Businesses Thrive",
  description:
    "Discover how Adaired transformed businesses like yours with simple, engaging case studies highlighting real success. Know how we can support your goals now!",
  alternates: {
    canonical: "https://www.daired.com/case-studies",
  },
};
async function getCaseStudyCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/case-studies-category/getCaseStudiesCategory/all`
  );
  const data = await res.json();
  return data.result;
}

async function getCaseStudies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/case-studies/all`
  );
  const data = await res.json();
  return data.result;
}

const CaseStudies = async () => {
  const categories = await getCaseStudyCategories();
  const caseStudies = await getCaseStudies();
  return (
    <>
      <PageBanner title="Case Studies" />
      <Suspense fallback={<p>Loading feed...</p>}>
        <CaseStudyCards categories={categories} caseStudies={caseStudies} />
      </Suspense>
      <ProcessSection />
      <TestimonialSlider />
      <BlogCards />
    </>
  );
};

export default CaseStudies;

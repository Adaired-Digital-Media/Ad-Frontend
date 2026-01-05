import PageBanner from '@web-components/PageBanner';
import { getBlogsData, ProcessSection } from '../about/page';
import TestimonialSlider from '@web-components/TestimonialSlider';
import BlogCards from '@web-components/BlogCard/BlogCards';
import CaseStudyCards from '@web-components/CaseStudyCards';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { BaseURL } from '@/baseUrl';

export const metadata: Metadata = {
  title: 'Adaired Case Studies: See How We Help Businesses Thrive',
  description:
    'Discover how Adaired transformed businesses like yours with simple, engaging case studies highlighting real success. Know how we can support your goals now!',
  alternates: {
    canonical: 'https://www.adaired.com/case-studies',
  },
};
async function getCaseStudyCategories() {
  const res = await fetch(`${BaseURL}/case-study/category/read`);
  const data = await res.json();
  return data.data;
}
console.log('categories1211212', 'categories>>>>');

async function getCaseStudies() {
  console.log('categories121', 'categories>>>>');

  const res = await fetch(`${BaseURL}/case-study/read`);
  const data = await res.json();
  return data.data;
}

const CaseStudies = async () => {
  const categories = await getCaseStudyCategories();
  console.log(categories, 'categories>>>>');

  const caseStudies = await getCaseStudies();
  console.log(caseStudies, 'caseStudies>>>>');

  const blogs = await getBlogsData();
  return (
    <>
      <PageBanner title="Case Studies" />
      <Suspense fallback={<p>Loading feed...</p>}>
        <CaseStudyCards categories={categories} caseStudies={caseStudies} />
      </Suspense>
      <ProcessSection />
      <TestimonialSlider />
      <BlogCards blogs={blogs} />
    </>
  );
};

export default CaseStudies;

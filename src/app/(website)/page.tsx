'use client';
export const dynamic = 'force-dynamic';
import MaxWidthWrapper from '@/app/(website)/components/MaxWidthWrapper';

import { InfiniteMovingCards } from '../../@core/ui/aceternity-ui/infinite-moving-cards';
import { AwardsSectionData } from '../../@core/data/website/Homepage';
import About from './components/home/About';
import Certificate from './components/home/Certificate';
import Services from './components/home/Service';
import Expect from './components/home/Expect';
import WhyChoose from './components/home/WhyChoose';
import CaseStudy from './components/home/CaseStudy';
import Testimonial from './components/home/Testimonial';
import Contact from './components/home/Contact';
import Blogs from './components/home/Blogs';
import Banner from './components/HereComponent/Banner';
import FAQ from './components/home/FAQ';
import Solutions from './components/home/Solutions';
import Clients from './components/home/Clients';

export default function HomePage() {
  return (
    <>
      <Banner />
      <Certificate />
      <Solutions />
      <Services />
      <Expect />
      <Clients />
      <WhyChoose />
      {/* <CaseStudy /> */}
      <About />
      <Testimonial />
      <Contact />
      <Blogs />
      <FAQ />
    </>
  );
}

const Awards = () => {
  return (
    <section className="bg-[#FAFDFF] py-6 sm:py-12">
      <MaxWidthWrapper>
        <div className="w-full py-2 antialiased">
          <InfiniteMovingCards
            items={AwardsSectionData}
            direction="right"
            speed="slow"
            itemClassName=" w-20 sm:w-32 h-auto lg:w-40 px-2 py-2 sm:py-5 sm:px-8"
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

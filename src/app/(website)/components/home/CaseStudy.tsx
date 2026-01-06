import { CaseStudySectionData } from '@/@core/data/website/Homepage';
import study_1 from '../../../../../public/assets/images/case_staudy/case_study.webp';
import study_2 from '../../../../../public/assets/images/case_staudy/case_study_2.webp';
import study_3 from '../../../../../public/assets/images/case_staudy/case_study_3.webp';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import Image from 'next/image';
import { IoIosArrowRoundForward } from 'react-icons/io';
import Button from '../../common/Button';
import SaveAndCancel from '../../common/SaveAndCancel';
import { BaseURL } from '@/baseUrl';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const CaseStudy = () => {
  const router = useRouter();
  const { image, subTitle, title, span, description } = CaseStudySectionData;
  const [caseStudies, setCaseStudies] = useState<any[]>([]);

  const studies = [
    {
      image: study_1,
      labels: ['Agency Analytics', 'Canva'],
      title: 'Green Choice Carpet Cleaning',
      description:
        'Green Choice Carpet Cleaning is a professional carpet cleaning service based in the United States. The company prides itself on providing eco-friendly and effective carpet cleaning solutions. With a commitment to customer satisfaction, Green Choice Carpet',
      bgColor: '#FFF4F3',
      link: '/case-studies/green-choice-carpet-cleaning',
    },
    {
      image: study_2,
      labels: ['Agency Analytics', 'Canva'],
      title: 'AMPT Calgary Electricians',
      description:
        'Every client is assigned a single point of contact who understands your objectives, keeps everything on track, and ensures effective communication from beginning to end. There will be no confusion or delays, only seamless project management.',
      bgColor: '#D7EBFF',
      link: '/case-studies/ampt-calgary-electricians',
    },
    {
      image: study_3,
      labels: ['Agency Analytics', 'Canva'],
      title: 'Bayside Heating and Cooling',
      description:
        'We believe in honesty at every step. You always know what we’re doing, why we’re doing it, and how it benefits your brand. Clear updates, open communication, and performance reports you can trust.',
      bgColor: '#E1F2E2',
      link: '/case-studies/bayside-heating-and-cooling',
    },
  ];
  const getCaseStudy = async () => {
    try {
      const res = await fetch(`${BaseURL}/case-study/read`);
      console.log(res, 'res>>>>DZODZ');

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const json = await res.json();

      // 👇 YOUR API RETURNS data[]
      setCaseStudies(json.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(caseStudies, 'caseStudies>>>>DZODZ');

  useEffect(() => {
    getCaseStudy();
  }, []);
  return (
    <section className="">
      <MaxWidthWrapper className="py-[2rem] lg:py-[6rem]">
        <div className="">
          <Heading
            subTitle={subTitle}
            title={title}
            span={span}
            isDecVarticle={true}
            description={description}
          />
        </div>
        <div className="grid grid-cols-1 gap-7 pt-[3.5rem] md:grid-cols-2 lg:grid-cols-3">
          {studies?.slice(0, 1)?.map((study, idx) => {
            return (
              <div
                key={idx}
                className={`rounded-3xl bg-[#FFF4F3] p-[1.5rem]`}
                style={{ backgroundColor: study.bgColor }}
              >
                <Image
                  src={study_1}
                  width={400}
                  height={258}
                  alt=""
                  className="transition-transform duration-500 ease-in-out hover:scale-110"
                />
                <div className="flex gap-2 py-[1rem]">
                  {study?.labels?.map((label: any) => {
                    return (
                      <span className="rounded-full border-[0.5px] border-[#000000] px-[1rem] py-[0.25rem] text-[12px] uppercase text-[#000000]">
                        {label ?? "Agency Analytics', 'Canva"}
                      </span>
                    );
                  })}
                </div>
                <div className="">
                  <h4 className="font-semibold">{study?.title}</h4>
                  <p className="pt-[0.5rem]">
                    {study.description.length > 140
                      ? study.description.slice(0, 140) + `...`
                      : study.description}
                  </p>
                  <SaveAndCancel
                    name={'View Details'}
                    isBgWhite={true}
                    isIcon={true}
                    className="mt-[2rem]"
                    handleClick={() => router.push(`${study?.link}`)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default CaseStudy;

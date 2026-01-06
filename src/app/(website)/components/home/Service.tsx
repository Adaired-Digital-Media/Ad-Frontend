import React, { useEffect, useRef, useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import { ServiceSectionData } from '@/@core/data/website/Homepage';
import Image from 'next/image';
import SaveAndCancel from '../../common/SaveAndCancel';
import check from '../../../../../public/assets/icons/blue_check.png';
import { useRouter } from 'next/navigation';

const Service = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const { subtitle, title, span, description, services } = ServiceSectionData;

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (el) => el === entry.target
            );

            if (index !== -1) {
              setActiveTab(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // 👈 center detection
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#F1F1F1] py-[8rem]">
      <MaxWidthWrapper>
        <Heading
          subTitle={subtitle}
          title={title}
          span={span}
          isBgWhite
          description={description}
          isInCenter
        />

        <div className="grid grid-cols-4 gap-[1rem] pt-[3rem]">
          {/* LEFT TABS (STICKY) */}
          <div className="relative">
            <div className="sticky top-[15rem]">
              {services?.map((service, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === services.length - 1;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveTab(idx);
                      sectionRefs.current[idx]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }}
                  >
                    <h5
                      className={`cursor-pointer border px-4 py-6 hover:rounded-xl hover:border-[#FCA32A] hover:bg-[#FFFFFF] hover:text-[#000000] ${activeTab === idx ? 'rounded-xl border-[#FB9100] bg-white' : 'bg-[#F5F5F5]'} ${isFirst && 'rounded-t-xl'} ${isLast && 'rounded-b-xl'} `}
                    >
                      {service.title}
                    </h5>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-3 space-y-[2rem]">
            {services?.map((service, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                className="flex justify-between rounded-xl bg-white p-8"
              >
                {/* LEFT CONTENT */}
                <div className="w-[40%]">
                  {/* IMAGE WRAPPER */}
                  <div
                    className={`${activeTab === idx && 'transition-transform duration-500 group-hover:scale-110'} relative h-[320px] w-full overflow-hidden rounded-xl`}
                  >
                    <Image
                      src={service.img}
                      fill
                      alt={service.title}
                      className="object-cover"
                      priority
                    />
                  </div>

                  <h4 className="my-4 animate-[contentReveal_0.6s_120ms_both] font-bold">
                    {service.title}
                  </h4>

                  <p className="mb-6 animate-[contentReveal_0.6s_200ms_both]">
                    {service.description.length > 130
                      ? service.description.slice(0, 130) + `...`
                      : service.description}
                  </p>

                  <SaveAndCancel
                    handleClick={() => router.push(service.link)}
                    name="Learn More"
                    isIcon
                  />
                </div>

                {/* RIGHT LIST */}
                <div className="w-[58%]">
                  <div className="grid animate-[contentReveal_0.6s_300ms_both] grid-cols-2">
                    {service?.list?.map((item, i, arr) => {
                      const isLast = i === arr.length - 1;
                      const isSecondLast = i === arr.length - 2;

                      return (
                        <div
                          key={i}
                          className={`p-5 ${!(isLast || isSecondLast) && 'border-b border-black/10'} `}
                        >
                          <Image
                            src={check}
                            width={35}
                            height={35}
                            alt="check"
                            unoptimized
                            className="shrink-0"
                          />
                          <h5 className="w-[70%] pt-4 text-[1.15rem] font-medium">
                            {item}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Service;

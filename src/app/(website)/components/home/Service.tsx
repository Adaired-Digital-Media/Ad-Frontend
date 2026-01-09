'use client';

import React, { useEffect, useRef, useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import { ServiceSectionData } from '@/@core/data/website/Homepage';
import Image from 'next/image';
import SaveAndCancel from '../../common/SaveAndCancel';
import check from '../../../../../public/assets/icons/newStar.png';
import { useRouter } from 'next/navigation';
import { useScrollTabs } from '@/@core/hooks/useScrollTabs';
import { MdArrowOutward } from 'react-icons/md';

const Service = () => {
  const router = useRouter();
  const { subtitle, title, span, description, services } = ServiceSectionData;
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const servicesWrapperRef = useRef<HTMLDivElement | null>(null);
  const { activeTab, setActiveTab, isMobile, showMobileTab, mobileTabs } =
    useScrollTabs({
      items: services,
      sectionRefs,
      wrapperRef: servicesWrapperRef,
    });

  const getMobileTabs = () => {
    if (!services) return [];

    // First tab active → show only 2
    if (activeTab === 0) {
      return services.slice(0, 2).map((service, index) => ({
        ...service,
        position: index === 0 ? 'active' : 'next',
        realIndex: index,
      }));
    }

    // Any other tab → show prev, active, next
    const tabs = [];

    if (services[activeTab - 1]) {
      tabs.push({
        ...services[activeTab - 1],
        position: 'prev',
        realIndex: activeTab - 1,
      });
    }

    if (services[activeTab]) {
      tabs.push({
        ...services[activeTab],
        position: 'active',
        realIndex: activeTab,
      });
    }

    if (services[activeTab + 1]) {
      tabs.push({
        ...services[activeTab + 1],
        position: 'next',
        realIndex: activeTab + 1,
      });
    }

    return tabs;
  };

  return (
    <div
      ref={servicesWrapperRef}
      className="bg-[#F5F5F599] py-[3rem] lg:py-[6rem]"
    >
      <MaxWidthWrapper>
        <Heading
          subTitle={subtitle}
          title={title}
          span={span}
          isBgWhite
          description={description}
          isInCenter
        />

        <div className="flex gap-[2rem] pt-[3rem]">
          {/* MOBILE TABS */}
          {isMobile && showMobileTab && (
            <div className="fixed left-[1rem] right-[1rem] top-[5.5rem] z-50 bg-[#F1F1F1] py-2">
              <div className="flex items-center justify-center gap-2 overflow-hidden px-3">
                {getMobileTabs().map((tab) => {
                  const isActive = tab.position === 'active';

                  return (
                    <button
                      key={tab.realIndex}
                      onClick={() => {
                        setActiveTab(tab.realIndex);
                        sectionRefs.current[tab.realIndex]?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }}
                      className={`rounded-full border px-4 py-3 text-xxs font-medium transition-all duration-300 lg:rounded-xl lg:text-sm ${
                        isActive
                          ? 'scale-100 border-[#FB9100] bg-[#FB9100] text-[#FFFFFF]'
                          : 'scale-90 border-transparent bg-[#FFFFFF]'
                      } ${tab.position !== 'active' ? 'w-[45%]' : 'w-[70%]'} whitespace-nowrap`}
                    >
                      {tab.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---------------- LEFT TABS (DESKTOP) ---------------- */}
          {/* <div className="relative hidden lg:block">
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
                      className={`cursor-pointer border px-4 py-6 transition hover:rounded-xl hover:border-[#FCA32A] hover:bg-white ${
                        activeTab === idx
                          ? 'rounded-xl border-[#FB9100] bg-white'
                          : 'bg-[#F5F5F5]'
                      } ${isFirst && 'rounded-t-xl'} ${isLast && 'rounded-b-xl'} `}
                    >
                      {service.title}
                    </h5>
                  </div>
                );
              })}
            </div>
          </div> */}

          <div className="relative hidden w-[30%] lg:block">
            <div className="sticky top-[15rem] h-[35rem] rounded-xl bg-white p-[2rem]">
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
                    <div
                      onMouseEnter={() => setHoveredTab(idx)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className={`my-[1rem] flex h-[4rem] w-full cursor-pointer items-center rounded-full border px-[1.5rem] transition-all duration-300 ease-out hover:translate-y-[-2px] ${
                        activeTab === idx
                          ? 'bg-[#FCA32A] text-white'
                          : 'bg-[#F5F5F5]'
                      } ${
                        hoveredTab === idx
                          ? 'border-[#FCA32A] text-[#000000]'
                          : 'bg-[#F5F5F5]'
                      } `}
                    >
                      <div className="flex w-full items-center justify-between gap-3">
                        <p
                          className={`my-auto font-medium ${
                            activeTab === idx
                              ? 'text-[#ffffff]'
                              : 'text-[#000000]'
                          } ${
                            hoveredTab === idx
                              ? 'text-[#000000]'
                              : 'text-[#000000]'
                          }`}
                        >
                          {service.title}
                        </p>

                        {(activeTab === idx || hoveredTab === idx) && (
                          <MdArrowOutward
                            size={35}
                            className="shrink-0 rounded-full bg-white p-2 text-[#FCA32A] transition-transform duration-700 ease-out"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------- RIGHT CONTENT ---------------- */}
          <div className="w-[70%] space-y-[2rem]">
            {services?.map((service, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                className="block gap-[2rem] rounded-xl border-[1px] border-[#00000033]/20 bg-white p-8"
              >
                <div className="flex gap-2">
                  {/* LEFT CONTENT */}
                  <div className="w-full lg:w-[55%]">
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="relative h-[180px] w-full overflow-hidden rounded-2xl md:h-[240px] lg:h-[20.25rem]">
                        <Image
                          src={service.img}
                          fill
                          alt={service.title}
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT LIST */}
                  <div className="w-full lg:w-[45%]">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {service?.list?.slice(0, 4)?.map((item, i, arr) => {
                        return (
                          <div
                            key={i}
                            className={`flex gap-3 rounded-[15px] bg-[#FFF6EB] p-5 md:block`}
                          >
                            <Image
                              src={item?.icon}
                              width={40}
                              height={40}
                              alt="check"
                              unoptimized
                              className="my-auto"
                            />
                            <p className="my-auto font-poppins font-semibold text-[#000000] lg:pt-[1.7rem]">
                              {item?.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="my-2 text-center font-bold lg:my-4 lg:text-left">
                    {service.title}
                  </h2>

                  <p className="mb-6 text-center lg:text-left">
                    {/* {service.description.length > 130
                      ? service.description.slice(0, 130) + '...'
                      : service.description} */}
                    {service.description}
                  </p>

                  <SaveAndCancel
                    // handleClick={() => router.push(service.link)}
                    name="Learn More"
                    isIcon
                  />
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

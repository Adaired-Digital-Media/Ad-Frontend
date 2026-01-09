import { ServiceSectionData } from '@/@core/data/website/Homepage';
import Image from 'next/image';
import { useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import useHoverZoom from '@/@core/hooks/useHoverZoom';
import serviceBg from '../../../../../public/assets/images/home/what_we_do.png';
import seo from '../../../../../public/assets/images/home/seo-tag-3d-icon 1.png';
import check from '../../../../../public/assets/icons/check_1.svg';
import SaveAndCancel from '../../common/SaveAndCancel';
import { MdArrowOutward } from 'react-icons/md';
import useImageCenterAnimation from '@/@core/hooks/useImageCenterAnimation';
import { useRouter } from 'next/navigation';

const Services = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const { ref, className } = useImageCenterAnimation(
    {
      direction: 'left',
      delay: 650,
    },
    activeTab
  );
  const { subtitle, title, span, description, services } = ServiceSectionData;
  const zoom = useHoverZoom({
    scaleIn: 1.1,
    scaleOut: 0.9,
  });
  return (
    <section className="relative min-h-screen py-6 lg:py-[6rem]">
      {/* Backgrounds */}
      <Image
        src={serviceBg}
        fill
        alt="background"
        className="object-cover"
        priority
      />

      <div className="relative z-20">
        <MaxWidthWrapper>
          <div className="">
            <Heading
              subTitle={subtitle}
              title={title}
              span={span}
              description={description}
              isInCenter={true}
            />
          </div>

          {/* MAIN LAYOUT */}
          <div className="z-20 mt-[2.5rem] block h-[45rem] rounded-3xl lg:flex lg:bg-[#F5F5F5]">
            {/* LEFT SIDE - TABS */}
            <div className="z-20 w-full lg:w-[32%] lg:px-[4rem] lg:py-[2.5rem]">
              {services.map((service, idx) => {
                const isActive = activeTab === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveTab(idx)} // hover
                    onClick={() => setActiveTab(idx)} // click
                    className={`my-2 flex w-full cursor-pointer justify-between gap-2 rounded-full border-[4px] transition-all duration-300 ease-in-out lg:my-6 ${
                      isActive
                        ? 'scale-[1.02] border-[#FB9100] bg-[#FCA32A] py-[0.5rem] pl-[41px] pr-[11px] font-semibold text-white lg:w-[535px]'
                        : 'border-[#EFEFEF] bg-white px-[41px] py-[18px] text-black hover:scale-[1.02] hover:bg-[#1B5A96] hover:text-white lg:w-[440px]'
                    } `}
                  >
                    <h5
                      className={`${isActive ? 'text-white' : 'text-[#323232]'} my-auto`}
                    >
                      {service.title}
                    </h5>
                    {isActive && (
                      <MdArrowOutward
                        size={48}
                        className={`animate-zoomPulse rounded-full p-3 text-[#FCA32A] ${isActive ? 'bg-[#FFFFFF] text-[#FCA32A]' : 'text-black'}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT SIDE - ACTIVE CONTENT */}
            <div
              key={activeTab}
              className="animate- relative col-span-2 ml-[2rem] rounded-3xl border-[1px] border-[#FB910066] bg-[#FFFFFF] p-[1rem] lg:pl-[8rem] lg:pr-[4.5rem] lg:pt-[4rem]"
            >
              <h4 className="mb-4 animate-[contentReveal_0.6s_120ms_both] font-[700]">
                {services[activeTab].title}
              </h4>

              <p className="mb-6 animate-[contentReveal_0.6s_200ms_both]">
                {services[activeTab].description}
              </p>

              <div className="ml- animate-[contentReveal_0.6s_300ms_both] space-y-2">
                {services[activeTab].list?.map((item, i) => (
                  <div key={i} className="flex gap-4 py-1.5 text-black">
                    <Image
                      src={check}
                      width={30}
                      height={30}
                      alt="check"
                      className="my-auto"
                    />
                    <p className="font-medium">{item?.label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6 animate-[contentReveal_0.6s_420ms_both]">
                {/* {services[activeTab]?.lastPara} */}
              </p>
              <SaveAndCancel
                isBgWhite={false}
                isIcon={true}
                // handleClick={() =>
                //   services[activeTab]?.link &&
                //   router.push(services[activeTab].link)
                // }
                name={'Know More'}
                className="absolute bottom-16 animate-[contentReveal_0.7s_500ms_both]"
              />

              <div
                ref={ref}
                className={`absolute bottom-0 right-[2.5rem] hidden lg:block ${className}`}
              >
                <Image
                  key={activeTab}
                  src={services[activeTab]?.img}
                  width={512}
                  height={383}
                  alt="service visual"
                  className=""
                />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default Services;

import { WhyChooseSectionData } from '@/@core/data/website/Homepage';
import Image from 'next/image';
import { useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import useHoverZoom from '@/@core/hooks/useHoverZoom';
import chooseUsBg from '../../../../../public/assets/images/home/choose_us_bg_1.png';
import ChooseIcon from '../../../../../public/assets/icons/Group 26.png';
import ChooseIcon2 from '../../../../../public/assets/icons/Group 1000004066.png';
import curve from '../../../../../public/assets/icons/curve_Imag.png';

const WhyChoose = () => {
  const { subTitle, title, span, description, points } = WhyChooseSectionData;
  const [isHover, setIsHover] = useState<number | null>(1);
  return (
    <section className="relative py-[3rem] lg:py-[4rem] xl:py-[6rem]">
      {/* <Image src={chooseUsBg} fill alt="d" className="object-cover" priority /> */}
      <div className="relative z-20">
        <MaxWidthWrapper>
          <Heading
            subTitle={subTitle}
            title={title}
            span={span}
            description={description}
            isInCenter={true}
            isBgWhite={true}
          />
          <div className="grid grid-cols-1 gap-[1.5rem] py-[1rem] md:grid-cols-2 lg:mt-[6rem] lg:grid-cols-4">
            {points?.map((item, idx: any) => {
              const lastCard = idx === points.length - 1;
              const isSecond = idx === 1;
              const hovered = isHover === idx;
              const zoom = useHoverZoom({
                scaleIn: 1.1,
                scaleOut: 0.9,
              });
              return (
                <div
                  key={idx}
                  {...zoom.handlers}
                  onMouseEnter={() => setIsHover(idx)}
                  onMouseLeave={() => setIsHover(1)}
                  className="relative"
                >
                  <div
                    className={`h-[23rem] cursor-pointer rounded-3xl border-[1px] border-[#FB910040] bg-[#FFF8F0] p-[1.5rem] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl lg:mt-[-2.5rem] lg:h-[25rem] lg:p-[1.5rem]`}
                  >
                    <Image
                      src={item.icon}
                      width={70}
                      height={70}
                      alt="img"
                      className="rounded-xl border-[1px] border-[#FB910040] bg-[#FEDAAA66] p-3.5 text-[#000000]"
                    />
                    <h5
                      className={`pt-[2rem] text-left font-montserrat text-[25px] font-semibold leading-[35px] text-[#111111]`}
                    >
                      {item?.title}
                    </h5>
                    <p
                      className={`text-left font-montserrat text-[25px] font-semibold leading-[35px] text-[#111111]`}
                    >
                      {item?.span}
                    </p>
                    <p className={`pt-[1.5rem] text-left text-[#323232B2]`}>
                      {/* {item?.description.length > 140
                        ? item?.description.slice(0, 140) + '...'
                        : item?.description} */}
                        {item?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default WhyChoose;

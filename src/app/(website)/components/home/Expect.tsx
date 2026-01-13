import { ExpectSectionData } from '@/@core/data/website/Homepage';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import Image from 'next/image';
import CountUp from '../CountUp';
import useImageAnimation from '@/@core/hooks/useImageAnimation';
import expectImg from '../../../../../public/assets/images/home/expect.png';
import queen from '../../../../../public/assets/icons/Queen.png';
import { useState } from 'react';

const Expect = () => {
  const [hover, setHover] = useState(null);
  const { image, subTitle, title, description, points, para2, records } =
    ExpectSectionData;
  const { ref, className } = useImageAnimation({
    direction: 'left',
    delay: 350,
  });
  return (
    <section className="1bg-[#F5F5F580]">
      <MaxWidthWrapper className="py-[3rem] lg:py-[4rem] xl:py-[6rem]">
        <div className="">
          <Heading
            isDecVarticle={true}
            subTitle={subTitle}
            title={title}
            span=""
            description={description}
          />
        </div>
        <div className="relative grid grid-cols-1 gap-[1rem] pt-7 lg:grid-cols-2 xl:gap-[2rem]">
          {/* Content Section */}
          <div
            ref={ref}
            className={`relative h-[20rem] w-full lg:h-[34rem] xl:h-[660px] ${className}`}
          >
            <Image
              src={expectImg}
              alt="About Image"
              fill
              className="rounded-3xl object-cover p-1"
            />
          </div>
          <div className="flex-1 p-2 text-center lg:text-left">
            {/* Points Section */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2">
              {records?.map((record, idx: any) => {
                const isHovered = hover === idx;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHover(idx)}
                    onMouseLeave={() => setHover(null)}
                    className={`rounded-3xl border-[1px] border-[#00000026]/10 p-[1.8rem] transition-all duration-300 lg:p-[1rem] xl:px-[2rem] xl:py-[1.5rem] ${
                      isHovered
                        ? 'border-[0px] border-[#FFFFFF] bg-gradient-to-br from-[#FB9100] to-[#000000]'
                        : 'bg-white'
                    } `}
                  >
                    <div
                      className={`text-left text-xl font-semibold transition-colors duration-300 xl:text-[50px] ${isHovered ? 'text-white' : 'text-[#FB9100]'} `}
                    >
                      <CountUp end={record.number} />
                      {record.suffix}
                      <span className="text-[20px]">{record.suffix2}</span>
                    </div>

                    <h5
                      className={`pt-[0.5rem] text-left transition-colors duration-300 xl:pb-[1rem] xl:pt-[2.25rem] ${isHovered && 'text-white'} `}
                    >
                      {record.name}
                    </h5>

                    <p
                      className={`text-left transition-colors duration-300 ${isHovered && 'text-white'} `}
                    >
                      {record.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Expect;

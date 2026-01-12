import Image from 'next/image';
import certificate_1 from '../../../../../public/assets/images/ai/ai_1.svg';
import certificate_2 from '../../../../../public/assets/images/ai/ai_2.svg';
import certificate_3 from '../../../../../public/assets/images/ai/ai_3.svg';
import certificate_4 from '../../../../../public/assets/images/ai/ai_4.svg';
import certificate_5 from '../../../../../public/assets/images/ai/ai_5.svg';
import certificate_6 from '../../../../../public/assets/images/ai/ai_6.svg';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';

const Certificate = () => {
  const certificates = [
    certificate_1,
    certificate_2,
    certificate_3,
    certificate_4,
    certificate_5,
    certificate_6,
  ];

  // duplicate array for seamless loop
  const sliderItems = [...certificates, ...certificates];

  return (
    <section
      className={
        'bg-[#F9F9F9] py-[3rem] lg:py-[6rem]'
      }
    >
      {/* viewport */}

      <MaxWidthWrapper>
        <Heading
          subTitle={'AI Growth Catalyst'}
          title={'Propelling Businesses into the Spotlight'}
          span={'through Intelligent AI'}
          description={
            'Ensuring businesses gain visibility in AI responses, increasing brand mentions, trustworthiness, and discoverability across modern large language models.'
          }
          isInCenter={true}
          isBgWhite={true}
        />
        <div className="w-full overflow-hidden pt-[4rem]">
          {/* sliding track */}
          <div className="flex w-max animate-marquee gap-[7rem] md:bg-transparent md:py-0">
            {sliderItems.map((cert, idx) => (
              <div key={idx} className={`relative my-auto flex-shrink-0 p-4`}>
                <Image
                  src={cert}
                  alt={`Certificate ${idx + 1}`}
                  width={130}
                  height={40}
                  quality={100}
                  className="h-[1.25rem] w-[6.125rem] object-contain transition duration-300 hover:scale-110 lg:h-[2.5rem] lg:w-[8.125rem]"
                />
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Certificate;

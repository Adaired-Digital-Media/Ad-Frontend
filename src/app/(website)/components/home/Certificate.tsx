import Image from 'next/image';
import certificate_1 from '../../../../../public/assets/images/certificate/Amazon-Ads.png';
import certificate_2 from '../../../../../public/assets/images/certificate/bing_add.png';
import certificate_3 from '../../../../../public/assets/images/certificate/GooglePartner.png';
import certificate_4 from '../../../../../public/assets/images/certificate/klavivo.png';
import certificate_5 from '../../../../../public/assets/images/certificate/Meta-Logo.png';
import certificate_6 from '../../../../../public/assets/images/certificate/shopify.png';
import certificate_7 from '../../../../../public/assets/images/certificate/Semrush_logo 1.png';

const Certificate = ({ className }: any) => {
  const certificates = [
    certificate_7,
    certificate_3,
    certificate_2,
    certificate_6,
    certificate_4,
    certificate_1,
    certificate_5,
  ];

  // duplicate array for seamless loop
  const sliderItems = [...certificates, ...certificates];

  return (
    <section className={className}>
      {/* viewport */}
      <div className="w-full overflow-hidden">
        {/* sliding track */}
        <div className="animate-marquee flex w-max gap-10 bg-[#FFFBF6] py-[1rem] md:bg-transparent md:py-0">
          {sliderItems.map((cert, idx) => (
            <div
              key={idx}
              className={`relative my-auto flex-shrink-0 ${
                cert === certificate_6
                  ? 'h-[120px] w-[120px] lg:h-[190px] lg:w-[167px]'
                  : 'h-[100px] w-[110px] lg:h-[45px] lg:w-[220px]'
              }`}
            >
              <Image
                src={cert}
                alt={`Certificate ${idx + 1}`}
                fill
                quality={100}
                className="object-contain transition duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificate;

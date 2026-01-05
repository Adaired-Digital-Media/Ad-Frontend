import Image from 'next/image';
import MaxWidthWrapper from '../MaxWidthWrapper';
import certificate_1 from '../../../../../public/assets/images/certificate/Group 4 (1).png';
import certificate_2 from '../../../../../public/assets/images/certificate/Group 4 (2).png';
import certificate_3 from '../../../../../public/assets/images/certificate/Group 4 (3).png';
import certificate_4 from '../../../../../public/assets/images/certificate/Group 4 (4).png';
import certificate_5 from '../../../../../public/assets/images/certificate/Group 4 (5).png';
import certificate_6 from '../../../../../public/assets/images/certificate/Group 4 (6).png';
import certificate_7 from '../../../../../public/assets/images/certificate/Group 4 (7).png';
import certificate_8 from '../../../../../public/assets/images/certificate/Group 4.png';
const Certificate = ({ className }: any) => {
  const certificates = [
    certificate_6,
    certificate_1,
    certificate_2,
    certificate_3,
    certificate_4,
    certificate_5,
    certificate_7,
    certificate_8,
  ];

  return (
    <section className={className}>
      <div className="animate-slide flex flex-wrap justify-between gap-[2rem]">
        {certificates.map((cert, idx) => (
          <div key={idx} className="relative h-[70px] w-[140px]">
            <Image
              src={cert}
              alt={`Certificate ${idx + 1}`}
              fill
              quality={100}
              priority
              sizes="150px"
              className="object-contain duration-300 ease-in-out hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;

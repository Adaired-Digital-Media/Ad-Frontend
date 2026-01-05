import { ContactSectionData } from '@/@core/data/website/Homepage';
import { useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import Image from 'next/image';
import InputField from '../UI/InputField';
import MessageField from '../UI/MessageField';
import Button from '../../common/Button';
import useImageAnimation from '@/@core/hooks/useImageAnimation';
import reachout from '../../../../../public/assets/images/home/contact_us.png';
import chat from '../../../../../public/assets/icons/chat.png';
import SelectField from '../UI/SelectField';
import ContactForm from '../forms/ContactForm';
import ContactPageForm from '../forms/ContactPageForm';

const Contact = () => {
  const { image, subTitle, title, span, description } = ContactSectionData;

  const { ref, className } = useImageAnimation({
    direction: 'left',
    delay: 350,
  });

  return (
    <section className="">
      <MaxWidthWrapper className="space-y-7 py-[2rem] lg:py-[6rem]">
        <div className="px-[10%]">
          <Heading
            subTitle={subTitle}
            title={title}
            span={span}
            description={description}
            isInCenter={true}
            isBgWhite={true}
          />
        </div>
        <div className="grid grid-cols-1 gap-[4.5rem] lg:grid-cols-2">
          <div
            className={`relative h-full overflow-hidden ${className}`}
            ref={ref}
          >
            <Image
              src={reachout}
              alt="About Image"
              fill
              className="rounded-3xl border-[#e3e3e3] object-cover p-1"
            />
          </div>
          <ContactForm />
          {/* <ContactPageForm /> */}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Contact;

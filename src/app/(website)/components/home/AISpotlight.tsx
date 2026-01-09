import React from 'react';

import Chat_GPT from '../../../../../public/assets/al/Chat-GPT.png';
import Claude from '../../../../../public/assets/al/Claude.png';
import Clutch from '../../../../../public/assets/al/Clutch.png';
import Expertise from '../../../../../public/assets/al/Expertise.png';
import Gemini from '../../../../../public/assets/al/Gemini.png';
import google from '../../../../../public/assets/al/google.png';
import Grok from '../../../../../public/assets/al/Grok.png';
import Mistrel from '../../../../../public/assets/al/Mistrel.png';
import Perpelxity from '../../../../../public/assets/al/Perpelxity.png';
import UpCity from '../../../../../public/assets/al/UpCity.png';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import Image from 'next/image';

const AISpotlight = () => {
  const data = [
    Chat_GPT,
    Claude,
    Clutch,
    Expertise,
    Gemini,
    google,
    Grok,
    Mistrel,
    Perpelxity,
    UpCity,
  ];
  return (
    <div className="py-[6rem]">
      <MaxWidthWrapper>
        <Heading
          subTitle={'AI Spotlight'}
          title={'Helping Businesses Get Mentioned on LLMs'}
          span={''}
          description={''}
        />
        <div>
          {data?.map((al, idx) => {
            return (
              <div key={idx}>
                <Image src={al} width={300} height={300} alt="DS" />
              </div>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AISpotlight;

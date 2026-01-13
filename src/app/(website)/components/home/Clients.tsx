import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';

import client_1 from '../../../../../public/assets/images/client/client_1.png';
import client_2 from '../../../../../public/assets/images/client/client_2.png';
import client_3 from '../../../../../public/assets/images/client/client_3.png';
import client_4 from '../../../../../public/assets/images/client/client_4.png';
import client_5 from '../../../../../public/assets/images/client/client_5.png';
import client_6 from '../../../../../public/assets/images/client/client_6.png';
import client_7 from '../../../../../public/assets/images/client/client_7.png';
import client_8 from '../../../../../public/assets/images/client/client_8.png';
import client_9 from '../../../../../public/assets/images/client/client_9.png';
import client_10 from '../../../../../public/assets/images/client/client_10.png';
import client_11 from '../../../../../public/assets/images/client/client_11.png';
import client_12 from '../../../../../public/assets/images/client/client_12.png';
import client_13 from '../../../../../public/assets/images/client/client_13.png';
import client_14 from '../../../../../public/assets/images/client/client_14.png';
import client_15 from '../../../../../public/assets/images/client/client_15.png';
import client_16 from '../../../../../public/assets/images/client/client_16.png';
import client_17 from '../../../../../public/assets/images/client/client_17.png';
import client_18 from '../../../../../public/assets/images/client/client_18.png';
import client_19 from '../../../../../public/assets/images/client/client_19.png';
import client_20 from '../../../../../public/assets/images/client/client_20.png';
import client_21 from '../../../../../public/assets/images/client/client_21.png';
import client_22 from '../../../../../public/assets/images/client/client_22.png';
import client_23 from '../../../../../public/assets/images/client/client_23.png';
import client_24 from '../../../../../public/assets/images/client/client_24.png';
import client_25 from '../../../../../public/assets/images/client/client_25.png';
import client_26 from '../../../../../public/assets/images/client/client_26.png';
import client_27 from '../../../../../public/assets/images/client/client_27.png';
import client_28 from '../../../../../public/assets/images/client/client_28.png';
import client_29 from '../../../../../public/assets/images/client/client_29.png';
import client_30 from '../../../../../public/assets/images/client/client_30.png';
import Image from 'next/image';

const Clients = () => {
  const data = [
    client_1,
    client_2,
    client_3,
    client_4,
    client_5,
    client_6,
    client_7,
    client_8,
    client_9,
    client_10,
    client_11,
    client_12,
    client_13,
    client_14,
    client_15,
    client_16,
    client_17,
    client_18,
    client_19,
    client_20,
    client_21,
    client_22,
    client_23,
    client_24,
    client_25,
    client_26,
    client_27,
    client_28,
    client_29,
    client_30,
  ];
  return (
    <div className="bg-[#F9F9F9] py-[3rem] lg:py-[4rem] xl:py-[6rem]">
      <MaxWidthWrapper>
        <Heading
          subTitle={'Our ClientS'}
          title={'A Decade Of Turning Strategies into Results'}
          span={''}
          // description={
          //   'We proudly contribute to the success of the world’s leading brands.'
          // }
          isInCenter={true}
          isBgWhite={true}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {data?.map((client, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-center overflow-hidden"
            >
              <Image
                src={client}
                width={225}
                height={90}
                alt="client logo"
                className="my-0 transform transition-transform duration-300 ease-out group-hover:scale-110 md:my-4"
              />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Clients;

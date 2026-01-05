import React, { useEffect, useState } from 'react';
import Heading from '../../common/Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import user from '../../../../../public/assets/review/Ellipse 30.png';
import user_2 from '../../../../../public/assets/review/Ellipse 31.png';
import user_3 from '../../../../../public/assets/review/Ellipse 32.png';
import user_4 from '../../../../../public/assets/review/Ellipse 33.png';
import user_5 from '../../../../../public/assets/review/Ellipse 34.png';
import Image from 'next/image';
import { MdStarRate } from 'react-icons/md';
import SaveAndCancel from '../../common/SaveAndCancel';
import banner_img_1 from '../../../../../public/assets/images/home/banner_img_1.png';
import banner_img_2 from '../../../../../public/assets/images/home/banner_img_2.png';
import banner_img_3 from '../../../../../public/assets/images/home/banner_img_3.png';
import banner_img_4 from '../../../../../public/assets/images/home/banner_img_7.png';
import banner_img_5 from '../../../../../public/assets/images/home/banner_img_8.png';
import banner_img_6 from '../../../../../public/assets/images/home/banner_img_9.png';
import hero_banner from '../../../../../public/assets/images/home/hero_banner-bg.png';
type Step = 'img3-enter' | 'img3-exit' | 'img2-enter' | 'img2-exit';
type ActiveImg = null | 'img1' | 'img2' | 'img3';
type Phase = 'idle' | 'move' | 'hold' | 'return';
const Banner = () => {
  const users = [user, user_2, user_3, user_4, user_5];
  const reviews = [MdStarRate, MdStarRate, MdStarRate, MdStarRate, MdStarRate];

  const [active, setActive] = useState<null | 'img3' | 'img2' | 'img1'>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1️⃣ IMG 3
      setActive('img2');

      setTimeout(() => {
        setActive(null);

        // 2️⃣ IMG 2
        setTimeout(() => {
          setActive('img3');

          setTimeout(() => {
            setActive(null);

            // 3️⃣ IMG 1
            setTimeout(() => {
              setActive('img1');

              setTimeout(() => {
                setActive(null);
              }, 2000); // img1 stay
            }, 400);
          }, 2000); // img2 stay
        }, 400);
      }, 2000); // img3 stay
    }, 5200); // total cycle time

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-pulse relative h-[100vh] w-full pt-[10vh]">
      <Image
        src={hero_banner}
        fill
        alt="hero bg"
        priority
        className="pointer-events-none object-cover"
      />
      <MaxWidthWrapper className="relative z-10 flex justify-between pb-[10rem] pt-[10rem]">
        <div className="w-[42%] space-y-4">
          <Heading
            isH1={true}
            subTitle={'WELCOME TO Adaired Digital Media'}
            title={'The Driving Force Behind the Brands That Lead'}
            span={''}
            description={
              "In a world where thousands of brands compete for a moment's attention, being seen isn’t enough. You want to be remembered, right?"
            }
          />
          <div className="relative flex h-[55px]">
            {users?.map((img, index) => {
              const lastuser = users.length - 1 === index;
              return (
                <span
                  key={index}
                  className="absolute"
                  style={{
                    left: `${index * 32}px`,
                    // zIndex: users.length - index,
                    zIndex: index + 1,
                  }}
                >
                  <Image
                    src={img}
                    width={55}
                    height={55}
                    alt="user"
                    className={`${lastuser && 'animate-zoomPulse'} rounded-full border-[1px] border-white`}
                  />
                </span>
              );
            })}

            <span className="absolute right-[48%] top-4 flex">
              <MdStarRate size={20} className="my-auto text-[#FB9100]" />
              <MdStarRate size={20} className="my-auto text-[#FB9100]" />
              <MdStarRate size={20} className="my-auto text-[#FB9100]" />
              <MdStarRate size={20} className="my-auto text-[#FB9100]" />
              <MdStarRate size={20} className="my-auto text-[#FB9100]" />
              <span className="ml-2">4.5/5</span>
            </span>
          </div>
          <p>
            And that’s where Adaired Digital Media comes in. Offering a
            full-service, 360° digital strategy for your business, helping you
            rise above the noise and claim your space in the digital world.
          </p>
          <SaveAndCancel
            name={'Get a Quote'}
            button2Name={'Explore Services'}
            is2ndButton={true}
            isIcon={true}
            is2BgWhite={true}
            className="pt-[2rem]"
          />
        </div>
        <div className="relative w-[50%]">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src={banner_img_1}
                width={631}
                height={510}
                alt=""
                className={`transition-opacity transition-transform duration-700 ease-in-out ${
                  active === 'img1'
                    ? 'z-40 opacity-100'
                    : active
                      ? 'opacity-40'
                      : 'opacity-100'
                } `}
              />
            </div>
            <Image
              src={banner_img_3}
              width={318}
              height={198}
              alt=""
              className={`absolute right-[33.5rem] top-[62.5%] transition-opacity transition-transform duration-700 ease-in-out ${
                active === 'img3'
                  ? 'z-30 translate-x-[90%] translate-y-[-110%] scale-105 opacity-100 backdrop-blur-md'
                  : active
                    ? 'z-10 translate-x-0 translate-y-0 scale-100 opacity-40'
                    : 'z-10 translate-x-0 translate-y-0 scale-100 opacity-100'
              }`}
            />
            <Image
              src={banner_img_2}
              width={409}
              height={254}
              alt=""
              className={`absolute bottom-[68%] left-[24rem] transition-opacity transition-transform duration-700 ease-in-out ${
                active === 'img2'
                  ? 'z-30 translate-x-[-50%] translate-y-[80%] scale-105 bg-white/80 opacity-100 backdrop-blur-md'
                  : active
                    ? 'z-10 translate-x-0 translate-y-0 scale-100 opacity-40'
                    : 'z-10 translate-x-0 translate-y-0 scale-100 opacity-100'
              }`}
            />

            <div className="flex justify-end gap-1 pr-[10%]">
              <Image
                src={banner_img_4}
                width={150}
                height={46}
                alt=""
                className="animate-step1 bg-white"
              />
              <Image
                src={banner_img_5}
                width={150}
                height={46}
                alt=""
                className="animate-step2 bg-white"
              />
              <Image
                src={banner_img_6}
                width={150}
                height={46}
                alt=""
                className="animate-step3 bg-white"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Banner;

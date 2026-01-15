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
import hero_banner from '../../../../../public/assets/images/home/hero_banner-bg.png';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { PiDotsThree } from 'react-icons/pi';
import google from '../../../../../public/assets/images/partner/google.svg';
import upwork from '../../../../../public/assets/images/partner/upwork.svg';

const Banner = () => {
  const router = useRouter();
  const users = [user, user_2, user_3, user_4, user_5];
  const griphData = [
    {
      icon: <FaUser size={10} />,
      id: 0,
      lebal: 'Monthly Users',
      number: '23.6K',
      griphNumber: `10`,
      griph: <FiArrowUpRight size={10} />,
      color: '#FF5A65',
    },
    {
      id: 1,
      icon: <FaUser size={10} />,
      lebal: 'Monthly Users',
      number: '23.6K',
      griphNumber: `102`,
      griph: <FiArrowUpRight size={10} />,
      color: '#14CA74',
    },
    ,
    {
      id: 2,
      icon: <FaUser size={10} />,
      lebal: 'New Users',
      number: '10.6K',
      griphNumber: `102`,
      griph: <FiArrowUpRight size={10} />,
      color: '#14CA74',
    },
    {
      id: 3,
      icon: <FaUser size={10} />,
      lebal: 'Subscribes',
      number: '21.6K',
      griphNumber: `102`,
      griph: <FiArrowUpRight size={10} />,
      color: '#14CA74',
    },
  ];

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
  const scrollToServices = () => {
    const section = document.getElementById('services');
    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="animate-pulse 1366:h-[135vh] 1470:h-[100vh] 1680:h-[100vh] 1710:h-[85vh] 3xl:h-[100vh] 1600:h-[118vh] 1400:h-[115vh] relative h-[100vh] w-full pt-[10vh] md:h-[130vh] lg:h-[100vh]">
      <Image
        src={hero_banner}
        fill
        alt="hero bg"
        priority
        className="pointer-events-none object-cover"
      />
      <MaxWidthWrapper className="relative z-10 block justify-between pt-[3rem] lg:flex lg:pb-[6rem] lg:pt-[5rem]">
        <div className="w-[100%] space-y-5 lg:w-[45%] xl:w-[42%]">
          <Heading
            isH1={true}
            subTitle={`Gain Visibility That Converts`}
            title={`Result-Driven Digital Marketing Agency for Scalable Growth`}
            span={''}
            description={
              'From Google searches to AI chats, we make sure your brand is visible to your customers wherever they look.'
            }
          />
          <div className="relative flex h-[55px] justify-between">
            {users?.map((img, index) => {
              const lastuser = users.length - 1 === index;
              return (
                <span
                  key={index}
                  className="absolute"
                  style={{
                    left: `${index * 32}px`,
                    zIndex: index + 1,
                  }}
                >
                  <Image
                    src={img}
                    width={50}
                    height={50}
                    alt="user"
                    className={`${lastuser && 'animate-zoomPulse'} rounded-full border-[1px] border-white`}
                  />
                </span>
              );
            })}

            <span className="mt-1 flex pl-[10rem] xl:pl-[12rem]">
              <MdStarRate
                size={20}
                className="my-auto hidden text-[#FB9100] lg:block"
              />
              <MdStarRate
                size={20}
                className="my-auto hidden text-[#FB9100] lg:block"
              />
              <MdStarRate size={20} className="my-auto text-[#FB9100]" />
              <MdStarRate size={20} className="my-auto text-[#FB9100]" />
              <MdStarRate size={20} className="my-auto text-[#FB9100]" />
              <span className="lg:mt:2 ml-2 mt-4">4.9/5 by 1K+ Clients</span>
            </span>
          </div>
          <div className="flex gap-3">
            <a
              href="https://share.google/3KznrgKhabO459Arc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={google}
                width={208}
                height={32}
                alt="Upwork"
                className="h-[2rem] w-[8rem] cursor-pointer lg:w-[10rem] xl:w-[13rem]"
              />
            </a>

            <span className="my-auto text-lg text-[#000000]/20">|</span>

            <a
              href="https://www.upwork.com/agencies/1064740584575918080/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={upwork}
                width={130}
                height={39}
                alt="Google Reviews"
                className="h-[2rem] w-[7rem] cursor-pointer xl:h-[2.438rem] xl:w-[8.125rem]"
              />
            </a>
          </div>

          <p className="hidden lg:block">
            Generate leads by 15% or more within your first 6 months with
            real-time data and expert insights. Our strategy ensures that your
            brand reaches the right people, produces measurable results, and
            effectively expands across digital channels.
          </p>
          <SaveAndCancel
            name={'Get a Quote'}
            button2Name={'Explore Services'}
            is2ndButton={true}
            isIcon={true}
            is2BgWhite={true}
            className="lg:pt-[1rem]"
            handleClick={() => router.push('/contact')}
            handleClick2={scrollToServices}
          />
        </div>
        <div className="relative mt-[5rem] w-[100%] pt-[20vh] md:pt-[50vh] lg:mt-0 lg:w-[50%] lg:pt-0">
          <div className="space-y-4">
            <div className="absolute bottom-[10%] mt-auto flex w-[100%] justify-center">
              <div className="relative flex justify-end">
                <Image
                  src={banner_img_1}
                  width={599}
                  height={483}
                  alt=""
                  className={`1366:w-[28rem] 1366:h-[23rem] 1400:w-[30rem] 1400:h-[25rem] 1600:w-[32rem] 1600:h-[26rem] 1680:w-[35rem] h-[10rem] w-[15rem] transition-opacity transition-transform duration-700 ease-in-out md:h-[20rem] md:w-[32rem] lg:h-[18rem] lg:w-[24rem] xl:h-[30.188rem] xl:w-[37.438rem] 3xl:h-[30.188rem] 3xl:w-[37.438rem] ${
                    active === 'img1'
                      ? 'z-40 opacity-100'
                      : active
                        ? 'opacity-40'
                        : 'opacity-100'
                  } `}
                />
                <div className="absolute right-0 top-[103%] hidden w-[100%] grid-cols-4 gap-2 md:grid">
                  {griphData?.map((item, idx) => {
                    return (
                      <div
                        className={`h-[3.125rem] ${idx == 1 && 'animate-step1'} ${idx == 2 && 'animate-step2'} ${idx == 3 && 'animate-step3'} ${idx == 4 && 'animate-step4'} rounded-[0.25rem] border-[1px] border-[#000000]/20 bg-[#FFFFFF]/80 px-[0.5rem] pb-2`}
                      >
                        <div className="flex justify-between">
                          <div className="my-auto flex gap-1">
                            <span className="my-auto">{item?.icon}</span>
                            <p className="mb-auto text-[6px] xl:text-[8px]">
                              {item?.lebal}
                            </p>
                          </div>
                          <PiDotsThree size={12} />
                        </div>
                        <div className="-mt-1 flex h-fit w-[100%] gap-2">
                          <p className="my-auto text-[10px] font-bold xl:text-[12px]">
                            {item?.number}
                          </p>
                          <div
                            className={`my-auto flex h-[16px] w-fit gap-1 rounded-[0.25rem] border-[0.49px] bg-[#000000]/10 px-[0.5rem] opacity-40 ${item?.griphNumber == '10' ? 'border-[#FF5A65];20 text-[#FF5A65]' : 'border-[#14CA74]/20 text-[#14CA74]'}`}
                          >
                            <p
                              className={`mt-[-0.25rem] text-[6px] font-semibold xl:text-[8px] ${item?.griphNumber == '10' ? 'text-[#FF5A65]' : 'text-[#14CA74]'}`}
                            >
                              {item?.griphNumber}
                            </p>
                            <span className="my-auto">{item?.griph}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Image
              src={banner_img_3}
              width={302}
              height={186}
              alt=""
              className={`1366:w-[14rem] 1366:h-[8rem] 1400:w-[16rem] 1400:h-[9rem] absolute bottom-0 left-[0rem] h-[6rem] w-[8rem] transition-opacity transition-transform duration-700 ease-in-out md:bottom-[-1.5rem] md:left-[0rem] md:h-[10rem] md:w-[14rem] lg:bottom-0 xl:bottom-[0rem] xl:h-[11.625rem] xl:w-[18.875rem] 3xl:h-[11.625rem] 3xl:w-[18.875rem] ${
                active === 'img3'
                  ? '1366:translate-y-[-150%] 1400:translate-x-[70%] 1400:translate-y-[-130%] 1600:translate-x-[80%] 1680:translate-x-[90%] z-30 translate-x-[100%] translate-y-[-50%] scale-105 opacity-100 backdrop-blur-md md:translate-x-[105%] md:translate-y-[-80%] lg:translate-x-[50%] lg:translate-y-[-80%] xl:translate-x-[80%] xl:translate-y-[-110%] 3xl:translate-x-[85%] 3xl:translate-y-[-120%]'
                  : active
                    ? 'z-10 translate-x-0 translate-y-0 scale-100 opacity-40'
                    : 'z-10 translate-x-0 translate-y-0 scale-100 opacity-100'
              }`}
            />
            <Image
              src={banner_img_2}
              width={388}
              height={244}
              alt=""
              className={`1366:w-[18rem] 1366:h-[10rem] 1366:top-[8rem] 1400:w-[20rem] 1400:top-[5rem] 1400:h-[12rem] 1680:top-[1.5rem] absolute right-0 top-[-4rem] h-[6.875rem] w-[10.563rem] transition-opacity transition-transform duration-700 ease-in-out md:top-[-2rem] md:h-[13rem] md:w-[20rem] lg:top-[30%] lg:h-[10.25rem] lg:w-[15.25rem] xl:top-[0rem] xl:h-[15.25rem] xl:w-[24.25rem] 3xl:h-[15.25rem] 3xl:w-[24.25rem] ${
                active === 'img2'
                  ? '1400:translate-x-[-40%] 1600:translate-x-[-50%] 1680:translate-x-[-60%] 1680:translate-y-[110%] z-30 translate-x-[-50%] translate-y-[50%] scale-105 bg-white/80 opacity-100 backdrop-blur-md md:translate-x-[-60%] md:translate-y-[75%] lg:translate-x-[-45%] lg:translate-y-[80%] xl:translate-x-[-50%] xl:translate-y-[100%] 3xl:translate-x-[-49%] 3xl:translate-y-[90%]'
                  : active
                    ? 'z-10 translate-x-0 translate-y-0 scale-100 opacity-40'
                    : 'z-10 translate-x-0 translate-y-0 scale-100 opacity-100'
              }`}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Banner;

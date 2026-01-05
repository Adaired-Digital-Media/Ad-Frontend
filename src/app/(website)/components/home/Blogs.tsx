'use client';
import { BlogSectionData } from '@/@core/data/website/Homepage';
import Image from 'next/image';
import { useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import Button from '../../common/Button';
import blog_bg_opecity from '../../../../../public/assets/images/home/blog_bg_opecity.png';
import SaveAndCancel from '../../common/SaveAndCancel';
import { usePathname, useRouter } from 'next/navigation';

const Blogs = () => {
  const router = useRouter();
  const { subTitle, title, description, blogs } = BlogSectionData;
  const [isHover, setIsHover] = useState<number | null>(1);
  return (
    <section className="relative bg-[#F5F5F599] py-6 lg:py-[6rem]">
      <div className="absolute inset-0 -z-10 h-[500px]">
        {/* <Image src={blog_bg_opecity} fill alt="blog" className="object-cover" /> */}
      </div>
      <MaxWidthWrapper>
        <div className="flex w-[100%] justify-center">
          <Heading
            subTitle={subTitle}
            title={title}
            span={''}
            description={description}
            isInCenter={true}
            isBgWhite={true}
            className="w-[100%] lg:w-[70%]"
          />
        </div>
        <div className="grid grid-cols-1 gap-7 py-[1.5rem] pt-[3rem] md:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog, idx: number) => {
            return (
              <div
                key={idx}
                className={`rounded-3xl bg-[#FFFFFF] shadow-[0_0_20px_rgba(0,0,0,0.14)]`}
              >
                <div className="relative h-[190px] w-full overflow-hidden rounded-2xl lg:h-[306px]">
                  <Image
                    src={blog?.image}
                    fill
                    alt=""
                    className="rounded-2xl object-fill transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="space-y-4 p-[2rem]">
                  <p className="font my-auto w-fit rounded-full border-[0.5px] border-[#000000] px-[1rem] text-[14px]">
                    30, July 2025
                  </p>
                  <h5 className="font-semibold text-[#111111]">{blog.title}</h5>
                  <p>{blog.description}</p>
                  <div className="flex w-full justify-between pt-[1rem]">
                    <SaveAndCancel
                      isBgWhite={true}
                      name={'Read More'}
                      isIcon={true}
                      handleClick={() => router.push(`/blog/${blog.link}`)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Blogs;

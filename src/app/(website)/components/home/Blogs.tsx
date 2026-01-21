// 'use client';
// import { BlogSectionData } from '@/@core/data/website/Homepage';
// import Image from 'next/image';
// import { useState } from 'react';
// import MaxWidthWrapper from '../MaxWidthWrapper';
// import Heading from '../../common/Heading';
// import SaveAndCancel from '../../common/SaveAndCancel';
// import { usePathname, useRouter } from 'next/navigation';
// import { IoArrowForwardSharp } from 'react-icons/io5';
// import { PiEyeBold } from 'react-icons/pi';
// import { FaRegEye } from 'react-icons/fa';

// const Blogs = () => {
//   const router = useRouter();
//   const { subTitle, title, description, blogs } = BlogSectionData;
//   const [isHover, setIsHover] = useState<number | null>(1);
//   return (
//     <section className="relative bg-[#F5F5F599] py-6 lg:pb-[10rem] lg:pt-[6rem]">
//       <MaxWidthWrapper>
//         <div className="flex w-[100%] justify-center">
//           <Heading
//             subTitle={subTitle}
//             title={title}
//             span={''}
//             description={description}
//             isInCenter={true}
//             isBgWhite={true}
//             className="w-[100%] lg:w-[70%]"
//           />
//         </div>
//         <div className="grid grid-cols-1 gap-7 py-[1.5rem] pt-[3rem] md:grid-cols-2 lg:grid-cols-3">
//           {blogs?.map((blog, idx: number) => {
//             return (
//               <div
//                 key={idx}
//                 className={`relative rounded-3xl bg-[#FFFFFF] shadow-[0_0_20px_rgba(0,0,0,0.14)]`}
//               >
//                 <div className="relative h-[190px] w-full overflow-hidden rounded-2xl lg:h-[350px]">
//                   <Image
//                     src={blog?.image}
//                     fill
//                     alt=""
//                     className="rounded-2xl object-fill transition-transform duration-500 ease-in-out hover:scale-110"
//                   />
//                   <div className="absolute left-0 top-0 h-[100%] w-[100%] bg-[#1A5A96]/10 hover:bg-[#1A5A96]/60"></div>
//                   <p className="font absolute left-4 top-4 my-auto w-fit rounded-full border-[0.5px] bg-[#FFFFFF] px-[1rem] text-xs font-[300] text-[#000000]">
//                     30, July 2025
//                   </p>
//                   <PiEyeBold
//                     size={40}
//                     className="absolute left-[15rem] top-[8rem] cursor-pointer text-white"
//                   />
//                 </div>
//                 <div className="absolute -bottom-20 mx-[2rem] space-y-4 rounded-xl bg-[#FFFFFF] p-[2rem]">
//                   <h5
//                     onClick={() => router.push(`/blog/${blog.link}`)}
//                     className="cursor-pointer text-[1.125rem] font-normal text-[#111111] hover:text-[#F28F17]"
//                   >
//                     {blog.title}
//                   </h5>
//                   <p className="flex cursor-pointer items-center gap-2 border-t border-black/20 pt-4 hover:text-[#F28F17]">
//                     <IoArrowForwardSharp
//                       size={25}
//                       className="rounded-full bg-[#1A5A96] p-1 text-white"
//                     />
//                     <span>Read More</span>
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </MaxWidthWrapper>
//     </section>
//   );
// };

// export default Blogs;

'use client';
import { BlogSectionData } from '@/@core/data/website/Homepage';
import Image from 'next/image';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../../common/Heading';
import { useRouter } from 'next/navigation';
import { IoArrowForwardSharp } from 'react-icons/io5';
import { PiEyeBold } from 'react-icons/pi';
import useBreakpointCharLimit from '@/@core/hooks/useBreakpointCharLimit';

const Blogs = () => {
  const router = useRouter();
  const charLimit = useBreakpointCharLimit();
  const { subTitle, title, description, blogs, span } = BlogSectionData;

  return (
    <section className="relative bg-[#F5F5F599] pb-[6rem] pt-[3rem] lg:py-[4rem] lg:pb-[10rem] xl:py-[6rem]">
      <MaxWidthWrapper>
        <div className="flex justify-center">
          <Heading
            subTitle={subTitle}
            title={title}
            span={span}
            description={description}
            isInCenter
            isBgWhite
            className="w-full lg:w-[70%]"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-3 lg:pt-[3rem] xl:gap-7">
          {blogs?.map((blog, idx) => (
            <div
              key={idx}
              className="group relative my-[2.5rem] rounded-3xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.14)] lg:my-0"
            >
              {/* IMAGE */}
              <div className="relative h-[190px] w-full overflow-hidden rounded-2xl lg:h-[250px] xl:h-[350px]">
                <Image
                  src={blog.image}
                  fill
                  alt={blog.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-[#1A5A96]/10 transition-opacity duration-300 group-hover:bg-[#1A5A96]/60" />

                {/* DATE */}
                <p className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xxs xl:text-xs">
                  {blog.label}
                </p>

                {/* EYE ICON (SHOW ON HOVER) */}
                <PiEyeBold
                  size={42}
                  onClick={() => router.push(`/blog/${blog.link}`)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 cursor-pointer text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                />
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-[-5rem] space-y-4 rounded-xl bg-white p-4 lg:mx-4 xl:bottom-[-4.5rem] xl:mx-8 xl:p-8">
                <h3
                  onClick={() => router.push(`/blog/${blog.link}`)}
                  className="cursor-pointer text-[#111] transition-colors duration-300 group-hover:text-[#F28F17] xl:text-[1.125rem]"
                >
                  {blog.title.length > charLimit
                    ? blog.title.slice(0, charLimit) + '...'
                    : blog.title}
                </h3>

                <p
                  onClick={() => router.push(`/blog/${blog.link}`)}
                  className="flex cursor-pointer items-center gap-2 border-t border-black/20 pt-4 transition-colors duration-300 group-hover:text-[#F28F17]"
                >
                  <IoArrowForwardSharp
                    size={24}
                    className="rounded-full bg-[#1A5A96] p-1 text-white"
                  />
                  <span>View Blog Post</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Blogs;

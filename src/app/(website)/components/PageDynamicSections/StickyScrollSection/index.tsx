// 'use client';
// import React, { useRef, useState } from 'react';
// import { useMotionValueEvent, useScroll } from 'framer-motion';
// import { motion } from 'framer-motion';
// import { cn } from '@core/utils/class-names';
// import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
// import parse from 'html-react-parser';
// import { Icons } from '@web-components/Icons';

// type StickyScrollProps = {
//   colorScheme: string;
//   data: {
//     title: string;
//     description: string;
//     listItems: {
//       icon: string;
//       title: string;
//       description: string;
//     }[];
//   };
// };

// const StickyScroll = ({ colorScheme, data }: StickyScrollProps) => {
//   const [activeCard, setActiveCard] = useState<number>(0);
//   const ref = useRef<any>(null);
//   const { scrollYProgress } = useScroll({
//     container: ref,
//     offset: ['start start', 'end start'],
//   });

//   const cardLength = data.listItems.length + 3;

//   useMotionValueEvent(scrollYProgress, 'change', (latest) => {
//     const cardsBreakpoints = data.listItems.map(
//       (_, index) => index / cardLength
//     );
//     const closesBreakpointIndex = cardsBreakpoints.reduce(
//       (acc, breakpoint, index) => {
//         const distance = Math.abs(latest - breakpoint);
//         if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
//           return index;
//         }
//         return acc;
//       },
//       0
//     );
//     setActiveCard(closesBreakpointIndex);
//   });

//   return (
//     <div className="service-sticky-scroll">
//       <section
//         ref={ref}
//         className={cn(
//           `no-visible-scrollbar sticky h-fit overflow-y-auto bg-gray-100 lg:h-[37rem] lg:py-10`
//         )}
//       >
//         <MaxWidthWrapper
//           className={cn(
//             `relative flex flex-col justify-between gap-5 lg:flex-row`
//           )}
//         >
//           <div
//             className={cn(
//               `sticky top-0 w-full overflow-hidden py-5 lg:top-10 lg:h-60 lg:max-w-xl lg:py-0`
//             )}
//           >
//             <h2
//               className={cn(
//                 `font-nunito text-2xl font-semibold leading-snug lg:text-[38px]`
//               )}
//             >
//               {data.title}
//             </h2>
//             <div className="font-nunito text-lg">{parse(data.description)}</div>
//           </div>

//           <div className={cn(`div relative flex items-start px-4`)}>
//             <div className={cn(`max-w-2xl space-y-10 lg:space-y-16`)}>
//               {data.listItems.map((item, index) => (
//                 <div
//                   className="relative z-10 cursor-pointer rounded-sm shadow-2xl"
//                   key={item.title}
//                 >
//                   <div
//                     className="border__before absolute left-2 top-2 z-[-1] h-full w-full rounded-lg border"
//                     style={{
//                       borderColor: colorScheme,
//                     }}
//                   ></div>
//                   <motion.div
//                     initial={{
//                       color: '#000',
//                     }}
//                     animate={{
//                       color: activeCard === index ? colorScheme : '#000',
//                     }}
//                     className={cn(
//                       `space-y-3 rounded-sm bg-white py-5 pl-5 pr-5 md:pr-12`
//                     )}
//                   >
//                     <div className={cn(`flex items-center gap-4`)}>
//                       <Icons.bulbIcon
//                         className={cn(`w-15 h-15 flex-shrink-0`)}
//                       />
//                       <h2
//                         className={cn(
//                           `font-nunito text-lg font-semibold md:text-2xl`
//                         )}
//                       >
//                         {item.title}
//                       </h2>
//                     </div>
//                     <p
//                       className="hyphens-auto text-justify text-base sm:hyphens-none sm:text-left sm:text-lg"
//                       style={{ color: '#000' }}
//                     >
//                       {item.description}
//                     </p>
//                   </motion.div>
//                 </div>
//               ))}
//               <div className={cn(`h-10`)} />
//             </div>
//           </div>
//         </MaxWidthWrapper>
//       </section>
//     </div>
//   );
// };

// export default StickyScroll;



// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useLenis } from 'lenis/react';
// import { cn } from '@core/utils/class-names';
// import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
// import parse from 'html-react-parser';
// import { Icons } from '@web-components/Icons';

// type StickyScrollProps = {
//   colorScheme: string;
//   data: {
//     title: string;
//     description: string;
//     listItems: {
//       icon: string;
//       title: string;
//       description: string;
//     }[];
//   };
// };

// const StickyScroll = ({ colorScheme, data }: StickyScrollProps) => {
//   const [activeCard, setActiveCard] = useState<number>(0);
//   const ref = useRef<HTMLDivElement>(null);
//   const lenis = useLenis();

//   useEffect(() => {
//     if (!lenis || !ref.current) return;

//     const updateActiveCard = () => {
//       const container = ref.current;
//       if (!container) return;

//       // Get the scroll position and container dimensions from Lenis
//       const scrollY = lenis.scroll; // Current scroll position
//       const containerTop = container.getBoundingClientRect().top + window.scrollY; // Absolute top of container
//       const containerHeight = container.scrollHeight; // Total scrollable height

//       // Calculate progress (0 to 1) within the container
//       const scrollProgress = Math.min(
//         Math.max((scrollY - containerTop) / containerHeight, 0),
//         1
//       );

//       // Map progress to card breakpoints
//       const cardLength = data.listItems.length + 3;
//       const cardsBreakpoints = data.listItems.map((_, index) => index / cardLength);
//       const closestBreakpointIndex = cardsBreakpoints.reduce(
//         (acc, breakpoint, index) => {
//           const distance = Math.abs(scrollProgress - breakpoint);
//           if (distance < Math.abs(scrollProgress - cardsBreakpoints[acc])) {
//             return index;
//           }
//           return acc;
//         },
//         0
//       );

//       setActiveCard(closestBreakpointIndex);
//     };

//     // Listen to Lenis scroll events
//     lenis.on('scroll', updateActiveCard);
//     updateActiveCard(); // Initial call

//     return () => {
//       lenis.off('scroll', updateActiveCard);
//     };
//   }, [lenis, data.listItems]);

//   return (
//     <div className="service-sticky-scroll">
//       <section
//         ref={ref}
//         className={cn(
//           `no-visible-scrollbar sticky h-fit overflow-y-auto bg-gray-100 lg:h-[37rem] lg:py-10`
//         )}
//       >
//         <MaxWidthWrapper
//           className={cn(
//             `relative flex flex-col justify-between gap-5 lg:flex-row`
//           )}
//         >
//           <div
//             className={cn(
//               `sticky top-0 w-full overflow-hidden py-5 lg:top-10 lg:h-60 lg:max-w-xl lg:py-0`
//             )}
//           >
//             <h2
//               className={cn(
//                 `font-nunito text-2xl font-semibold leading-snug lg:text-[38px]`
//               )}
//             >
//               {data.title}
//             </h2>
//             <div className="font-nunito text-lg">{parse(data.description)}</div>
//           </div>

//           <div className={cn(`div relative flex items-start px-4`)}>
//             <div className={cn(`max-w-2xl space-y-10 lg:space-y-16`)}>
//               {data.listItems.map((item, index) => (
//                 <div
//                   className="relative z-10 cursor-pointer rounded-sm shadow-2xl"
//                   key={item.title}
//                 >
//                   <div
//                     className="border__before absolute left-2 top-2 z-[-1] h-full w-full rounded-lg border"
//                     style={{
//                       borderColor: colorScheme,
//                     }}
//                   ></div>
//                   <motion.div
//                     initial={{
//                       color: '#000',
//                     }}
//                     animate={{
//                       color: activeCard === index ? colorScheme : '#000',
//                     }}
//                     className={cn(
//                       `space-y-3 rounded-sm bg-white py-5 pl-5 pr-5 md:pr-12`
//                     )}
//                   >
//                     <div className={cn(`flex items-center gap-4`)}>
//                       <Icons.bulbIcon
//                         className={cn(`w-15 h-15 flex-shrink-0`)}
//                       />
//                       <h2
//                         className={cn(
//                           `font-nunito text-lg font-semibold md:text-2xl`
//                         )}
//                       >
//                         {item.title}
//                       </h2>
//                     </div>
//                     <p
//                       className="hyphens-auto text-justify text-base sm:hyphens-none sm:text-left sm:text-lg"
//                       style={{ color: '#000' }}
//                     >
//                       {item.description}
//                     </p>
//                   </motion.div>
//                 </div>
//               ))}
//               <div className={cn(`h-10`)} />
//             </div>
//           </div>
//         </MaxWidthWrapper>
//       </section>
//     </div>
//   );
// };

// export default StickyScroll;




'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@core/utils/class-names';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import parse from 'html-react-parser';
import { Icons } from '@web-components/Icons';

type StickyScrollProps = {
  colorScheme: string;
  data: {
    title: string;
    description: string;
    listItems: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
};

const StickyScroll = ({ colorScheme, data }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null); // Ref for the scrollable section

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateActiveCard = () => {
      const scrollTop = section.scrollTop; // Internal scroll position
      const sectionHeight = section.scrollHeight - section.clientHeight; // Scrollable height

      // Calculate progress (0 to 1) within the section
      const scrollProgress = sectionHeight > 0 ? scrollTop / sectionHeight : 0;

      // Map progress to card breakpoints
      const cardLength = data.listItems.length + 3;
      const cardsBreakpoints = data.listItems.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(scrollProgress - breakpoint);
          if (distance < Math.abs(scrollProgress - cardsBreakpoints[acc])) {
            return index;
          }
          return acc;
        },
        0
      );

      setActiveCard(closestBreakpointIndex);
    };

    // Add scroll listener to the section
    section.addEventListener('scroll', updateActiveCard);
    updateActiveCard(); // Initial call

    return () => {
      section.removeEventListener('scroll', updateActiveCard);
    };
  }, [data.listItems]);

  return (
    <div className="service-sticky-scroll">
      <section
        ref={sectionRef}
        className={cn(
          `no-visible-scrollbar h-fit max-h-[37rem] overflow-y-auto bg-gray-100 lg:py-10`
        )}
      >
        <MaxWidthWrapper
          className={cn(
            `relative flex flex-col justify-between gap-5 lg:flex-row`
          )}
        >
          <div
            className={cn(
              `sticky top-0 w-full overflow-hidden py-5 lg:top-10 lg:h-60 lg:max-w-xl lg:py-0`
            )}
          >
            <h2
              className={cn(
                `font-nunito text-2xl font-semibold leading-snug lg:text-[38px]`
              )}
            >
              {data.title}
            </h2>
            <div className="font-nunito text-lg">{parse(data.description)}</div>
          </div>

          <div className={cn(`relative flex items-start px-4`)}>
            <div className={cn(`max-w-2xl space-y-10 lg:space-y-16`)}>
              {data.listItems.map((item, index) => (
                <div
                  className="relative z-10 cursor-pointer rounded-sm shadow-2xl"
                  key={item.title}
                >
                  <div
                    className="border__before absolute left-2 top-2 z-[-1] h-full w-full rounded-lg border"
                    style={{
                      borderColor: colorScheme,
                    }}
                  ></div>
                  <motion.div
                    initial={{ color: '#000' }}
                    animate={{
                      color: activeCard === index ? colorScheme : '#000',
                    }}
                    className={cn(
                      `space-y-3 rounded-sm bg-white py-5 pl-5 pr-5 md:pr-12`
                    )}
                  >
                    <div className={cn(`flex items-center gap-4`)}>
                      <Icons.bulbIcon
                        className={cn(`w-15 h-15 flex-shrink-0`)}
                      />
                      <h2
                        className={cn(
                          `font-nunito text-lg font-semibold md:text-2xl`
                        )}
                      >
                        {item.title}
                      </h2>
                    </div>
                    <p
                      className="hyphens-auto text-justify text-base sm:hyphens-none sm:text-left sm:text-lg"
                      style={{ color: '#000' }}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              ))}
              <div className={cn(`h-10`)} />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
};

export default StickyScroll;
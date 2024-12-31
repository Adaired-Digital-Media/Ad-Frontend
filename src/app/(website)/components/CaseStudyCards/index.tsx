"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Technology {
  _id: string;
  icon: string;
  title: string;
}

interface Category {
  categoryName: string;
  slug: string;
  technologies: Technology[];
}

interface CaseStudy {
  colorScheme: string;
  slug: string;
  category: string;
  caseStudyName: string;
  caseStudyDescription: string;
  cardImage: string;
  aboutProjectDescription: string;
  technologiesUsed: string[];
}

interface CaseStudyCardsProps {
  categories: Category[];
  caseStudies: CaseStudy[];
}
function CaseStudyCards({ categories, caseStudies }: CaseStudyCardsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredCaseStudies, setFilteredCaseStudies] =
    useState<CaseStudy[]>(caseStudies);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredCaseStudies(caseStudies);
    } else {
      const filtered = caseStudies.filter(
        (caseStudy) => caseStudy.category === selectedCategory
      );
      setFilteredCaseStudies(filtered);
    }
  }, [selectedCategory, caseStudies]);

  if (categories) {
    categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
  }

  return (
    <MaxWidthWrapper className="py-12 lg:py-24">
      <div className="mb-8 hidden md:block">
        {categories.map((category) => (
          <button
            key={category.slug}
            className={cn(
              "m-2 md:p-3 md:px-8 rounded-full border text-base lg:text-xl",
              selectedCategory === category.slug
                ? "bg-[#F89520] text-white"
                : "bg-white text-black"
            )}
            onClick={() => {
              setSelectedCategory(category.slug);
            }}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
      <div className=" block md:hidden">
        <h3>Filter:</h3>
        <Select
          onValueChange={(value) => {
            setSelectedCategory(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {filteredCaseStudies.map((caseStudy) => (
          <CaseStudyCard
            category={caseStudy.category}
            categories={categories}
            colorScheme={caseStudy.colorScheme}
            key={caseStudy.slug}
            slug={caseStudy.slug}
            caseStudyName={caseStudy.caseStudyName}
            caseStudyDescription={caseStudy.caseStudyDescription}
            cardImage={caseStudy.cardImage}
            aboutProjectDescription={caseStudy.aboutProjectDescription}
            technologiesUsed={caseStudy.technologiesUsed}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

interface CaseStudyCardProps {
  category: string;
  categories: Category[];
  colorScheme: string;
  slug: string;
  caseStudyName: string;
  caseStudyDescription: string;
  cardImage: string;
  aboutProjectDescription: string;
  technologiesUsed: string[];
}

function CaseStudyCard({
  category,
  categories,
  colorScheme,
  slug,
  caseStudyName,
  caseStudyDescription,
  cardImage,
  aboutProjectDescription,
  technologiesUsed,
}: CaseStudyCardProps) {
  const categoryData = categories.find((cat) => cat.slug === category);

  return (
    <div
      className={`p-5 lg:p-8 xl:p-14 my-8 border rounded-3xl flex flex-col-reverse lg:flex-row lg:gap-10 xl:gap-20 bg-gradient-to-b from-white from-70% to-[#02811a] `}
      // style={{
      //   background: `linear-gradient(to bottom, #fff 75%, ${colorScheme} 25%)`,
      // }}
    >
      <div className="w-full lg:w-1/2 flex flex-col ">
        <div
          className="h-4 w-7 hidden lg:block"
          style={{
            backgroundColor: colorScheme,
          }}
        />
        <div className="py-2 lg:py-4">
          <h3 className="text-xl lg:text-3xl my-1 lg:my-4 text-center lg:text-left">
            About the project
          </h3>
          <p className="line-clamp-3 text-base lg:text-lg  text-justify lg:text-left hyphens-auto lg:hyphens-none">
            {aboutProjectDescription}
          </p>
        </div>
        <div className="pb-4 grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3 xl:gap-5">
          {technologiesUsed.map((tech) => {
            const techData = categoryData?.technologies.find(
              (t) => t._id === tech
            );
            return techData ? (
              <p
                key={techData._id}
                className="text-white bg-[#515151] rounded-lg lg:rounded-full text-center text-xs sm:text-base py-1 flex items-center justify-center"
              >
                {techData.title}
              </p>
            ) : null;
          })}
        </div>
        <div className="flex-grow "></div>
        <div className="flex items-center lg:items-start justify-center lg:justify-start">
          <Button
            title="View Case Study"
            className="bg-white text-black mt-5"
            svgClassName="bg-[#F89520] group-hover/btn:right-[10.2rem]"
            type="button"
            navigateTo={`/case-studies/${slug}`}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center ">
        <div>
          <h2 className="text-[1.688rem] md:text-4xl text-center">
            {caseStudyName}
          </h2>
          <p className="line-clamp-1 text-center text-base lg:text-lg ">
            {caseStudyDescription}
          </p>
        </div>
        <div className="flex-grow"></div>
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${cardImage}`}
            alt="Case Study Card Image"
            height={400}
            width={600}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default CaseStudyCards;

// "use client";
// import React, { use, useEffect, useState } from "react";
// import MaxWidthWrapper from "../MaxWidthWrapper/MaxWidthWrapper";
// import Image from "next/image";
// import Button from "../Button/Button";
// import { cn } from "@/lib/utils";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Technology {
//   _id: string;
//   icon: string;
//   title: string;
// }

// interface Category {
//   categoryName: string;
//   slug: string;
//   technologies: Technology[];
// }

// interface CaseStudy {
//   colorScheme: string;
//   slug: string;
//   category: string;
//   caseStudyName: string;
//   caseStudyDescription: string;
//   cardImage: string;
//   aboutProjectDescription: string;
//   technologiesUsed: string[];
// }

// interface CaseStudyCardsProps {
//   categories: Category[];
//   caseStudies: CaseStudy[];
// }
// function CaseStudyCards() {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
//   const [filteredCaseStudies, setFilteredCaseStudies] =
//     useState<CaseStudy[]>(caseStudies);

//   useEffect(() => {
//     async function getCaseStudyCategories() {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/case-studies-category/getCaseStudiesCategory/all`,
//         {
//           method: "GET",
//         }
//       );
//       const data = await res.json();
//       setCategories(data.result);
//     }
//     async function getCaseStudies() {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/case-studies/all`
//       );
//       const data = await res.json();
//       setCaseStudies(data.result);
//     }
//     getCaseStudyCategories();
//     getCaseStudies();
//   }, []);

//   useEffect(() => {
//     if (selectedCategory === "all") {
//       setFilteredCaseStudies(caseStudies);
//     } else {
//       const filtered = caseStudies.filter(
//         (caseStudy) => caseStudy.category === selectedCategory
//       );
//       setFilteredCaseStudies(filtered);
//     }
//   }, [selectedCategory, caseStudies]);

//   if (categories) {
//     categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
//   }

//   return (
//     <MaxWidthWrapper className="py-12 lg:py-24">
//       <div className="mb-8 hidden md:block">
//         {categories.map((category) => (
//           <button
//             key={category.slug}
//             className={cn(
//               "m-2 md:p-3 md:px-8 rounded-full border text-base lg:text-xl",
//               selectedCategory === category.slug
//                 ? "bg-[#F89520] text-white"
//                 : "bg-white text-black"
//             )}
//             onClick={() => {
//               setSelectedCategory(category.slug);
//             }}
//           >
//             {category.categoryName}
//           </button>
//         ))}
//       </div>
//       <div className=" block md:hidden">
//         <h3>Filter:</h3>
//         <Select
//           onValueChange={(value) => {
//             setSelectedCategory(value);
//           }}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select Category"></SelectValue>
//           </SelectTrigger>
//           <SelectContent>
//             {categories.map((category) => (
//               <SelectItem key={category.slug} value={category.slug}>
//                 {category.categoryName}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//       <div>
//         {filteredCaseStudies.map((caseStudy) => (
//           <CaseStudyCard
//             category={caseStudy.category}
//             categories={categories}
//             colorScheme={caseStudy.colorScheme}
//             key={caseStudy.slug}
//             slug={caseStudy.slug}
//             caseStudyName={caseStudy.caseStudyName}
//             caseStudyDescription={caseStudy.caseStudyDescription}
//             cardImage={caseStudy.cardImage}
//             aboutProjectDescription={caseStudy.aboutProjectDescription}
//             technologiesUsed={caseStudy.technologiesUsed}
//           />
//         ))}
//       </div>
//     </MaxWidthWrapper>
//   );
// }

// interface CaseStudyCardProps {
//   category: string;
//   categories: Category[];
//   colorScheme: string;
//   slug: string;
//   caseStudyName: string;
//   caseStudyDescription: string;
//   cardImage: string;
//   aboutProjectDescription: string;
//   technologiesUsed: string[];
// }

// function CaseStudyCard({
//   category,
//   categories,
//   colorScheme,
//   slug,
//   caseStudyName,
//   caseStudyDescription,
//   cardImage,
//   aboutProjectDescription,
//   technologiesUsed,
// }: CaseStudyCardProps) {
//   const categoryData = categories.find((cat) => cat.slug === category);

//   return (
//     <div
//       className={`p-5 lg:p-8 xl:p-14 my-8 border rounded-3xl flex flex-col-reverse lg:flex-row lg:gap-10 xl:gap-20 bg-gradient-to-b from-white from-70% to-[#02811a] `}
//       // style={{
//       //   background: `linear-gradient(to bottom, #fff 75%, ${colorScheme} 25%)`,
//       // }}
//     >
//       <div className="w-full lg:w-1/2 flex flex-col ">
//         <div
//           className="h-4 w-7 hidden lg:block"
//           style={{
//             backgroundColor: colorScheme,
//           }}
//         />
//         <div className="py-2 lg:py-4">
//           <h3 className="text-xl lg:text-3xl my-1 lg:my-4 text-center lg:text-left">
//             About the project
//           </h3>
//           <p className="line-clamp-3 text-base lg:text-lg  text-justify lg:text-left hyphens-auto lg:hyphens-none">
//             {aboutProjectDescription}
//           </p>
//         </div>
//         <div className="pb-4 grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3 xl:gap-5">
//           {technologiesUsed.map((tech) => {
//             const techData = categoryData?.technologies.find(
//               (t) => t._id === tech
//             );
//             return techData ? (
//               <p
//                 key={techData._id}
//                 className="text-white bg-[#515151] rounded-lg lg:rounded-full text-center text-xs sm:text-base py-1 flex items-center justify-center"
//               >
//                 {techData.title}
//               </p>
//             ) : null;
//           })}
//         </div>
//         <div className="flex-grow "></div>
//         <div className="flex items-center lg:items-start justify-center lg:justify-start">
//           <Button
//             title="View Case Study"
//             className="bg-white text-black mt-5"
//             svgClassName="bg-[#F89520] group-hover/btn:right-[10.2rem]"
//             type="button"
//             navigateTo={`/case-studies/${slug}`}
//           />
//         </div>
//       </div>
//       <div className="w-full lg:w-1/2 flex flex-col items-center ">
//         <div>
//           <h2 className="text-[1.688rem] md:text-4xl text-center">
//             {caseStudyName}
//           </h2>
//           <p className="line-clamp-1 text-center text-base lg:text-lg ">
//             {caseStudyDescription}
//           </p>
//         </div>
//         <div className="flex-grow"></div>
//         <div>
//           <Image
//             src={`${process.env.NEXT_PUBLIC_IMG_URL}${cardImage}`}
//             alt="Case Study Card Image"
//             height={400}
//             width={600}
//             className="rounded-lg object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CaseStudyCards;

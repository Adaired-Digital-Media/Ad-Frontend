'use client';
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import Image from 'next/image';
import Button from '@web-components/Button';
import { cn } from '@core/utils/class-names';
import { Select } from 'rizzui';

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCaseStudies, setFilteredCaseStudies] =
    useState<CaseStudy[]>(caseStudies);

  useEffect(() => {
    if (selectedCategory === 'all') {
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
              'm-2 rounded-full border text-base md:p-3 md:px-8 lg:text-xl',
              selectedCategory === category.slug
                ? 'bg-[#F89520] text-white'
                : 'bg-white text-black'
            )}
            onClick={() => {
              setSelectedCategory(category.slug);
            }}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
      <div className="block md:hidden">
        <h3>Filter:</h3>
        <Select
          value={selectedCategory}
          onChange={(value) => {
            const selectedOption = value as { value: string };
            setSelectedCategory(selectedOption.value);
          }}
          options={[
            ...categories.map((category) => ({
              value: category.slug,
              label: category.categoryName,
            })),
          ]}
          placeholder="Select Category"
        />
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
      className={`my-8 flex flex-col-reverse rounded-3xl border bg-gradient-to-b from-white from-70% to-[#02811a] p-5 lg:flex-row lg:gap-10 lg:p-8 xl:gap-20 xl:p-14`}
      style={{
        backgroundImage: `linear-gradient(to bottom, white 70%,${colorScheme})`,
      }}
    >
      <div className="flex w-full flex-col lg:w-1/2">
        <div
          className="hidden h-4 w-7 lg:block"
          style={{
            backgroundColor: colorScheme,
          }}
        />
        <div className="py-2 lg:py-4">
          <p className="my-1 text-center text-xl lg:my-4 lg:text-left lg:text-3xl">
            About the project
          </p>
          <p className="line-clamp-3 hyphens-auto text-justify text-base lg:hyphens-none lg:text-left lg:text-lg">
            {aboutProjectDescription}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 pb-4 lg:grid-cols-2 lg:gap-3 xl:grid-cols-3 xl:gap-5">
          {technologiesUsed.map((tech) => {
            const techData = categoryData?.technologies.find(
              (t) => t._id === tech
            );
            return techData ? (
              <p
                key={techData._id}
                className="flex items-center justify-center rounded-lg bg-[#515151] py-1 text-center text-xs text-white sm:text-base lg:rounded-full"
              >
                {techData.title}
              </p>
            ) : null;
          })}
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-center lg:items-start lg:justify-start">
          <Button
            title="View Case Study"
            className="mt-5 bg-white text-black"
            svgClassName="bg-[#F89520]"
            type="button"
            navigateTo={`/case-studies/${slug}`}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center lg:w-1/2">
        <div>
          <h2 className="text-center text-[1.688rem] md:text-4xl">
            {caseStudyName}
          </h2>
          <p className="line-clamp-1 text-center text-base lg:text-lg">
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

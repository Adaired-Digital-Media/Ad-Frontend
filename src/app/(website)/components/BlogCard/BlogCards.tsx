import React from 'react';
import BlogCard from '@web-components/BlogCard/BlogCard';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import Button from '@web-components/Button';

const BlogCards = ({ blogs }: { blogs: any }) => {
  return (
    <section className="py-3 md:py-12">
      <MaxWidthWrapper className="text-center">
        <div className="flex flex-col items-center">
          <div className="relative inline px-4 font-nunito text-lg text-[#515151]">
            <div className="absolute left-full top-1/2 h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC]"></div>
            <div className="absolute right-full top-1/2 h-px w-16 -translate-y-1/2 transform bg-[#A7A9AC]"></div>
            Blog
          </div>
          <h2 className="py-1 text-[1.688rem] md:text-4xl">
            Update On The Latest Marketing Trends And Tech
          </h2>
          <p className="max-w-[900px] py-1 pb-10 text-base sm:text-lg">
            You can never miss an update with Adaried! Explore our blogs for
            insightful information and stay ahead with specially curated content
            by industry experts.
          </p>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog: any, index: number) => (
          <div
            key={blog._id}
            className={` ${index === blogs.length - 1 ? 'hidden lg:block' : ''}`}
          >
            <BlogCard data={blog} />
          </div>
        ))}
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex items-center justify-center">
        <Button
          title="View More"
          className="mt-5 border border-gray-200 bg-white text-black"
          svgClassName="bg-[#F89520]"
          type="button"
          navigateTo={`/blog`}
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default BlogCards;

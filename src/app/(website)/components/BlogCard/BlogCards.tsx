import React from 'react';
import BlogCard from '@web-components/BlogCard/BlogCard';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import Button from '@web-components/Button';
import Heading from '../../common/Heading';

const BlogCards = ({ blogs }: { blogs: any }) => {
  return (
    <section className="py-3 md:py-12">
      <MaxWidthWrapper className="text-center">
        <Heading
          subTitle={'Blog'}
          title={'Update On The Latest Marketing Trends And Tech'}
          span={''}
          description={`You can never miss an update with Adaried! Explore our blogs for
            insightful information and stay ahead with specially curated content
            by industry experts.`}
        />
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

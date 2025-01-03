import React from "react";
import BlogCard from "@web-components/BlogCard/BlogCard";
import MaxWidthWrapper from "@web-components/MaxWidthWrapper";
import Button from "@web-components/Button";

export async function getBlogsData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/readBlog?limit=3&skip=0`
  );
  const data = await res.json();
  return data;
}

const BlogCards: React.FC = async () => {
  const data = await getBlogsData();

  return (
    <section className="py-3 md:py-12">
      <MaxWidthWrapper className="text-center">
        <div className="flex flex-col items-center">
          <h3 className="inline font-nunito text-[#515151] relative px-4 text-lg">
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 bg-[#A7A9AC] h-px w-16"></div>
            <div className="absolute top-1/2 right-full transform -translate-y-1/2 bg-[#A7A9AC] h-px w-16"></div>
            Blog
          </h3>
          <h2 className="text-[1.688rem] md:text-4xl py-1">
            Update On The Latest Marketing Trends And Tech
          </h2>
          <p className="py-1 pb-10 text-base sm:text-lg max-w-[900px]">
            You can never miss an update with Adaried! Explore our blogs for
            insightful information and stay ahead with specially curated content
            by industry experts.
          </p>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((blog: any, index: number) => (
          <div
            key={blog._id}
            className={` ${index === data.length - 1 ? "hidden lg:block" : ""}`}
          >
            <BlogCard data={blog} />
          </div>
        ))}
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex items-center justify-center">
        <Button
          title="View More"
          className="bg-white text-black mt-5"
          svgClassName="bg-[#F89520]"
          type="button"
          navigateTo={`/blog`}
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default BlogCards;

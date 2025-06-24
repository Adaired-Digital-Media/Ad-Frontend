'use client';

import { FC, useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { calculateReadingTime } from '@core/utils/calculateReadingTime';
import { formatDate } from '@core/utils/format-date';
import Button from '@web-components/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@core/ui/shadcn-ui/card';
import { Separator } from '@core/ui/shadcn-ui/separator';
import Link from 'next/link';
import Pagination from '@core/ui/rizzui-ui/pagination';

// Type definitions
interface Blog {
  _id: string;
  slug: string;
  postTitle: string;
  postDescription: string;
  featuredImage: string;
  excerpt:string;
  createdAt: string;
}

interface IProps {
  data: Blog[];
}

const BlogWPagination: FC<IProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Memoize current blogs to prevent unnecessary slicing
  const currentBlogs = useMemo(() => {
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    return data.slice(indexOfFirstBlog, indexOfLastBlog);
  }, [data, currentPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 xl:gap-0">
        {currentBlogs.map((blog) => (
          <article key={blog._id} className="first:mt-10 xl:first:mt-0">
            {/* Desktop Layout (xl and above) */}
            <div className="mb-10 hidden rounded-lg border p-10 xl:flex">
              <div className="w-[45%] shrink-0">
                <Link href={`/blog/${blog.slug}`}>
                  <Image
                    src={blog.featuredImage}
                    height={400}
                    width={800}
                    alt={blog.postTitle}
                    sizes="(max-width: 1280px) 45vw, 360px"
                    className="-ml-14 rounded-lg object-cover"
                  />
                </Link>
              </div>
              <div className="w-[55%] pl-6">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDate(new Date(blog.createdAt))}</span>
                  <span>{`${calculateReadingTime(blog.postDescription)} min read`}</span>
                </div>
                <h2 className="mt-2 font-nunito text-2xl font-semibold">
                  <Link href={`/blog/${blog.slug}`}>{blog.postTitle}</Link>
                </h2>
                <p className="mt-2 line-clamp-2 font-nunito text-gray-600">
                {blog.excerpt}
                </p>
                <Button
                  title="Read Blog"
                  className="mt-4 border-none bg-white text-black"
                  svgClassName="bg-[#F89520]"
                  type="button"
                  navigateTo={`/blog/${blog.slug}`}
                />
              </div>
            </div>

            {/* Mobile/Tablet Layout (below xl) */}
            <Card className="xl:hidden">
              <CardHeader className="p-4">
                <Link href={`/blog/${blog.slug}`}>
                  <Image
                    src={blog.featuredImage}
                    alt={blog.postTitle}
                    height={400}
                    width={800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rounded-t-lg object-cover"
                  />
                </Link>
                <CardTitle className="mt-4 font-nunito text-xl">
                  <Link href={`/blog/${blog.slug}`}>{blog.postTitle}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-3 font-nunito text-gray-600">
                 {blog.excerpt}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button
                  title="Read More"
                  className="border-none bg-white text-black"
                  svgClassName="bg-[#F89520] right-2.5 group-hover/btn:right-28"
                  type="button"
                  navigateTo={`/blog/${blog.slug}`}
                />
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{formatDate(new Date(blog.createdAt))}</span>
                  <span>{`${calculateReadingTime(blog.postDescription)} min read`}</span>
                </div>
              </CardFooter>
              <Separator className="mx-auto w-[90%]" />
            </Card>
          </article>
        ))}
      </div>

      {data.length > blogsPerPage && (
        <div className="flex justify-center">
          <Pagination
            total={data.length}
            current={currentPage}
            onChange={setCurrentPage}
            pageSize={blogsPerPage}
            nextIcon="Next"
            prevIcon="Previous"
          />
        </div>
      )}
    </div>
  );
};

export default BlogWPagination;
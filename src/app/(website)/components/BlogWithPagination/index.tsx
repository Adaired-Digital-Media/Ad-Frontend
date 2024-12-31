'use client';
import { FC, useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { calculateReadingTime } from '@core/utils/calculateReadingTime';
import { formatDate } from '@core/utils/format-date';
import { cn } from 'rizzui';
import Button from '@web-components/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@core/ui/shadcn-ui/card';
import { Separator } from '@core/ui/shadcn-ui/separator';
import parse from 'html-react-parser';
import Link from 'next/link';

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

import Pagination from '@/@core/ui/rizzui-ui/pagination';

interface IProps {
  data: any;
}

const BlogWPagination: FC<IProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);

  // Filter and sort the blogs by date
  const sortedBlogs = useMemo(() => {
    const publishedBlogs = data.filter(
      (blog: any) => blog.status === 'publish'
    );
    return publishedBlogs.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [data]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Scroll to top whenever the currentPage changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 xl:gap-0">
        {currentBlogs.map((blog: any) => {
          return (
            <>
              <figure className="mb-10 hidden rounded-lg border p-10 first:mt-10 xl:flex" key={blog.postTitle}>
                <div className="w-[45%] shrink-0">
                  <Link href={`/blog/${blog.slug}`}>
                    <Image
                      src={blog.featuredImage}
                      height={400}
                      width={800}
                      alt={blog.postTitle || 'Blog Image'}
                      className="-ml-14 rounded-lg"
                    />
                  </Link>
                </div>
                <div className="w-[55%] shrink-0">
                  <div className="flex items-center justify-between">
                    <p className="mb-1 text-sm text-gray-500 lg:text-base">
                      {formatDate(blog.createdAt)}
                    </p>
                    <p className="mb-1 text-sm text-gray-500 lg:text-base">
                      {calculateReadingTime(blog.postDescription) +
                        ' min read '}
                    </p>
                  </div>
                  <div>
                    <h2 className="mb-1 font-nunito font-semibold lg:text-2xl">
                      <Link href={`/blog/${blog.slug}`}>{blog.postTitle}</Link>
                    </h2>
                    <span className="line-clamp-2 font-nunito">
                      {parse(blog.postDescription)}
                    </span>
                  </div>
                  <div>
                    <Button
                      title="Read Blog"
                      svgClassName="bg-[#F89520] "
                      className="mt-4 border-none bg-white text-black"
                      type="button"
                      navigateTo={`/blog/${blog.slug}`}
                    />
                  </div>
                </div>
              </figure>

              <Card className="xl:hidden" key={blog.slug}>
                <CardHeader className="p-4">
                  <div className="mb-4">
                    <Link href={`/blog/${blog.slug}`}>
                      <Image
                        src={blog.featuredImage}
                        alt={blog.postTitle || 'Blog Image'}
                        height={400}
                        width={800}
                        style={{ objectFit: 'cover' }}
                      />
                    </Link>
                  </div>
                  <CardTitle className="line-clamp-2 font-nunito text-2xl">
                    <Link href={`/blog/${blog.slug}`}>{blog.postTitle}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-left font-nunito text-lg">
                  <div className="line-clamp-3">
                    {parse(blog.postDescription)}
                  </div>
                </CardContent>
                <div className="p-4">
                  <Button
                    title="Read More"
                    className="border-none bg-white text-black"
                    svgClassName="bg-[#F89520] right-2.5 group-hover/btn:right-28"
                    type="button"
                    navigateTo={`/blog/${blog.slug}`}
                  />
                </div>
                <Separator className="mx-auto w-[90%]" />
                <CardFooter className="justify-between pt-6">
                  <p>{formatDate(blog.createdAt)}</p>
                  <p>
                    {' '}
                    {calculateReadingTime(blog.postDescription) + ' min read '}
                  </p>
                </CardFooter>
              </Card>
            </>
          );
        })}
      </div>

      {/* <Pagination>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() =>
                currentPage > 1 && setCurrentPage((prev) => prev - 1)
              }
            />
          </PaginationItem>
          {pageNumbers.map((number) => (
            <PaginationItem key={number} className="cursor-pointer">
              <PaginationLink
                onClick={() => paginate(number)}
                isActive={currentPage === number}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() =>
                currentPage < pageNumbers.length &&
                setCurrentPage((prev) => prev + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </>
  );
};

export default BlogWPagination;

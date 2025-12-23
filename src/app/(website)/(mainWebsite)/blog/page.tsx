import React from 'react';
import PageBanner from '@web-components/PageBanner';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import PopularPosts from '@web-components/PopularPosts';
import BlogWPagination from '@web-components/BlogWithPagination';
import type { Metadata } from 'next';

// Server-safe excerpt function
export const getExcerpt = (html: string, maxLength: number = 150): string => {
  const text = html.replace(/<[^>]+>/g, ' '); // Strip HTML tags
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export const metadata: Metadata = {
  title: 'Read Our Blog for Helpful Tips and Ideas | Adaired',
  description:
    'Get easy-to-understand tips and new ideas from Adaired’s blogs. From practical tips to interesting ideas, there is something for everyone. Start exploring today!',
  alternates: {
    canonical: 'https://www.adaired.com/blog',
  },
};

// async function getBlogs() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read?status=publish`
//   );
//   if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.statusText}`);
//   const data = await res.json();
//   // Pre-compute excerpts on the server
//   const blogsWithExcerpts = data.data.map((blog: any) => ({
//     ...blog,
//     excerpt: getExcerpt(blog.postDescription),
//   }));
//   return { ...data, data: blogsWithExcerpts };
// }
async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read?status=publish`,
      {
        cache: 'no-store', // important for dynamic content
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch blogs:', res.status, res.statusText);
      return { data: [] };
    }

    const data = await res.json();

    const blogsWithExcerpts = (data?.data ?? []).map((blog: any) => ({
      ...blog,
      excerpt: getExcerpt(blog.postDescription),
    }));

    return {
      ...data,
      data: blogsWithExcerpts,
    };
  } catch (error) {
    console.error('getBlogs error:', error);
    return { data: [] };
  }
}

const Blog = async () => {
  const data = await getBlogs();

  return (
    <>
      <PageBanner title="Blog" />

      <MaxWidthWrapper className="py-6 lg:py-12">
        <div className="flex flex-col gap-10 xl:flex-row">
          <div className="xl:w-[70%]">
            <BlogWPagination data={data.data} />
          </div>

          <aside className="relative xl:w-[30%]">
            <div className="sticky top-24">
              <PopularPosts initialData={data.data.slice(0, 5)} />
            </div>
          </aside>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Blog;

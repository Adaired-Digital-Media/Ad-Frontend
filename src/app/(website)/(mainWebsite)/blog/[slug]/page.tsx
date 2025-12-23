import React from 'react';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import Image from 'next/image';
import parse, { domToReact, Element, DOMNode } from 'html-react-parser';
import PageBanner from '@web-components/PageBanner';
import PopularPosts from '@web-components/PopularPosts';
import type { Metadata } from 'next';
import { parseStyleString } from '@core/utils/parseStyleString';
import { formatDate } from '@core/utils/format-date';
import Head from 'next/head';

async function getBlogs({ params }: { params: { slug: string } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read?slug=${params.slug}`
  );
  const data = await res.json();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await getBlogs({ params });
  const blog = data[0];

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URI || 'https://adaired.com'
    ),
    title: blog?.seo?.metaTitle || blog?.postTitle,
    description: blog?.seo?.metaDescription,
    keywords: blog?.seo?.keywords,
    alternates: {
      canonical: blog?.seo?.canonicalLink || `/blog/${params?.slug}`,
    },
    robots: blog?.seo?.robotsText ?? 'index, follow',
    openGraph: {
      title: blog?.seo?.openGraph?.title || blog?.seo?.metaTitle,
      description:
        blog?.seo?.openGraph?.description || blog?.seo?.metaDescription,
      images: blog?.seo?.openGraph?.image || blog?.featuredImage,
      url: blog?.seo?.openGraph?.url || `/blog/${params?.slug}`,
      siteName: blog?.seo?.openGraph?.siteName || 'Adaired',
      type: blog?.seo?.openGraph?.type || 'website',
    },
    twitter: {
      card: blog?.seo?.twitterCard?.cardType || 'summary_large_image',
      site: blog?.seo?.twitterCard?.site,
      creator: blog?.seo?.twitterCard?.creator,
      title: blog?.seo?.twitterCard?.title || blog?.seo?.metaTitle,
      description:
        blog?.seo?.twitterCard?.description || blog?.seo?.metaDescription,
      images: blog?.seo?.twitterCard?.image || blog?.featuredImage,
    },
  };
}

// export async function generateStaticParams() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read`
//   ).then((res) => res.json());
//   const blogs = res.data.data;
//   return blogs.map((blog: any) => ({
//     slug: blog.slug.toString(),
//   }));
// }
//updated
// export async function generateStaticParams() {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read`
//     );

//     if (!res.ok) {
//       console.error(`HTTP error! Status: ${res.status}, ${await res.text()}`);
//       throw new Error(`Failed to fetch blog slugs: ${res.statusText}`);
//     }

//     const data = await res.json();
//     const blogs = data.data || [];
//     return blogs.map((blog: any) => ({
//       slug: blog.slug.toString(),
//     }));
//   } catch (error) {
//     console.error('Error in generateStaticParams:', error);
//     return [];
//   }
// }

export async function generateStaticParams() {
  try {
    const API_URL = process.env.BACKEND_API_URI;

    if (!API_URL) {
      console.warn('BACKEND_API_URI not defined at build time');
      return [];
    }

    const res = await fetch(`${API_URL}/blog/read`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`HTTP error! Status: ${res.status}, await res.text()`);
      return [];
    }

    const data = await res.json();
    const blogs = data?.data ?? [];

    return blogs.map((blog: any) => ({
      slug: String(blog.slug),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

interface BlogProps {
  params: {
    slug: string;
  };
}

const Blog = async ({ params }: BlogProps) => {
  const { data } = await getBlogs({ params });
  const blog = data[0];

  const contentWithClass = parse(blog.postDescription, {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const { tagName, attribs, children } = domNode;
        const supportedTags = /^(h[1-6]|ol|ul|p|blockquote)$/;

        if (supportedTags.test(tagName)) {
          let additionalClasses = 'font-nunito';

          switch (tagName) {
            case 'h1':
            case 'h2':
              additionalClasses += ' text-2xl md:text-3xl font-bold my-4';
              break;
            case 'h3':
              additionalClasses += ' text-xl md:text-2xl font-semibold my-3';
              break;
            case 'ol':
              additionalClasses += ' pl-6 my-2 list-decimal';
              break;
            case 'ul':
              additionalClasses += ' pl-6 my-2 list-disc';
              break;
            case 'p':
              additionalClasses += ' my-2';
              break;
            case 'blockquote':
              additionalClasses += ' border-l-4 pl-4 my-2 italic';
              break;
          }

          const { className, style, ...otherAttribs } = attribs;
          const styleObject =
            typeof style === 'string' ? parseStyleString(style) : style;

          return React.createElement(
            tagName,
            {
              ...otherAttribs,
              className: `${className || ''} ${additionalClasses}`.trim(),
              style: styleObject,
            },
            domToReact(children as DOMNode[])
          );
        }
      }
    },
  });

  return (
    <>
      <Head>
        {/* Only include tags not supported by generateMetadata */}
        {blog?.seo?.schemaOrg && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: blog?.seo?.schemaOrg }}
          />
        )}
        {blog?.seo?.headerScript && (
          <script
            dangerouslySetInnerHTML={{ __html: blog?.seo?.headerScript }}
          />
        )}
      </Head>
      <PageBanner title="Blog" />
      <MaxWidthWrapper className="flex gap-10 py-6 lg:py-12">
        <div className="w-full border p-6 lg:w-[70%] lg:p-10">
          <div className="relative">
            <Image
              src={blog.featuredImage}
              height={560}
              width={1000}
              alt={blog.postTitle}
              priority
            />
          </div>
          <h1 className="py-4 font-nunito text-2xl font-bold md:text-3xl lg:text-4xl">
            {blog.postTitle}
          </h1>
          <p className="pb-2 font-nunito text-gray-600">
            {formatDate(blog.createdAt)}
          </p>
          <div className="prose max-w-none">{contentWithClass}</div>
        </div>
        <aside className="hidden w-[30%] lg:block">
          <div className="sticky top-24">
            <PopularPosts />
          </div>
        </aside>
      </MaxWidthWrapper>
      {blog?.seo?.bodyScript && (
        <script dangerouslySetInnerHTML={{ __html: blog?.seo?.bodyScript }} />
      )}
      {blog?.seo?.footerScript && (
        <script dangerouslySetInnerHTML={{ __html: blog?.seo?.footerScript }} />
      )}
    </>
  );
};

export default Blog;

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton, LineGroup } from '@/@core/ui/skeleton';
import { BaseURL } from '@/baseUrl';

interface BlogPost {
  _id: string;
  slug: string;
  postTitle: string;
  featuredImage: string;
}

interface PopularPostsProps {
  initialData?: BlogPost[]; // Optional initial data from server
}

export default function PopularPosts({ initialData }: PopularPostsProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      const fetchPopularPosts = async () => {
        try {
          const res = await fetch(`${BaseURL}/blog/read?limit=6`);
          const data = await res.json();
          setPosts(data.data);
        } catch (error) {
          console.error('Failed to fetch popular posts:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPopularPosts();
    }
  }, [initialData]);

  if (isLoading)
    return (
      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="space-y-5">
          {/* Title Skeleton */}
          <div className="relative">
            <Skeleton className="mb-2 h-6 w-32" />
            <Skeleton className="absolute bottom-0 h-0.5 w-12" />
          </div>

          {/* Posts List Skeletons */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3">
                {/* Image Skeleton */}
                <Skeleton className="h-16 w-24 rounded-lg" />

                {/* Content Skeleton */}
                <div className="min-w-0 flex-1 space-y-2">
                  {/* <Skeleton className="h-4 w-full" /> */}
                  <LineGroup
                    columns={3}
                    className="gap-2"
                    skeletonClassName="h-3"
                  />
                  <Skeleton className="h-1 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="rounded-lg border p-5">
      <div className="space-y-5">
        <h2 className="relative py-2 text-2xl">
          <div className="absolute bottom-0 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-lg bg-[#A7A9AC] md:left-0 md:translate-x-0"></div>
          Popular Posts
        </h2>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-3"
            key={post._id}
            prefetch={false}
          >
            <div className="shrink-0">
              <Image
                src={post.featuredImage}
                alt={post.postTitle}
                height={100}
                width={100}
                className="rounded-lg"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
            <div>
              <h3 className="relative py-2 font-nunito text-base">
                <div className="absolute bottom-1 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-lg bg-[#A7A9AC] md:left-0 md:translate-x-0"></div>
                {post.postTitle}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

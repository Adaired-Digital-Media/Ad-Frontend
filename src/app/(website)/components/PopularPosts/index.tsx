import Image from 'next/image';
import Link from 'next/link';

// Type definitions
interface Blog {
  _id: string;
  slug: string;
  postTitle: string;
  featuredImage: string;
}

interface PopularPostsProps {
  data?: Blog[];
}

async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.data || [];
}

const PopularPosts = async ({ data }: PopularPostsProps) => {
  let blogs: Blog[] = data ?? (await getBlogs());
  blogs = blogs.slice(0, 5);
  return (
    <>
      <div className="border p-5">
        <div className="space-y-5">
          <h2 className="relative py-2 text-2xl">
            <div className="absolute bottom-0 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-lg bg-[#A7A9AC] md:left-0 md:translate-x-0"></div>
            Popular Posts
          </h2>

          {blogs.map((blog: any) => {
            return (
              <Link
                href={'/blog/' + blog.slug}
                className="flex items-center gap-3"
                key={blog._id}
                prefetch={false}
              >
                <div className="shrink-0">
                  <Image
                    src={blog.featuredImage}
                    alt={blog.postTitle}
                    height={100}
                    width={100}
                    style={{ aspectRatio: '4/3' }}
                    className="rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="relative py-2 font-nunito text-base">
                    <div className="absolute bottom-1 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-lg bg-[#A7A9AC] md:left-0 md:translate-x-0"></div>
                    {blog.postTitle}
                  </h3>
                  {/* <p className="text-sm line-clamp-2">{blog.description}</p> */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PopularPosts;

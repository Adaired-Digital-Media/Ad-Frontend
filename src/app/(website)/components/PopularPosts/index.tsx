import Image from "next/image";
import Link from "next/link";

async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/readBlog`
  );
  const data = await res.json();
  return data;
}

const PopularPosts = async () => {
  const data = await getBlogs();
  const blogs = data.reverse().slice(0, 5);
  return (
    <>
      <div className="border p-5 ">
        <div className="space-y-5">
          <h2 className="relative py-2 text-2xl">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0  md:left-0 bg-[#A7A9AC] h-0.5 w-16 rounded-lg"></div>
            Popular Posts
          </h2>

          {blogs.map((blog: any) => {
            return (
              <Link
                href={"/blog/" + blog.slug}
                className="flex items-center gap-3"
                key={blog.title}
              >
                <div className="shrink-0">
                  <Image
                    src={blog.featuredImage}
                    alt="Image"
                    height={100}
                    width={100}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="relative py-2 font-nunito text-base">
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 md:translate-x-0  md:left-0 bg-[#A7A9AC] h-0.5 w-16 rounded-lg"></div>
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

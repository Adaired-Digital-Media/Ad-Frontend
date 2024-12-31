import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Button from "@/components/Button";
import Image from "next/image";
import { formatDate, ServerRemoveTags } from "@/lib/utils";
import Link from "next/link";

interface Data {
  featuredImage: string;
  postTitle: string;
  postDescription: string;
  slug: string;
  createdAt: string;
  readTime: string;
}
interface BlogCardProps {
  data: Data;
}
const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  return (
    <Card className="rounded-none ">
      {/* <Link href={`/blog/${data.slug}`} className=""> */}
      <CardHeader className="p-4">
        <div className="mb-4">
          <Link href={`/blog/${data.slug}`} className="">
            <Image
              src={`${data.featuredImage}`}
              alt="Blog Image"
              height={400}
              width={800}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>

        <CardTitle className="line-clamp-2 font-nunito text-2xl ">
          <Link href={`/blog/${data.slug}`} className="">
            {data.postTitle}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="font-nunito text-lg text-left p-4 pt-0">
        <div className="line-clamp-3">{ServerRemoveTags(data.postDescription)}</div>
      </CardContent>
      <div className="p-4">
        <Button
          title="Read Blog"
          className="bg-white text-black  border-none"
          svgClassName="bg-[#F89520] "
          type="button"
          navigateTo={`/blog/${data.slug}`}
        />
      </div>
      <Separator className="mx-auto w-[90%]" />
      <CardFooter className="justify-between pt-6">
        <p>{formatDate(data.createdAt)}</p>
        <p>{data.readTime || "2 min read"}</p>
      </CardFooter>
      {/* </Link> */}
    </Card>
  );
};
export default BlogCard;

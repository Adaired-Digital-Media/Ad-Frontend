import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@core/ui/shadcn-ui/card';
import { Separator } from '@core/ui/shadcn-ui/separator';
import Button from '@web-components/Button';
import Image from 'next/image';
import { formatDate } from '@core/utils/format-date';
import Link from 'next/link';
import { getExcerpt } from '../../(mainWebsite)/blog/page';

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
    <Card className="rounded-none">
      {/* <Link href={`/blog/${data.slug}`} className=""> */}
      <CardHeader className="p-4">
        <div className="mb-4">
          <Link href={`/blog/${data.slug}`} className="">
            <Image
              src={`${data.featuredImage}`}
              alt="Blog Image"
              height={400}
              width={800}
              style={{ objectFit: 'cover' }}
            />
          </Link>
        </div>

        <CardTitle className="line-clamp-2 font-nunito text-2xl">
          <Link href={`/blog/${data.slug}`} className="">
            {data.postTitle}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-left font-nunito text-lg">
        <div className="line-clamp-3">{getExcerpt(data.postDescription)}</div>
      </CardContent>
      <div className="p-4">
        <Button
          title="Read Blog"
          className="border-none bg-white text-black"
          svgClassName="bg-[#F89520] "
          type="button"
          navigateTo={`/blog/${data.slug}`}
        />
      </div>
      <Separator className="mx-auto w-[90%]" />
      <CardFooter className="justify-between pt-6">
        <p>{formatDate(new Date(data.createdAt))}</p>
        <p>{data.readTime || '2 min read'}</p>
      </CardFooter>
      {/* </Link> */}
    </Card>
  );
};
export default BlogCard;

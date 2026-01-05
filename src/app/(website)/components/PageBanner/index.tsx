'use client';

import { usePathname } from 'next/navigation';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';

const PageBanner = ({ title }: { title: string }) => {
  const pathname = usePathname();

  // Check if the URL starts with '/blog/' and has something after it
  const isBlogDetailPage =
    pathname?.startsWith('/blog/') && pathname !== '/blog';

  return (
    <div className="relative flex h-40 w-full flex-col justify-center overflow-hidden bg-gray-50 pt-[5rem] md:h-48 lg:h-[25rem]">
      <MaxWidthWrapper>
        {isBlogDetailPage ? (
          <h2 className="font-dm text-3xl font-normal leading-none md:text-[3.375rem]">
            {title}
          </h2>
        ) : (
          <h1 className="font-dm text-3xl font-normal leading-none md:text-[3.375rem]">
            {title}
          </h1>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default PageBanner;

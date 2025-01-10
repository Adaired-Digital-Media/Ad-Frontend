'use client';

import { usePathname } from 'next/navigation';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';

const PageBanner = ({ title }: { title: string }) => {
  const pathname = usePathname();

  // Check if the URL starts with '/blog/' and has something after it
  const isBlogDetailPage = pathname?.startsWith('/blog/') && pathname !== '/blog';

  return (
    <div className="relative flex h-40 md:h-48 lg:h-64 w-full flex-col justify-center overflow-hidden bg-gray-50">
      <MaxWidthWrapper>
        {isBlogDetailPage ? (
          <h2 className="leading-none text-3xl md:text-[3.375rem] font-dm font-normal">{title}</h2>
        ) : (
          <h1 className="leading-none text-3xl md:text-[3.375rem] font-dm font-normal">{title}</h1>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default PageBanner;

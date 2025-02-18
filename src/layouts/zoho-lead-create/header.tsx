'use client';

import Link from 'next/link';
import StickyHeader from '@/layouts/sticky-header';
import Logo from '@core/components/logo';

export default function Header() {
  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8 4xl:px-10" offset={-1}>
      <div className="flex w-full max-w-2xl items-center">
        <Link href={'/zoho-leads/create'} aria-label="Site Logo">
          <Logo />
        </Link>
      </div>
    </StickyHeader>
  );
}

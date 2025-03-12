'use client';

import Link from 'next/link';
import { cn } from '@core/utils/class-names';
import SimpleBar from '@core/ui/simplebar';
import Logo from '@core/components/logo';
import { SidebarMenu } from './sidebar-menu';
import { routes } from '@/config/routes';

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 py-3 dark:bg-gray-100/5 2xl:px-8">
        <Link
          href={routes.eCommerce.home}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Logo className="max-w-[130px]" />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <SidebarMenu />
      </SimpleBar>
    </aside>
  );
}

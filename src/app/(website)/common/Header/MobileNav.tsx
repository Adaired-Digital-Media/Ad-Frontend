'use client';
import Link from 'next/link';
import { cn } from '../../../../@core/utils/class-names';
import { Icons } from '@/app/(website)/components/Icons';
import React, { useEffect, useState, useRef } from 'react';

type MobileNavProps = {
  isSidebarVisible: boolean;
  closeSidebar: () => void;
};

const MobileNav: React.FC<MobileNavProps> = ({
  isSidebarVisible,
  closeSidebar,
}) => {
  const [submenu, setSubmenu] = useState<Array<any> | null>(null);
  const [submenuActive, setSubmenuActive] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => !submenuActive && setSubmenu(null), 600);
  }, [submenuActive]);
  return (
    <div
      className={cn(
        `ease-custom-ui fixed inset-0 z-[100] transform uppercase transition-all duration-500 ${
          isSidebarVisible
            ? 'pointer-events-auto visible bg-[#22222288]'
            : 'pointer-events-none invisible'
        }`
      )}
      onClick={closeSidebar}
    >
      <nav
        className={cn(
          `ease-custom-ui no-scrollbar fixed right-0 h-full w-full max-w-[32rem] transform overflow-hidden overflow-y-scroll bg-white transition-transform duration-300 xs:w-[calc(100%-6rem)] ${isSidebarVisible ? 'translate-x-0' : 'translate-x-full'} `
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={sidebarRef}
          className={cn(
            `ease-custom-ui absolute top-0 w-full transform px-[1.5rem] pb-[3.5rem] pt-[2rem] text-sm transition-transform duration-500 ${
              submenuActive ? 'translate-x-full' : ''
            }`
          )}
        >
          <div className="flex items-center justify-end pb-3">
            <button
              aria-label="close menu"
              className={cn(
                `flex h-[2.5rem] w-[2.5rem] items-center justify-center bg-white text-xl text-gray-500`
              )}
              onClick={closeSidebar}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="sidebar__close-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;

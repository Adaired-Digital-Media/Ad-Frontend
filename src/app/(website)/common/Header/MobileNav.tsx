'use client';
import Link from 'next/link';
import { routes } from '@/config/routes';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { cn } from '@core/utils/class-names';
import { Icons } from '@/app/(website)/components/Icons';
import { Accordion, Input } from 'rizzui';
import {
  BsCaretDownFill,
  BsCaretRightFill,
  BsChevronDoubleLeft,
  BsChevronRight,
} from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';

type MobileNavProps = {
  isSidebarVisible: boolean;
  closeSidebar: () => void;
};

const MobileNav: React.FC<MobileNavProps> = ({
  isSidebarVisible,
  closeSidebar,
}) => {
  const pathname = usePathname();
  const [submenu, setSubmenu] = useState<Array<any> | null>(null);
  const [submenuActive, setSubmenuActive] = useState<boolean>(false);

  // const navItems = useMemo(() => {
  //   return pathname.startsWith('/expert-content-solutions')
  //     ? routes.ecommerceNav
  //     : routes.websiteNav;
  // }, [pathname]);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => !submenuActive && setSubmenu(null), 600);
  }, [submenuActive]);
  return (
    <div
      className={cn(
        `ease-custom-ui fixed inset-0 z-[100] transform font-poppins capitalize transition-all duration-500 ${
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
              <IoMdClose className="h-7 w-7" />
            </button>
          </div>
          <div className="space-y-8">
            <div className="relative">
              <Input type="search" placeholder="Search" />
              <Icons.searchIcon className="absolute right-3 top-1/2 mb-0.5 -translate-y-1/2" />
            </div>
            <div>
              <ul className="space-y-4">
                {routes.websiteNav.map((item) => (
                  <li
                    key={item.label}
                    onClick={() => {
                      if (item?.subItems || item?.childrens) {
                        setSubmenuActive(!submenuActive);
                        setSubmenu(
                          item.subItems ? item.subItems : item.childrens || []
                        );
                      } else {
                        closeSidebar();
                      }
                    }}
                  >
                    <Link
                      href={item.href || ''}
                      className={cn(
                        `flex w-full cursor-pointer items-center justify-between py-1 text-base font-semibold ${
                          item?.childrens || item?.subItems
                            ? 'items-center justify-between'
                            : ''
                        }`
                      )}
                    >
                      {item.label}
                      {(item.subItems || item.childrens) && (
                        <BsCaretRightFill />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          ref={sidebarRef}
          className={cn(
            `ease-custom-ui absolute left-0 top-0 h-full w-full transform space-y-8 bg-white px-[1.5rem] pb-[3.5rem] pt-[2rem] text-sm transition-transform duration-500 ${
              submenuActive ? 'translate-x-0' : 'translate-x-full'
            }`
          )}
        >
          <button
            onClick={() => {
              setSubmenuActive(false);
            }}
            className="flex items-center justify-between gap-2"
          >
            <BsChevronDoubleLeft />
            Back
          </button>

          {submenu &&
            submenu
              .filter((item) => item.subItems)
              .map((item) => (
                <Accordion
                  key={item?.name}
                  // className="border-b last-of-type:border-b-0"
                >
                  <Accordion.Header>
                    {({ open }) => (
                      <div className="flex w-full cursor-pointer items-center justify-between py-1 text-base font-semibold">
                        <p className="text-left">{item?.name}</p>
                        <BsCaretDownFill
                          className={cn(
                            'h-4 w-4 -rotate-90 transform transition-transform duration-300',
                            open && '-rotate-0'
                          )}
                        />
                      </div>
                    )}
                  </Accordion.Header>
                  <Accordion.Body className="mb-7 mt-2">
                    <ul className="space-y-3">
                      {item.subItems.map((subItem: any) => (
                        <li key={subItem.name} onClick={closeSidebar}>
                          <Link
                            href={subItem.href}
                            className="flex items-center gap-2 text-sm font-medium hover:text-[#FB9100]"
                          >
                            <BsChevronRight />
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion>
              ))}

          <ul className="space-y-4">
            {submenu &&
              submenu
                .filter((item) => !item.subItems)
                .map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-base font-medium">
                      {item.name}
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;

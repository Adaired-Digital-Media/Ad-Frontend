'use client';
import { cn } from '@core/utils/class-names';
import Topbar from './Topbar';
import { useState, useEffect } from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import Link from 'next/link';
import CldImage from '@/app/(website)/components/CloudinaryImageComponent';
import MobileNav from './MobileNav';
import NavItems from './NavItems';

const Navbar = () => {
  const [isWindowScrollingUp, setIsWindowScrollingUp] = useState(true);
  const [isScreenScrolled, setIsScreenScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsAtTop(scrollTop < 100);
      setIsScreenScrolled(scrollTop > 100);
      setIsWindowScrollingUp(scrollTop < lastScrollTop);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    let lastScrollTop = 0;
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openSidebar = () => setIsSidebarVisible(true);
  const closeSidebar = () => setIsSidebarVisible(false);

  return (
    <>
      <Topbar
        className={
          isWindowScrollingUp || isAtTop
            ? 'origin-top scale-y-100'
            : 'origin-top scale-y-0'
        }
      />
      <section
        className={cn(
          `sticky top-0 z-[100]`,
          isScreenScrolled && !isAtTop
            ? 'bg-white shadow-md'
            : 'bg-transparent shadow-none'
        )}
      >
        <div className={`sticky inset-x-0 top-0 z-50 h-16 bg-white lg:h-20`}>
          <header className={cn(`relative flex items-center bg-white`)}>
            <MaxWidthWrapper>
              <div className={cn(`relative`)}>
                <div className={cn`flex h-16 items-center lg:h-20`}>
                  <div>
                    <Link
                      href={'/'}
                      className="sm:w-10/0 flex w-28 items-center md:w-36 lg:w-10/12 xl:w-full"
                    >
                      <div className="relative h-[60px] w-[170px] md:h-[72px] lg:h-[80px] xl:h-[89px]">
                        <CldImage
                          src="Static Website Images/adaired_logo.png"
                          alt="Brand Logo"
                          fill
                        />
                      </div>
                    </Link>
                  </div>
                  <div className={cn(`ml-auto flex items-center`)}>
                    <div
                      aria-label="menu"
                      className={cn(
                        `header__menu-toggle block cursor-pointer text-3xl lg:hidden`
                      )}
                      onClick={openSidebar}
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                      </svg>
                    </div>
                    <div
                      className={cn(
                        `hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6`
                      )}
                    >
                      <NavItems />
                    </div>
                  </div>
                </div>
              </div>
            </MaxWidthWrapper>
            <MobileNav
              isSidebarVisible={isSidebarVisible}
              closeSidebar={closeSidebar}
            />
          </header>
        </div>
      </section>
    </>
  );
};

export default Navbar;

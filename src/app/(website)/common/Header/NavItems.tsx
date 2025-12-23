'use client';
import Link from 'next/link';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { routes } from '@/config/routes';
import { cn } from '@core/utils/class-names';
import { Icons } from '@/app/(website)/components/Icons';
import { usePathname } from 'next/navigation';
import { Separator } from '@/@core/ui/shadcn-ui/separator';
import axios from 'axios';
import CldImage from '../../components/CloudinaryImageComponent';
import { calculateReadingTime } from '@/@core/utils/calculateReadingTime';

// Type definitions
interface NavItem {
  label: string;
  href: string;
  subItems?: Array<{
    name: string;
    href: string;
    subItems?: Array<{ name: string; href: string }>;
  }>;
  childrens?: Array<{ name: string; href: string }>;
}

interface Blog {
  slug: string;
  postTitle: string;
  postDescription: string;
  featuredImage: string;
  createdAt: string;
  category?: { name: string };
}

const NavItems = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [blog, setBlog] = useState<Blog | null>(null);

  const isLandingPage = pathname.startsWith('/expert-content-solutions');

  const navItems = useMemo(() => {
    return isLandingPage ? routes.ecommerceNav : routes.websiteNav;
  }, [isLandingPage]);
  useMemo(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/blog/read?status=publish&limit=1`,
          { next: { revalidate: 3600 } }
        );
        const data = await res.json();
        if (res.ok && data.data?.[0]) {
          setBlog(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, []);

  const handleSetActive = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  return (
    <div className={cn('flex h-full gap-6')}>
      {navItems.map((item, idx) => (
        <Item
          key={item.value}
          navitems={item}
          activeIndex={activeIndex}
          index={idx}
          isLandingPage={isLandingPage}
          handleSetActive={handleSetActive}
          blog={blog}
        />
      ))}
      {!isLandingPage && (
        <div className={cn('flex items-center')}>
          <Link
            href="/contact"
            className="relative font-nunito text-lg font-semibold after:absolute after:bottom-[-5px] after:left-0 after:h-[3px] after:w-full after:rounded-2xl after:bg-[#FB9100] after:transition-all hover:after:w-full"
          >
            Book demo
          </Link>
        </div>
      )}
    </div>
  );
};

const Item = ({
  navitems,
  activeIndex,
  index,
  isLandingPage,
  handleSetActive,
  blog,
}: {
  navitems: any;
  activeIndex: number;
  index: number;
  isLandingPage: boolean;
  handleSetActive: (idx: number) => void;
  blog: Blog | null;
}) => {
  const [submenuClicked, setSubmenuClicked] = useState(false);

  const handleSubmenuClick = useCallback(() => {
    setSubmenuClicked((prev) => !prev);
  }, []);

  const onMouseEnter = useCallback(() => {
    setSubmenuClicked(false);
  }, []);

  const renderSubmenu = useMemo(() => {
    if (navitems.subItems) {
      return (
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 top-full origin-top scale-y-0 rounded-bl-lg rounded-br-lg bg-white text-muted-foreground shadow-lg transition-all duration-300',
            submenuClicked
              ? ''
              : 'group-hover:pointer-events-auto group-hover:scale-y-100'
          )}
        >
          <div className="relative mx-auto p-4 px-5">
            <div className="flex rounded-bl-lg rounded-br-lg">
              <div className="5xl:gap-6 grid grid-cols-3 gap-3 xl:w-9/12">
                {navitems.subItems.map((subItem: any) => (
                  <div className="relative" key={subItem.name}>
                    <Link
                      href={subItem.href}
                      className="5xl:pb-2 block pb-1.5 text-lg text-black transition-colors duration-200 hover:text-[#FB9100]"
                      onClick={handleSubmenuClick}
                    >
                      <span className="text-lg font-semibold">
                        {subItem.name}
                      </span>
                    </Link>
                    {subItem.subItems && (
                      <ul className={cn('space-y-1')}>
                        {subItem.subItems.map((subSubItem: any) => (
                          <li key={subSubItem.name}>
                            <Link
                              href={subSubItem.href}
                              onClick={handleSubmenuClick}
                              className="group/subMenu flex cursor-pointer items-center"
                            >
                              <div className="flex items-center gap-2 text-gray-400 transition-all duration-300 group-hover/subMenu:text-[#FB9100]">
                                <div className="h-[13px] w-[13px] rounded-sm bg-[#ddd]" />
                                <span className="text-base">
                                  {subSubItem.name}
                                </span>
                              </div>
                              <Icons.ArrowRightBroken className="-translate-x-2 text-[#FB9100] opacity-0 transition-all duration-500 group-hover/subMenu:block group-hover/subMenu:translate-x-2 group-hover/subMenu:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <Separator orientation="vertical" className="h-auto w-0.5" />
              <div className="w-3/12 flex-none xl:flex">
                <div className="p-4">
                  <h3 className="mb-4 font-nunito text-lg font-semibold text-gray-900">
                    What's New
                  </h3>
                  {blog && (
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-200/20 to-transparent shadow-lg">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="block"
                        onClick={handleSubmenuClick}
                      >
                        <CldImage
                          src={blog.featuredImage}
                          alt={blog.postTitle}
                          width={208}
                          height={208}
                          quality={100}
                          className="w-full object-cover"
                        />
                        <div className="p-4">
                          <div className="mb-2">
                            <span className="inline-block rounded-full bg-[#A100A1] px-3 py-1 text-xs font-medium text-white">
                              {blog?.category?.name ??
                                'Search Engine Optimization'}
                            </span>
                          </div>
                          <h4 className="mb-4 font-nunito text-lg font-medium text-gray-900">
                            {blog.postTitle}
                          </h4>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>
                              By Adaired Team |{' '}
                              {calculateReadingTime(blog.postDescription)} min
                              read
                            </span>
                            <span>
                              {new Date(blog?.createdAt)
                                .toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })
                                .replace(/ /g, ' ')}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                  <div className="mt-4">
                    <Link
                      href="/blog"
                      className="inline-block rounded-lg bg-[#FB9100] px-4 py-2 font-nunito text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#E07B00]"
                      onClick={handleSubmenuClick}
                    >
                      See More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (navitems.childrens) {
      return (
        <div className="pointer-events-none absolute top-full min-w-40 origin-top scale-y-0 rounded-bl-lg rounded-br-lg bg-white text-muted-foreground shadow-lg transition-all duration-300 group-hover:pointer-events-auto group-hover:scale-y-100">
          <div className="mx-auto px-4 py-4">
            {navitems.childrens.map((children: any) => (
              <div key={children.name} className="group/children">
                <Link
                  href={children.href}
                  className="block py-2 font-medium text-gray-900"
                  onClick={handleSubmenuClick}
                >
                  <span
                    className={cn(
                      'flex items-center font-nunito text-base group-hover/children:text-[#FB9100]'
                    )}
                  >
                    {children.name}
                    <Icons.ArrowRightBroken className="-translate-x-2 text-[#FB9100] opacity-0 transition-all duration-500 group-hover/subMenu:block group-hover/children:translate-x-2 group-hover/children:opacity-100" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  }, [submenuClicked, navitems.subItems, navitems.childrens, blog]);

  return (
    <div className={cn('flex justify-center')} onMouseEnter={onMouseEnter}>
      <div className={cn('group flex items-center')}>
        <Link
          className={cn(
            'relative flex h-20 items-center gap-1 px-2 font-nunito text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-[#aaa] after:transition-all after:duration-300 hover:after:w-full',
            isLandingPage ? 'font-poppins text-[17px] font-medium' : ''
          )}
          href={navitems.href || '#'}
          onClick={() => handleSetActive(index)}
        >
          {navitems.label}
          {(navitems.subItems || navitems.childrens) && (
            <Icons.IcBaselineArrowDropDown
              className={cn('h-4 w-4 transition-all group-hover:rotate-180')}
            />
          )}
        </Link>
        {renderSubmenu}
      </div>
    </div>
  );
};

export default NavItems;

'use client';
import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';
import { HeaderItems } from '@/types';
import { routes } from '@/config/routes';
import { cn } from '@core/utils/class-names';
import { Icons } from '@/app/(website)/components/Icons';
import { usePathname } from 'next/navigation';

const NavItems = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isLandingPage = pathname.startsWith('/expert-content-solutions');

  // Memoize the navigation items based on the current pathname to avoid recalculating on every render
  const navItems = useMemo(() => {
    return isLandingPage ? routes.ecommerceNav : routes.websiteNav;
  }, [pathname]);

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
        />
      ))}

      {!pathname.startsWith('/expert-content-solutions') && (
        <div className={cn('flex items-center')}>
          <Link
            href="/contact"
            className="relative font-nunito text-lg font-semibold after:absolute after:bottom-[-5px] after:left-0 after:h-[3px] after:w-[100%] after:rounded-2xl after:bg-[#FB9100] after:transition-all after:content-[''] hover:after:w-[100%]"
          >
            Book demo
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavItems;

const Item = ({
  navitems,
  activeIndex,
  index,
  isLandingPage,
  handleSetActive,
}: {
  navitems: any;
  activeIndex: number;
  index: number;
  isLandingPage: boolean;
  handleSetActive: (idx: number) => void;
}) => {
  const [submenuClicked, setSubmenuClicked] = useState(false);

  const handleSubmenuClick = useCallback(() => {
    setSubmenuClicked((prevState) => !prevState);
  }, []);

  const OnMouseEnter = useCallback(() => {
    setSubmenuClicked(false);
  }, []);

  const renderSubmenu = useMemo(() => {
    if (navitems.subItems) {
      return (
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 left-0 top-full origin-top scale-y-0 rounded-bl-lg rounded-br-lg bg-white text-muted-foreground shadow-lg transition-all duration-300',
            submenuClicked
              ? ''
              : 'group-hover:pointer-events-auto group-hover:scale-y-100'
          )}
        >
          <div className="mx-auto p-4">
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
                                <span className="flex text-base">
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
              <div className="hidden w-3/12 flex-none xl:flex"></div>
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
  }, [submenuClicked, navitems.subItems, navitems.childrens]);

  return (
    <div className={cn('flex justify-center')} onMouseEnter={OnMouseEnter}>
      <div className={cn('group flex items-center')}>
        <Link
          className={cn(
            'relative flex h-20 items-center gap-1 px-2 font-nunito text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-[0%] after:bg-[#aaa] after:transition-all after:duration-300 after:content-[""] hover:after:w-[100%]',
            activeIndex === index && isLandingPage ? '' : ''
          )}
          href={navitems.href || ''}
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

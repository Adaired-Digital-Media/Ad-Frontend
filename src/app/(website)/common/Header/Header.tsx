'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import logo from '../../../../../public/Layer_1.svg';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import Button from '../Button';
import { routes } from '../../../../config/routes';
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import img from '../../../../../public/assets/triexgagykxxpxhfvx8e.webp';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import SaveAndCancel from '../SaveAndCancel';
import { GoArrowUpRight } from 'react-icons/go';
import { MdArrowOutward } from 'react-icons/md';

const Header = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const [hover, setHover] = useState<number | null>(null);
  const { websiteNav } = routes;
  const [level, setLevel] = useState<0 | 1 | 2>(0);
  const [activeMenu, setActiveMenu] = useState<any>(null);
  const [activeGroup, setActiveGroup] = useState<any>(null);

  return (
    <div className="">
      <MaxWidthWrapper>
        <div className="flex w-[100%] items-center rounded-full border-b-[1px] border-[#0000001A] bg-[#FFFFFF]">
          <div className="relative flex w-full justify-between p-[1rem] lg:p-[1%]">
            <div
              onClick={() => router.push('/')}
              className="cursor-pointer pl-3"
            >
              <Image
                src={logo}
                width={132}
                height={50}
                alt="brand logo"
                className="h-[2.125rem] w-[6.25rem] lg:h-[3.125rem] lg:w-[8.25rem]"
              />
            </div>
            <div className="hidden justify-between gap-2 rounded-full bg-[#FFF7EC] p-2 lg:flex">
              {websiteNav.map((menu, idx) => {
                const isHover = hover === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHover(idx)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {/* MAIN MENU */}
                    <Link
                      href={menu.href}
                      className={`font-Outfit 1366:text-[14px] 1400:text-[18px] 1470:text-[14px] 1600:text-[18px] 1680:text-[18px] flex items-center rounded-full px-5 py-2 text-xxs transition xl:text-xs 3xl:text-[18px] ${pathname === menu.href && 'bg-[#FB9100] text-[#FFFFFF]'} ${isHover ? 'bg-[#FB9100] text-[#FFFFFF]' : 'text-[#000000]'}`}
                    >
                      {menu.label}
                      {menu.subItems && <MdKeyboardArrowDown size={18} />}
                    </Link>

                    {/* MEGA MENU */}
                    {menu.subItems && (
                      <div
                        className={`absolute left-0 right-0 top-[80%] z-50 transition-all duration-300 ease-out ${
                          isHover
                            ? 'pointer-events-auto translate-y-0 opacity-100'
                            : 'pointer-events-none -translate-y-3 opacity-0'
                        } `}
                      >
                        {/* ===================== RESOURCES MENU ===================== */}
                        {menu.label === 'Resources' ? (
                          <div className="mx-auto ml-[48%] w-fit rounded-xl bg-white p-4 shadow-lg">
                            <ul className="space-y-2">
                              {menu.subItems.map((item, i) => (
                                <li key={i}>
                                  <Link
                                    href={item.href}
                                    className="group flex items-center gap-2 text-xs text-gray-600 hover:text-[#F28F17]"
                                  >
                                    <span className="h-2 w-2 rounded bg-gray-300"></span>
                                    {item.name}
                                    <MdArrowOutward
                                      size={16}
                                      className="translate-x-[-4px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                                    />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          /* ===================== SERVICES MEGA MENU ===================== */
                          <div className="mx-auto max-w-[1400px] rounded-2xl bg-white p-10 shadow-lg">
                            <div className="grid grid-cols-4 gap-4">
                              {/* SERVICES */}
                              <div className="col-span-3 grid grid-cols-3 gap-8">
                                {menu.subItems.map((sub, i) => (
                                  <div key={i}>
                                    <Link
                                      href={sub.href}
                                      className="mb-3 block text-sm font-semibold text-black"
                                    >
                                      {sub.name}
                                    </Link>

                                    {'subItems' in sub && (
                                      <ul className="space-y-2">
                                        {sub.subItems?.map(
                                          (item: any, j: number) => (
                                            <li>
                                              <Link
                                                href={item.href}
                                                className="group flex items-center gap-2 text-xs text-gray-600 hover:text-[#F28F17]"
                                              >
                                                <span className="h-2 w-2 rounded bg-gray-300"></span>
                                                {item.name}
                                                <MdArrowOutward
                                                  size={16}
                                                  className="translate-x-[-4px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                                                />
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* WHAT'S NEW */}
                              <div className="border-l pl-6">
                                <p className="mb-4 text-sm font-semibold">
                                  What’s New
                                </p>

                                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-200/20 to-transparent shadow-lg">
                                  <Image
                                    src={img}
                                    width={208}
                                    height={208}
                                    quality={100}
                                    className="w-full object-cover"
                                    alt=""
                                  />

                                  <div className="p-3">
                                    <span className="inline-block rounded-full bg-[#A100A1] px-3 py-1 text-xxs font-normal text-white">
                                      Web Development
                                    </span>

                                    <p className="mt-2 text-sm font-medium">
                                      What Skills Should Great Web Developers
                                      Have? And How Adaired Excels Every
                                      Benchmark!
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                      By Adaired Team · 8 min read
                                    </p>
                                  </div>
                                </div>

                                <Link
                                  href="/blog"
                                  className="mt-4 inline-block rounded-lg bg-orange-500 px-4 py-2 text-xs text-white"
                                >
                                  See More
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="my-auto hidden gap-2 lg:flex">
              <SaveAndCancel
                handleClick={() => router.push('/contact')}
                isBgWhite={true}
                name={'Book A Call'}
              />
              <span
                onClick={() => router.push('/contact')}
                className="mt-1 inline-block animate-zoomPulse"
              >
                <GoArrowUpRight
                  size={45}
                  className="cursor-pointer rounded-full bg-[#FB9100] p-3 font-bold text-white transition-transform duration-500 ease-in-out hover:rotate-[45deg]"
                />
              </span>
            </div>
            <IoReorderThreeOutline
              onClick={() => setShow(!show)}
              size={35}
              className="animate-pulse block lg:hidden"
            />
          </div>
        </div>
      </MaxWidthWrapper>

      {show && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              setShow(false);
              setLevel(0);
              setActiveMenu(null);
              setActiveGroup(null);
            }}
          />

          {/* DRAWER */}
          <div
            className={`absolute right-0 top-0 h-full w-full transform bg-white p-5 transition-transform duration-300 ease-in-out md:w-[80%] ${show ? 'translate-x-0' : 'translate-x-full'} `}
          >
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              {level > 0 ? (
                <button
                  onClick={() => {
                    if (level === 2) {
                      setLevel(1);
                      setActiveGroup(null);
                    } else {
                      setLevel(0);
                      setActiveMenu(null);
                    }
                  }}
                  className="flex items-center gap-1 text-sm font-medium text-black"
                >
                  <MdKeyboardDoubleArrowLeft />
                  Back
                </button>
              ) : (
                <h3 className="text-lg font-semibold">Menu</h3>
              )}

              <button
                onClick={() => {
                  setShow(false);
                  setLevel(0);
                  setActiveMenu(null);
                  setActiveGroup(null);
                }}
              >
                <IoClose size={22} />
              </button>
            </div>

            {/* LEVEL CONTAINER */}
            <div className="relative h-full overflow-hidden">
              {/* ================= LEVEL 0 – MAIN MENU ================= */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ease-in-out ${level === 0 ? 'translate-x-0' : '-translate-x-full'} `}
              >
                <nav className="space-y-4">
                  {websiteNav.map((menu) => (
                    <div key={menu.value}>
                      {menu.subItems ? (
                        <button
                          onClick={() => {
                            setActiveMenu(menu);
                            setLevel(1);
                          }}
                          className="flex w-full items-center justify-between text-sm font-medium text-black"
                        >
                          {menu.label}
                          <MdKeyboardDoubleArrowLeft className="rotate-180" />
                        </button>
                      ) : (
                        <Link
                          href={menu.href}
                          onClick={() => setShow(false)}
                          className="block text-sm font-medium text-black"
                        >
                          {menu.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* ================= LEVEL 1 – SERVICES / RESOURCES ================= */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ease-in-out ${level === 1 ? 'translate-x-0' : 'translate-x-full'} `}
              >
                <nav className="space-y-4">
                  {activeMenu?.subItems?.map((group: any, i: number) => (
                    <div key={i}>
                      {group.subItems ? (
                        <button
                          onClick={() => {
                            setActiveGroup(group);
                            setLevel(2);
                          }}
                          className="flex w-full items-center justify-between text-sm font-medium text-black"
                        >
                          {group.name}
                          <MdKeyboardDoubleArrowLeft className="rotate-180" />
                        </button>
                      ) : (
                        <Link
                          href={group.href}
                          onClick={() => setShow(false)}
                          className="block text-sm font-medium text-black"
                        >
                          {group.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* ================= LEVEL 2 – FINAL LINKS ================= */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ease-in-out ${level === 2 ? 'translate-x-0' : 'translate-x-full'} `}
              >
                <nav className="space-y-3">
                  <h4 className="mb-3 text-sm font-semibold">
                    {activeGroup?.name}
                  </h4>

                  {activeGroup?.subItems?.map((item: any, i: number) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => setShow(false)}
                      className="flex items-center gap-2 text-xs text-black"
                    >
                      <MdOutlineKeyboardArrowRight />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

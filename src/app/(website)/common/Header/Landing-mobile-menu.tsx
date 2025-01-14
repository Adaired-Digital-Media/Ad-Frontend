import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { IoMdClose } from 'react-icons/io';
import { cn } from '@core/utils/class-names';
import Image from 'next/image';
import { FaFacebookF } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
type Props = {
  isSidebarVisible: boolean;
  closeSidebar: () => void;
};

const menuVars = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ulVars = {
  hide: {
    y: '25%',
    opacity: 0,
  },
  show: {
    y: '0%',
    opacity: 1,
  },
};

const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const logoVars = {
  initial: {
    x: '-100%',
  },
  open: {
    x: '0%',
  },
};

const LandingPageMobileMenu = ({ isSidebarVisible, closeSidebar }: Props) => {
  return (
    <AnimatePresence>
      {isSidebarVisible && (
        <motion.div
          variants={menuVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed left-0 top-0 h-screen w-full origin-top bg-white p-10 text-black"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-end">
              {/* <motion.div
                variants={logoVars}
                initial="initial"
                animate="open"
                exit="initial"
              >
                <Image
                  src="/logo-plane-primary.svg"
                  alt="logo"
                  width={50}
                  height={50}
                />
              </motion.div> */}
              <button
                aria-label="close menu"
                className={cn(
                  `flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold text-gray-500`
                )}
                onClick={closeSidebar}
              >
                <IoMdClose className="h-7 w-7 font-bold" />
              </button>
            </div>
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex h-full flex-col items-center justify-center gap-5 font-dm text-black"
            >
              {routes.ecommerceNav.map((link, index) => {
                return (
                  <div className="overflow-hidden" onClick={closeSidebar}>
                    <MobileNavLink
                      key={index}
                      title={link.label}
                      href={link.href}
                    />
                  </div>
                );
              })}
            </motion.div>
            <div className="py-16">
              <motion.ul
                variants={ulVars}
                initial="hide"
                animate="show"
                exit="hide"
                transition={{
                  duration: 0.5,
                  ease: [0.12, 0, 0.39, 0],
                }}
                className="flex list-none justify-center gap-x-4"
              >
                <li>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                    <Link href={process.env.NEXT_PUBLIC_FACEBOOK_URL || ''}>
                      <FaFacebookF className="h-5 w-5 text-white" />
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                    <Link href={process.env.NEXT_PUBLIC_TWITTER_URL || ''}>
                      <BsTwitterX className="h-5 w-5 text-white" />
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                    <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || ''}>
                      <FaInstagram className="h-5 w-5 text-white" />
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                    <Link href={process.env.NEXT_PUBLIC_LINKEDIN_URL || ''}>
                      <FaLinkedinIn className="h-5 w-5 text-white" />
                    </Link>
                  </div>
                </li>
              </motion.ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPageMobileMenu;

const mobileLinkVars = {
  initial: {
    y: '30vh',
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

const MobileNavLink = ({ title, href }: { title: string; href: string }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-3xl uppercase text-black"
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};

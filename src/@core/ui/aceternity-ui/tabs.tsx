'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/class-names';

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  activeTabContentClassName,
  tabClassName,
  tabContentClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  activeTabContentClassName?: string;
  tabClassName?: string;
  tabContentClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          'no-visible-scrollbar  relative grid w-full max-w-full items-center gap-3 overflow-auto [perspective:1000px] sm:grid-cols-2 sm:overflow-visible md:grid-cols-4 md:gap-0',
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              'relative w-full rounded-full px-4 py-3',
              tabClassName
            )}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={cn(
                  'absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800',
                  activeTabClassName
                )}
              />
            )}

            <span
              className={cn(
                `relative block text-black dark:text-white`,
                active.value === tab.value && activeTabContentClassName,
                tabContentClassName
              )}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn('mt-[60px]', contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  return (
    <AnimatePresence mode="wait">
      <div className="relative h-full w-full">
        {tabs.map((tab, idx) =>
          tab.value === active.value ? (
            <motion.div
              key={tab.value}
              layoutId={tab.value}
              style={{
                scale: 1 - idx * 0.1,
                top: hovering ? idx * -10 : 0,
                zIndex: -idx,
                opacity: 1,
              }}
              animate={{
                scale: [1, 0.99, 1],
                y: idx === 0 ? [0, 10, 0] : 0,
              }}
              exit={{
                scale: 0.99,
                y: idx === 0 ? [-10, 0] : 0,
              }}
              className={cn('left-0 top-0 h-full w-full', className)}
            >
              {tab.content}
            </motion.div>
          ) : null
        )}
      </div>
    </AnimatePresence>
  );
};

import { useEffect, useMemo, useState } from 'react';

type MobileTabPosition = 'prev' | 'active' | 'next';

interface UseScrollTabsProps<T> {
  items: T[];
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  wrapperRef?: React.RefObject<HTMLElement>;
  mobileBreakpoint?: number;
}

export function useScrollTabs<T>({
  items,
  sectionRefs,
  wrapperRef,
  mobileBreakpoint = 1024,
}: UseScrollTabsProps<T>) {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileTab, setShowMobileTab] = useState(false);

  /* ---------------- ACTIVE TAB OBSERVER ---------------- */
  useEffect(() => {
    if (!items?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (el) => el === entry.target
            );
            if (index !== -1) setActiveTab(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items, sectionRefs]);

  /* ---------------- MOBILE DETECTION ---------------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  /* ---------------- SHOW / HIDE MOBILE TAB ---------------- */
  useEffect(() => {
    if (!isMobile || !wrapperRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileTab(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [isMobile, wrapperRef]);

  /* ---------------- MOBILE TAB LOGIC ---------------- */
  const mobileTabs = useMemo(() => {
    if (!items?.length) return [];

    // First tab → only active + next
    if (activeTab === 0) {
      return items.slice(0, 2).map((item, index) => ({
        ...item,
        position: index === 0 ? 'active' : 'next',
        realIndex: index,
      }));
    }

    const tabs: Array<T & { position: MobileTabPosition; realIndex: number }> =
      [];

    if (items[activeTab - 1]) {
      tabs.push({
        ...items[activeTab - 1],
        position: 'prev',
        realIndex: activeTab - 1,
      });
    }

    if (items[activeTab]) {
      tabs.push({
        ...items[activeTab],
        position: 'active',
        realIndex: activeTab,
      });
    }

    if (items[activeTab + 1]) {
      tabs.push({
        ...items[activeTab + 1],
        position: 'next',
        realIndex: activeTab + 1,
      });
    }

    return tabs;
  }, [items, activeTab]);

  return {
    activeTab,
    setActiveTab,
    isMobile,
    showMobileTab,
    mobileTabs,
  };
}

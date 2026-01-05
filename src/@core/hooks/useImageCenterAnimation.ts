'use client';

import { useEffect, useRef, useState } from 'react';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface UseImageRevealOptions {
  direction?: Direction;
  delay?: number;
}

const useImageCenterAnimation = (
  { direction = 'left', delay = 0 }: UseImageRevealOptions = {},
  triggerKey?: any
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 🔥 RESET animation when tab changes
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [triggerKey]);

  const directionMap = {
    left: '-translate-x-16',
    right: 'translate-x-16',
    top: '-translate-y-16',
    bottom: 'translate-y-16',
  };

  return {
    ref,
    className: `
      transition-all duration-700 ease-out
      ${delay ? `delay-[${delay}ms]` : ''}
      ${
        visible
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : `opacity-0 ${directionMap[direction]} scale-90`
      }
      hover:scale-[1.03] hover:-translate-y-1
    `,
  };
};

export default useImageCenterAnimation;

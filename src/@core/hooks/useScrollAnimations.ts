'use client';

import { useEffect, useRef, useState } from 'react';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface UseImageRevealOptions {
  direction?: Direction;
  delay?: number;
}

interface UseZoomOnViewOptions {
  delay?: number;
  threshold?: number;
  once?: boolean;
}

/* ----------------------------------
   Slide + Reveal Hook
----------------------------------- */
export const useImageReveal = ({
  direction = 'left',
  delay = 0,
}: UseImageRevealOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionMap: Record<Direction, string> = {
    left: '-translate-x-16',
    right: 'translate-x-16',
    top: '-translate-y-16',
    bottom: 'translate-y-16',
  };

  return {
    ref,
    className: `
      transition-all duration-700 ease-out will-change-transform
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

/* ----------------------------------
   Zoom Only Hook
----------------------------------- */
export const useZoomOnView = ({
  delay = 0,
  threshold = 0.4,
  once = false,
}: UseZoomOnViewOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, once]);

  return {
    ref,
    className: `
      transition-all duration-700 ease-out will-change-transform
      ${delay ? `delay-[${delay}ms]` : ''}
      ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
    `,
  };
};

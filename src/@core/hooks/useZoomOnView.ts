'use client';

import { useEffect, useRef, useState } from 'react';

interface UseZoomOnViewOptions {
  delay?: number;
  threshold?: number;
  once?: boolean; // animate only once
}

const useZoomOnView = ({
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
      transition-all duration-700 ease-out
      ${delay ? `delay-[${delay}ms]` : ''}
      ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
    `,
  };
};

export default useZoomOnView;

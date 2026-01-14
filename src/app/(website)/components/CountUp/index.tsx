'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
}

const CountUp = ({ end, duration = 2000 }: CountUpProps) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current || started.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        started.current = true;
        let startTime: number | null = null;

        const animate = (time: number) => {
          if (!startTime) startTime = time;

          const progress = Math.min((time - startTime) / duration, 1);

          setValue(Math.floor(progress * end));

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setValue(end);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.6 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="font-poppins text-[2rem] 3xl:text-[50px] font-semibold">
      {value}
    </span>
  );
};

export default CountUp;

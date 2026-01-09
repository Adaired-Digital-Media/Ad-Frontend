import { useEffect, useState } from 'react';

const useIsMobile = (breakpoint = 1023) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    // set initial value
    handleChange();

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;

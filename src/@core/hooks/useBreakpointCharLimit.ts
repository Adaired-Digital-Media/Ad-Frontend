import { useEffect, useState } from 'react';

const useBreakpointCharLimit = () => {
  const [limit, setLimit] = useState(60); // default (xs / mobile)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w >= 2560)
        setLimit(125); // 4xl
      else if (w >= 1920)
        setLimit(65); // 3xl
      else if (w >= 1710)
        setLimit(56); // safari fix
      else if (w >= 1680) setLimit(56);
      else if (w >= 1600) setLimit(50);
      else if (w >= 1470) setLimit(45);
      else if (w >= 1440) setLimit(45);
      else if (w >= 1400) setLimit(40);
      else if (w >= 1366) setLimit(10);
      else if (w >= 1360) setLimit(10);
      else if (w >= 1280)
        setLimit(140); // xl
      else if (w >= 1024)
        setLimit(130); // lg
      else if (w >= 999)
        setLimit(125); // opt-md
      else if (w >= 768)
        setLimit(120); // md
      else if (w >= 640)
        setLimit(90); // sm
      else if (w >= 480)
        setLimit(75); // xs
      else setLimit(60); // very small
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return limit;
};

export default useBreakpointCharLimit;

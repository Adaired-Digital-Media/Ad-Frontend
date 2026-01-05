'use client';

import { useState } from 'react';

interface UseHoverZoomOptions {
  scaleIn?: number;
  scaleOut?: number;
}

const useHoverZoom = ({
  scaleIn = 1.05,
  scaleOut = 0.9,
}: UseHoverZoomOptions = {}) => {
  const [hovered, setHovered] = useState(false);

  return {
    hovered,
    handlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
    className: `
      transition-transform duration-300 ease-out
      ${hovered ? `scale-[${scaleIn}]` : `scale-[${scaleOut}]`}
    `,
  };
};

export default useHoverZoom;

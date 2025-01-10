'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import Footer components with SSR enabled (default behavior)
const WebFooter = dynamic(() => import('./WebFooter')); 
const EcomFooter = dynamic(() => import('./EcomFooter')); 

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Conditionally render the appropriate footer based on the pathname
  return pathname.startsWith('/expert-content-solutions') ? <EcomFooter /> : <WebFooter />;
}
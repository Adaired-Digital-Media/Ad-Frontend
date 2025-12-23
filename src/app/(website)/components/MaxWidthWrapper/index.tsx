import { cn } from '@core/utils/class-names';
import React from 'react';

const MaxWidthWrapper: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <section
      className={cn(
        'mx-auto box-border w-full max-w-[1440px] px-5 md:px-6',
        className
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;

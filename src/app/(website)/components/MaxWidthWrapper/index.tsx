import { cn } from '@core/utils/class-names';
import React from 'react';

const MaxWidthWrapper: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <section className={cn('mx-auto box-border w-[95%] lg:w-[83%]', className)}>
      {children}
    </section>
  );
};

export default MaxWidthWrapper;

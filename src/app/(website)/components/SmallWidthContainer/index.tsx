import { FC } from 'react';
import { cn } from '@core/utils/class-names';
import { ISmallContainerType } from '@app-types/SmallContainerTypes';

const SmallWidthContainer: FC<ISmallContainerType> = ({
  className,
  children,
  style,
  ...props
}) => {
  return (
    <section
      {...props}
      className={cn(
        `m-auto box-border w-full px-4 py-10 sm:py-10 md:px-10 md:py-10 lg:px-6 lg:py-12 xl:px-5 xl:py-14 2xl:px-0 2xl:py-16`,
        `max-w-full sm:max-w-[740px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1240px] 2xl:max-w-[1340px]`,
        className
      )}
      style={typeof style === 'string' ? undefined : style}
    >
      {children}
    </section>
  );
};

export default SmallWidthContainer;

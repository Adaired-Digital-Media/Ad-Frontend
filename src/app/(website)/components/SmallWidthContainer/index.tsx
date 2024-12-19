import { FC } from 'react';
import { cn } from '../../../../@core/utils/class-names';
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
        `m-auto box-border w-full max-w-[1340px] scale-[0.8] py-6 xl:scale-[0.85] xl:py-10 2xl:scale-100 2xl:py-16 3xl:py-24 ${className} `
      )}
      style={typeof style === 'string' ? undefined : style}
    >
      {children}
    </section>
  );
};

export default SmallWidthContainer;

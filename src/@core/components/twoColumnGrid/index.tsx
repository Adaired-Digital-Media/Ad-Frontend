import { FC } from 'react';
import { cn } from '../../utils/class-names';
import { ITwoColumnGridTypes } from '../../types/TwocolumnGridTypes';

const TwoColumnGrid: FC<ITwoColumnGridTypes> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        `grid grid-cols-2 place-items-center gap-x-14 ${className}`
      )}
      style={typeof style === 'string' ? undefined : style}
    >
      {children}
    </div>
  );
};

export default TwoColumnGrid;
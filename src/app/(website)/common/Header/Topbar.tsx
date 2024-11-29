import { cn } from '@core/utils/class-names';
import MaxWidthWrapper from '@/app/(website)/components/MaxWidthWrapper';
import { Separator } from '@/@core/ui/shadcn-ui/separator';
import Link from 'next/link';
import CldImage from '@/app/(website)/components/CloudinaryImageComponent';

type Props = {
  className: string;
};

const Topbar = ({ className }: Props) => {
  return (
    <div className={cn(`flex h-10 items-center bg-[#EEEEEE] ${className}`)}>
      <MaxWidthWrapper
        className={cn(`flex items-center justify-center gap-2 sm:justify-end`)}
      >
        <div>
          <Link
            href="tel:+12052736006"
            className={cn(`flex items-center gap-1 sm:gap-2`)}
          >
            <CldImage
              src="Static Website Images/Us_Flag_a3eloz"
              alt="alt"
              width={20}
              height={20}
            />
            <p className={cn(`text-xs sm:text-base`)}>+1 (205) 273-6006</p>
          </Link>
        </div>
        <Separator
          orientation="vertical"
          className={cn(`h-6 w-0.5 bg-[#D9D9D9]`)}
        />
        <div>
          <Link
            href="tel:+918907400008"
            className={cn(`flex items-center gap-1 sm:gap-2`)}
          >
            <CldImage
              src="Static Website Images/Indian_Flag_ncjo16"
              alt="alt"
              width={20}
              height={20}
            />
            <p className={cn(`text-xs sm:text-base`)}>+91 89074-00008</p>
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Topbar;

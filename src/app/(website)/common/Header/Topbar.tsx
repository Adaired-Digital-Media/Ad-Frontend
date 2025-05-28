import { cn } from '@core/utils/class-names';
import MaxWidthWrapper from '@/app/(website)/components/MaxWidthWrapper';
import { Separator } from '@core/ui/shadcn-ui/separator';
import Link from 'next/link';
import CldImage from '@/app/(website)/components/CloudinaryImageComponent';
import UserAvatarIcon from './AvatarIcon';
import SmallWidthContainer from '@web-components/SmallWidthContainer';
import { PiPhoneCallFill } from 'react-icons/pi';

type Props = {
  className: string;
  session?: any;
  pathname: string;
};

const Topbar = ({ className, session, pathname }: Props) => {
  const isLandingPage = pathname.startsWith('/expert-content-solutions');
  const WrapperComponent = isLandingPage
    ? SmallWidthContainer
    : MaxWidthWrapper;
  return (
    <div className={cn(`flex h-10 items-center bg-[#EEEEEE] ${className}`)}>
      <WrapperComponent
        className={cn(
          `flex items-center justify-center gap-2 !py-0 sm:justify-end xl:!py-0 2xl:!py-0 3xl:!py-0`
        )}
      >
        <div>
          {/* <Link
            href="tel:+12052736006"
            className={cn(`flex items-center gap-1 sm:gap-2`)}
          >
            <CldImage
              src="Static Website Images/Us_Flag_a3eloz"
              alt="Us Flag"
              width={20}
              height={20}
            />
            <p
              className={cn(
                `text-xs sm:text-base`,
                isLandingPage ? 'sm:text-sm' : ''
              )}
            >
              +1 (205) 273-6006
            </p>
          </Link> */}
        </div>
        {/* <Separator
          orientation="vertical"
          className={cn(`h-6 w-0.5 bg-[#D9D9D9]`)}
        /> */}
        <div>
          <Link
            href="tel:+918907400008"
            className={cn(`flex items-center gap-1 sm:gap-2`)}
          >
            <PiPhoneCallFill className={cn('h-5 w-5')} />
            <p
              className={cn(
                `text-xs sm:text-base`,
                isLandingPage ? 'sm:text-sm' : ''
              )}
            >
              +91 89074-00008
            </p>
          </Link>
        </div>

        {session && isLandingPage && <UserAvatarIcon session={session} />}
      </WrapperComponent>
    </div>
  );
};

export default Topbar;

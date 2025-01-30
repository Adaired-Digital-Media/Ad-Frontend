import SignInForm from './sign-in-form';
import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import UnderlineShape from '@core/components/shape/underline';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign In'),
};

export default function SignIn() {
  return (
    <AuthWrapper
      title={
        <>
          Welcome back! Please{' '}
          <span className="relative inline-block">
            Sign in to
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          continue.
        </>
      }
      description="By signing up, you will gain access to exclusive content, special
      offers, and be the first to hear about exciting news and updates."
      bannerTitle="The simplest way to manage your workspace."
      bannerDescription=""
      isSocialLoginActive={false}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
        </div>
      }
    >
      <SignInForm  />
    </AuthWrapper>
  );
}

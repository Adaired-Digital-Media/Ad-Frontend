import SignInForm from './sign-in-form';
import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import UnderlineShape from '@core/components/shape/underline';
import { metaObject } from '@/config/site.config';
import { Suspense } from 'react';

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
      isSignIn
      isSocialLoginActive={true}
    >
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthWrapper>
  );
}

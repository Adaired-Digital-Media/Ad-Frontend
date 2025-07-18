// import Image from 'next/image';
import UnderlineShape from '../../../@core/components/shape/underline';
import SignUpForm from './sign-up-form';
import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign Up'),
};

export default function SignUp() {
  return (
    <AuthWrapper
      title={
        <>
          Join us and never miss a thing -{' '}
          <span className="relative inline-block">
            SIGN UP!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapper>
  );
}

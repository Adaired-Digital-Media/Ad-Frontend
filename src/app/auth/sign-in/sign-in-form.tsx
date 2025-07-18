'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text, Title, cn } from 'rizzui';
import { Form } from '@core/ui/rizzui-ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMedia } from '@core/hooks/use-media';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const initialValues: LoginSchema = {
  identifier: "",
  password: "",
  rememberMe: false,
};

export default function SignInForm() {
  const router = useRouter();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);
  useEffect(() => {
    if (error) {
      router.replace(routes.auth.signIn);
      setError(null);
      if (error === "CredentialsSignin") {
        toast.error("Invalid username or password!");
      } else if (error === "GoogleAuthFailed") {
        toast.error("Google authentication failed. Please try again.");
      } else if (error === "AccessDenied") {
        toast.error(
          "Access denied. You may not have permission to access this resource."
        );
      } else {
        toast.error("An error occurred during sign-in. Please try again.");
      }
    }
  }, [error, router]);

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    signIn('credentials', {
      ...data,
    });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={initialValues}
        onSubmit={onSubmit}
        useFormProps={{
          // mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({
          register,
          formState: {
            errors,
            isSubmitting,
            isLoading,
            isSubmitted,
            isSubmitSuccessful,
          },
        }) => (
          <div className="space-y-5">
            <Input
              type="email"
              label="Email"
              size={isMedium ? 'lg' : 'xl'}
              placeholder="Enter your email"
              className="[&>label>span]:font-poppins [&>label>span]:text-[16px] [&>label>span]:font-semibold [&>label>span]:text-[#515151]"
              inputClassName="text-sm"
              {...register("identifier")}
              error={errors.identifier?.message}
              required
            />

            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-poppins [&>label>span]:text-[16px] [&>label>span]:font-semibold [&>label>span]:text-[#515151]"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button
              isLoading={
                isSubmitting || isLoading || isSubmitted || isSubmitSuccessful
              }
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              <span>Sign in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}

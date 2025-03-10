'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Checkbox, Button, Input, Text, Title } from 'rizzui';
import { Form } from '@core/ui/rizzui-ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';
import { PhoneNumber } from '@/@core/ui/rizzui-ui/phone-input';
import { useMedia } from '@core/hooks/use-media';
import toast from 'react-hot-toast';
import { cn } from '@/@core/utils/class-names';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  isAgreed: false,
};

export default function SignUpForm() {
  const { push } = useRouter();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});

  // const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/auth/register`,
  //       {
  //         name: `${data.firstName} ${data.lastName || ''}`,
  //         email: data.email,
  //         password: data.password,
  //         contact: data.phoneNumber,
  //       }
  //     );
  //     if (response.status !== 201) {
  //       throw new Error('Failed to register user');
  //     } else if (response.status === 201) {
  //       toast.success(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   push(routes.auth.signIn);
  //   setReset({ ...initialValues, isAgreed: false });
  // };

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    const registerPromise = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/auth/register`,
      {
        name: `${data.firstName} ${data.lastName || ''}`,
        email: data.email,
        password: data.password,
        contact: data.phoneNumber,
      }
    );

    try {
      await toast.promise(registerPromise, {
        loading: 'Registering your account...',
        success: (response) => {
          return 'Registration successful. Please log in now.';
        },
        error: (error) => {
          return error.message || 'Failed to register user';
        },
      });

      // On success (HTTP 201), redirect to sign-in page and reset form
      push(routes.auth.signIn);
      setReset({ ...initialValues, isAgreed: false });
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, control, formState: { errors, isSubmitting } }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <div>
              <Title
                className={cn(
                  `block font-poppins text-[16px] font-semibold text-[#515151]`
                )}
              >
                First Name
                <span className="text-red-500"> *</span>
              </Title>
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                placeholder="Enter your first name"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('firstName')}
                error={errors.firstName?.message}
                required
              />
            </div>

            <div>
              <Title
                className={cn(
                  `block font-poppins text-[16px] font-semibold text-[#515151]`
                )}
              >
                Last Name
              </Title>
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                placeholder="Enter your last name"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>

            <div className="col-span-2 [&>label>span]:font-medium">
              <Title
                className={cn(
                  `block font-poppins text-[16px] font-semibold text-[#515151]`
                )}
              >
                Email
                <span className="text-red-500"> *</span>
              </Title>
              <Input
                type="email"
                size={isMedium ? 'lg' : 'xl'}
                inputClassName="text-sm"
                placeholder="Enter your email"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div>
              <Title
                className={cn(
                  `block font-poppins text-[16px] font-semibold text-[#515151]`
                )}
              >
                Password
                <span className="text-red-500"> *</span>
              </Title>
              <Password
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>
            <div>
              <Title
                className={cn(
                  `block font-poppins text-[16px] font-semibold text-[#515151]`
                )}
              >
                Confirm Password
                <span className="text-red-500"> *</span>
              </Title>
              <Password
                placeholder="Enter confirm password"
                size={isMedium ? 'lg' : 'xl'}
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>

            <div className="col-span-2">
              <Title
                className={cn(
                  `block font-poppins text-[16px] font-semibold text-[#515151]`
                )}
              >
                Phone Number
                <span className="text-red-500"> *</span>
              </Title>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneNumber
                    {...field}
                    country="us"
                    size={isMedium ? 'lg' : 'xl'}
                    onChange={(value) => {
                      console.log(value)
                      field.onChange(value);
                    }}
                    error={errors.phoneNumber?.message}
                  />
                )}
              />
            </div>

            <div className="col-span-2 flex items-start">
              <Checkbox
                {...register('isAgreed')}
                className="[&>label>span]:font-medium [&>label]:items-start"
                label={
                  <>
                    By signing up you have agreed to our{' '}
                    <Link
                      href={routes.termsNconditions}
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      href={routes.privacyPolicy}
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </>
                }
                error={errors.isAgreed?.message}
              />
            </div>
            <Button
              isLoading={isSubmitting}
              size="lg"
              type="submit"
              className="col-span-2 mt-2"
            >
              <span>Get Started</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}

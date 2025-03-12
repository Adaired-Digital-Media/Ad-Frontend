'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/rizzui-ui/form';
import { Button, Password } from 'rizzui';
import { ProfileHeader } from '@/app/shared/account-settings/profile-settings';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  passwordFormSchema,
  PasswordFormTypes,
} from '@/validators/password-settings.schema';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PasswordSettingsView() {
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState({});
  const { data: session } = useSession();

  const onSubmit: SubmitHandler<PasswordFormTypes> = async (data) => {
    setLoading(true);
    toast
      .promise(
        axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/auth/reset-password`,
          {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        ),
        {
          loading: 'Updating password...',
          success: (response) => {
            return response.data.message;
          },
          error: (error) => {
            return error.response.data.message;
          },
        }
      )
      .then(() => {
        setReset({
          currentPassword: '',
          newPassword: '',
          confirmedPassword: '',
        });
      })
      .catch((error) => {
        console.error('Error updating password:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Form<PasswordFormTypes>
        validationSchema={passwordFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={
          {
            // mode: 'onChange',
          }
        }
      >
        {({ register, control, formState: { errors }, getValues }) => {
          return (
            <>
              <ProfileHeader
                title={session?.user?.name || 'Your Profile'}
                description={session?.user?.email || 'Update your password.'}
              />

              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title="Current Password"
                  titleClassName="text-base font-medium"
                >
                  <Password
                    {...register('currentPassword')}
                    placeholder="Enter your password"
                    error={errors.currentPassword?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="New Password"
                  titleClassName="text-base font-medium"
                >
                  <Password
                    {...register('newPassword')}
                    placeholder="Enter your password"
                    error={errors.newPassword?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Confirm New Password"
                  titleClassName="text-base font-medium"
                >
                  <Password
                    {...register('confirmedPassword')}
                    placeholder="Enter your password"
                    error={errors.confirmedPassword?.message}
                  />
                </HorizontalFormBlockWrapper>

                <div className="mr-10 mt-6 flex w-auto items-center justify-end gap-3">
                  {/* <Button type="button" variant="outline">
                    Cancel
                  </Button> */}
                  <Button type="submit" variant="solid" isLoading={isLoading}>
                    Update Password
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}

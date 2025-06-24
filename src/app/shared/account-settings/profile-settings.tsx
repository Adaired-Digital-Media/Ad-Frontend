'use client';

import Image from 'next/image';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiEnvelopeSimple, PiSealCheckFill } from 'react-icons/pi';
import { Form } from '@core/ui/rizzui-ui/form';
import { Button, Title, Text, Input, Checkbox, Select } from 'rizzui';
import { cn } from '@core/utils/class-names';
import toast from 'react-hot-toast';
import {
  defaultValues,
  profileFormSchema,
  ProfileFormTypes,
} from '@/validators/profile-settings.schema';
import FormGroup from '@/app/shared/form-group';
import { useState } from 'react';
import axios from 'axios';
import { Session } from 'next-auth';

export default function ProfileSettingsView({ session }: { session: Session }) {
  const [isLoading, setLoading] = useState(false);
  const [firstName, lastName] = session?.user?.name?.split(' ') || ['', ''];
  const [reset, setReset] = useState({
    first_name: firstName,
    last_name: lastName,
    username: session?.user?.userName,
    email: session?.user?.email,
    avatar: { name: '', url: session?.user?.image, size: 0 },
  });

  const defaultValuesWithSession = {
    ...defaultValues,
    first_name: firstName,
    last_name: lastName,
    username: session?.user?.userName || '',
    email: session?.user?.email || '',
    avatar: { name: '', url: session?.user?.image || '', size: 0 },
  };

  const onSubmit: SubmitHandler<ProfileFormTypes> = async (data) => {
    setLoading(true);
    toast
      .promise(
        axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/user/update`,
          {
            name: data.first_name + ' ' + data.last_name,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        ),
        {
          loading: 'Updating name...',
          success: 'Name updated successfully',
          error: 'Failed to update name',
        }
      )
      .then((response) => {
        setReset((prevState) => ({
          ...prevState,
          first_name: response.data.name.split(' ')[0],
          last_name: response.data.name.split(' ')[1],
        }));
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
      <Form<ProfileFormTypes>
        validationSchema={profileFormSchema}
        resetValues={defaultValuesWithSession}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues: defaultValuesWithSession,
        }}
      >
        {({
          register,
          control,
          getValues,
          setValue,
          formState: { errors },
        }) => {
          return (
            <>
              <ProfileHeader
                title={session?.user?.name || 'Your Profile'}
                description={session?.user?.email || ''}
              ></ProfileHeader>

              <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="Name"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="First Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                    disabled
                  />
                  <Input
                    placeholder="Last Name"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                    className="flex-grow"
                    disabled
                  />
                </FormGroup>

                <FormGroup
                  title="Email Address"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    prefix={
                      <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                    }
                    type="email"
                    placeholder="georgia.young@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                    disabled
                  />
                </FormGroup>

                <FormGroup
                  title="Username"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    placeholder=""
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    {...register('username')}
                    error={errors.username?.message}
                    disabled
                  />
                </FormGroup>

                {/* <FormGroup
                  title="Your Photo"
                  description="This will be displayed on your profile."
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                    <AvatarUpload
                      name="avatar"
                      setValue={setValue}
                      getValues={getValues}
                      error={errors?.avatar?.message as string}
                    />
                  </div>
                </FormGroup> */}
              </div>
              {/* <FormFooter
                className=""
                // isLoading={isLoading}
                altBtnText="Cancel"
                submitBtnText="Save"
              /> */}
            </>
          );
        }}
      </Form>
    </>
  );
}

export function ProfileHeader({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description?: string }>) {
  return (
    <div
      className={cn(
        'relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10'
      )}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-muted pb-10">
        <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${title}`}
            alt="profile-pic"
            className="auto"
            // src={`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp`}
            // fill
          />
        </div>
        <div>
          <Title
            as="h2"
            className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
          >
            {title}
            <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
          </Title>
          {description ? (
            <Text className="text-sm text-gray-500">{description}</Text>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}

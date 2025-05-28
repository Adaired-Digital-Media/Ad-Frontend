'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@core/utils/class-names';
import { Button, Input, Textarea } from 'rizzui';
import { Controller, useForm } from 'react-hook-form';
import { PhoneNumber } from '@core/ui/rizzui-ui/phone-input';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { routes } from '@/config/routes';

const schema = z.object({
  gRecaptchaToken: z.string(),
  formId: z.string(),
  formUrl: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
  message: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

export const EcomPageForm = () => {
  const { executeRecaptcha } = useReCaptcha();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      gRecaptchaToken: '',
      formId: 'BHW Contact Form',
      formUrl: `${process.env.NEXT_PUBLIC_SITE_URI}${pathname}`,
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: SchemaType) => {
    setLoading(true);
    try {
      const token = await executeRecaptcha('bhw_contact_form');
      if (!token) {
        throw new Error('reCAPTCHA verification failed');
      }

      data.gRecaptchaToken = token;

      const response = await fetch('/api/formMailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      reset();
      // toast.success(
      //   <div
      //     className={cn(
      //       'flex flex-col items-center justify-center p-1 text-center'
      //     )}
      //   >
      //     <h4 className={cn('font-dm font-medium text-gray-900')}>
      //       Thanks for reaching out!
      //     </h4>
      //     <p className={cn('mt-1 text-sm text-gray-500')}>
      //       We'll be in touch shortly.
      //     </p>
      //   </div>,
      //   {
      //     style: {
      //       border: '1px solid #1C5B98',
      //     },
      //   }
      // );

      router.push(routes.eCommerce.thankyouPage);
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('w-full')}>
      <form className={cn('space-y-7')} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Name"
          type="text"
          variant="flat"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          placeholder="Email"
          type="email"
          variant="flat"
          {...register('email')}
          error={errors.email?.message}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneNumber
              {...field}
              country="us"
              preferredCountries={['us']}
              onChange={(value) => field.onChange(value)}
              error={errors.phone?.message}
              className="w-full rounded-lg"
              inputClassName="!bg-primary-lighter/40"
              variant="flat"
            />
          )}
        />
        <Textarea
          placeholder="Message"
          variant="flat"
          {...register('message')}
          error={errors.message?.message}
          style={{
            resize: 'none',
          }}
        />
        <div className="pt-4">
          <Button
            isLoading={loading}
            type="submit"
            className="w-full rounded-full bg-[#F39019] px-6 py-6 font-poppins text-lg text-white"
          >
            Request A Quote
          </Button>
        </div>
      </form>
    </div>
  );
};

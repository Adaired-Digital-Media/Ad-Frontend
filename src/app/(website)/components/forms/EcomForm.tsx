'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../../../@core/utils/class-names';
import { Button, Input, Select, Textarea, type SelectOption } from 'rizzui';
import { Controller, useForm } from 'react-hook-form';
import { PhoneNumber } from '../../../../@core/ui/rizzui-ui/phone-input';
import { useReCaptcha } from 'next-recaptcha-v3';
import { usePathname } from 'next/navigation';
import { FaCaretDown } from 'react-icons/fa';

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
  services: z
    .string()
    .min(1, { message: 'Please select your interested service.' }),
  message: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

export const EcomPageForm = () => {
  const { executeRecaptcha } = useReCaptcha();
  const pathname = usePathname();

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
      formId: 'Ecommerce Page Form',
      formUrl: `${process.env.NEXT_PUBLIC_SITE_URI}${pathname}`,
      name: '',
      email: '',
      phone: '',
      services: '',
      message: '',
    },
  });

  const onSubmit = async (data: SchemaType) => {
    const token = await executeRecaptcha('ecom_page_form');
    if (token) {
      // Set the gRecaptchaToken and submit the form
      data.gRecaptchaToken = token;
      console.log('Submitted data', data);
      reset();
    }
  };

  const options = [
    { label: 'Service 1', value: 'Service 1' },
    { label: 'Service 2', value: 'Service 2' },
    { label: 'Service 3', value: 'Service 3' },
  ];

  return (
    <div className={cn(``)}>
      <form
        action=""
        className={cn(`space-y-5`)}
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <Controller
          control={control}
          name="services"
          render={({ field: { value, onChange } }) => (
            <Select
              options={options}
              value={value}
              suffix={<FaCaretDown />}
              onChange={(v: SelectOption) => onChange(v.value)}
              error={errors?.services?.message}
              placeholder="Select Services..."
              dropdownClassName="text-black"
              className={cn(`rounded-lg border-0 bg-gray-100`)}
              suffixClassName={cn(`text-[#F39019]`)}
            />
          )}
        />
        <Textarea
          placeholder="Message"
          variant="flat"
          {...register('message')}
          error={errors.message?.message}
        />

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full rounded-full bg-[#F39019] font-poppins text-lg text-white"
          >
            Request A Quote
          </Button>
        </div>
      </form>
    </div>
  );
};

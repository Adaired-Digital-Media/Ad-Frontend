'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Input,
  Select,
  NumberInput,
  Checkbox,
  Textarea,
  type SelectOption,
} from 'rizzui';
import Button from '@web-components/Button';
import { PhoneNumber } from '@core/ui/rizzui-ui/phone-input';
import { cn } from '@/@core/utils/class-names';
import { routes } from '@/config/routes';
import { FaDollarSign } from 'react-icons/fa6';
import Link from 'next/link';

const schema = z.object({
  gRecaptchaToken: z.string(),
  formId: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
  interest: z
    .string()
    .min(1, { message: 'Please select your interested service.' }),
  budget: z.string().optional(),
  message: z.string().optional(),
  terms: z.boolean().refine((v) => v === true, {
    message: 'Please accept the terms and conditions',
  }),
});

type SchemaType = z.infer<typeof schema>;

const HomepageForm = () => {
  const services =
    routes.websiteNav
      ?.find((item) => item.value === 'services')
      ?.subItems?.map((item) => ({ label: item.name, value: item.href })) || [];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    defaultValues: {
      gRecaptchaToken: 'test',
      formId: 'Homepage Form',
      name: '',
      email: '',
      phone: '',
      interest: '',
      budget: '',
      message: '',
      terms: false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SchemaType) => {
    console.log('Submitted data', data);
  };

  return (
    <div className={cn(`z-2 rounded-lg bg-white p-6`)}>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between gap-5 sm:flex-row">
          <Input
            type="text"
            placeholder="John Doe"
            {...register('name')}
            variant="text"
            className="w-full border-b-2"
            inputClassName="border-none [&.is-focus]:ring-[0px] [&.is-hover]:border-transparent [&.is-focus]:border-transparent [&.is-focus]:ring-transparent"
            error={errors.name?.message}
          />
          <Input
            type="email"
            placeholder="Johndoe@mail.com"
            {...register('email')}
            variant="text"
            className="w-full border-b-2"
            inputClassName="border-none [&.is-focus]:ring-[0px] [&.is-hover]:border-transparent [&.is-focus]:border-transparent [&.is-focus]:ring-transparent"
            error={errors.email?.message}
          />
        </div>
        <div className="flex flex-col justify-between gap-5 sm:flex-row">
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
                className="w-full"
              />
            )}
          />

          <Controller
            control={control}
            name="interest"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Select
                value={value}
                options={services}
                onChange={(v: SelectOption) => onChange(v.value)}
                error={error?.message}
                displayValue={(selected: string) =>
                  services?.find((r) => r.value === selected)?.label ?? ''
                }
                selectClassName="border-none hover:border-none ring-[0px] hover:ring-[0px] focus:border-b-primary focus:ring-[0px] focus:ring-[0px] border border-muted ring-muted"
              />
            )}
          />
        </div>

        <Input
          type="number"
          prefix={<FaDollarSign />}
          suffix=".00"
          placeholder="Enter your budget"
          {...register('budget')}
          className="w-full border-b-2"
            inputClassName="border-none ring-[0px] [&.is-focus]:ring-[0px] [&.is-hover]:border-transparent [&.is-focus]:border-transparent [&.is-focus]:ring-transparent"
        />

        <Textarea label="Message" {...register('message')} />

        <Checkbox
          label={
            <p className='font-nunito'>
              I accept the{' '}
              <Link
                href="/terms-and-conditions"
                className="text-blue-600 underline"
              >
                {' '}
                terms and conditions{' '}
              </Link>
            </p>
          }
        />

        <Button
          title="Send Your Enquiry"
          className="mt-5 bg-white text-black"
          svgClassName="bg-[#F89520]"
          type="submit"
        />
      </form>
    </div>
  );
};

export default HomepageForm;

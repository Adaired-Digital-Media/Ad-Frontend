'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@core/utils/class-names';
import { Input, Select, Checkbox, Textarea, type SelectOption } from 'rizzui';
import { Controller, useForm } from 'react-hook-form';
import Button from '@web-components/Button';
import { PhoneNumber } from '@core/ui/rizzui-ui/phone-input';
import { routes } from '@/config/routes';
import { FaDollarSign } from 'react-icons/fa6';
import Link from 'next/link';
import { useReCaptcha } from 'next-recaptcha-v3';
import { FaCaretDown } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

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
  const { executeRecaptcha } = useReCaptcha();
  const pathname = usePathname();
  const router = useRouter();

  const services =
    routes.websiteNav
      ?.find((item) => item.value === 'services')
      ?.subItems?.map((item) => ({ label: item.name, value: item.href })) || [];

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    defaultValues: {
      gRecaptchaToken: '',
      formId: 'Homepage Form',
      formUrl: `${process.env.NEXT_PUBLIC_SITE_URI}${pathname}`,
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

  const onSubmit = async (data: SchemaType) => {
    const token = await executeRecaptcha('homepage_form');
    if (token) {
      data.gRecaptchaToken = token;
      reset();
      router.push('/thankyou');
      try {
        const response = await fetch('/api/zoho/leadRegister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        throw new Error('Failed to send data to Zoho CRM');
      }
    }
  };

  return (
    <div className={cn(`z-2 rounded-lg bg-white px-6 py-10`)}>
      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between gap-5 sm:flex-row">
          <Input
            type="text"
            placeholder="Name"
            {...register('name')}
            className="w-full"
            inputClassName="!border-0 !ring-0 !border-b-2 !rounded-none"
            error={errors.name?.message}
          />
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full"
            inputClassName="!border-0 !ring-0 !border-b-2 !rounded-none"
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
                inputClassName="!border-t-0 !border-r-0 !border-l-0 !rounded-none !border-b-2"
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
                suffix={<FaCaretDown />}
                onChange={(value) => {
                  const v = value as SelectOption;
                  onChange(v.label);
                }}
                error={errors?.interest?.message}
                displayValue={(selected: string) =>
                  services?.find((r) => r.label === selected)?.label ?? ''
                }
                suffixClassName={cn(`text-[#F39019]`)}
                selectClassName="!border-0 !ring-0 !border-b-2 !rounded-none"
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

        <Textarea
          label="Message"
          size="xl"
          {...register('message')}
          className="font-nunito text-lg"
        />

        <Checkbox
          {...register('terms')}
          label={
            <p className="font-nunito">
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
          labelClassName="text-lg"
          error={errors?.terms?.message}
        />

        <Button
          title="Send Your Enquiry"
          className="mt-5 border border-gray-200 bg-white text-black"
          svgClassName="bg-[#F89520]"
          type="submit"
        />
      </form>
    </div>
  );
};

export default HomepageForm;

'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea } from 'rizzui';
import { Controller, useForm } from 'react-hook-form';
import Button from '@web-components/Button';
import { PhoneNumber } from '@core/ui/rizzui-ui/phone-input';
import { routes } from '@/config/routes';
import { useReCaptcha } from 'next-recaptcha-v3';
import { usePathname, useRouter, redirect } from 'next/navigation';

const schema = z.object({
  gRecaptchaToken: z.string(),
  formId: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
  message: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

const ContactPageForm = () => {
  const { executeRecaptcha } = useReCaptcha();
  const pathname = usePathname();
  const router = useRouter();

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
      formId: 'Contact page Form',
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values: SchemaType) => {
    const token = await executeRecaptcha('contact_page_form');

    if (token) {
      values.gRecaptchaToken = token;
      reset();
      router.push('/thankyou');
      try {
        const response = await fetch('/api/zoho/leadRegister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      } catch (error) {
        throw new Error('Failed to send data to Zoho CRM');
      }
    }
  };

  return (
    <div>
      <form
        className="mx-auto max-w-3xl space-y-5 rounded-lg border p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          label="Name"
          placeholder="Name"
          {...register('name')}
          className="w-full"
          // inputClassName="!border-0 !ring-0 !border-b-2 !rounded-none"
          error={errors.name?.message}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          {...register('email')}
          className="w-full"
          // inputClassName="!border-0 !ring-0 !border-b-2 !rounded-none"
          error={errors.email?.message}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneNumber
              {...field}
              country="us"
              label="Phone Number"
              preferredCountries={['us']}
              onChange={(value) => field.onChange(value)}
              error={errors.phone?.message}
              className="w-full"
              // inputClassName="!border-t-0 !border-r-0 !border-l-0 !rounded-none !border-b-2"
            />
          )}
        />

        <Textarea
          label="Message"
          size="xl"
          {...register('message')}
          className="!mb-5 font-nunito text-lg"
        />
        {/* <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem className="mb-5 w-full">
              <FormLabel className="text-lg">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="mb-4 rounded-lg text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem className="mb-5 w-full">
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="mb-4 rounded-lg text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="Phone"
          render={({ field }) => (
            <FormItem className="mb-5 w-full">
              <FormLabel className="text-lg">Phone No.</FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  country={'us'}
                  inputProps={{
                    name: 'phone',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '3.5rem',
                    fontSize: '1.125rem',
                    borderRadius: '0.5rem',
                    color: '#000',
                  }}
                  containerStyle={{}}
                  enableSearch
                  onChange={(phone) => {
                    field.onChange(phone);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="Message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-10 text-lg">Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="mb-4 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                  rows={5}
                  // defaultValue={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button
          title="Send Your Inquiry"
          // className="mt-20 flex w-full items-center justify-center bg-white pl-0 pr-0 text-black hover:pl-0 hover:pr-0"
          className="w-full items-center justify-center border border-gray-200 bg-white pl-0 pr-0 hover:pl-0 hover:pr-0"
          svgClassName="bg-[#F89520]  "
          type="submit"
        />
      </form>
    </div>
  );
};

export default ContactPageForm;

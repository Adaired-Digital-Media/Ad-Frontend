'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea } from 'rizzui';
import { useForm } from 'react-hook-form';
import Button from '@web-components/Button';
import { routes } from '@/config/routes';
import { useReCaptcha } from 'next-recaptcha-v3';
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
  message: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

function GetInTouchForm({ colorScheme }: { colorScheme: string }) {
  const { executeRecaptcha } = useReCaptcha();
  const pathname = usePathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      gRecaptchaToken: '',
      formId: 'Get in Touch Form',
      formUrl: `${process.env.NEXT_PUBLIC_SITE_URI}${pathname}`,
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: SchemaType) => {
    const token = await executeRecaptcha('get_in_touch_form');
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
    <div className="rounded-lg border p-5">
      <h2 className="mb-4 inline-block text-[1.688rem] md:text-4xl">
        Get In Touch
        <div
          className={`mt-2 h-0.5 w-3/4`}
          style={{
            backgroundColor: colorScheme,
          }}
        />
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          type="text"
          placeholder="Name"
          {...register('name')}
          className="w-full"
          // inputClassName="!border-0 !ring-0 !border-b-2 !rounded-none"
          error={errors.name?.message}
        />
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="w-full"
          // inputClassName="!border-0 !ring-0 !border-b-2 !rounded-none"
          error={errors.email?.message}
        />

        <Textarea
          placeholder="Message"
          rows={4}
          size="xl"
          {...register('message')}
          className="font-nunito text-lg"
        />

        <Button
          title="Send Your Inquiry"
          className="w-full justify-center border-[#FB9100] bg-white pl-0 pr-0 text-black hover:pl-0 hover:pr-0"
          textClassName="text-center"
          svgClassName="bg-[#000000] "
          type="submit"
        />
      </form>
    </div>
  );
}

export default GetInTouchForm;

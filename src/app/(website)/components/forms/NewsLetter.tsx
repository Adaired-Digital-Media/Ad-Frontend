'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Checkbox, Textarea, type SelectOption } from 'rizzui';
import { useForm } from 'react-hook-form';
import { useReCaptcha } from 'next-recaptcha-v3';
import toast from 'react-hot-toast';
import { Button } from 'rizzui';
import { TbArrowRightDashed } from 'react-icons/tb';

const schema = z.object({
  gRecaptchaToken: z.string(),
  formId: z.string(),
  email: z.string().min(5, { message: 'Email is required' }).email(),
});

type SchemaType = z.infer<typeof schema>;
const NewsLetter = () => {
  const { executeRecaptcha } = useReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      gRecaptchaToken: '',
      formId: 'Newsletter Form',
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const token = await executeRecaptcha('newsletter_form');
    if (token) {
      values.gRecaptchaToken = token;
      toast.success('Thank you for subscribing to our newsletter!');
      reset();
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
    <form className="relative mt-6" action="" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        variant="flat"
        placeholder="Enter your email"
        {...register('email')}
        inputClassName="!focus:bg-white !focus:border-0 !border-0 !ring-0 !bg-white relative h-12 w-full rounded-md p-2 text-black outline-none md:w-full"
        error={errors.email?.message}
      />

      <Button
        type="submit"
        className="absolute inset-y-1 right-1.5 rounded-bl-none rounded-tl-none bg-[#FB9100]"
        aria-label="Subscribe to our newsletter"
      >
        <TbArrowRightDashed className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default NewsLetter;

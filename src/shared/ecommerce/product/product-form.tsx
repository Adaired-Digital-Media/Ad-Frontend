'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Input, Title, Button, Textarea } from 'rizzui';
import { cn } from '@core/utils/class-names';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

// Utility function to generate Zod schema
const generateFormSchema = (fields: any[]) => {
  const schema: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'number':
        fieldSchema = z
          .number({
            invalid_type_error: `${field.label} must be a number`,
          })
          .min(1, `${field.label} is required`);
        break;

      case 'textarea':
      case 'text':
        fieldSchema = z
          .string({
            invalid_type_error: `${field.label} must be a string`,
          })
          .max(500, `${field.label} cannot exceed 500 characters`);
        break;

      default:
        fieldSchema = z.string();
    }

    if (field.required) {
      if (field.type === 'number') {
        fieldSchema = (fieldSchema as z.ZodNumber).min(
          1,
          `${field.label} is required`
        );
      } else if (field.type === 'textarea' || field.type === 'text') {
        fieldSchema = (fieldSchema as z.ZodString).min(
          1,
          `${field.label} is required`
        );
      }
    }

    schema[field.name] = fieldSchema;
  });

  return z.object(schema);
};

// Component Props
interface DynamicFormProps {
  form: {
    fields: {
      name: string;
      label: string;
      placeholder: string;
      type: string;
      required: boolean;
      options: any[];
    }[];
  };
}

interface ProductFormProps {
  form: DynamicFormProps;
  product: any;
}

export const ProductForm: React.FC<ProductFormProps> = ({ form, product }) => {
  // Generate schema based on form fields
  const formSchema = generateFormSchema(form?.form?.fields);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, register, formState } = methods;
  const { errors } = formState;

  const onSubmit = (data: any) => {
    console.log('Form Submitted', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Header */}
          <div
            className={cn(
              `flex items-center justify-between rounded-tl-[15px] rounded-tr-[15px] bg-black px-10 py-5`
            )}
          >
            <Title
              as="h3"
              className={cn(
                `font-poppins text-[22px] font-semibold text-white`
              )}
            >
              Shopping Cart
            </Title>
            <Button type="button">Continue Shopping</Button>
          </div>

          {/* Product Details */}
          <div
            className={cn(
              `rounded-bl-[15px] rounded-br-[15px] border border-t-0 border-[#DBDBDB] p-10 pt-5`
            )}
          >
            <div
              className={cn(
                `flex items-center justify-between border-b-2 border-dashed border-[#1B5A96] pb-[15px]`
              )}
            >
              <div className={cn(`flex items-center gap-6`)}>
                <Image
                  src={'https://picsum.photos/30'}
                  width="50"
                  height="50"
                  alt={product.title}
                  className={cn(`rounded-full bg-[#FAFAFA] p-2`)}
                />
                <Title
                  as="h4"
                  className={cn(`font-poppins text-[22px] font-semibold`)}
                >
                  {product.name}
                </Title>
              </div>
              <div>
                <Title
                  as="h5"
                  className={cn(
                    `font-nunito text-lg font-semibold text-[#515151]`
                  )}
                >
                  Total Cost :{' '}
                  <span
                    className={cn(
                      `font-nunito text-[22px] font-bold text-[#18AA15]`
                    )}
                  >
                    $ {product.price} 
                  </span>
                </Title>
              </div>
            </div>

            {/* Dynamic Form Fields */}
            <div className="mt-5 space-y-6">
              <div className="flex gap-4">
                {form?.form?.fields.slice(0, 2).map((field) => (
                  <div key={field.name} className="flex-1">
                    <Title
                      className={cn(
                        `mb-2 block font-poppins text-[16px] font-semibold text-[#515151]`
                      )}
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500"> *</span>
                      )}
                    </Title>
                    {field.type === 'textarea' ? (
                      <Textarea
                        placeholder={field.placeholder}
                        {...register(field.name)}
                        className={cn(`w-full border-none`)}
                        textareaClassName={cn(`bg-[#FAFAFA]`)}
                        variant="flat"
                      />
                    ) : (
                      <Input
                        type={
                          field.type as
                            | 'number'
                            | 'search'
                            | 'text'
                            | 'time'
                            | 'tel'
                            | 'url'
                            | 'email'
                            | 'date'
                            | 'week'
                            | 'month'
                            | 'datetime-local'
                            | undefined
                        }
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          valueAsNumber: field.type === 'number',
                        })}
                        className={cn(`w-full`)}
                        variant="flat"
                        inputClassName={cn(`bg-[#FAFAFA]`)}
                      />
                    )}
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-red-500">
                        {String(errors[field.name]?.message)}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Render remaining inputs */}
              {form?.form?.fields.slice(2).map((field) => (
                <div key={field.name}>
                  <Title
                    className={cn(
                      `mb-2 block font-poppins text-[16px] font-semibold text-[#515151]`
                    )}
                  >
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </Title>
                  {field.type === 'textarea' ? (
                    <Textarea
                      placeholder={field.placeholder}
                      {...register(field.name)}
                      className={cn(`w-full border-none`)}
                      textareaClassName={cn(`bg-[#FAFAFA]`)}
                      variant="flat"
                    />
                  ) : (
                    <Input
                      type={
                        field.type as
                          | 'number'
                          | 'search'
                          | 'text'
                          | 'time'
                          | 'tel'
                          | 'url'
                          | 'email'
                          | 'date'
                          | 'week'
                          | 'month'
                          | 'datetime-local'
                          | undefined
                      }
                      placeholder={field.label}
                      {...register(field.name, {
                        valueAsNumber: field.type === 'number',
                      })}
                      className={cn(`w-full`)}
                      variant="flat"
                      inputClassName={cn(`bg-[#FAFAFA]`)}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-500">
                      {String(errors[field.name]?.message)}
                    </p>
                  )}
                </div>
              ))}

              <div className={cn(`flex items-center justify-between`)}>
                <Button type="submit">Add To Cart</Button>
                <Button type="submit">Instant Payment</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

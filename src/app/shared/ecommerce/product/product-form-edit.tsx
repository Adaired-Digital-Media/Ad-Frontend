'use client';

import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
} from 'react-hook-form';
import { Input, Title, Textarea } from 'rizzui';
import { cn } from '@core/utils/class-names';
import * as z from 'zod';
import Button from '@web-components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useCallback, useState } from 'react';
import { generateCartProduct } from '@/store/quick-cart/generate-cart-product';
import { Product } from '@/types';
import { useCart } from '@/store/quick-cart/cart.context';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

// Utility: Dynamic Zod Schema
const generateFormSchema = (
  fields: { name: string; type: string; required: boolean }[]
) => {
  const schema: Record<string, z.ZodTypeAny> = {};
  fields.forEach(({ name, type, required }) => {
    let fieldSchema: z.ZodTypeAny =
      type === 'number'
        ? z.number().min(1, `${name} must be at least 1`)
        : z.string().max(500, `${name} cannot exceed 500 characters`);
    schema[name] = required
      ? (fieldSchema as z.ZodString | z.ZodNumber).min(1, `${name} is required`)
      : fieldSchema;
  });
  return z.object(schema);
};

interface ProductFormProps {
  form: {
    fields: {
      name: string;
      label: string;
      placeholder: string;
      type: string;
      required: boolean;
    }[];
  };
  product: Product;
  initialValues?: Record<string, any>;
}

export const ProductFormEdit: React.FC<ProductFormProps> = ({
  form,
  product,
  initialValues,
}) => {
  const router = useRouter();
  const { updateDetails } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Generate schema based on form fields
  const formSchema = generateFormSchema(form?.fields);

  const methods = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit, register, formState, watch } = methods;
  const { errors } = formState;

  // Watch form values for word count and quantity
  const watchedFields = watch();

  // Calculate Total Price
  const calculateTotalPrice = useCallback(() => {
    const wordCount = parseInt(watch('wordCount') || '100');
    const quantity = parseInt(watch('quantity') || '1');
    return product.pricingType === 'perWord'
      ? Math.round((wordCount / 100) * product.pricePerUnit * quantity * 100) /
          100
      : Math.round(product.pricePerUnit * quantity * 100) / 100;
  }, [watchedFields, product]);

  // Update the price when form values change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [watch, calculateTotalPrice]);

  const addToCart = async (data: FieldValues) => {
    // Calculate the total price of the product
    const price = calculateTotalPrice();

    const cartItem = generateCartProduct({
      product,
      data,
      price,
    });

    updateDetails(product._id, cartItem);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    addToCart(data);
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
            <Button
              title="Continue Shopping"
              className="bg-white"
              svgInnerClassName="text-[#F89520]"
              svgClassName=" bg-black"
              type="button"
              navigateTo="/ecommerce/#products"
            />
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
                <figure className="relative aspect-[4.5/4.5] w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={product.featuredImage}
                    alt={'icon'}
                    fill
                    priority
                    className="h-full w-full p-2"
                  />
                </figure>
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
                    $ {totalPrice}
                  </span>
                </Title>
              </div>
            </div>

            {/* Dynamic Form Fields */}
            <div className="mt-5 space-y-6">
              {/* First pair of fields */}
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
                        {...register(
                          field.name as
                            | 'wordCount'
                            | 'quantity'
                            | 'additionalInfo'
                        )}
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
                        {...register(
                          field.name as
                            | 'name'
                            | 'email'
                            | 'phone'
                            | 'wordCount'
                            | 'quantity'
                            | 'additionalInfo',
                          {
                            valueAsNumber: field.type === 'number',
                          }
                        )}
                        className={cn(`w-full`)}
                        variant="flat"
                        inputClassName={cn(`bg-[#FAFAFA]`)}
                        required={field.required}
                      />
                    )}
                    {errors[
                      field.name as 'wordCount' | 'quantity' | 'additionalInfo'
                    ] && (
                      <p className="mt-1 text-sm text-red-500">
                        {String(
                          errors[
                            field.name as
                              | 'name'
                              | 'email'
                              | 'phone'
                              | 'wordCount'
                              | 'quantity'
                              | 'additionalInfo'
                          ]?.message
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Second pair of fields */}
              <div className="flex gap-4">
                {form?.form?.fields.slice(2, 4).map((field) => (
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
                        {...register(
                          field.name as
                            | 'name'
                            | 'email'
                            | 'phone'
                            | 'wordCount'
                            | 'quantity'
                            | 'additionalInfo'
                        )}
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
                        {...register(
                          field.name as
                            | 'name'
                            | 'email'
                            | 'phone'
                            | 'wordCount'
                            | 'quantity'
                            | 'additionalInfo',
                          {
                            valueAsNumber: field.type === 'number',
                          }
                        )}
                        className={cn(`w-full`)}
                        variant="flat"
                        inputClassName={cn(`bg-[#FAFAFA]`)}
                        required={field.required}
                      />
                    )}
                    {errors[
                      field.name as 'wordCount' | 'quantity' | 'additionalInfo'
                    ] && (
                      <p className="mt-1 text-sm text-red-500">
                        {String(
                          errors[
                            field.name as
                              | 'name'
                              | 'email'
                              | 'phone'
                              | 'wordCount'
                              | 'quantity'
                              | 'additionalInfo'
                          ]?.message
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Remaining fields in individual rows */}
              {form?.form?.fields.slice(4).map((field) => (
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
                      {...register(
                        field.name as
                          | 'name'
                          | 'email'
                          | 'phone'
                          | 'wordCount'
                          | 'quantity'
                          | 'additionalInfo'
                      )}
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
                      {...register(
                        field.name as
                          | 'name'
                          | 'email'
                          | 'phone'
                          | 'wordCount'
                          | 'quantity'
                          | 'additionalInfo',
                        {
                          valueAsNumber: field.type === 'number',
                        }
                      )}
                      required={field.required}
                      className={cn(`w-full`)}
                      variant="flat"
                      inputClassName={cn(`bg-[#FAFAFA]`)}
                    />
                  )}
                  {errors[
                    field.name as
                      | 'name'
                      | 'email'
                      | 'phone'
                      | 'wordCount'
                      | 'quantity'
                      | 'additionalInfo'
                  ] && (
                    <p className="mt-1 text-sm text-red-500">
                      {String(
                        errors[
                          field.name as
                            | 'name'
                            | 'email'
                            | 'phone'
                            | 'wordCount'
                            | 'quantity'
                            | 'additionalInfo'
                        ]?.message
                      )}
                    </p>
                  )}
                </div>
              ))}

              <div className={cn(`flex items-center justify-between gap-10`)}>
                <Button
                  title="Add To Cart"
                  className="flex w-full justify-center bg-[#1B5A96]"
                  svgInnerClassName="!text-[#1B5A96]"
                  svgClassName="bg-white"
                  textClassName="text-white"
                  type="submit"
                />
                <Button
                  title="Instant Payment"
                  className="flex w-full justify-center bg-white"
                  svgInnerClassName="text-white"
                  svgClassName="bg-[#1B5A96]"
                  type="button"
                  onClick={(data) => {
                    if (onSubmit(data)) {
                      console.log('Payment Successful');
                      alert('Payment Successful');
                      router.push(routes?.eCommerce?.cart);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

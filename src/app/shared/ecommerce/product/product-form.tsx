'use client';

import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
} from 'react-hook-form';
import { Select, Input, Title, Textarea } from 'rizzui';
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

// Utility function to generate Zod schema
const generateFormSchema = (
  fields: {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    required: boolean;
    options: any[];
  }[],
  product: Product
) => {
  const schema: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'number':
        fieldSchema = z
          .number({
            invalid_type_error: `${field.label} must be at least  ${field.name === 'quantity' ? product.minimumQuantity : product.minimumWords}`,
          })
          .min(
            field.name === 'quantity'
              ? product.minimumQuantity || 0
              : product.minimumWords || 0,
            field.name === 'quantity'
              ? `${field.label} must be at least 1`
              : `Minimum purchase is ${product.minimumWords} words for this product.`
          );
        break;

      case 'text':
        fieldSchema = z
          .string({
            message: `${field.label} is required`,
          })
          .max(500, `${field.label} cannot exceed 500 characters`);
        break;

      case 'email':
        fieldSchema = z
          .string()
          .min(1, `${field.label} is required`)
          .email({ message: 'Invalid email address' });
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
  product: Product;
  session: any;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  form,
  product,
  session,
}) => {
  const { addItemToCart } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Generate schema based on form fields
  const formSchema = generateFormSchema(form?.form?.fields, product);

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session?.user?.name,
      email: session?.user?.email,
      phone: session?.user?.contact,
      wordCount: product.minimumWords,
      quantity: product.minimumQuantity,
      additionalInfo: '',
    },
  });

  const { handleSubmit, register, formState, watch, reset } = methods;
  const { errors } = formState;

  // Watch form values for word count and quantity
  const watchedFields = watch();

  const calculateTotalPrice = useCallback(() => {
    if (product.pricingType === 'perWord') {
      const words = parseInt(watchedFields?.wordCount || '0');
      const quantity = parseInt(watchedFields?.quantity || '1');
      const pricePerUnit = product.pricePerUnit;

      // Calculate the price based on the exact word count
      let totalPrice = (words / 100) * pricePerUnit * quantity;

      // Round to 2 decimal places
      totalPrice = Math.round(totalPrice * 100) / 100;
      return totalPrice;
    } else if (product.pricingType === 'perQuantity') {
      const quantity = parseInt(watchedFields?.quantity || '1');
      let totalPrice = product.pricePerUnit * quantity;

      // Round to 2 decimal places
      totalPrice = Math.round(totalPrice * 100) / 100;
      return totalPrice;
    }
    return 0;
  }, [watchedFields, product]);

  // Update the price when form values change
  useEffect(() => {
    const price = calculateTotalPrice();
    setTotalPrice(price);
  }, [watchedFields, calculateTotalPrice]);

  const addToCart = async (data: FieldValues) => {
    // Calculate the total price of the product
    const price = calculateTotalPrice();

    const cartItem = generateCartProduct({
      product,
      data,
      price,
    });
    
    addItemToCart(cartItem);
    // reset();
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
              `flex flex-col items-center justify-between gap-5 rounded-tl-[15px] rounded-tr-[15px] bg-black px-10 py-5 xs:flex-row xs:gap-0`
            )}
          >
            <Title
              as="h3"
              className={cn(
                `font-poppins text-2xl font-semibold text-white xs:text-[22px]`
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
              navigateTo={routes.eCommerce.products}
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
                `flex flex-col items-center justify-between gap-2 border-b-2 border-dashed border-[#1B5A96] pb-[15px] xs:flex-row xs:gap-0`
              )}
            >
              <div
                className={cn(
                  `flex flex-col items-center gap-3 xs:flex-row xs:gap-6`
                )}
              >
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
              <div className="flex flex-col gap-4 xs:flex-row">
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
                        disabled={
                          (field.name === 'quantity' ||
                            field.name === 'wordCount') &&
                          product.isFreeProduct
                        }
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
              <div className="flex flex-col gap-4 xs:flex-row">
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

              <div
                className={cn(
                  `flex flex-col items-center justify-between gap-5 sm:flex-row sm:gap-10`
                )}
              >
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
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

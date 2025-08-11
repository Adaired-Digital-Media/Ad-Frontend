'use client';

import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
  Controller,
} from 'react-hook-form';
import { Select, Textarea, Title } from 'rizzui';
import { cn } from '@core/utils/class-names';
import Button from '@web-components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useCallback, useState } from 'react';
import { generateCartProduct } from '@/store/quick-cart/generate-cart-product';
import { useCart } from '@/store/quick-cart/cart.context';
import { routes } from '@/config/routes';
import { useAtom } from 'jotai';
import { selectedContentProductAtom } from '@/store/atoms/selectedContentProductAtom';
import ProductFormSkeleton from '@/app/(website)/components/Skeletons/ProductFormSkeleton';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Product } from '@/types';

// Define types based on JSON structure
interface FormField {
  _id: string;
  name: string;
  label: string;
  inputType: 'select' | 'textarea';
  inputMinLength?: number | null;
  inputMaxLength?: number | null;
  inputPlaceholder?: string | null;
  inputValidationPattern?: string | null;
  inputRequired: boolean;
  customClassName?: string | null;
  multipleOptions?: { value: string; name: string; _id: string }[];
}

interface DynamicFormTypes {
  form: {
    _id: string;
    title: string;
    fields: { field: FormField; fieldOrder: number; _id: string }[];
    status: string;
  };
}

interface ProductFormProps {
  isEditMode?: boolean;
  initialProducts: Product[];
  initialForm: DynamicFormTypes | null;
  initialSelectedProduct: Product;
}

// Helper function to safely convert to string
const safeStringValue = (value: any, fallback: string): string => {
  if (value === null || value === undefined) return fallback;
  return String(value);
};

// Placeholder for generateFormSchema (adjust based on your implementation)
const generateFormSchema = (
  fields: { field: FormField }[],
  product: Product
) => {
  const shape: Record<string, z.ZodTypeAny> = {};
  fields.forEach(({ field }) => {
    if (field.inputType === 'select') {
      shape[field.name] = z
        .string({
          required_error: `${field.label} is required`,
        })
        .refine(
          (val) => field.multipleOptions?.some((opt) => opt.value === val),
          { message: `Invalid ${field.label.toLowerCase()} selection` }
        );
    } else if (field.inputType === 'textarea') {
      if (field.inputRequired) {
        // Required field
        let schema = z.string({
          required_error: `${field.label} is required`,
        });
        
        if (field.inputMinLength && field.inputMinLength > 0) {
          schema = schema.min(field.inputMinLength, `${field.label} is too short`);
        }
        
        shape[field.name] = schema;
      } else {
        // Optional field - can be empty string or undefined
        let schema = z.string();
        
        if (field.inputMinLength && field.inputMinLength > 0) {
          schema = schema.min(field.inputMinLength, `${field.label} is too short`);
        }
        
        shape[field.name] = schema.optional().or(z.literal(''));
      }
    }
  });
  return z.object(shape);
};

export const ProductForm = ({
  isEditMode,
  initialProducts,
  initialForm,
  initialSelectedProduct,
}: ProductFormProps) => {
  const router = useRouter();
  const { addItemToCart, updateCartItem, products } = useCart();
  const [product, setProduct] = useAtom(selectedContentProductAtom);
  const [form, setForm] = useState<DynamicFormTypes | null>(initialForm);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const productToEdit = products.find((p) => p.product._id === product?._id);

  // Initialize with server-side data
  useEffect(() => {
    setProduct(initialSelectedProduct);
    setForm(initialForm);
  }, [initialSelectedProduct, initialForm, setProduct]);

  const formSchema =
    product && form ? generateFormSchema(form.form.fields, product) : undefined;

  // Create default values with proper string conversion
  const createDefaultValues = useCallback(() => {
    return {
      wordCount: safeStringValue(product?.minimumWords, "100"),
      quantity: safeStringValue(product?.minimumQuantity, "1"),
      additionalInfo: '',
    };
  }, [product]);

  const methods = useForm<FieldValues>({
    resolver: formSchema ? zodResolver(formSchema) : undefined,
    defaultValues: createDefaultValues(),
  });

  const { control, handleSubmit, formState, watch, reset, register } = methods;
  const { errors } = formState;

  const watchedFields = watch();

  const calculateTotalPrice = useCallback(() => {
    if (product?.pricingType === 'perWord') {
      const words = parseInt(watchedFields?.wordCount || '0', 10);
      const quantity = parseInt(watchedFields?.quantity || '1', 10);
      const pricePerUnit = product.pricePerUnit;
      let totalPrice = (words / 100) * pricePerUnit * quantity;
      return Math.round(totalPrice * 100) / 100;
    } else if (product?.pricingType === 'perQuantity') {
      const quantity = parseInt(watchedFields?.quantity || '1', 10);
      let totalPrice = product?.pricePerUnit * quantity;
      return Math.round(totalPrice * 100) / 100;
    }
    return 0;
  }, [watchedFields, product]);

  useEffect(() => {
    const price = calculateTotalPrice();
    setTotalPrice(price);
  }, [watchedFields, calculateTotalPrice]);

  const addToCart = (data: FieldValues) => {
    setLoading(true);
    if (!product) return;
    const price = calculateTotalPrice();
    const cartItem = generateCartProduct({ product, data, price });
    addItemToCart(cartItem);
    reset();
    setLoading(false);
  };

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   if (isEditMode && productToEdit) {
  //     console.log("Updated Data : ", data)
  //     updateCartItem(productToEdit._id, data);
  //   } else {
  //     console.log("Added Data : ", data)
  //     addToCart(data);
  //   }
  // };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    try {
      if (!product) return;

      // Normalize data to ensure wordCount and quantity are numbers
      const normalizedData = {
        ...data,
        wordCount: Number(data.wordCount) || 0,
        quantity: Number(data.quantity) || 1,
      };

      if (isEditMode && productToEdit) {
        console.log('Updated Data: ', normalizedData);
        updateCartItem(productToEdit._id, normalizedData);
      } else {
        addToCart(normalizedData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductChange = async (selectedProductId: string) => {
    const selectedProduct = initialProducts.find(
      (p) => p._id === selectedProductId
    );
    if (selectedProduct && selectedProduct._id !== product?._id) {
      setIsLoading(true);
      setProduct(selectedProduct);

      window.history.replaceState(
        { productId: selectedProduct._id },
        '',
        `/expert-content-solutions/products/${selectedProduct.slug}/form`
      );

      if (
        selectedProduct.formId &&
        selectedProduct.formId !== form?.form?._id
      ) {
        try {
          const formRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/product/form/read-form?formId=${selectedProduct.formId}`
          );
          if (!formRes.ok) throw new Error('Failed to fetch form');
          const newForm = await formRes.json();
          setForm(newForm);
        } catch (error) {
          console.error('Error fetching form:', error);
          setForm(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      router.push('/expert-content-solutions');
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  // Reset form when product changes (non-edit mode)
  useEffect(() => {
    if (!isEditMode && product && form) {
      reset({
        wordCount: safeStringValue(product?.minimumWords, "100"),
        quantity: safeStringValue(product?.minimumQuantity, "1"),
        additionalInfo: '',
      });
    }
  }, [isEditMode, product, form, reset]);

  // Reset form when in edit mode
  useEffect(() => {
    if (isEditMode && productToEdit) {
      reset({
        wordCount: safeStringValue(productToEdit.wordCount, "100"),
        quantity: safeStringValue(productToEdit.quantity, "1"),
        additionalInfo: productToEdit.additionalInfo || '',
      });
    }
  }, [isEditMode, productToEdit, reset]);

  if (isLoading || !product || !form) {
    return <ProductFormSkeleton />;
  }

  const ErrorMessage = ({ name, errors }: { name: string; errors: any }) => {
    if (errors[name]) {
      return (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      );
    }
    return null;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Header */}
          <div
            className={cn(
              `flex flex-col items-center justify-between gap-5 rounded-tl-[15px] rounded-tr-[15px] bg-black px-5 py-5 xs:flex-row xs:gap-0 sm:px-10`
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
              svgClassName="bg-black"
              type="button"
              navigateTo={routes.eCommerce.products}
            />
          </div>

          {/* Product Details */}
          <div
            className={cn(
              `rounded-bl-[15px] rounded-br-[15px] border border-t-0 border-[#DBDBDB] p-5 pt-5 xs:p-8 sm:p-10`
            )}
          >
            <div
              className={cn(
                `grid items-center gap-3 border-b-2 border-dashed border-[#1B5A96] pb-5 sm:grid-cols-2`
              )}
            >
              <div className={cn(`flex items-center gap-3`)}>
                <figure className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={
                      isEditMode
                        ? productToEdit?.product.featuredImage || ''
                        : product?.featuredImage || ''
                    }
                    alt={'icon'}
                    width={50}
                    height={50}
                    className="h-full w-full p-3"
                  />
                </figure>
                <Select
                  disabled={isEditMode}
                  value={isEditMode ? productToEdit?.product : product}
                  selectClassName="text-lg"
                  className={cn(`w-full font-poppins font-semibold`)}
                  options={initialProducts.map((p) => ({
                    value: p._id,
                    label: p.name,
                  }))}
                  onChange={(selectedOption: any) =>
                    handleProductChange(selectedOption.value)
                  }
                />
              </div>
              <div className={cn(`items-center justify-self-end`)}>
                <Title
                  as="h5"
                  className={cn(
                    `font-nunito text-lg font-semibold text-[#515151]`
                  )}
                >
                  Total Cost:{' '}
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
              {form?.form?.fields.map(({ field }) => (
                <div key={field._id} className="flex-1">
                  <Title
                    className={cn(
                      `mb-2 block font-poppins text-[16px] font-semibold text-[#515151]`
                    )}
                  >
                    {field.label}
                    {field.inputRequired && (
                      <span className="text-red-500"> *</span>
                    )}
                  </Title>

                  {field.inputType === 'textarea' && (
                    <>
                      <Textarea
                        placeholder={field.inputPlaceholder || ''}
                        {...register(field.name)}
                        className={cn(`w-full`)}
                        onChange={(e) => {
                          const value = e.target.value;
                          e.target.value = value.trimStart();
                        }}
                        textareaClassName={cn(`text-base`)}
                        variant="flat"
                        required={field.inputRequired}
                        disabled={
                          (field.name === 'quantity' ||
                            field.name === 'wordCount') &&
                          product?.isFreeProduct
                        }
                      />
                      <ErrorMessage name={field.name} errors={errors} />
                    </>
                  )}

                  {field.inputType === 'select' && (
                    <>
                      <Controller
                        name={field.name}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            options={
                              field.multipleOptions?.map((opt) => ({
                                value: opt.value,
                                label: opt.name,
                              })) || []
                            }
                            placeholder={field.inputPlaceholder || ''}
                            value={
                              field.multipleOptions?.find(
                                (option) => option.value === value
                              ) || null
                            }
                            onChange={(selectedOption: any) =>
                              onChange(selectedOption?.value || '')
                            }
                            className={cn(`w-full`)}
                            variant="flat"
                            disabled={
                              (field.name === 'quantity' ||
                                field.name === 'wordCount') &&
                              product?.isFreeProduct
                            }
                          />
                        )}
                      />
                      <ErrorMessage name={field.name} errors={errors} />
                    </>
                  )}
                </div>
              ))}

              <div className={cn(`flex flex-col gap-5 sm:flex-row sm:gap-10`)}>
                <Button
                  title={isEditMode ? 'Update Product' : 'Add To Cart'}
                  className="flex w-full justify-center bg-[#1B5A96] hover:bg-[#1B5A96] md:w-1/2"
                  svgInnerClassName="!text-[#1B5A96]"
                  svgClassName="bg-white"
                  textClassName="!text-white"
                  type="submit"
                  disabled={loading}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
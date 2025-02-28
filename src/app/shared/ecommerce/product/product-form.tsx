'use client';

import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
  Controller,
} from 'react-hook-form';
import { Select, Input, Title, Textarea } from 'rizzui';
import { cn } from '@core/utils/class-names';
import Button from '@web-components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useCallback, useState } from 'react';
import { generateCartProduct } from '@/store/quick-cart/generate-cart-product';
import { useCart } from '@/store/quick-cart/cart.context';
import { routes } from '@/config/routes';
import {
  DynamicFormTypes,
  generateFormSchema,
} from '@core/utils/generate-form-schema';
import { useAtom } from 'jotai';
import {
  contentProductsAtom,
  selectedContentProductAtom,
} from '@/store/atoms/selectedContentProductAtom';
import ProductFormSkeleton from '@/app/(website)/components/Skeletons/ProductFormSkeleton';

interface ProductFormProps {
  isEditMode?: boolean;
  productId?: string;
}

export const ProductForm = ({ isEditMode, productId }: ProductFormProps) => {
  const { addItemToCart, updateCartItem, products } = useCart();
  const [product, setProduct] = useAtom(selectedContentProductAtom);
  const [allProducts, setAllProducts] = useAtom(contentProductsAtom);
  const [form, setForm] = useState<DynamicFormTypes>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const productToEdit = products.find((product) => product._id === productId);

  // Generate schema based on form fields
  const formSchema = product
    ? generateFormSchema(form?.form?.fields ?? [], product)
    : undefined;

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    resolver: formSchema ? zodResolver(formSchema) : undefined,
  });

  const { control, handleSubmit, formState, watch, reset, setValue, register } =
    methods;
  const { errors } = formState;

  const watchedFields = watch();

  // Fetch all products if contentProductsAtom is empty
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/product/read-product`
        ); 
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await response.json();
        setAllProducts(productsData.data);
        if (!product && productsData.length > 0) {
          setProduct(productsData[0]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!Array.isArray(allProducts) || allProducts.length === 0) {
      fetchAllProducts();
    } else {
      setIsLoading(false);
    }
  }, [allProducts, setAllProducts, setProduct, product]);

  const calculateTotalPrice = useCallback(() => {
    if (product?.pricingType === 'perWord') {
      const words = parseInt(watchedFields?.wordCount || '0');
      const quantity = parseInt(watchedFields?.quantity || '1');
      const pricePerUnit = product.pricePerUnit;

      // Calculate the price based on the exact word count
      let totalPrice = (words / 100) * pricePerUnit * quantity;

      // Round to 2 decimal places
      totalPrice = Math.round(totalPrice * 100) / 100;
      return totalPrice;
    } else if (product?.pricingType === 'perQuantity') {
      const quantity = parseInt(watchedFields?.quantity || '1');
      let totalPrice = product?.pricePerUnit * quantity;

      // Round to 2 decimal places
      totalPrice = Math.round(totalPrice * 100) / 100;
      return totalPrice;
    }
    return 0;
  }, [watchedFields, product]);

  useEffect(() => {
    const price = calculateTotalPrice();
    setTotalPrice(price);
  }, [watchedFields, calculateTotalPrice]);

  const addToCart = (data: FieldValues) => {
    if (!product) return;
    const price = calculateTotalPrice();
    const cartItem = generateCartProduct({
      product,
      data,
      price,
    });
    addItemToCart(cartItem);
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isEditMode && productToEdit) {
      updateCartItem(productToEdit._id, data);
    } else {
      addToCart(data);
    }
  };

  const handleProductChange = (selectedProductId: string) => {
    const selectedProduct = allProducts.find(
      (product) => product._id === selectedProductId
    );
    if (selectedProduct) {
      setProduct(selectedProduct);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchForm = async () => {
      const formRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/product/form/read-form?formId=${product?.formId}`
      );
      const form = await formRes.json();
      setForm(form);
      setIsLoading(false);
    };

    let timeoutId: NodeJS.Timeout;

    if (product?.formId) {
      // Set default product after 0.5s if still loading
      timeoutId = setTimeout(() => {
        if (!form && allProducts.length > 0) {
          setProduct(allProducts[0]);
        }
      }, 500);

      fetchForm();
    }
    return () => clearTimeout(timeoutId);
  }, [product, allProducts, setProduct]);

  useEffect(() => {
    if (!isEditMode && product && form) {
      reset({
        wordCount: product?.minimumWords,
        quantity: product?.minimumQuantity,
        additionalInfo: '',
      });
    }
  }, [isEditMode, product, form, reset]);

  useEffect(() => {
    if (isEditMode && productToEdit) {
      reset({
        wordCount: productToEdit.wordCount,
        quantity: productToEdit.quantity,
        additionalInfo: productToEdit.additionalInfo,
      });
    }
  }, [isEditMode, productToEdit, reset]);

  // Initial product setup
  useEffect(() => {
    if (!product && allProducts.length > 0) {
      setProduct(allProducts[0]);
    }
  }, [product, allProducts, setProduct]);

  if (isLoading || !product || !form) {
    return <ProductFormSkeleton />;
  }

  const ErrorMessage = ({ name, errors }: { name: string; errors: any }) => {
    if (errors[name]) {
      return (
        <p className="mt-1 text-sm text-red-500">
          {'This field is required'}
          {/* {String(errors[name]?.message)} */}
        </p>
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
                  options={allProducts.map((product) => ({
                    value: product._id,
                    label: product.name,
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
              {form?.form?.fields.map((field) => (
                <div key={field.name} className="flex-1">
                  <Title
                    className={cn(
                      `mb-2 block font-poppins text-[16px] font-semibold text-[#515151]`
                    )}
                  >
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </Title>

                  {/* Render Textarea for 'textarea' type */}
                  {field.type === 'textarea' && (
                    <>
                      <Textarea
                        placeholder={field.placeholder}
                        {...register(field.name)}
                        className={cn(`w-full`)}
                        textareaClassName={cn(`text-base`)}
                        variant="flat"
                        required={field.required}
                        disabled={
                          (field.name === 'quantity' ||
                            field.name === 'wordCount') &&
                          product?.isFreeProduct
                        }
                      />
                      <ErrorMessage name={field.name} errors={errors} />
                    </>
                  )}

                  {/* Render Select for 'select' type */}
                  {field.type === 'select' && (
                    <>
                      <Controller
                        name={field.name}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            options={field.options || []}
                            placeholder={field.placeholder}
                            value={
                              field.options?.find(
                                (option) => option.value === value
                              ) || ''
                            } // Set the selected value
                            onChange={(selectedOption: { value: number }) => {
                              onChange(selectedOption.value); // Update the form value
                            }}
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

                  {/* Render Input for other types */}
                  {field.type !== 'textarea' && field.type !== 'select' && (
                    <>
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
                          product?.isFreeProduct
                        }
                      />
                      <ErrorMessage name={field.name} errors={errors} />
                    </>
                  )}
                </div>
              ))}

              <div className={cn(`flex flex-col gap-5 sm:flex-row sm:gap-10`)}>
                <Button
                  title={isEditMode ? 'Update Product' : 'Add To Cart'}
                  className="flex w-full justify-center bg-[#1B5A96] md:w-1/2"
                  svgInnerClassName="!text-[#1B5A96]"
                  svgClassName="bg-white"
                  textClassName="text-white"
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

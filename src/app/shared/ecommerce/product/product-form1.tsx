'use client';

import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
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
import { useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import {
  contentProductsAtom,
  selectedContentProductAtom,
} from '@/store/atoms/selectedContentProductAtom';

export const ProductForm = () => {
  const { addItemToCart } = useCart();
  const { data: session } = useSession();
  const [product, setProduct] = useAtom(selectedContentProductAtom);
  const [allProducts] = useAtom(contentProductsAtom);
  const [form, setForm] = useState<DynamicFormTypes>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  console.log('All Products : ', allProducts);
  // Generate schema based on form fields
  const formSchema = product
    ? generateFormSchema(form?.form?.fields ?? [], product)
    : undefined;

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    resolver: formSchema ? zodResolver(formSchema) : undefined,
    defaultValues: {
      wordCount: product?.minimumWords,
      quantity: product?.minimumQuantity,
      additionalInfo: '',
    },
  });

  const { handleSubmit, register, formState, watch, reset } = methods;
  const { errors } = formState;

  const watchedFields = watch();

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
    addToCart(data);
  };

  const handleProductChange = (selectedProductId: string) => {
    const selectedProduct = allProducts.find(
      (product) => product._id === selectedProductId
    );
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
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
                    src={product?.featuredImage ?? ''}
                    alt={'icon'}
                    fill
                    priority
                    className="h-full w-full p-3"
                  />
                </figure>
                <Title
                  as="h4"
                  className={cn(`font-poppins text-[22px] font-semibold`)}
                >
                  {product?.name}
                </Title>
              </div>
              <Select
                label="Products"
                options={allProducts.map((product) => ({
                  value: product._id,
                  label: product.name,
                }))}
                onChange={(selectedOption: any) =>
                  handleProductChange(selectedOption.value)
                }
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

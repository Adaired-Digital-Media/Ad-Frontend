'use client';
import { useAtom } from 'jotai';
import { Product } from '@/types';
import { selectedContentProductAtom } from '@/store/atoms/selectedContentProductAtom';

export const useProductAction = () => {
  const [, setProduct] = useAtom(selectedContentProductAtom);

  // Centralized function to update the product
  const updateProduct = (product: Product | null) => {
    setProduct(product);
  };

  return { updateProduct };
};

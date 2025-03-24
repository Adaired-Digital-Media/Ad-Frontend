import { Product } from '@/types';
import { atomWithStorage } from 'jotai/utils';

export const selectedContentProductAtom = atomWithStorage<Product | null>(
  'selectedContentProductAtom',
  null
);

export const selectedContentProductFormAtom = atomWithStorage(
  'selectedContentProductFormAtom',
  {}
);

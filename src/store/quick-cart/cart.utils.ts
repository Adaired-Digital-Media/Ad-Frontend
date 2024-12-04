import { CartItem as Item } from '@/types';

export function addItem(cartItems: Item[], item: Item) {
  return [...cartItems, item];
}

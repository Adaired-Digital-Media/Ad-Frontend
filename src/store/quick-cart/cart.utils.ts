import { CartItem as Item } from '@/types';


export function addItem(cartItems: Item[], item: Item) {
  return [...cartItems, item];
}

export function updateQuantity(
  cartItems: Item[],
  productEntryId: string,
  action: 'INCREMENT' | 'DECREMENT'
) {
  return cartItems.map((item) => {
    if (item._id === productEntryId) {
      return {
        ...item,
        quantity:
          action === 'INCREMENT' ? item.quantity + 1 : item.quantity - 1,
      };
    }
    return item;
  });
}

export function removeItem(cartItems: Item[], productEntryId: string) {
  return cartItems.filter((item) => item._id !== productEntryId);
}

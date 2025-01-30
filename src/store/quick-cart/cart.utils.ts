import { CartItem as Item } from '@/types';

export function addItem(products: Item[], item: Item): Item[] {
  return [...products, item];
}

export function removeItem(cartItems: Item[], cartItemId: string): Item[] {
  return cartItems.filter((item) => item._id !== cartItemId);
}

export function updateItem(
  cartItems: Item[],
  cartItemId: string,
  updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
): Item[] {
  return cartItems.map((item) => {
    if (item._id === cartItemId) {
      let newQuantity = item.quantity;

      // Handle quantity updates if `action` is provided
      if (updates.action) {
        newQuantity =
          updates.action === 'INCREMENT'
            ? item.quantity + 1
            : Math.max(item.quantity - 1, 0);
      }

      // Merge the updates into the item
      return {
        ...item,
        quantity: newQuantity,
      };
    }
    return item;
  });
}

export function emptyCart(): Item[] {
  return [];
}

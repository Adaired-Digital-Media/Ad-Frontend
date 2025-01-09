import { CartItem as Item } from '@/types';

// export function addItem(cartItems: Item[], item: Item) {
//   return [...cartItems, item];
// }

export function addItem(cartItems: Item[], item: Item) {
  // Check if the item's slug includes "free"
  if (item.productSlug.includes('free')) {
    // Check if there's already an item with the same slug in the cart
    const isFreeItemAlreadyInCart = cartItems.some(
      (cartItem) => cartItem.productSlug === item.productSlug
    );

    if (isFreeItemAlreadyInCart) {
      // If the free item already exists, return the cart as-is
      return cartItems;
    }
  }

  // Add the item to the cart and return the updated cart
  return [...cartItems, item];
}

export function updateQuantity(
  cartItems: Item[],
  productEntryId: string,
  action: 'INCREMENT' | 'DECREMENT'
) {
  return cartItems.map((item) => {
    if (item._id === productEntryId) {
      const newQuantity =
        action === 'INCREMENT'
          ? item.quantity + 1
          : Math.max(item.quantity - 1, 0);
      return {
        ...item,
        quantity: newQuantity,
      };
    }
    return item;
  });
}

export function updateDetails(
  cartItems: Item[],
  productEntryId: string,
  details: Partial<Item>
) {
  return cartItems.map((item) => {
    if (item._id === productEntryId) {
      return {
        ...item,
        ...details,
      };
    }
    return item;
  });
}

export function removeItem(cartItems: Item[], productEntryId: string) {
  return cartItems.filter((item) => item._id !== productEntryId);
}

import { CartItem as Item } from '@/types';
export function addItem(cartItems: Item[], item: Item) {
  const isFreeProduct = item.isFreeProduct;
  console.log(isFreeProduct)

  // If the item is a free product, check if it already exists in the cart
  if (isFreeProduct) {
    const freeProductExists = cartItems.some((cartItem) => {
      return cartItem.isFreeProduct;
    });

    if (freeProductExists) {
      return cartItems;
    }
  }
  // Otherwise, add the item to the cart and return the updated cart
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

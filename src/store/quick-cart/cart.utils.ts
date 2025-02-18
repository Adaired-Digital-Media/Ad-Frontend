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

      // Update quantity based on action
      if (updates.action) {
        newQuantity =
          updates.action === 'INCREMENT'
            ? item.quantity + 1
            : Math.max(item.quantity - 1, 0);
      }

      const { action, ...otherUpdates } = updates;

      return {
        ...item,
        ...otherUpdates,
        quantity: otherUpdates.quantity ?? newQuantity, // Use provided quantity if available
      };
    }
    return item;
  });
}

// cartItems.map((item) => {
//   if (item._id === cartItemId) {
//     console.log('Item : ', item);
//     let newQuantity = item.quantity;
//     console.log(newQuantity);

//     // Handle quantity updates if `action` is provided
//     if (updates.action) {
//       newQuantity =
//         updates.action === 'INCREMENT'
//           ? item.quantity + 1
//           : Math.max(item.quantity - 1, 0);
//     }

//     // Destructure to remove the action property from updates
//     const { action, ...otherUpdates } = updates;

//     // Merge the updates into the item, overriding quantity with newQuantity
//     return {
//       ...item,
//       ...otherUpdates,
//       quantity: newQuantity,
//     };
//   }
//   return item;
// });
// }

export function emptyCart(): Item[] {
  return [];
}

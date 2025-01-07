import { CartItem as Item } from '@/types';
import { addItem, updateQuantity, removeItem } from './cart.utils';

type Action =
  | { type: 'ADD_ITEM'; item: Item }
  | { type: 'INITIALIZE_CART'; payload: Item[] }
  | {
      type: 'UPDATE_QUANTITY';
      productEntryId: string;
      action: 'INCREMENT' | 'DECREMENT';
    }
  | { type: 'REMOVE_ITEM'; productEntryId: string };

export interface State {
  cartItems: Item[];
}

export const initialState: State = {
  cartItems: [],
};

const updateItemTotalPrice = (items: Item[]) => {
  return items.map((item) => ({
    ...item,

    // totalPrice: item.pricePerUnit * item.quantity,
    totalPrice: item.wordCount
      ? (item.wordCount / 100) * item.pricePerUnit * item.quantity
      : item.pricePerUnit * item.quantity,
  }));
};

export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      const items = addItem(state.cartItems, action.item);
      const updatedItems = updateItemTotalPrice(items);
      return {
        ...state,
        cartItems: updatedItems,
      };
    }
    case 'INITIALIZE_CART': {
      const updatedItems = updateItemTotalPrice(action.payload);
      return {
        ...state,
        cartItems: updatedItems,
      };
    }
    case 'UPDATE_QUANTITY': {
      const items = updateQuantity(
        state.cartItems,
        action.productEntryId,
        action.action
      );
      const updatedItems = updateItemTotalPrice(items);
      return {
        ...state,
        cartItems: updatedItems,
      };
    }
    case 'REMOVE_ITEM': {
      const items = removeItem(state.cartItems, action.productEntryId);
      const updatedItems = updateItemTotalPrice(items);
      return {
        ...state,
        cartItems: updatedItems,
      };
    }
    default:
      return state;
  }
}

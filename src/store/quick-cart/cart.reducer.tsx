import { CartItem as Item } from '@/types';
import { addItem, updateItem, removeItem, emptyCart } from './cart.utils';

export interface State {
  products: Item[];
}

type Action =
  | { type: 'ADD_ITEM'; item: Item }
  | { type: 'INITIALIZE_CART'; payload: Item[] }
  | {
      type: 'UPDATE_ITEM';
      cartItemId: string;
      updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' };
      callback: (newState: State) => void;
    }
  | { type: 'REMOVE_ITEM'; cartItemId: string }
  | { type: 'EMPTY_CART' };

export const initialState: State = {
  products: [],
};

const updateItemTotalPrice = (items: Item[]) => {
  return items.map((item) => ({
    ...item,
    totalPrice: item.wordCount
      ? (item.wordCount / 100) * item.product.pricePerUnit * item.quantity
      : item.product.pricePerUnit * item.quantity,
  }));
};

export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      const items = addItem(state.products, action.item);
      const updatedItems = updateItemTotalPrice(items);
      return {
        ...state,
        products: updatedItems,
      };
    }
    case 'INITIALIZE_CART': {
      const updatedItems = updateItemTotalPrice(action.payload);
      return {
        ...state,
        products: updatedItems,
      };
    }
    case 'UPDATE_ITEM': {
      const items = updateItem(
        state.products,
        action.cartItemId,
        action.updates
      );
      const updatedItems = updateItemTotalPrice(items);
      const newState = { ...state, products: updatedItems };
      // Execute the callback (if provided) with the new state
      if (action.callback) {
        action.callback(newState);
      }
      return newState;
    }
    case 'REMOVE_ITEM': {
      const items = removeItem(state.products, action.cartItemId);
      const updatedItems = updateItemTotalPrice(items);
      return {
        ...state,
        products: updatedItems,
      };
    }
    case 'EMPTY_CART': {
      return {
        ...state,
        products: emptyCart(),
      };
    }
    default:
      return state;
  }
}

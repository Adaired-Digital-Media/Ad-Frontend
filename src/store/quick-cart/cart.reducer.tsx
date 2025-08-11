
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

const calculateTotalPrice = (item: Item): number => {
  const price = item.wordCount
    ? (item.wordCount / 100) * item.product.pricePerUnit * item.quantity
    : item.product.pricePerUnit * item.quantity;
  return Math.round(price * 100) / 100;
};

export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = { ...action.item, totalPrice: calculateTotalPrice(action.item) };
      return { ...state, products: addItem(state.products, newItem) };
    }
    case 'INITIALIZE_CART': {
      const updatedProducts = action.payload.map((item) => ({
        ...item,
        totalPrice: calculateTotalPrice(item),
      }));
      return { ...state, products: updatedProducts };
    }
    case 'UPDATE_ITEM': {
      const updatedProducts = updateItem(state.products, action.cartItemId, action.updates);
      const newProducts = updatedProducts.map((item) => ({
        ...item,
        totalPrice: calculateTotalPrice(item),
      }));
      const newState = { ...state, products: newProducts };
      action.callback?.(newState);
      return newState;
    }
    case 'REMOVE_ITEM': {
      return { ...state, products: removeItem(state.products, action.cartItemId) };
    }
    case 'EMPTY_CART': {
      return { ...state, products: emptyCart() };
    }
    default:
      return state;
  }
}
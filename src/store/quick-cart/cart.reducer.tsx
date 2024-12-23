import { CartItem as Item } from '@/types';
import { addItem } from './cart.utils';

type Action =
  | { type: 'ADD_ITEM'; item: Item }
  | { type: 'INITIALIZE_CART'; payload: Item[] }
  | { type: 'INCREASE_QUANTITY'; itemId: string }
  | { type: 'DECREASE_QUANTITY'; itemId: string };
export interface State {
  cartItems: Item[];
}

export const initialState: State = {
  cartItems: [],
};

export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      const items = addItem(state.cartItems, action.item);
      return {
        ...state,
        cartItems: items,
      };
    }
    case 'INITIALIZE_CART': {
      return {
        ...state,
        cartItems: action.payload,
      };
    }
    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    default:
      return state;
  }
}
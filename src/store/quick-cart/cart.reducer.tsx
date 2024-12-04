import { CartItem as Item } from '@/types';
import { addItem } from './cart.utils';

type Action = { type: 'ADD_ITEM'; item: Item };

export interface State {
  cartItems: Item[];
}

export const initialState: State = {
  cartItems: [],
};

export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM':
      const items = addItem(state.cartItems, action.item);
      return {
        ...state,
        cartItems: items,
      };
    default:
      return state;
  }
}


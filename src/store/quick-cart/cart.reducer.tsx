// import { CartItem as Item } from '@/types';
// import { addItem } from './cart.utils';

// type Action = { type: 'ADD_ITEM'; item: Item };

// export interface State {
//   cartItems: Item[];
// }

// export const initialState: State = {
//   cartItems: [],
// };

// export function cartReducer(state: State, action: Action): State {
//   switch (action.type) {
//     case 'ADD_ITEM':
//       const items = addItem(state.cartItems, action.item);
//       return {
//         ...state,
//         cartItems: items,
//       };
//     default:
//       return state;
//   }
// }

import { CartItem as Item } from '@/types';
import { addItem } from './cart.utils';

type Action =
  | { type: 'ADD_ITEM'; item: Item }
  | { type: 'INITIALIZE_CART'; payload: Item[] };

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
        cartItems: action.payload, // Replace cart items with fetched products
      };
    }
    default:
      return state;
  }
}

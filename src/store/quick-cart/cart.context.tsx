'use client';

import {
  useMemo,
  useEffect,
  useReducer,
  useContext,
  useCallback,
  createContext,
} from 'react';
import { useAtom } from 'jotai';
import { cartReducer, State, initialState } from './cart.reducer';
import { useLocalStorage } from '@core/hooks/use-local-storage';
import { CART_KEY } from '@/config/constants';
import { CartItem as Item } from '@/types';

interface CartProviderState extends State {
  addItemToCart: (cartItem: Item) => void;
}

export const cartContext = createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return useMemo(() => context, [context]);
};

export function CartProvider({
  cartKey,
  children,
  ...props
}: {
  cartKey?: string;
  children: React.ReactNode;
}) {
  
  const [savedCart, saveCart] = useLocalStorage(
    cartKey ?? CART_KEY,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    cartReducer,
    (savedCart ? JSON.parse(savedCart) : initialState) as State
  );
  useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Item) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
    }),
    [state]
  );

  return (
    <cartContext.Provider value={value} {...props}>
      {children}
    </cartContext.Provider>
  );
}

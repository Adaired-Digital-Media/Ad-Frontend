'use client';

import {
  useMemo,
  useReducer,
  useContext,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { useLocalStorage } from '@core/hooks/use-local-storage';
import { CART_KEY } from '@/config/constants';
import { CartItem as Item } from '@/types';
import { useSession } from 'next-auth/react';
import { useCartAPI } from '@core/hooks/useCartAPI';
import axios from 'axios';

interface CartProviderState extends State {
  addItemToCart: (cartItem: Item) => void;
  updateCartItem: (
    cartItemId: string,
    updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
  ) => void;
  removeCartItem: (cartItemId: string) => void;
  emptyCart: () => void;
}

const cartContext = createContext<CartProviderState | null>(null);
cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export function CartProvider({
  cartKey = CART_KEY,
  children,
  ...props
}: {
  cartKey?: string;
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [savedCart, saveCart] = useLocalStorage(
    cartKey ?? CART_KEY,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    cartReducer,
    JSON.parse(savedCart || JSON.stringify(initialState))
  );

  const {
    handleApiError,
    sendCartToBackend,
    updateCartItemInBackend,
    removeCartItemFromBackend,
    emptyCartInBackend,
  } = useCartAPI();

  // Ref to track if the cart has been synced with the backend
  const hasSyncedCart = useRef(false);

  // ******************** Save Cart to Local Storage (Guest Users) *********************
  useEffect(() => {
    if (!session) {
      saveCart(JSON.stringify(state));
    }
  }, [state, session, saveCart]);

  // ******************** Fetch User Cart if User is Logged in *************************
  useEffect(() => {
    if (session?.user?.accessToken) {
      const fetchUserCart = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/get-user-cart`,
            {
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            const { cart } = response.data;
            const backendCartItems = cart.products || [];
            dispatch({ type: 'INITIALIZE_CART', payload: backendCartItems });
          }
        } catch (error) {
          handleApiError(error);
        }
      };
      fetchUserCart();
    }
  }, [session]);

  // ******************** Sync Local Cart (Logged-In Users) *********************
  useEffect(() => {
    if (session?.user?.accessToken && !hasSyncedCart.current) {
      const syncCart = async () => {
        try {
          const savedCartFromStorage = JSON.parse(savedCart || '{}');
          const hasSavedItems = savedCartFromStorage?.products?.length > 0;

          if (hasSavedItems) {
            const backendCartItems = await sendCartToBackend(
              savedCartFromStorage?.products,
              `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
            );
            dispatch({
              type: 'INITIALIZE_CART',
              payload: backendCartItems.products,
            });
          }
          hasSyncedCart.current = true;
          saveCart(JSON.stringify(initialState));
        } catch (error) {
          handleApiError(error);
        }
      };

      syncCart();
    }
  }, [session]);

  // ******************** Add Item to Cart *********************
  const addItemToCart = useCallback(
    async (item: Item) => {
      const updatedItem = { ...item };

      if (session) {
        try {
          // Sync with the backend
          const response = await sendCartToBackend(
            [updatedItem],
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
          );
          // Update the local state with the response from the backend
          dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
        } catch (error) {
          // Rollback the local state if the API call fails
          dispatch({ type: 'REMOVE_ITEM', cartItemId: updatedItem._id });
          handleApiError(error);
        }
      } else {
        // Optimistically update the local state
        dispatch({ type: 'ADD_ITEM', item: updatedItem });
      }
    },
    [session, sendCartToBackend, handleApiError]
  );

  // ******************** Update Cart Item *********************
  const [updatedItem, setUpdatedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (updatedItem) {
      updateCartItemInBackend({
        cartItemId: updatedItem._id,
        quantity: updatedItem.quantity,
        wordCount: updatedItem.wordCount,
        additionalInfo: updatedItem.additionalInfo,
        totalPrice: updatedItem.totalPrice,
      }).catch((error) => {
        handleApiError(error);
      });
    }
  }, [updatedItem]);

  const updateCartItem = useCallback(
    async (
      cartItemId: string,
      updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
    ) => {
      dispatch({
        type: 'UPDATE_ITEM',
        cartItemId,
        updates,
        callback: (newState: State) => {
          // Find the updated item in the new state
          const updatedItem = newState.products.find(
            (item) => item._id === cartItemId
          );
          if (
            session &&
            updatedItem &&
            updatedItem !==
              state.products.find((item) => item._id === cartItemId)
          ) {
            setUpdatedItem(updatedItem);
          }
        },
      });
    },
    [session?.user?.accessToken]
  );

  // ******************** Remove Cart Item *********************
  const removeCartItem = useCallback(
    async (cartItemId: string) => {
      if (session) {
        try {
          // Sync with the backend
          const response = await removeCartItemFromBackend(cartItemId);
          // Update the local state with the response from the backend
          dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
        } catch (error) {
          // Rollback the local state if the API call fails
          const removedItem = state.products.find(
            (item) => item._id === cartItemId
          );
          if (removedItem) {
            dispatch({ type: 'ADD_ITEM', item: removedItem });
          }
          handleApiError(error);
        }
      } else {
        // Optimistically update the local state
        dispatch({ type: 'REMOVE_ITEM', cartItemId: cartItemId });
      }
    },
    [session, removeCartItemFromBackend, state.products, handleApiError]
  );

  // ******************** Empty Cart *********************
  const emptyCart = useCallback(async () => {
    if (session) {
      try {
        // Sync with the backend
        const response = await emptyCartInBackend();
        // Update the local state with the response from the backend
        dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
      } catch (error) {
        // Rollback the local state if the API call fails
        dispatch({ type: 'INITIALIZE_CART', payload: state.products });
        handleApiError(error);
      }
    } else {
      // Optimistically update the local state
      dispatch({ type: 'EMPTY_CART' });
    }
  }, [session, emptyCartInBackend, state.products, handleApiError]);

  // ******************** Memoized Context Value *********************
  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
      updateCartItem,
      removeCartItem,
      emptyCart,
    }),
    [state, addItemToCart, updateCartItem, removeCartItem, emptyCart]
  );

  return (
    <cartContext.Provider value={value} {...props}>
      {children}
    </cartContext.Provider>
  );
}

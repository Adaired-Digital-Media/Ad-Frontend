'use client';

import {
  useMemo,
  useEffect,
  useReducer,
  useContext,
  useCallback,
  useState,
  createContext,
} from 'react';
import debounce from 'lodash/debounce';
import { cartReducer, State, initialState } from './cart.reducer';
import { useLocalStorage } from '@core/hooks/use-local-storage';
import { CART_KEY } from '@/config/constants';
import { CartItem as Item, UpdateCartItem } from '@/types';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface CartProviderState extends State {
  addItemToCart: (cartItem: Item) => void;
  increaseQuantity: (productEntryId: string) => void;
  decreaseQuantity: (productEntryId: string) => void;
  removeItemFromCart: (productEntryId: string) => void;
  isLoading: boolean;
}

const cartContext = createContext<CartProviderState>({
  ...initialState,
  addItemToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeItemFromCart: () => {},
  isLoading: false,
});
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
  let tempUserId: string | null = null;
  if (typeof window !== 'undefined') {
    tempUserId = localStorage.getItem('tempUserId');
  }

  const { data: session } = useSession();
  const [savedCart, saveCart] = useLocalStorage(
    cartKey ?? CART_KEY,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    cartReducer,
    JSON.parse(savedCart || JSON.stringify(initialState))
  );

  const [pendingItems, setPendingItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserCart = useCallback(async () => {
    if (!session?.user?._id || !session?.user?.accessToken) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/get-user-cart?customerId=${session.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;
        dispatch({ type: 'INITIALIZE_CART', payload: data.products || [] });
      } else if (response.status === 404) {
        console.log("User's cart does not exist yet.");
      }
    } catch (error: any) {
      console.error('Failed to fetch user cart:', error.response.data.message);
    }
  }, [session]);

  const addItemToCart = (item: Item) => {
    const updatedItem = { ...item };
    dispatch({ type: 'ADD_ITEM', item: updatedItem });
    setPendingItems((prev) => [...prev, updatedItem]);
  };

  const increaseQuantity = (productEntryId: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productEntryId, action: 'INCREMENT' });
  };

  const decreaseQuantity = (productEntryId: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productEntryId, action: 'DECREMENT' });
  };

  const removeItemFromCart = (productEntryId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productEntryId });
  };

  const sendCartInJunkCarts = useCallback(async (items: Item[]) => {
    if (items.length === 0) return;
    try {
      const payload = {
        userId: tempUserId,
        cartItems: items.map((item) => ({
          productId: item?.productId,
          category: item?.category,
          productName: item?.productName,
          productImage: item?.productImage,
          wordCount: item?.wordCount,
          quantity: item?.quantity,
          additionalInfo: item?.additionalInfo,
          name: item?.name,
          email: item?.email,
          phone: item?.phone,
          pricePerUnit: item?.pricePerUnit,
          totalPrice: item?.totalPrice,
        })),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/junk-cart/leads/add-product-or-sync-cart`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        tempUserId = response.data.data.userId;
        if (tempUserId) {
          localStorage.setItem('tempUserId', tempUserId);
        }
      }
      return response.data.data.products;
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  }, []);

  const sendCartWithBackend = useCallback(
    debounce(async (items: Item[]) => {
      if (items.length === 0) return;
      console.log('Called backend');
      setIsLoading(true);
      try {
        if (session?.user?.accessToken) {
          const payload = {
            cartItems: items.map((item) => ({
              productId: item?.productId,
              category: item?.category,
              productName: item?.productName,
              productImage: item?.productImage,
              wordCount: item?.wordCount,
              quantity: item?.quantity,
              additionalInfo: item?.additionalInfo,
              name: item?.name,
              email: item?.email,
              phone: item?.phone,
              pricePerUnit: item?.pricePerUnit,
              totalPrice: item?.totalPrice,
            })),
          };

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            }
          );

          if (response.status !== 200) {
            console.error(
              'Failed to sync cart with backend:',
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error('Error syncing cart with backend:', error);
      } finally {
        setIsLoading(false);
      }
    }, 100),
    [session]
  );

  useEffect(() => {
    return () => {
      sendCartWithBackend.cancel();
    };
  }, [sendCartWithBackend]);

  useEffect(() => {
    if (session) {
      // Fetch the user's cart when they log in
      fetchUserCart();
    }
  }, [session, fetchUserCart]);

  useEffect(() => {
    const initializeCart = async () => {
      if (!session) {
        if (pendingItems.length > 0) {
          const products = await sendCartInJunkCarts(pendingItems);
          if (products) {
            dispatch({ type: 'INITIALIZE_CART', payload: products });
          }
          setPendingItems([]);
        }
        saveCart(JSON.stringify(state));
      } else {
        localStorage.removeItem('tempUserId');
        const savedCartFromStorage = JSON.parse(savedCart || '{}');
        const hasSavedItems = savedCartFromStorage?.cartItems?.length > 0;
        const hasPendingItems = pendingItems.length > 0;

        if (hasSavedItems) {
          await sendCartWithBackend(savedCartFromStorage?.cartItems);
          saveCart(JSON.stringify(initialState));
        } else if (hasPendingItems) {
          await sendCartWithBackend(pendingItems);
          setPendingItems([]);
        }
      }
    };

    initializeCart();
  }, [session, pendingItems, sendCartInJunkCarts, sendCartWithBackend]);

  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItemFromCart,
      isLoading,
    }),
    [state, isLoading]
  );

  return (
    <cartContext.Provider value={value} {...props}>
      {children}
    </cartContext.Provider>
  );
}

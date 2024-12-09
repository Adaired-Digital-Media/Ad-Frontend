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
import { cartReducer, State, initialState } from './cart.reducer';
import { useLocalStorage } from '@core/hooks/use-local-storage';
import { CART_KEY } from '@/config/constants';
import { CartItem as Item } from '@/types';
import { useSession } from 'next-auth/react';

interface CartProviderState extends State {
  addItemToCart: (cartItem: Item) => void;
  isLoading: boolean;
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
  const { data: session } = useSession();

  const [savedCart, saveCart] = useLocalStorage(
    cartKey ?? CART_KEY,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    cartReducer,
    (savedCart ? JSON.parse(savedCart) : initialState) as State
  );

  const [pendingItems, setPendingItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addItemToCart = (item: Item) => {
    dispatch({ type: 'ADD_ITEM', item });
    setPendingItems((prev) => [...prev, item]); // Add item to pendingItems
  };

  const sendCartToBackend = useCallback(
    async (items: Item[]) => {
      if (items.length === 0) return; // Skip if no items to sync

      setIsLoading(true);
      try {
        if (session?.user?.accessToken) {
          // Transform the pending items into the required format
          const payload = {
            cartItems: items.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              wordCount: item.wordCount,
              quantity: item.quantity,
              additionalInfo: item.additionalInfo,
              name: item.name,
              email: item.email,
              phone: item.phone,
              pricePerUnit: item.pricePerUnit,
              totalPrice: item.totalPrice,
              productType: item.productType,
            })),
          };

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URI}/cart/add-product-or-sync-cart`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
              },
              body: JSON.stringify(payload),
            }
          );

          if (!response.ok) {
            console.error(
              'Failed to sync cart with backend:',
              response.statusText
            );
          } else {
            setPendingItems([]);
          }
        }
      } catch (error) {
        console.error('Error syncing cart with backend:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [session]
  );

  useEffect(() => {
    // If the user is logged in, send cart to the backend
    if (session) {
      const savedCartFromStorage = JSON.parse(savedCart || '{}');
      if (
        savedCartFromStorage &&
        Object.keys(savedCartFromStorage).length > 0
      ) {
        sendCartToBackend(savedCartFromStorage.cartItems);
        saveCart(JSON.stringify(initialState)); // Optionally clear cart after sending
      }
    }

    // Only save cart to localStorage if user is not logged in
    if (!session) {
      saveCart(JSON.stringify(state)); // Save cart in localStorage
    }

    sendCartToBackend(pendingItems); // Sync only pending items
  }, [state, saveCart, sendCartToBackend, pendingItems, session, savedCart]);

  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
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

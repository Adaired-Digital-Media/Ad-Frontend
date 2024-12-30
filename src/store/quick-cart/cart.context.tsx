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
import { useLocalStorage } from '../../@core/hooks/use-local-storage';
import { CART_KEY } from '@/config/constants';
import { CartItem as Item, UpdateCartItem } from '@/types';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

interface CartProviderState extends State {
  addItemToCart: (cartItem: Item) => void;
  increaseQuantity: (productEntryId: string) => void;
  decreaseQuantity: (productEntryId: string) => void;
  removeItemFromCart: (productEntryId: string) => void;
  isLoading: boolean;
}

const cartContext = createContext<CartProviderState | undefined>(undefined);
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
  const [pendingItems, setPendingItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Add item to cart
  const addItemToCart = (item: Item) => {
    const updatedItem = { ...item };

    // Add a temporary _id if the user is not logged in
    if (!session) {
      updatedItem._id = uuidv4();
    }

    dispatch({ type: 'ADD_ITEM', item: updatedItem });
    setPendingItems((prev) => [...prev, updatedItem]);
  };

  const sendCartWithBackend = useCallback(
    async (items: Item[]) => {
      if (items.length === 0) return;

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

  const updateCartInBackend = async (updatedItem: UpdateCartItem) => {
    if (!session?.user) return;
    

    try {
      console.log('updatedItem', updatedItem);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/cart/update-cart?userId=${session.user._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (!response.ok) {
        console.error('Failed to update cart in backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating cart in backend:', error);
    }
  };

  const increaseQuantity = (productEntryId: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productEntryId, action: 'INCREMENT' });

    const updatedItem = state.cartItems.find(
      (item) => item._id === productEntryId
    );
    const updatedItemPayload = {
      productEntryId: productEntryId || updatedItem?._id || '',
      productId: updatedItem?.productId || '',
      productName: updatedItem?.productName || undefined,
      productImage: updatedItem?.productImage || undefined,
      wordCount: updatedItem?.wordCount || undefined,
      quantity: updatedItem?.quantity || undefined,
      additionalInfo: updatedItem?.additionalInfo || undefined,
      name: updatedItem?.name || undefined,
      email: updatedItem?.email || undefined,
      phone: updatedItem?.phone || undefined,
      pricePerUnit: updatedItem?.pricePerUnit || undefined,
      totalPrice: updatedItem?.totalPrice || undefined,
    };

    updateCartInBackend(updatedItemPayload);
  };

  const decreaseQuantity = (productEntryId: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productEntryId, action: 'DECREMENT' });
  };

  const removeItemFromCart = (productEntryId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productEntryId });
  };

  // Initialize cart from backend when user logs in
  useEffect(() => {
    if (session) {
      (async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URI}/cart/get-user-cart?customerId=${session.user._id}`,
            {
              headers: { Authorization: `Bearer ${session.user.accessToken}` },
            }
          );
          if (res.ok) {
            const { data } = await res.json();
            dispatch({ type: 'INITIALIZE_CART', payload: data.products });
          }
        } catch (err) {
          console.error('Failed to fetch cart:', err);
        }
      })();
    }
  }, [session]);

  useEffect(() => {
    if (!session) {
      saveCart(JSON.stringify(state));
    } else {
      // If the user is logged in, send cart to the backend
      if (session) {
        const savedCartFromStorage = JSON.parse(savedCart || '{}');
        if (
          savedCartFromStorage &&
          Object.keys(savedCartFromStorage).length > 0
        ) {
          sendCartWithBackend(savedCartFromStorage.cartItems);
          saveCart(JSON.stringify(initialState));
        }
      }
      sendCartWithBackend(pendingItems);
    }
  }, [state, saveCart, sendCartWithBackend, pendingItems, session, savedCart]);

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

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
import { CartItem as Item, UpdateCartItem } from '@/types';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
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
  // Check if the window object exists (client-side)
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
  const [updatingItemId, setUpdatingItemId] = useState<string>();
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

  // Increase Quantity
  const increaseQuantity = (productEntryId: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productEntryId, action: 'INCREMENT' });
    setUpdatingItemId(productEntryId);
  };

  // Decrease Quantity
  const decreaseQuantity = (productEntryId: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productEntryId, action: 'DECREMENT' });
    setUpdatingItemId(productEntryId);
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
          headers: {
            'Content-Type': 'application/json',
          },
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

  const updateJunkCart = async (updatedItem: UpdateCartItem) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/junk-cart/leads/update-cart?userId=${tempUserId}`,
        updatedItem,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Update cart response -> ', response);
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  };

  const sendCartWithBackend = useCallback(async (items: Item[]) => {
    if (items.length === 0) return;

    console.log('Items -> ', items);

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
        } else {
          setPendingItems([]);
        }
      }
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItemFromCart = (productEntryId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productEntryId });
  };

  // Initialize cart from backend when user logs in
  useEffect(() => {
    if (session) {
      (async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/get-user-cart?customerId=${session.user._id}`,
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
    const AddToCart = async () => {
      if (!session) {
        // For guests
        if (pendingItems.length > 0) {
          const products = await sendCartInJunkCarts(pendingItems);
          if (products) {
            dispatch({ type: 'INITIALIZE_CART', payload: products });
          }
          setPendingItems([]);
        }
        saveCart(JSON.stringify(state));
      } else {
        // For logged-in users
        localStorage.removeItem('tempUserId');
        console.log('Saved Cart -> ', savedCart);
        const savedCartFromStorage = JSON.parse(savedCart || '[]');
        if (
          savedCartFromStorage &&
          Object.keys(savedCartFromStorage).length > 0
        ) {
          console.log('Backend pending items 1 -> ', savedCartFromStorage);
          await sendCartWithBackend(savedCartFromStorage);
          saveCart(JSON.stringify(initialState));
        } else if (pendingItems.length > 0) {
          console.log('Backend pending items 2 -> ', pendingItems);
          await sendCartWithBackend(pendingItems);
        }
      }
    };

    AddToCart();
  }, [session, pendingItems]);

  useEffect(() => {
    if (updatingItemId) {
      try {
        const updatedItem = state.cartItems.find(
          (item) => item._id === updatingItemId
        );

        const updatedItemPayload = {
          productEntryId: updatingItemId || updatedItem?._id || '',
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

        if (tempUserId) {
          updateJunkCart(updatedItemPayload);
          saveCart(JSON.stringify(state));
        }
      } catch (error) {
        console.error('Something went wrong while updating cart -> ', error);
      }
    }
  }, [updatingItemId, state]);

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

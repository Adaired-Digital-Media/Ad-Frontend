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
  const { data: session } = useSession();
  const [savedCart, saveCart] = useLocalStorage(
    cartKey ?? CART_KEY,
    JSON.stringify(initialState)
  );
  const [tempUserId, setTempUserId] = useLocalStorage<string | null>('tempUserId', null);

  // Only access localStorage on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage?.getItem('tempUserId');
     if(userId !== null && userId !== '' && userId !== undefined) {
       setTempUserId(userId);
     }
    }
  }, []);

  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    cartReducer,
    JSON.parse(savedCart || JSON.stringify(initialState))
  );
  const [pendingItems, setPendingItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Add item to cart
  const addItemToCart = (item: Item) => {
    const updatedItem = { ...item };

    // // Add a temporary _id if the user is not logged in
    // if (!session) {
    //   updatedItem._id = uuidv4();
    // }

    dispatch({ type: 'ADD_ITEM', item: updatedItem });
    setPendingItems((prev) => [...prev, updatedItem]);
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
        const { guestId } = response.data;
        setTempUserId(guestId);
        setPendingItems([]);
      } else {
        console.error('Failed to sync cart with backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  }, []);

  // const updateCartInJunkCarts = useCallback(
  //   async (updatedItem: UpdateCartItem) => {
  //     try {
  //       const response = await axios.patch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/junk-cart/leads/update-cart?userId=${localStorage.getItem('tempUserId')}`,
  //         updatedItem,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       if (response.status !== 200) {
  //         console.error('Failed to update cart:', response.statusText);
  //       }
  //     } catch (error: any) {
  //       if (error.response) {
  //         // Server responded with a status other than 200 range
  //         console.error('Server error:', error.response.data);
  //       } else if (error.request) {
  //         // Request was made but no response received
  //         console.error('Network error:', error.request);
  //       } else {
  //         // Something else happened while setting up the request
  //         console.error('Error:', error.message);
  //       }
  //     }
  //   },
  //   []
  // );

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
    },
    [session]
  );

  // const updateCartInBackend = async (updatedItem: UpdateCartItem) => {
  //   if (!session?.user) return;

  //   try {
  //     const response = await axios.patch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/update-cart?userId=${session.user._id}`,
  //       updatedItem,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${session.user.accessToken}`,
  //         },
  //       }
  //     );

  //     if (response.status !== 200) {
  //       console.error('Failed to update cart in backend:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error updating cart in backend:', error);
  //   }
  // };

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
    if (session) {
      updateCartInBackend(updatedItemPayload);
    } else {
      updateCartInJunkCarts(updatedItemPayload);
    }
  };

  const decreaseQuantity = (productEntryId: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productEntryId, action: 'DECREMENT' });
  };

  const removeItemFromCart = (productEntryId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productEntryId });
  };

  useEffect(() => {
    if (tempUserId !== null && tempUserId !== '' && tempUserId !== undefined) {
      const fetchCart = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/junk-cart/leads/get-user-cart?tempUserId=${tempUserId}`,
            { headers: { 'Content-Type': 'application/json' } }
          );
          if (res.status === 200 && res.data.data.products) {
            const { data } = res.data;
            dispatch({
              type: 'INITIALIZE_CART',
              payload: data.products,
            });
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };

      fetchCart();
    }
  }, [tempUserId]);

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
    const handleCartSync = async () => {
      if (!session) {
        // For guests: Sync the cart to JunkCarts
        if (pendingItems.length > 0) {
          await sendCartInJunkCarts(pendingItems);
          setPendingItems([]);
        }
        saveCart(JSON.stringify(state));
      } else {
        // For logged-in users: Sync the cart to the backend
        const savedCartFromStorage = JSON.parse(savedCart || '{}');
        if (
          savedCartFromStorage &&
          Object.keys(savedCartFromStorage).length > 0
        ) {
          await sendCartWithBackend(savedCartFromStorage.cartItems);
          saveCart(JSON.stringify(initialState));
          setPendingItems([]);
        }
        // if (pendingItems.length > 0) {
        //   await sendCartWithBackend(pendingItems);
        //   setPendingItems([]);
        // }
      }
    };

    handleCartSync();
  }, [
    state,
    session,
    saveCart,
    savedCart,
    pendingItems,
    setTempUserId,
    sendCartWithBackend,
    sendCartInJunkCarts,
  ]);

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

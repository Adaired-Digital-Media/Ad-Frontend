// 'use client';

// import {
//   useMemo,
//   useEffect,
//   useReducer,
//   useContext,
//   useCallback,
//   useState,
//   createContext,
// } from 'react';
// import { cartReducer, State, initialState } from './cart.reducer';
// import { useLocalStorage } from '@core/hooks/use-local-storage';
// import { CART_KEY } from '@/config/constants';
// import { CartItem as Item, UpdateCartItem } from '@/types';
// import { useSession } from 'next-auth/react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// interface CartProviderState extends State {
//   addItemToCart: (cartItem: Item) => void;
//   updateCartItem: (
//     cartItemId: string,
//     updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
//   ) => void;
//   removeCartItem: (cartItemId: string) => void;
//   emptyCart: () => void;
// }

// const cartContext = createContext<CartProviderState | null>(null);
// cartContext.displayName = 'CartContext';

// export const useCart = () => {
//   const context = useContext(cartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export function CartProvider({
//   cartKey = CART_KEY,
//   children,
//   ...props
// }: {
//   cartKey?: string;
//   children: React.ReactNode;
// }) {
//   const { data: session } = useSession();
//   const [savedCart, saveCart] = useLocalStorage(
//     cartKey ?? CART_KEY,
//     JSON.stringify(initialState)
//   );
//   const [state, dispatch] = useReducer<React.Reducer<State, any>>(
//     cartReducer,
//     JSON.parse(savedCart || JSON.stringify(initialState))
//   );
//   const [pendingItems, setPendingItems] = useState<Item[]>([]);
//   const [updatingItemId, setUpdatingItemId] = useState<string>();
//   const [deletingItemId, setDeletingItem] = useState<string>();

//   // ******************** Actions ***********************************

//   const addItemToCart = (item: Item) => {
//     const updatedItem = { ...item };
//     dispatch({ type: 'ADD_ITEM', item: updatedItem });
//     setPendingItems((prev) => [...prev, updatedItem]);
//   };

//   const updateCartItem = (
//     cartItemId: string,
//     updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
//   ) => {
//     dispatch({ type: 'UPDATE_ITEM', productEntryId, updates });
//     setUpdatingItemId(productEntryId);
//   };

//   const removeCartItem = (cartItemId: string) => {
//     dispatch({ type: 'REMOVE_ITEM', productEntryId });
//     setDeletingItem(productEntryId);
//   };

//   const emptyCart = () => {
//     dispatch({ type: 'EMPTY_CART' });
//     saveCart(JSON.stringify(initialState));
//   };

//   // ******************** API Functions ******************************

//   const handleApiError = (error: any) => {
//     toast.error(error.response?.data?.message || 'An error occurred');
//     console.error('API Error:', error);
//   };

//   const sendCartToBackend = useCallback(
//     async (items: Item[], endpoint: string, headers: any) => {
//       if (items.length === 0) return;
//       try {
//         const payload = {
//           products: items.map((item) => ({
//             product: item.product,
//             wordCount: item.wordCount,
//             quantity: item.quantity,
//             additionalInfo: item.additionalInfo,
//             totalPrice: item.totalPrice,
//           })),
//         };

//         const response = await axios.post(endpoint, payload, { headers });

//         if (response.status === 200) {
//           toast.success(response.data.message);
//           return response.data.data.products;
//         }
//       } catch (error) {
//         handleApiError(error);
//       }
//     },
//     [session]
//   );

//   const updateCartItemInBackend = useCallback(
//     async (updatedItem: UpdateCartItem) => {
//       try {
//         const response = await axios.patch(
//           `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/update-cart`,
//           updatedItem,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${session?.user?.accessToken}`,
//             },
//           }
//         );
//         return response.data;
//       } catch (error) {
//         handleApiError(error);
//       }
//     },
//     [session]
//   );

//   const removeCartItemFromBackend = useCallback(
//     async (cartItemId: string) => {
//       try {
//         const response = await axios.delete(
//           `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/delete-product?cartItemId=${cartItemId}`,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${session?.user?.accessToken}`,
//             },
//           }
//         );
//         if (response.status === 200) {
//           saveCart(JSON.stringify(state));
//         }
//       } catch (error) {
//         handleApiError(error);
//       }
//     },
//     [state, saveCart, session]
//   );

//   const emptyCartInBackend = useCallback(async () => {
//     try {
//       const response = await axios.delete(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/empty-cart`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${session?.user?.accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         saveCart(JSON.stringify(initialState));
//       }
//     } catch (error) {
//       handleApiError(error);
//     }
//   }, [session, saveCart]);

//   // ******************** Function Calls ****************************

//   // Fetches User's cart when user logs in
//   const fetchUserCart = useCallback(async () => {
//     if (!session?.user?._id || !session?.user?.accessToken) return;

//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/get-user-cart`,
//         {
//           headers: {
//             Authorization: `Bearer ${session.user.accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const { data } = response.data;
//         dispatch({ type: 'INITIALIZE_CART', payload: data.products || [] });
//       }
//     } catch (error) {
//       handleApiError(error);
//     }
//   }, [session]);

//   useEffect(() => {
//     if (session) {
//       fetchUserCart();
//     }
//   }, [session, fetchUserCart]);

//    // Sync cart with backend when session changes
//   useEffect(() => {
//     const initializeCart = async () => {
//       if (!session) {
//         if (pendingItems.length > 0) {
//           saveCart(JSON.stringify(state));
//         }
//       } else {
//         const savedCartFromStorage = JSON.parse(savedCart || '{}');
//         const hasSavedItems = savedCartFromStorage?.cartItems?.length > 0;
//         const hasPendingItems = pendingItems.length > 0;

//         if (hasSavedItems) {
//           await sendCartToBackend(
//             savedCartFromStorage.cartItems,
//             `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`,
//             {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${session.user.accessToken}`,
//             }
//           );
//           saveCart(JSON.stringify(initialState));
//         } else if (hasPendingItems) {
//           await sendCartToBackend(
//             pendingItems,
//             `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`,
//             {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${session.user.accessToken}`,
//             }
//           );
//           setPendingItems([]);
//         }
//       }
//     };

//     initializeCart();
//   }, [session, saveCart, pendingItems, sendCartToBackend]);

//     // Update cart item in backend when quantity or details change
//     useEffect(() => {
//       if (updatingItemId) {
//         const updatedItem = state.products.find(
//           (item) => item._id === updatingItemId
//         );

//         if (updatedItem) {
//           const updatedItemPayload = {
//             cartItemId: updatingItemId,
//             quantity: updatedItem.quantity,
//             wordCount: updatedItem.wordCount,
//             additionalInfo: updatedItem.additionalInfo,
//             totalPrice: updatedItem.totalPrice,
//           };

//           if (session) {
//             updateCartItemInBackend(updatedItemPayload);
//           } else {
//             saveCart(JSON.stringify(state));
//           }
//         }
//       }
//     }, [updatingItemId, state, session, updateCartItemInBackend]);

//   // Remove cart item from backend when deleted
//   useEffect(() => {
//     if (deletingItemId) {
//       if (!session) {
//         saveCart(JSON.stringify(state));
//       } else {
//         removeCartItemFromBackend(deletingItemId);
//       }
//     }
//   }, [deletingItemId, state, session, removeCartItemFromBackend]);

//   const value = useMemo(
//     () => ({
//       ...state,
//       addItemToCart,
//       updateCartItem,
//       removeCartItem,
//       emptyCart,
//     }),
//     [state]
//   );

//   return (
//     <cartContext.Provider value={value} {...props}>
//       {children}
//     </cartContext.Provider>
//   );
// }

'use client';

import {
  useMemo,
  useReducer,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { useLocalStorage } from '@core/hooks/use-local-storage';
import { CART_KEY } from '@/config/constants';
import { CartItem as Item } from '@/types';
import { useSession } from 'next-auth/react';
import { useCartAPI } from '@/hooks/useCartAPI';
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

  // ******************** Save Cart to Local Storage *********************
  useEffect(() => {
    if (!session) {
      saveCart(JSON.stringify(state));
    }
  }, [state, session, saveCart]);

  // ******************** Actions ***********************************

  const addItemToCart = useCallback(
    async (item: Item) => {
      const updatedItem = { ...item };
      dispatch({ type: 'ADD_ITEM', item: updatedItem });

      if (session) {
        await sendCartToBackend(
          [updatedItem],
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
        );
      }
    },
    [session, sendCartToBackend]
  );

  const updateCartItem = useCallback(
    async (
      cartItemId: string,
      updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
    ) => {
      dispatch({ type: 'UPDATE_ITEM', cartItemId, updates });
      if (session) {
        const updatedItem = state.products.find(
          (item) => item._id === cartItemId
        );
        if (updatedItem) {
          await updateCartItemInBackend({
            cartItemId,
            quantity: updatedItem.quantity,
            wordCount: updatedItem.wordCount,
            additionalInfo: updatedItem.additionalInfo,
            totalPrice: updatedItem.totalPrice,
          });
        }
      }
    },
    [session, updateCartItemInBackend, state.products]
  );

  const removeCartItem = useCallback(
    async (cartItemId: string) => {
      dispatch({ type: 'REMOVE_ITEM', cartItemId: cartItemId });

      if (session) {
        await removeCartItemFromBackend(cartItemId);
      }
    },
    [session, removeCartItemFromBackend]
  );

  const emptyCart = useCallback(async () => {
    dispatch({ type: 'EMPTY_CART' });

    if (session) {
      await emptyCartInBackend();
    }
  }, [session, emptyCartInBackend]);

  // ******************** Initialize Cart ****************************

  const fetchUserCart = useCallback(async () => {
    if (!session?.user?._id || !session?.user?.accessToken) return;

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
        const { data } = response.data;
        dispatch({ type: 'INITIALIZE_CART', payload: data.products || [] });
      }
    } catch (error) {
      handleApiError(error);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchUserCart();
    }
  }, [session, fetchUserCart]);

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

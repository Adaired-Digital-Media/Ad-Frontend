// 'use client';

// import {
//   useMemo,
//   useReducer,
//   useContext,
//   createContext,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import { cartReducer, State, initialState } from './cart.reducer';
// import { useLocalStorage } from '@core/hooks/use-local-storage';
// import { CART_KEY } from '@/config/constants';
// import { CartItem as Item } from '@/types';
// import { useSession } from 'next-auth/react';
// import { useCartAPI } from '@core/hooks/useCartAPI';
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

//   const {
//     handleApiError,
//     sendCartToBackend,
//     updateCartItemInBackend,
//     removeCartItemFromBackend,
//     emptyCartInBackend,
//   } = useCartAPI();

//   // Ref to track if the cart has been synced with the backend
//   const hasSyncedCart = useRef(false);

//   // ******************** Save Cart to Local Storage (Guest Users) *********************
//   useEffect(() => {
//     if (!session) {
//       saveCart(JSON.stringify(state));
//     }
//   }, [state, session, saveCart]);

//   // ******************** Fetch User Cart if User is Logged in *************************
//   useEffect(() => {
//     if (session?.user?.accessToken) {
//       const fetchUserCart = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/get-user-cart`,
//             {
//               headers: {
//                 Authorization: `Bearer ${session.user.accessToken}`,
//               },
//             }
//           );

//           if (response.status === 200) {
//             const { cart } = response.data;
//             const backendCartItems = cart.products || [];
//             dispatch({ type: 'INITIALIZE_CART', payload: backendCartItems });
//           }
//         } catch (error) {
//           handleApiError(error);
//         }
//       };
//       fetchUserCart();
//     }
//   }, [session]);

//   // ******************** Sync Local Cart (Logged-In Users) *********************
//   useEffect(() => {
//     if (session?.user?.accessToken && !hasSyncedCart.current) {
//       const syncCart = async () => {
//         try {
//           const savedCartFromStorage = JSON.parse(savedCart || '{}');
//           const hasSavedItems = savedCartFromStorage?.products?.length > 0;

//           if (hasSavedItems) {
//             const backendCartItems = await sendCartToBackend(
//               savedCartFromStorage?.products,
//               `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
//             );
//             dispatch({
//               type: 'INITIALIZE_CART',
//               payload: backendCartItems.products,
//             });
//           }
//           hasSyncedCart.current = true;
//           saveCart(JSON.stringify(initialState));
//         } catch (error) {
//           handleApiError(error);
//         }
//       };

//       syncCart();
//     }
//   }, [session]);

//   // ******************** Add Item to Cart *********************
//   const addItemToCart = useCallback(
//     async (item: Item) => {
//       const updatedItem = { ...item };

//       if (session) {
//         try {
//           // Sync with the backend
//           const response = await sendCartToBackend(
//             [updatedItem],
//             `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
//           );
//           // Update the local state with the response from the backend
//           dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
//         } catch (error) {
//           // Rollback the local state if the API call fails
//           dispatch({ type: 'REMOVE_ITEM', cartItemId: updatedItem._id });
//           handleApiError(error);
//         }
//       } else {
//         // Optimistically update the local state
//         dispatch({ type: 'ADD_ITEM', item: updatedItem });
//         toast.success('Product added successfully');
//       }
//     },
//     [session, sendCartToBackend, handleApiError]
//   );

//   // ******************** Update Cart Item *********************
//   const [updatedItem, setUpdatedItem] = useState<Item | null>(null);

//   useEffect(() => {
//     if (updatedItem) {
//       updateCartItemInBackend({
//         cartItemId: updatedItem._id,
//         quantity: updatedItem.quantity,
//         wordCount: updatedItem.wordCount,
//         additionalInfo: updatedItem.additionalInfo,
//         totalPrice: updatedItem.totalPrice,
//       }).catch((error) => {
//         handleApiError(error);
//       });
//     }
//   }, [updatedItem]);

//   const updateCartItem = useCallback(
//     async (
//       cartItemId: string,
//       updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
//     ) => {
//       const originalItem = state.products.find(
//         (item) => item._id === cartItemId
//       );

//       if (originalItem) {
//         const hasChanges = Object.keys(updates).some((key) => {
//           return updates[key as keyof Item] !== originalItem[key as keyof Item];
//         });

//         if (!hasChanges) {
//           toast.success('No changes made!');
//           return;
//         }

//         dispatch({
//           type: 'UPDATE_ITEM',
//           cartItemId,
//           updates,
//           callback: (newState: State) => {
//             const updatedItem = newState.products.find(
//               (item) => item._id === cartItemId
//             );

//             if (session) {
//               if (updatedItem && updatedItem !== originalItem) {
//                 setUpdatedItem(updatedItem);
//               }
//             } else {
//               if (updatedItem) {
//                 toast.success('Product updated successfully', {
//                   id: `update-${cartItemId}`,
//                 });
//               }
//             }
//           },
//         });
//       } else {
//         toast.error('Item not found in cart', {
//           id: `notfound-${cartItemId}`,
//         });
//       }
//     },
//     [session?.user?.accessToken, state.products]
//   );

//   const removeCartItem = useCallback(
//     async (cartItemId: string) => {
//       if (session) {
//         try {
//           // Sync with the backend
//           const response = await removeCartItemFromBackend(cartItemId);
//           // Update the local state with the response from the backend
//           dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
//         } catch (error) {
//           // Rollback the local state if the API call fails
//           const removedItem = state.products.find(
//             (item) => item._id === cartItemId
//           );
//           if (removedItem) {
//             dispatch({ type: 'ADD_ITEM', item: removedItem });
//           }
//           handleApiError(error);
//         }
//       } else {
//         // Optimistically update the local state
//         dispatch({ type: 'REMOVE_ITEM', cartItemId: cartItemId });
//         toast.success('Product removed successfully');
//       }
//     },
//     [session, removeCartItemFromBackend, state.products, handleApiError]
//   );

//   // ******************** Empty Cart *********************
//   const emptyCart = useCallback(async () => {
//     if (session) {
//       try {
//         // Sync with the backend
//         const response = await emptyCartInBackend();
//         // Update the local state with the response from the backend
//         dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
//       } catch (error) {
//         // Rollback the local state if the API call fails
//         dispatch({ type: 'INITIALIZE_CART', payload: state.products });
//         handleApiError(error);
//       }
//     } else {
//       // Optimistically update the local state
//       dispatch({ type: 'EMPTY_CART' });
//     }
//   }, [session, emptyCartInBackend, state.products, handleApiError]);

//   // ******************** Memoized Context Value *********************
//   const value = useMemo(
//     () => ({
//       ...state,
//       addItemToCart,
//       updateCartItem,
//       removeCartItem,
//       emptyCart,
//     }),
//     [state, addItemToCart, updateCartItem, removeCartItem, emptyCart]
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
  useState,
  useRef,
} from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { CartItem as Item } from '@/types';
import { useSession } from 'next-auth/react';
import { useCartAPI } from '@core/hooks/useCartAPI';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CART_KEY } from '@/config/constants';

interface CartProviderState extends State {
  addItemToCart: (cartItem: Item) => void;
  updateCartItem: (
    cartItemId: string,
    updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
  ) => void;
  removeCartItem: (cartItemId: string) => void;
  emptyCart: () => void;
  isSyncing?: boolean;
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

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        return window.localStorage.getItem(key) ?? initialValue;
      } catch (error) {
        console.error('Error reading localStorage on init:', error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};

const migrateCartData = (storedData: string): State => {
  try {
    const parsed = JSON.parse(storedData);
    if (parsed && Array.isArray(parsed.cartItems)) {
      return { products: parsed.cartItems };
    }
    if (parsed && Array.isArray(parsed.products)) {
      return parsed;
    }
    return initialState;
  } catch (error) {
    console.error('Error parsing stored cart data:', error);
    return initialState;
  }
};

// Deduplicate cart items by _id, summing quantities
const deduplicateCartItems = (items: Item[]): Item[] => {
  const seen = new Map<string, Item>();
  items.forEach((item) => {
    if (seen.has(item._id)) {
      const existing = seen.get(item._id)!;
      seen.set(item._id, {
        ...existing,
        quantity: existing.quantity + item.quantity,
      });
    } else {
      seen.set(item._id, { ...item });
    }
  });
  return Array.from(seen.values());
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
    cartKey,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    cartReducer,
    migrateCartData(savedCart)
  );

  const [isSyncing, setIsSyncing] = useState(false);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);
  const [hasSyncedCart, setHasSyncedCart] = useState(false);

  const {
    handleApiError,
    sendCartToBackend,
    updateCartItemInBackend,
    removeCartItemFromBackend,
    emptyCartInBackend,
  } = useCartAPI();

  // Save cart to localStorage for guest users
  useEffect(() => {
    if (!session) {
      saveCart(JSON.stringify(state));
    }
  }, [state, session, saveCart]);

  // Fetch user cart if logged in (runs once)
  useEffect(() => {
    if (session?.user?.accessToken && !hasFetchedCart) {
      const fetchUserCart = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/get-user-cart`,
            {
              headers: { Authorization: `Bearer ${session.user.accessToken}` },
            }
          );
          if (response.status === 200) {
            const { cart } = response.data;
            const backendCartItems = cart.products || [];
            dispatch({ type: 'INITIALIZE_CART', payload: backendCartItems });
            setHasFetchedCart(true);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
      fetchUserCart();
    }
  }, [session?.user?.accessToken, hasFetchedCart]);

  // Sync local cart with backend on login
  useEffect(() => {
    if (
      session?.user?.accessToken &&
      hasFetchedCart &&
      !hasSyncedCart &&
      !isSyncing
    ) {
      setIsSyncing(true);
      setHasSyncedCart(true);
      const syncCart = async () => {
        try {
          const migratedCart = migrateCartData(savedCart);
          const hasSavedItems = migratedCart.products.length > 0;
          if (hasSavedItems) {
            const itemsToSync = migratedCart.products;
            const backendCartItems = await sendCartToBackend(
              itemsToSync,
              `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
            );
            dispatch({
              type: 'INITIALIZE_CART',
              payload: backendCartItems.products,
            });
            saveCart(JSON.stringify(initialState));
          } else {
            console.warn('No local items to sync');
          }
        } catch (error) {
          console.error('Sync error:', error);
          handleApiError(error);
          setHasSyncedCart(false); // Retry on failure
        } finally {
          setIsSyncing(false);
        }
      };
      syncCart();
      return () => {
        console.log('Sync effect cleanup');
      };
    } else {
      console.log('Sync skipped', {
        accessToken: !!session?.user?.accessToken,
        hasSyncedCart,
        hasFetchedCart,
      });
    }
  }, [
    session?.user?.accessToken,
    savedCart,
    sendCartToBackend,
    handleApiError,
    hasFetchedCart,
    hasSyncedCart,
  ]);

  const addItemToCart = useCallback(
    async (item: Item) => {
      const updatedItem = { ...item };
      if (session) {
        try {
          const response = await sendCartToBackend(
            [updatedItem],
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
          );
          dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
        } catch (error) {
          dispatch({ type: 'REMOVE_ITEM', cartItemId: updatedItem._id });
          handleApiError(error);
        }
      } else {
        dispatch({ type: 'ADD_ITEM', item: updatedItem });
        toast.success('Product added successfully');
      }
    },
    [session, sendCartToBackend, handleApiError]
  );

  const [updatedItem, setUpdatedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (updatedItem && session) {
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
  }, [updatedItem, session]);

  const updateCartItem = useCallback(
    async (
      cartItemId: string,
      updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
    ) => {
      const originalItem = state.products.find(
        (item) => item._id === cartItemId
      );
      if (originalItem) {
        const hasChanges = Object.keys(updates).some(
          (key) =>
            updates[key as keyof Item] !== originalItem[key as keyof Item]
        );
        if (!hasChanges) {
          toast.success('No changes made!');
          return;
        }
        dispatch({
          type: 'UPDATE_ITEM',
          cartItemId,
          updates,
          callback: (newState: State) => {
            const updatedItem = newState.products.find(
              (item) => item._id === cartItemId
            );
            if (session && updatedItem && updatedItem !== originalItem) {
              setUpdatedItem(updatedItem);
            } else if (updatedItem) {
              toast.success('Product updated successfully', {
                id: `update-${cartItemId}`,
              });
            }
          },
        });
      } else {
        toast.error('Item not found in cart', { id: `notfound-${cartItemId}` });
      }
    },
    [session, state.products]
  );

  const removeCartItem = useCallback(
    async (cartItemId: string) => {
      if (session) {
        try {
          const response = await removeCartItemFromBackend(cartItemId);
          dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
        } catch (error) {
          const removedItem = state.products.find(
            (item) => item._id === cartItemId
          );
          if (removedItem) {
            dispatch({ type: 'ADD_ITEM', item: removedItem });
          }
          handleApiError(error);
        }
      } else {
        dispatch({ type: 'REMOVE_ITEM', cartItemId: cartItemId });
        toast.success('Product removed successfully');
      }
    },
    [session, removeCartItemFromBackend, state.products, handleApiError]
  );

  const emptyCart = useCallback(async () => {
    if (session) {
      try {
        const response = await emptyCartInBackend();
        dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
      } catch (error) {
        dispatch({ type: 'INITIALIZE_CART', payload: state.products });
        handleApiError(error);
      }
    } else {
      dispatch({ type: 'EMPTY_CART' });
    }
  }, [session, emptyCartInBackend, state.products, handleApiError]);

  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
      updateCartItem,
      removeCartItem,
      emptyCart,
      isSyncing,
    }),
    [state, addItemToCart, updateCartItem, removeCartItem, emptyCart, isSyncing]
  );

  return (
    <cartContext.Provider value={value} {...props}>
      {children}
    </cartContext.Provider>
  );
}

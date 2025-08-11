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
import { debounce } from 'lodash';

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

const cartContext = createContext<CartProviderState>({
  ...initialState,
  addItemToCart: () => {},
  updateCartItem: () => {},
  removeCartItem: () => {},
  emptyCart: () => {},
  isSyncing: false,
});
cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const useLocalStorage = (
  key: string,
  initialValue: string
): [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      return typeof window !== 'undefined'
        ? (window.localStorage.getItem(key) ?? initialValue)
        : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = debounce((value: string) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, 300);

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

export function CartProvider({
  cartKey = CART_KEY,
  children,
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
  const hasInitializedRef = useRef(false);
  const syncLockRef = useRef(false);

  const {
    handleApiError,
    sendCartToBackend,
    updateCartItemInBackend,
    removeCartItemFromBackend,
    emptyCartInBackend,
  } = useCartAPI();

  useEffect(() => {
    if (!session) {
      saveCart(JSON.stringify(state));
    }
  }, [state, session, saveCart]);

  useEffect(() => {
    if (!session?.user?.accessToken) {
      hasInitializedRef.current = false;
      syncLockRef.current = false;
      return;
    }

    if (
      session?.user?.accessToken &&
      !hasInitializedRef.current &&
      !syncLockRef.current
    ) {
      hasInitializedRef.current = true;
      syncLockRef.current = true; // Lock to prevent multiple syncs
      const initializeCart = async () => {
        setIsSyncing(true);
        try {
          const localItems = migrateCartData(savedCart).products;

          // Fetch user cart and sync local cart in parallel
          const [fetchResponse, syncResponse] = await Promise.all([
            axios
              .get(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/get-user-cart`,
                {
                  headers: {
                    Authorization: `Bearer ${session.user.accessToken}`,
                  },
                }
              )
              .catch((error) => {
                console.error('Fetch error:', error);
                handleApiError(error);
                return { status: 500, data: { cart: { products: [] } } };
              }),
            localItems.length > 0
              ? sendCartToBackend(
                  localItems,
                  `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
                ).catch((error) => {
                  console.error('Sync error:', error);
                  handleApiError(error);
                  return { products: [] };
                })
              : Promise.resolve({ products: [] }),
          ]);

          // Combine fetched and synced cart items without deduplication
          const fetchedItems =
            fetchResponse.status === 200
              ? fetchResponse.data.cart.products || []
              : [];
          const syncedItems = syncResponse.products || [];
          const mergedItems = [...fetchedItems, ...syncedItems];

          // Update state with merged cart
          dispatch({
            type: 'INITIALIZE_CART',
            payload: mergedItems,
          });

          // Clear local storage after successful sync
          if (localItems.length > 0) {
            saveCart(JSON.stringify(initialState));
          }
        } catch (error) {
          console.error('Initialization error:', error);
          handleApiError(error);
        } finally {
          setIsSyncing(false);
          syncLockRef.current = false; // Release lock
        }
      };
      initializeCart();
    }
  }, [session?.user?.accessToken]);

  const addItemToCart = useCallback(
    async (item: Item) => {
      try {
        if (session) {
          const response = await sendCartToBackend(
            [item],
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`
          );
          dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
        } else {
          dispatch({ type: 'ADD_ITEM', item });
          toast.success('Product added successfully');
        }
      } catch (error) {
        dispatch({ type: 'REMOVE_ITEM', cartItemId: item._id });
        handleApiError(error);
      }
    },
    [session, sendCartToBackend, handleApiError]
  );

  // const updateCartItem = useCallback(
  //   async (
  //     cartItemId: string,
  //     updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
  //   ) => {
  //     const originalItem = state.products.find(
  //       (item) => item._id === cartItemId
  //     );
  //     if (!originalItem) {
  //       toast.error('Item not found in cart', { id: `notfound-${cartItemId}` });
  //       return;
  //     }
  //     const hasChanges = Object.keys(updates).some(
  //       (key) => updates[key as keyof Item] !== originalItem[key as keyof Item]
  //     );
  //     if (!hasChanges) {
  //       toast.success('No changes made!');
  //       return;
  //     }
  //     dispatch({
  //       type: 'UPDATE_ITEM',
  //       cartItemId,
  //       updates,
  //       callback: (newState: State) => {
  //         const updatedItem = newState.products.find(
  //           (item) => item._id === cartItemId
  //         );
  //         if (session && updatedItem) {
  //           updateCartItemInBackend({
  //             cartItemId,
  //             quantity: updatedItem.quantity,
  //             wordCount: updatedItem.wordCount,
  //             additionalInfo: updatedItem.additionalInfo,
  //             totalPrice: updatedItem.totalPrice,
  //           }).catch((error) => handleApiError(error));
  //         } else if (updatedItem) {
  //           toast.success('Product updated successfully', {
  //             id: `update-${cartItemId}`,
  //           });
  //         }
  //       },
  //     });
  //   },
  //   [session, state.products, updateCartItemInBackend, handleApiError]
  // );

  const updateCartItem = useCallback(
    async (
      cartItemId: string,
      updates: Partial<Item> & { action?: 'INCREMENT' | 'DECREMENT' }
    ) => {
      const originalItem = state.products.find(
        (item) => item._id === cartItemId
      );
      if (!originalItem) {
        toast.error('Item not found in cart', { id: `notfound-${cartItemId}` });
        return;
      }

      const hasChanges = Object.keys(updates).some(
        (key) => updates[key as keyof Item] !== originalItem[key as keyof Item]
      );

      if (!hasChanges && !updates.action) {
        toast.success('No changes made!');
        return;
      }

      // Optimistically update local state first
      dispatch({
        type: 'UPDATE_ITEM',
        cartItemId,
        updates,
      });

      console.log('Original Item Quantity :', typeof(originalItem.quantity));
      // Backend update (run only once here, not in reducer)
      const updatedItem = {
        ...originalItem,
        ...updates,
        quantity:
          updates.action === 'INCREMENT'
            ? originalItem.quantity + 1
            : updates.action === 'DECREMENT'
              ? originalItem.quantity - 1
              : (updates.quantity ?? originalItem.quantity),
      };

      if (session) {
        try {
          await updateCartItemInBackend({
            cartItemId,
            quantity: updatedItem.quantity,
            wordCount: updatedItem.wordCount,
            additionalInfo: updatedItem.additionalInfo,
            totalPrice: updatedItem.totalPrice,
          });
        } catch (err) {
          handleApiError(err);
        }
      } else {
        toast.success('Product updated successfully', {
          id: `update-${cartItemId}`,
        });
      }
    },
    [session, state.products, updateCartItemInBackend, handleApiError]
  );

  const removeCartItem = useCallback(
    async (cartItemId: string) => {
      try {
        if (session) {
          const response = await removeCartItemFromBackend(cartItemId);
          dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
        } else {
          dispatch({ type: 'REMOVE_ITEM', cartItemId });
          toast.success('Product removed successfully');
        }
      } catch (error) {
        const removedItem = state.products.find(
          (item) => item._id === cartItemId
        );
        if (removedItem) {
          dispatch({ type: 'ADD_ITEM', item: removedItem });
        }
        handleApiError(error);
      }
    },
    [session, removeCartItemFromBackend, state.products, handleApiError]
  );

  const emptyCart = useCallback(async () => {
    try {
      if (session) {
        const response = await emptyCartInBackend();
        dispatch({ type: 'INITIALIZE_CART', payload: response?.products });
      } else {
        dispatch({ type: 'EMPTY_CART' });
      }
    } catch (error) {
      dispatch({ type: 'INITIALIZE_CART', payload: state.products });
      handleApiError(error);
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

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

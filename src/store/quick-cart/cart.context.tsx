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
import toast from 'react-hot-toast';

interface CartProviderState extends State {
  addItemToCart: (cartItem: Item) => void;
  updateCartItemQuantity: (productEntryId: string, action: string) => void;
  updateDetails: (productEntryId: string, details: Partial<Item>) => void;
  removeItemFromCart: (productEntryId: string) => void;
  isLoading: boolean;
}

const cartContext = createContext<CartProviderState>({
  ...initialState,
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  updateDetails: () => {},
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
  // Retrieve temporary user ID from localStorage if available
  let tempUserId =
    typeof window !== 'undefined' ? localStorage.getItem('tempUserId') : null;

  // Destructure data from hooks
  const { data: session } = useSession();
  const [savedCart, saveCart] = useLocalStorage(
    cartKey ?? CART_KEY,
    JSON.stringify(initialState)
  );

  // Initialize reducer and state hooks
  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    cartReducer,
    JSON.parse(savedCart || JSON.stringify(initialState))
  );
  const [pendingItems, setPendingItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string>();
  const [updatingQuantityItemId, setUpdatingQuantityItemId] =
    useState<string>();
  const [deletingItemId, setDeletingItem] = useState<string>();

  // ******************** Actions ***********************************

  const addItemToCart = (item: Item) => {
    const updatedItem = { ...item };
    dispatch({ type: 'ADD_ITEM', item: updatedItem });
    setPendingItems((prev) => [...prev, updatedItem]);
  };

  const updateCartItemQuantity = (productEntryId: string, action: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productEntryId, action });
    setUpdatingQuantityItemId(productEntryId);
  };

  const updateDetails = (productEntryId: string, details: any) => {
    dispatch({ type: 'UPDATE_DETAILS', productEntryId, details });
    setUpdatingItemId(productEntryId);
  };

  const removeItemFromCart = (productEntryId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productEntryId });
    setDeletingItem(productEntryId);
  };

  // ******************** Debounce Functions ************************

  const sendCartInJunkCarts = useCallback(async (items: Item[]) => {
    if (items.length === 0) return;
    try {
      const payload = {
        userId: tempUserId,
        cartItems: items.map((item) => ({
          productId: item?.productId,
          category: item?.category,
          productSlug: item?.productSlug,
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

      setIsLoading(true);
      try {
        if (session?.user?.accessToken) {
          const payload = {
            cartItems: items.map((item) => ({
              productId: item?.productId,
              category: item?.category,
              productName: item?.productName,
              productImage: item?.productImage,
              productSlug: item?.productSlug,
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
          return response.data.data.products;
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
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

  const updateJunkCart = useCallback(
    debounce(async (updatedItem: UpdateCartItem) => {
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
        if (response.status === 200) {
          saveCart(JSON.stringify(state));
        }
      } catch (error) {
        console.error('Error syncing cart with backend:', error);
      }
    }, 200),
    []
  );

  const updateRealCart = useCallback(
    debounce(async (updatedItem: UpdateCartItem) => {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/update-cart?userId=${session?.user?._id}`,
          updatedItem,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );
      } catch (error) {
        console.error('Error syncing cart with backend:', error);
      }
    }, 200),
    [session]
  );

  const removeItemFromJunkCart = async (deletingItemId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/junk-cart/leads/delete-product?userId=${tempUserId}&productEntryId=${deletingItemId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        saveCart(JSON.stringify(state));
      }
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  };

  const removeItemFromRealCart = async (deletingItemId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/delete-product?userId=${session?.user?._id}&productEntryId=${deletingItemId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  };

  // ******************** Function Calls ****************************

  // Fetches User's cart when user logs in
  const fetchUserCart = useCallback(async () => {
    if (!session?.user?._id || !session?.user?.accessToken) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/get-own-cart`,
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

  useEffect(() => {
    if (session) {
      // Fetch the user's cart when they log in
      fetchUserCart();
    }
  }, [session, fetchUserCart]);

  // Initialize the cart or add items to cart
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
          const products = await sendCartWithBackend(
            savedCartFromStorage?.cartItems
          );
          if (products) {
            dispatch({ type: 'INITIALIZE_CART', payload: products });
          }
          saveCart(JSON.stringify(initialState));
        } else if (hasPendingItems) {
          const products = await sendCartWithBackend(pendingItems);
          if (products) {
            dispatch({ type: 'INITIALIZE_CART', payload: products });
          }
          setPendingItems([]);
        }
      }
    };

    initializeCart();
  }, [session, pendingItems, sendCartInJunkCarts, sendCartWithBackend]);

  // Update quantity of product
  useEffect(() => {
    if (updatingQuantityItemId) {
      try {
        const updatedItem = state.cartItems.find(
          (item) => item._id === updatingQuantityItemId
        );

        const updatedItemPayload = {
          productEntryId: updatingQuantityItemId || updatedItem?._id || '',
          quantity: updatedItem?.quantity || undefined,
          totalPrice: updatedItem?.totalPrice || undefined,
        };

        if (session) {
          updateRealCart(updatedItemPayload);
          setUpdatingQuantityItemId('');
        } else {
          if (tempUserId) {
            updateJunkCart(updatedItemPayload);
            setUpdatingQuantityItemId('');
          }
        }
      } catch (error) {
        console.error('Something went wrong while updating cart -> ', error);
      }
    }
  }, [updatingQuantityItemId, state]);

  // Update details of product
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
          productSlug: updatedItem?.productSlug || undefined,
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
          updateRealCart(updatedItemPayload);
          setUpdatingItemId('');
        } else {
          if (tempUserId) {
            updateJunkCart(updatedItemPayload);
            setUpdatingItemId('');
          }
        }
      } catch (error) {
        console.error('Something went wrong while updating cart -> ', error);
      }
    }
  }, [state, updatingItemId]);

  // Delete product
  useEffect(() => {
    if (deletingItemId) {
      try {
        const updatedItem = state.cartItems.find(
          (item) => item._id === deletingItemId
        );

        if (!session) {
          removeItemFromJunkCart(updatedItem?._id || deletingItemId);
          setDeletingItem('');
        } else {
          removeItemFromRealCart(updatedItem?._id || deletingItemId);
          setDeletingItem('');
        }
      } catch (error) {
        console.error(
          'Something went wrong while deleting this product from cart : ',
          error
        );
      }
    }
  }, [state, deletingItemId]);

  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
      updateCartItemQuantity,
      updateDetails,
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

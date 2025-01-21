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

  // ******************** Functions ************************

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
          isFreeProduct: item?.isFreeProduct,
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
        toast.success(response.data.message);
      }
      return response.data.data.products;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error('Error syncing cart with backend:', error);
    }
  }, []);
  let count = 0;
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
              productSlug: item?.productSlug,
              wordCount: item?.wordCount,
              quantity: item?.quantity,
              additionalInfo: item?.additionalInfo,
              name: item?.name,
              email: item?.email,
              phone: item?.phone,
              pricePerUnit: item?.pricePerUnit,
              totalPrice: item?.totalPrice,
              isFreeProduct: item?.isFreeProduct,
            })),
          };

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/add-product-or-sync-cart`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.user?.accessToken}`,
              },
            }
          );
          return response;
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error syncing cart with backend:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [session?.user?.accessToken]
  );

  const updateJunkCart = useCallback(async (updatedItem: UpdateCartItem) => {
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
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  }, []);

  const updateRealCart = useCallback(
    async (updatedItem: UpdateCartItem) => {
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
    },
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

  const deleteJunkCart = async (tempUserId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/junk-cart/leads/delete-cart?userId=${tempUserId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error clearing junk cart:', error.message);
      }
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
          if (products && products.length > 0) {
            dispatch({ type: 'INITIALIZE_CART', payload: products });
          }
          setPendingItems([]);
          saveCart(JSON.stringify(state));
        }
      } else {
        const savedCartFromStorage = JSON.parse(savedCart || '{}');
        const hasSavedItems = savedCartFromStorage?.cartItems?.length > 0;
        const hasPendingItems = pendingItems.length > 0;

        if (hasSavedItems) {
          count = count+1;
          console.log("Entered -> ",count)
          const clearJunkCart = await deleteJunkCart(tempUserId || '');
          localStorage.removeItem('tempUserId');
          const response = await sendCartWithBackend(
            savedCartFromStorage?.cartItems
          );
          if (response?.data.cart.products) {
            dispatch({
              type: 'INITIALIZE_CART',
              payload: response?.data?.cart?.products,
            });
            console.log('Cart Re-Initialized From Storage');
          }
          saveCart(JSON.stringify(initialState));
        } else if (hasPendingItems) {
          const response = await sendCartWithBackend(pendingItems);
          if (response?.data.cart.products) {
            if (response.status === 200) {
              toast.success(response.data.message);
            }
            dispatch({
              type: 'INITIALIZE_CART',
              payload: response?.data.cart.products,
            });
            console.log('Cart Re-Initialized From Pending Items');
          }
          setPendingItems([]);
        }
      }
    };

    initializeCart();
  }, [
    session,
    saveCart,
    pendingItems,
    sendCartInJunkCarts,
    sendCartWithBackend,
    fetchUserCart,
  ]);

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
        } else {
          if (tempUserId) {
            updateJunkCart(updatedItemPayload);
          }
          saveCart(JSON.stringify(state));
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
        } else {
          if (tempUserId) {
            updateJunkCart(updatedItemPayload);
          }
          saveCart(JSON.stringify(state));
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
          saveCart(JSON.stringify(state));
        } else {
          removeItemFromRealCart(updatedItem?._id || deletingItemId);
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

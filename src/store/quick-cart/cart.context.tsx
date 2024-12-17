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

  // const addItemToCart = (item: Item) => {
  //   dispatch({ type: 'ADD_ITEM', item });
  //   setPendingItems((prev) => [...prev, item]);
  // };
  // Add item to cart
  const addItemToCart = (item: Item) => {
    if (session?.user?.accessToken) {
      // Directly sync with backend if logged in
      // sendCartWithBackend([item]);
      setPendingItems((prev) => [...prev, item]);
    } else {
      // Store item locally if not logged in
      dispatch({ type: 'ADD_ITEM', item });
      setPendingItems((prev) => [...prev, item]); // Store pending items for sync
    }
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
              productName: item?.productName,
              wordCount: item?.wordCount,
              quantity: item?.quantity,
              additionalInfo: item?.additionalInfo,
              name: item?.name,
              email: item?.email,
              phone: item?.phone,
              pricePerUnit: item?.pricePerUnit,
              totalPrice: item?.totalPrice,
              productType: item?.productType,
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

  // Sync pending items on user login
  useEffect(() => {
    if (session && pendingItems.length > 0) {
      sendCartWithBackend(pendingItems);
    }
  }, [session, pendingItems, sendCartWithBackend]);

  // Save cart to local storage for logged-out users
  useEffect(() => {
    if (!session) {
      saveCart(JSON.stringify(state));
    }
  }, [state, session, saveCart]);

  // useEffect(() => {
  //   // If the user is logged in, send cart to the backend
  //   if (session) {
  //     const savedCartFromStorage = JSON.parse(savedCart || '{}');
  //     if (
  //       savedCartFromStorage &&
  //       Object.keys(savedCartFromStorage).length > 0
  //     ) {
  //       sendCartWithBackend(savedCartFromStorage.cartItems);
  //       saveCart(JSON.stringify(initialState));
  //     }
  //   }

  //   if (!session) {
  //     saveCart(JSON.stringify(state));
  //   }

  //   sendCartWithBackend(pendingItems);
  // }, [state, saveCart, sendCartWithBackend, pendingItems, session, savedCart]);

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
// import { CartItem as Item } from '@/types';
// import { useSession } from 'next-auth/react';

// interface CartProviderState extends State {
//   addItemToCart: (cartItem: Item) => void;
//   isLoading: boolean;
// }

// const CartContext = createContext<CartProviderState | undefined>(undefined);
// CartContext.displayName = 'CartContext';

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export function CartProvider({
//   cartKey = CART_KEY,
//   children,
// }: {
//   cartKey?: string;
//   children: React.ReactNode;
// }) {
//   const { data: session } = useSession();
//   const [savedCart, saveCart] = useLocalStorage(
//     cartKey,
//     JSON.stringify(initialState)
//   );

//   const [state, dispatch] = useReducer<React.Reducer<State, any>>(
//     cartReducer,
//     JSON.parse(savedCart || JSON.stringify(initialState))
//   );

//   const [pendingItems, setPendingItems] = useState<Item[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Add item to cart
//   const addItemToCart = (item: Item) => {
//     if (session?.user?.accessToken) {
//       // Directly sync with backend if logged in
//       syncCartToBackend([item]);
//     } else {
//       // Store item locally if not logged in
//       dispatch({ type: 'ADD_ITEM', item });
//       setPendingItems((prev) => [...prev, item]); // Store pending items for sync
//     }
//   };

//   // Sync cart with backend
//   const syncCartToBackend = useCallback(
//     async (items: Item[]) => {
//       if (!session?.user?.accessToken || items.length === 0) return;

//       setIsLoading(true);
//       try {
//         const payload = {
//           cartItems: items.map((item) => ({
//             productId: item.productId,
//             productName: item.productName,
//             wordCount: item.wordCount,
//             quantity: item.quantity,
//             pricePerUnit: item.pricePerUnit,
//             totalPrice: item.totalPrice,
//             name: item.name,
//             email: item.email,
//             phone: item.phone,
//           })),
//         };

//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URI}/cart/add-product-or-sync-cart`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${session.user.accessToken}`,
//             },
//             body: JSON.stringify(payload),
//           }
//         );

//         if (!response.ok) {
//           console.error(
//             'Failed to sync cart with backend:',
//             response.statusText
//           );
//         } else {
//           setPendingItems([]); // Clear pending items after sync
//         }
//       } catch (error) {
//         console.error('Error syncing cart with backend:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [session]
//   );

//   // Initialize cart from backend when user logs in
//   useEffect(() => {
//     if (session) {
//       (async () => {
//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URI}/cart/get-user-cart?customerId=${session.user._id}`,
//             {
//               headers: { Authorization: `Bearer ${session.user.accessToken}` },
//             }
//           );
//           if (res.ok) {
//             const { data } = await res.json();
//             dispatch({ type: 'INITIALIZE_CART', payload: data.products });
//           }
//         } catch (err) {
//           console.error('Failed to fetch cart:', err);
//         }
//       })();
//     }
//   }, [session]);

//   // Sync pending items on user login
//   useEffect(() => {
//     if (session && pendingItems.length > 0) {
//       syncCartToBackend(pendingItems);
//     }
//   }, [session, pendingItems, syncCartToBackend]);

//   // Save cart to local storage for logged-out users
//   useEffect(() => {
//     if (!session) {
//       saveCart(JSON.stringify(state));
//     }
//   }, [state, session, saveCart]);

//   const value = useMemo(
//     () => ({
//       ...state,
//       addItemToCart,
//       isLoading,
//     }),
//     [state, isLoading]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

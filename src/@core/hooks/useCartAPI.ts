'use client';

import axios from 'axios';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { CartItem, UpdateCartItem } from '@/types';
import { useSession } from 'next-auth/react';

export const useCartAPI = () => {
  const { data: session } = useSession();

  const handleApiError = (error: any) => {
    toast.error(error?.response?.data?.message || 'An error occurred');
    console.error('API Error:', error);
  };

  const sendCartToBackend = useCallback(
    async (items: CartItem[], endpoint: string) => {
      if (items.length === 0) return;

      try {
        const payload = {
          products: items.map((item) => ({
            product: item.product,
            wordCount: item.wordCount,
            quantity: item.quantity,
            additionalInfo: item.additionalInfo,
            totalPrice: item.totalPrice,
          })),
        };
        const response = await axios.post(endpoint, payload, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          return response.data.cart;
        }
      } catch (error) {
        handleApiError(error);
      }
    },
    [session]
  );

  const updateCartItemInBackend = useCallback(
    async (updatedItem: UpdateCartItem) => {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/update-cart`,
          updatedItem,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );
        if (response.status === 200) {

          toast.success(response.data.message);
          return response.data.cart;
        }
      } catch (error) {
        handleApiError(error);
      }
    },
    [session?.user?.accessToken]
  );

  const removeCartItemFromBackend = useCallback(
    async (cartItemId: string) => {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/delete-product?cartItemId=${cartItemId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          return response.data.cart;
        }
      } catch (error) {
        handleApiError(error);
      }
    },
    [session]
  );

  const emptyCartInBackend = useCallback(async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/cart/empty-cart`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.cart;
      }
    } catch (error) {
      handleApiError(error);
    }
  }, [session]);

  return {
    handleApiError,
    sendCartToBackend,
    updateCartItemInBackend,
    removeCartItemFromBackend,
    emptyCartInBackend,
  };
};

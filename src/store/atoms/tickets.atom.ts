/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from 'jotai';
import axios from 'axios';
import { Ticket } from '@/types/tickets.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI;

// Base atom for tickets list
export const ticketsAtom = atom<Ticket[]>([]);

// Atom for ticket stats
export const ticketStatsAtom = atom<any>(null);

// Atom for current ticket (single ticket view)
export const currentTicketAtom = atom<Ticket | null>(null);

interface FormDataPayload {
  [key: string]: string | FileList | undefined;
  message?: string;
  priority?: string;
  status?: string;
  attachments?: FileList;
}

// Helper function for API calls
const apiRequest = async (
  method: 'get' | 'post' | 'patch' | 'delete',
  endpoint: string,
  token: string,
  data?: FormDataPayload
) => {
  try {
    const formData = new FormData();

    // Append text fields (e.g., message, priority, status)
    for (const key in data) {
      if (key !== 'attachments' && data[key] !== undefined) {
        formData.append(key, data[key] as string);
      }
    }

    // Append files (from FileList)
    if (data?.attachments && data?.attachments.length > 0) {
      Array.from(data?.attachments).forEach((file) => {
        formData.append('attachments', file);
      });
    }

    const requestData = formData;

    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: requestData,
    });

    return response.data;
  } catch (error) {
    console.error(`API ${method.toUpperCase()} error:`, error);
    throw error;
  }
};

// Atom for all ticket actions
export const ticketActionsAtom = atom(
  null,
  async (
    get,
    set,
    action: {
      type:
        | 'fetchAll'
        | 'fetchSingle'
        | 'create'
        | 'update'
        | 'delete'
        | 'fetchStats';
      token: string;
      payload?: any;
    }
  ) => {
    switch (action.type) {
      case 'fetchAll': {
        const data = await apiRequest('get', `/tickets/read`, action.token);
        set(ticketsAtom, data.data);
        return data;
      }

      case 'fetchSingle': {
        const { ticketId } = action.payload;
        const data = await apiRequest(
          'get',
          `/tickets/read?ticketId=${ticketId}`,
          action.token
        );
        set(currentTicketAtom, data.data[0] || null);
        return data;
      }

      case 'create': {
        const data = await apiRequest(
          'post',
          '/tickets/create',
          action.token,
          action.payload
        );
        set(ticketsAtom, (prev) => [data.data, ...prev]);
        return data;
      }

      case 'update': {
        const { id, ...updateData } = action.payload;
        const data = await apiRequest(
          'patch',
          `/tickets/update?id=${id}`,
          action.token,
          updateData
        );
        // Use functional updates to ensure consistency
        set(ticketsAtom, (prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, ...data.data, _id: t._id } : t
          )
        );
        // Ensure currentTicketAtom gets the full updated object
        if (get(currentTicketAtom)?._id === id) {
          set(currentTicketAtom, (prev) =>
            prev ? { ...prev, ...data.data, _id: prev._id } : null
          );
        }
        return data;
      }

      case 'delete': {
        const { id } = action.payload;
        await apiRequest('delete', `/tickets/delete?id=${id}`, action.token);
        set(ticketsAtom, (prev) => {
          const newTickets = prev.filter((t) => t._id !== id);
          console.log(
            'After deletion:',
            newTickets.map((t) => t._id)
          );
          return newTickets;
        });

        set(currentTicketAtom, (prev) => (prev?._id === id ? null : prev));
        return { success: true };
      }

      case 'fetchStats': {
        const data = await apiRequest('get', '/tickets/stats', action.token);
        set(ticketStatsAtom, data.data);
        return data;
      }
    }
  }
);

// Derived atoms for filtered tickets
export const openTicketsAtom = atom((get) =>
  get(ticketsAtom).filter((t) => t.status === 'Open')
);

export const closedTicketsAtom = atom((get) =>
  get(ticketsAtom).filter((t) => t.status === 'Closed')
);

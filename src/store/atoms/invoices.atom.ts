/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { atom } from "jotai";
import { InvoiceStats, InvoiceTypes } from "@core/types"; // Assuming InvoiceTypes is exported from a types file

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI || "";

// Base atoms for invoice-related state
export const invoicesAtom = atom<InvoiceTypes[]>([]);
export const invoiceStatsAtom = atom<InvoiceStats | null>(null); // Adjust type based on getInvoiceStats response structure

// Helper function for API calls (reusing the existing orderApiRequest for consistency)
const invoiceApiRequest = async (
  method: "get" | "post" | "patch" | "delete",
  endpoint: string,
  token: string,
  data?: any
) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.error(`Invoice API ${method.toUpperCase()} error:`, error);
    throw error;
  }
};

// Invoice actions atom
export const invoiceActionsAtom = atom(
  null,
  async (
    get,
    set,
    action: {
      type:
        | "fetchAll"
        | "fetchByUserId"
        | "fetchStats"
        | "update"
        | "delete";
      token: string;
      payload?: any;
    }
  ) => {
    switch (action.type) {
      case "fetchAll": {
        const data = await invoiceApiRequest(
          "get",
          "/invoices/getUserInvoices",
          action.token
        );
        set(invoicesAtom, data.data);
        return data;
      }

      case "fetchByUserId": {
        const data = await invoiceApiRequest(
          "get",
          "/invoices/getUserInvoices",
          action.token
        );
        set(invoicesAtom, data.data);
        return data;
      }

      case "fetchStats": {
        const data = await invoiceApiRequest(
          "get",
          "/invoices/stats",
          action.token
        );
        set(invoiceStatsAtom, data);
        return data;
      }

      case "update": {
        const { invoiceId, updateData } = action.payload;
        const data = await invoiceApiRequest(
          "patch",
          `/invoices/updateInvoice?invoiceId=${invoiceId}`,
          action.token,
          updateData
        );
        set(invoicesAtom, (prev) =>
          prev.map((invoice) =>
            invoice._id === invoiceId ? { ...invoice, ...data.data } : invoice
          )
        );
        return data;
      }

      case "delete": {
        const { invoiceId } = action.payload;
        await invoiceApiRequest(
          "delete",
          `/invoices/deleteInvoice?invoiceId=${invoiceId}`,
          action.token
        );
        set(invoicesAtom, (prev) =>
          prev.filter((invoice) => invoice._id !== invoiceId)
        );
        // Revalidate cache if necessary (similar to orders)
        await fetch("/api/revalidateTags?tags=invoices", { method: "GET" });
        return { success: true };
      }
    }
  }
);
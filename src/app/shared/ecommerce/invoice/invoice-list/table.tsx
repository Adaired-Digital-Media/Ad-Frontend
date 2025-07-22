"use client";

import { invoiceListColumns } from "./columns";
import Table from "@core/components/table";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import Filters from "./filters";
import TablePagination from "@core/components/table/pagination";
import TableFooter from "@core/components/table/footer";
import { exportToCSV } from "@core/utils/export-to-csv";
import { InvoiceTypes } from "@core/types";
import { useAtom, useSetAtom } from "jotai";
import { invoiceActionsAtom, invoicesAtom } from "@/store/atoms/invoices.atom";
import { TableMeta } from "@tanstack/react-table";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useEffect } from "react";

export interface CustomTableMeta<T> extends TableMeta<T> {
  handleDeleteRow?: (row: T) => void;
  handleMultipleDelete?: (rows: T[]) => void;
}

export default function InvoiceTable({
  initialInvoices,
  session,
}: {
  initialInvoices: InvoiceTypes[];
  session: Session;
}) {
  const [invoices] = useAtom(invoicesAtom);
  const setInvoices = useSetAtom(invoiceActionsAtom);

  const { table, setData } = useTanStackTable<InvoiceTypes>({
    tableData: invoices.length ? invoices : initialInvoices,
    columnConfig: invoiceListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: async (row: { _id: string }) => {
          const response = await setInvoices({
            type: "delete",
            payload: {
              id: row._id,
            },
            token: session.user.accessToken!,
          });
          toast.success(response.message);
        },
        handleMultipleDelete: async (rows) => {
          rows.forEach(async (row: InvoiceTypes) => {
            const _response = await setInvoices({
              type: "delete",
              payload: {
                id: row._id,
              },
              token: session.user.accessToken!,
            });
            toast.success(_response.message);
          });
        },
      } as CustomTableMeta<InvoiceTypes>,
      enableColumnResizing: false,
    },
  });

  // Fetch coupons on mount and when access token changes
  useEffect(() => {
    if (session?.user?.accessToken) {
      const fetchCoupons = async () => {
        try {
          await setInvoices({
            type: "fetchAll",
            token: session.user.accessToken!,
          });
        } catch (error) {
          toast.error("Failed to fetch invoices");
          console.error("Failed to fetch invoices : ", error);
        }
      };
      fetchCoupons();
    }
  }, [session?.user?.accessToken, setInvoices]);

  // Sync table data with tickets atom
  useEffect(() => {
    setData(invoices.length > 0 ? invoices : initialInvoices);
  }, [invoices, initialInvoices, setData]);

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      "ID,Name,Email,DueDate,Status,Amount,CreatedAt",
      `invoice_data_${selectedData.length}`
    );
  }

  return (
    <>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: "border border-muted rounded-md",
          rowClassName: "last:border-0",
        }}
      />
      <TableFooter table={table} onExport={handleExportData} />
      <TablePagination table={table} className="py-4" />
    </>
  );
}

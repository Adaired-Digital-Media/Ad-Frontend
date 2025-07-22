"use client";

import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import { ticketsColumns } from "./columns";
// import Filters from "./filters";
import { CustomTableMeta } from "@/types/tables.types";
import { Ticket } from "@/types/tickets.types";
import { Session } from "next-auth";
import { useAtom } from "jotai";
import { ticketActionsAtom, ticketsAtom } from "@/store/atoms/tickets.atom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export interface TicketsTableMeta<T> extends CustomTableMeta<T> {
  handleDeleteRow?: (row: T) => void;
  handleMultipleDelete?: (rows: T[]) => void;
  handleEditRow?: (row: T) => void;
}

export default function TicketsTable({
  tickets: initialTickets,
  session,
}: {
  tickets: Ticket[];
  session: Session;
}) {
  const [tickets] = useAtom(ticketsAtom);
  const [, dispatch] = useAtom(ticketActionsAtom);

  // Initialize table with tickets from atom or initialTickets
  const { table, setData } = useTanStackTable<Ticket>({
    tableData: tickets.length ? tickets : initialTickets,
    columnConfig: ticketsColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: async (row) => {
          await dispatch({
            type: "delete",
            token: session.user.accessToken!,
            payload: { id: row._id },
          });
          toast.success("Ticket deleted successfully");
          table.resetRowSelection();
        },
        handleMultipleDelete: async (rows) => {
          try {
            await Promise.all(
              rows.map((row) =>
                dispatch({
                  type: "delete",
                  token: session.user.accessToken!,
                  payload: { id: row._id },
                })
              )
            );
            toast.success("Tickets deleted successfully");
            table.resetRowSelection();
          } catch (error) {
            toast.error("Failed to delete tickets");
            console.error("Error Occurred : ", error);
          }
        },
      } as TicketsTableMeta<Ticket>,
      enableColumnResizing: false,
    },
  });

  // Fetch tickets on mount and when access token changes
  useEffect(() => {
    if (session?.user?.accessToken) {
      const fetchTickets = async () => {
        try {
          await dispatch({
            type: "fetchAll",
            token: session.user.accessToken!,
          });
        } catch (error) {
          toast.error("Failed to fetch tickets");
          console.error("Failed to fetch tickets : ", error);
        }
      };
      fetchTickets();
    }
  }, [session?.user?.accessToken, dispatch]);

  // Sync table data with tickets atom
  useEffect(() => {
    setData(tickets.length > 0 ? tickets : initialTickets);
  }, [tickets, initialTickets, setData]);

  return (
    <>
      {/* <Filters table={table} /> */}
      <Table
        table={table}
        variant="modern"
        classNames={{
          rowClassName: "last:border-0",
        }}
      />
      <TablePagination table={table} className="p-4" />
    </>
  );
}

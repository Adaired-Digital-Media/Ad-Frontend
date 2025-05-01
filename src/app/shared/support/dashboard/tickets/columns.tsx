'use client';

import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Text } from 'rizzui';
import { Ticket } from '@/types/tickets.types';
import { CustomTableMeta } from '@/types/tables.types';
import { routes } from '@/config/routes';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<Ticket>();

export const ticketsColumns = [
  columnHelper.accessor('ticketId', {
    id: 'ticketId',
    size: 200,
    header: 'Ticket ID',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.ticketId}</Text>
    ),
  }),
  columnHelper.accessor('subject', {
    id: 'subject',
    size: 300,
    header: 'Subject',
    cell: ({ row }) => <p className="line-clamp-1">{row.original.subject}</p>,
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 250,
    header: 'Date Created',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('updatedAt', {
    id: 'updatedAt',
    size: 250,
    header: 'Last Updated',
    cell: ({ row }) => <DateCell date={new Date(row.original.updatedAt)} />,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 200,
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.display({
    id: 'actions',
    size: 150,
    cell: ({ row, table }) => {
      const meta = table.options.meta as CustomTableMeta<Ticket>;
      return (
        <TableRowActionGroup
          viewUrl={routes?.userDashboard?.inbox(row.original.ticketId)}
        />
      );
    },
  }),
];

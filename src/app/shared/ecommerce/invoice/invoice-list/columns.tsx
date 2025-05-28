'use client';

import { routes } from '@/config/routes';
import { InvoiceTypes, UserTypes } from '@core/types';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Text } from 'rizzui';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { CustomTableMeta } from './table';

const columnHelper = createColumnHelper<InvoiceTypes>();

export const invoiceListColumns = [
  columnHelper.accessor('userId', {
    id: 'userId',
    size: 250,
    header: 'Customer',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.userId?.image || ''}
        name={row.original.userId?.name || ''}
        description={row.original.invoiceNumber}
      />
    ),
    filterFn: (row, id, filterValue: string) => {
      const user = row.getValue<UserTypes>(id);
      return user?.name?.toLowerCase().includes(filterValue?.toLowerCase());
    },
  }),
  columnHelper.display({
    id: 'email',
    size: 250,
    header: 'Email',
    cell: ({ row }) => row.original.userId?.email,
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Created',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
    filterFn: (row, id, filterValue) => {
      const [start, end] = filterValue || [null, null];
      const date = new Date(row.getValue(id));

      if (!start && !end) return true; // No filter applied

      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;

      // Adjust endDate to include the full day (23:59:59.999)
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
      }

      if (startDate && !endDate) return date >= startDate;
      if (!startDate && endDate) return date <= endDate;
      return date >= startDate! && date <= endDate!;
    },
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Due Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.dueDate)} />,
    filterFn: (row, id, filterValue) => {
      const [start, end] = filterValue || [null, null];
      const date = new Date(row.getValue(id));

      if (!start && !end) return true; // No filter applied

      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;

      // Adjust endDate to include the full day (23:59:59.999)
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
      }

      if (startDate && !endDate) return date >= startDate;
      if (!startDate && endDate) return date <= endDate;
      return date >= startDate! && date <= endDate!;
    },
  }),
  columnHelper.accessor('finalAmount', {
    id: 'finalAmount',
    size: 200,
    header: 'Amount',
    cell: ({ row }) => (
      <Text className="text-sm font-medium">${row.original.finalAmount}</Text>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.display({
    id: 'actions',
    size: 120,
    cell: ({ row, table }) => {
      const meta = table.options.meta as CustomTableMeta<InvoiceTypes>;
      return (
        <TableRowActionGroup
          viewUrl={routes.userDashboard.invoiceDetails(
            row.original.invoiceNumber
          )}
        />
      );
    },
  }),
];

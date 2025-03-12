'use client';

import { OrdersDataType } from '@shared/ecommerce/dashboard/recent-order';
import { routes } from '@/config/routes';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { ActionIcon, Text, Flex, Tooltip } from 'rizzui';
import { cn } from '@core/utils/class-names';
import Link from 'next/link';
import EyeIcon from '@core/components/icons/eye';
import { OrderType } from '@/types';

const columnHelper = createColumnHelper<OrderType>();

export const ordersColumns = (expanded: boolean = true) => {
  const columns = [
    columnHelper.accessor('orderNumber', {
      id: 'orderNumber',
      size: 120,
      header: 'Order No.',
      cell: ({ row }) => <>{row.original.orderNumber}</>,
    }),
    columnHelper.accessor('totalQuantity', {
      id: 'items',
      size: 120,
      header: 'Items',
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          {row.original.totalQuantity}
        </Text>
      ),
    }),
    columnHelper.accessor('totalPrice', {
      id: 'totalPrice',
      size: 120,
      header: 'Price',
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          ${row.original.totalPrice}
        </Text>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      size: 120,
      header: 'Created',
      cell: ({ row }) => (
        // <DateCell date={row.original.createdAt ? new Date(row.original.createdAt) : new Date()} />
        <DateCell
          date={row.original.createdAt ? row.original.createdAt : new Date()}
        />
      ),
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
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      size: 120,
      header: 'Modified',
      cell: ({ row }) => (
        <DateCell
          date={row.original.updatedAt ? row.original.updatedAt : new Date()}
        />
      ),
      filterFn: (row, id, filterValue) => {
        const [start, end] = filterValue || [null, null];
        const date = new Date(row.getValue(id));

        if (!start && !end) return true;

        const startDate = start ? new Date(start) : null;
        const endDate = end ? new Date(end) : null;

        if (endDate) {
          endDate.setHours(23, 59, 59, 999);
        }

        if (startDate && !endDate) return date >= startDate;
        if (!startDate && endDate) return date <= endDate;
        return date >= startDate! && date <= endDate!;
      },
    }),
    columnHelper.accessor('status', {
      id: 'status',
      size: 120,
      header: 'Order Status',
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original.status),
    }),
    columnHelper.accessor('paymentStatus', {
      id: 'paymentStatus',
      size: 120,
      header: 'Payment Status',
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original.paymentStatus),
    }),
    columnHelper.display({
      id: 'action',
      size: 30,
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <UserOrderTableActionGroup
          viewUrl={routes.eCommerce.orderDetails(
            row?.original?.orderNumber ?? ''
          )}
        />
      ),
    }),
  ];

  return expanded ? [expandedOrdersColumns, ...columns] : columns;
};

const expandedOrdersColumns = columnHelper.display({
  id: 'expandedHandler',
  size: 60,
  cell: ({ row }) => (
    <>
      {row.getCanExpand() && (
        <ActionIcon
          size="sm"
          rounded="full"
          aria-label="Expand row"
          className="ms-2"
          variant={row.getIsExpanded() ? 'solid' : 'outline'}
          onClick={row.getToggleExpandedHandler()}
        >
          {row.getIsExpanded() ? (
            <PiCaretUpBold className="size-3.5" />
          ) : (
            <PiCaretDownBold className="size-3.5" />
          )}
        </ActionIcon>
      )}
    </>
  ),
});

const UserOrderTableActionGroup = ({
  viewUrl = '#',
  className,
}: {
  viewUrl?: string;
  className?: string;
}) => {
  return (
    <Flex
      align="center"
      justify="end"
      gap="3"
      className={cn('pe-3', className)}
    >
      <Tooltip size="sm" content="View Order" placement="top" color="invert">
        <Link href={viewUrl}>
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="View item"
          >
            <EyeIcon className="size-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
    </Flex>
  );
};

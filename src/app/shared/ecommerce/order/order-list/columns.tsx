'use client';

import { OrdersDataType } from '@shared/ecommerce/dashboard/recent-order';
import { routes } from '@/config/routes';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableAvatar from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { ActionIcon, Text, Flex, Tooltip } from 'rizzui';
import { cn } from '@core/utils/class-names';
import Link from 'next/link';
import EyeIcon from '@core/components/icons/eye';

const columnHelper = createColumnHelper<OrdersDataType>();

export const ordersColumns = (expanded: boolean = true) => {
  const columns = [
    columnHelper.display({
      id: 'orderNumber',
      size: 120,
      header: 'Order Number',
      cell: ({ row }) => <>{row.original.orderNumber}</>,
    }),
    // columnHelper.accessor('name', {
    //   id: 'customer',
    //   size: 300,
    //   header: 'Customer',
    //   enableSorting: false,
    //   cell: ({ row }) => (
    //     <TableAvatar
    //       src={row.original.avatar}
    //       name={row.original.name}
    //       description={row.original.email.toLowerCase()}
    //     />
    //   ),
    // }),
    columnHelper.display({
      id: 'items',
      size: 50,
      header: 'Items',
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          {row.original.products.length}
        </Text>
      ),
    }),
    columnHelper.accessor('totalPrice', {
      id: 'price',
      size: 50,
      header: 'Price',
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          ${row.original.totalPrice}
        </Text>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      size: 200,
      header: 'Created',
      cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
    }),
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      size: 200,
      header: 'Modified',
      cell: ({ row }) => <DateCell date={new Date(row.original.updatedAt)} />,
    }),
    columnHelper.accessor('status', {
      id: 'status',
      size: 140,
      header: 'Order Status',
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original.status),
    }),
    columnHelper.accessor('paymentStatus', {
      id: 'paymentStatus',
      size: 140,
      header: 'Payment Status',
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original.paymentStatus),
    }),
    // columnHelper.display({
    //   id: 'action',
    //   size: 30,
    //   cell: ({
    //     row,
    //     table: {
    //       options: { meta },
    //     },
    //   }) => (
    //     <UserOrderTableActionGroup
    //     viewUrl={routes.eCommerce.orderDetails(row.original.orderNumber)}
    //     />
    //   ),
    // }),
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
      <Tooltip size="sm" content="View Item" placement="top" color="invert">
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

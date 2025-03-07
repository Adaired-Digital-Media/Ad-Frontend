'use client';

import { ordersColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import Table from '@core/components/table';
import { CustomExpandedComponent } from '@core/components/table/custom/expanded-row';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { TableVariantProps } from 'rizzui';
import { OrderType } from '@/types';

export default function OrderTable({
  className,
  variant = 'modern',
  hideFilters = false,
  hidePagination = false,
  orderData,
}: {
  className?: string;
  hideFilters?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
  orderData: any;
}) {
  const { table, setData } = useTanStackTable<OrderType>({
    tableData: orderData,
    columnConfig: ordersColumns(),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      // meta: {
      //   handleDeleteRow: (row: OrdersDataType) => {
      //     setData((prev) => prev.filter((r) => r._id !== row._id));
      //   },
      // },
      enableColumnResizing: false,
    },
  });
  return (
    <div className={className}>
      {!hideFilters && <Filters table={table} />}
      <Table
        table={table}
        variant={variant}
        classNames={{
          container: 'border border-muted rounded-md border-t-0',
          rowClassName: 'last:border-0',
        }}
        components={{
          expandedComponent: CustomExpandedComponent,
        }}
      />
      {!hidePagination && <TablePagination table={table} className="py-4" />}
    </div>
  );
}

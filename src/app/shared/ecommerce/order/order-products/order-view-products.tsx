'use client';

import Image from 'next/image';
import Table, { HeaderCell } from '@core/components/legacy-table';
import { Title, Text } from 'rizzui';
import { toCurrency } from '@core/utils/to-currency';
import { CartItem, OrderType } from '@/types';

const columns = [
  {
    title: <HeaderCell title="Product" />,
    dataIndex: 'product',
    key: 'product',
    width: 250,
    render: (_: any, row: CartItem) => (
      <div className="flex items-center">
        <div className="relative aspect-square w-12 overflow-hidden rounded-lg">
          <Image
            alt={row.product.name}
            src={row.product.featuredImage}
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
        <div className="ms-4">
          <Title as="h6" className="!text-sm font-medium">
            {row.product.name}
          </Title>
        </div>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Word Count" align="center" />,
    dataIndex: 'wordCount',
    key: 'wordCount',
    width: 150,
    render: (wordCount: number) => (
      <Text className="text-center text-sm font-semibold">{wordCount}</Text>
    ),
  },
  {
    title: <HeaderCell title="Quantity" align="center" />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 150,
    render: (quantity: number) => (
      <Text className="text-center text-sm font-semibold">{quantity}</Text>
    ),
  },

  {
    title: <HeaderCell title="Total Price" align="right" />,
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    width: 200,
    render: (totalPrice: number) => (
      <Text className="text-end text-sm">{toCurrency(totalPrice)}</Text>
    ),
  },
];

export default function OrderViewProducts({ order }: { order: OrderType }) {
  return (
    <Table
      data={order.products}
      // @ts-ignore
      columns={columns}
      className="text-sm"
      variant="minimal"
      rowKey={(record) => record.id}
      scroll={{ x: 800 }}
    />
  );
}

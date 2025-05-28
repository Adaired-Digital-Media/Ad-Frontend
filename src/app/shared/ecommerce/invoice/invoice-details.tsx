/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Badge, Title, Text } from "rizzui";
import Table from "@core/components/legacy-table";
import { siteConfig } from "@/config/site.config";
import { InvoiceTypes, OrderType } from "@core/types";
import { formatDate } from "@core/utils/format-date";
import { InvoicePrint } from "./invoice-print";

const columns = [
  {
    title: "#",
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => (
      <Text className="text-sm">{index + 1}</Text>
    ),
  },
  {
    title: "Item",
    dataIndex: "product",
    key: "product",
    width: 250,
    render: (product: { name: string; description: string }) => (
      <>
        <Title as="h6" className="mb-0.5 text-sm font-medium">
          {product.name}
        </Title>
        {/* <Text
          as="p"
          className="max-w-[250px] overflow-hidden truncate text-sm text-gray-500"
        >
          {product.description}
        </Text> */}
      </>
    ),
  },
  {
    title: "Unit Price",
    dataIndex: "product",
    key: "unitPrice",
    width: 200,
    render: (product: { pricePerUnit: number; minimumWords: string }) => (
      <Text className="font-medium">
        ${product.pricePerUnit} / {product.minimumWords} words
      </Text>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: 200,
    render: (value: number) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: "Word Count",
    dataIndex: "wordCount",
    key: "wordCount",
    width: 200,
    render: (value: number) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "total",
    width: 200,
    render: (value: number) => <Text className="font-medium">${value}</Text>,
  },
];

export function InvoiceDetailsListTable({ order }: { order: OrderType }) {
  const orderItems = order?.products;
  return (
    <Table
      data={orderItems}
      columns={columns}
      variant="minimal"
      rowKey={(record: any) => record.id}
      scroll={{ x: 660 }}
      className="mb-11"
    />
  );
}

export const getStatusColor = (
  status: "Unpaid" | "Paid" | "Overdue" | "Cancelled"
) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Unpaid":
      return "warning";
    case "Overdue":
      return "secondary";
    case "Cancelled":
      return "danger";
    default:
      return "info";
  }
};

export default function InvoiceDetails({
  invoice,
  printRef,
}: {
  invoice: InvoiceTypes;
  printRef: any;
}) {
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  return (
    <>
      <InvoicePrint ref={printRef} invoice={invoice} />
      <div className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
        <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.title}
            className="dark:invert"
            priority
          />
          <div className="mb-4 md:mb-0">
            <Badge
              variant="flat"
              color={getStatusColor(invoice.status)}
              rounded="md"
              className="mb-3 md:mb-2"
            >
              {invoice.status}
            </Badge>
            <Title as="h6">{invoice.invoiceNumber}</Title>
            <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
          </div>
        </div>

        <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
          <div className="">
            <Title as="h6" className="mb-3.5 font-semibold">
              From
            </Title>
            <Text className="mb-6 text-sm font-semibold uppercase">
              Adaired Digital Media
            </Text>
            <div>
              <Text className="mb-2 text-sm font-semibold">Creation Date</Text>
              <Text>{formatDate(invoice.createdAt)}</Text>
            </div>
          </div>

          <div className="mt-4 xs:mt-0">
            <Title as="h6" className="mb-3.5 font-semibold">
              Bill To
            </Title>
            <Text className="mb-6 text-sm font-semibold uppercase">
              {invoice.userId?.name}
            </Text>

            <div>
              <Text className="mb-2 text-sm font-semibold">Due Date</Text>
              <Text>{formatDate(invoice.dueDate)}</Text>
            </div>
          </div>

          <div className="mt-4 flex sm:mt-6 md:mt-0 md:justify-end">
            <QRCodeSVG
              value={`${BASEURL}/invoices/download?invoiceNumber=${invoice.invoiceNumber}`}
              className="h-28 w-28 lg:h-32 lg:w-32"
            />
          </div>
        </div>

        <InvoiceDetailsListTable order={invoice.orderId} />

        <div className="flex flex-col-reverse items-start justify-between border-t border-muted pb-4 pt-8 xs:flex-row">
          <div className="mt-6 max-w-md pe-4 xs:mt-0">
            <Title
              as="h6"
              className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
            >
              Notes
            </Title>
            <Text className="leading-[1.7]">
              We appreciate your business, and hope to be working with you again
              very soon!
            </Text>
          </div>
          <div className="w-full max-w-sm">
            <Text className="flex items-center justify-between border-b border-muted pb-3.5 lg:pb-5">
              Subtotal:{" "}
              <Text as="span" className="font-semibold">
                ${invoice.totalAmount}
              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Discount:{" "}
              <Text as="span" className="font-semibold">
                ${invoice.discountAmount}
              </Text>
            </Text>
            <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5">
              Total: <Text as="span">${invoice.finalAmount}</Text>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}

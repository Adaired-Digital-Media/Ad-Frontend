import Image from "next/image";
import { forwardRef } from "react";
import { Badge, Text, Title } from "rizzui";
import { usePathname } from "next/navigation";
import { getStatusColor, InvoiceDetailsListTable } from "./invoice-details";
import { QRCodeSVG } from "qrcode.react";
import { formatDate } from "@core/utils/format-date";
import { siteConfig } from "@/config/site.config";
import { InvoiceTypes } from "@core/types";

interface InvoicePrintProps {
  invoice: InvoiceTypes;
}

export const InvoicePrint = forwardRef<HTMLDivElement, InvoicePrintProps>(
  ({ invoice }, ref) => {
    const pathname = usePathname();
    return (
      <div className="hidden">
        <div ref={ref}>
          <div className="print-container px-5">
            <table className="w-full">
              <thead>
                <tr>
                  <td>
                    <div className="h-10"></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10 print:p-8 print:rounded-none print:border-0">
                      <div className="mb-12 flex items-center justify-between md:mb-16 print:mb-12 print:items-start">
                        <div>
                          <Image
                            src={siteConfig.logo}
                            alt={siteConfig.title}
                            className="dark:invert"
                            priority
                          />
                        </div>
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
                          <Text className="mt-0.5 text-gray-500">
                            Invoice Number
                          </Text>
                        </div>
                      </div>

                      <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1 print:mb-12">
                        <div className="">
                          <Title as="h6" className="mb-3.5 font-semibold">
                            From
                          </Title>
                          <Text className="mb-6 text-sm font-semibold uppercase">
                            Adaired Digital Media
                          </Text>
                          <div>
                            <Text className="mb-2 text-sm font-semibold">
                              Creation Date
                            </Text>
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
                            <Text className="mb-2 text-sm font-semibold">
                              Due Date
                            </Text>
                            <Text>{formatDate(invoice.dueDate)}</Text>
                          </div>
                        </div>

                        <div className="mt-4 flex sm:mt-6 md:mt-0 md:justify-end print:mt-0 print:justify-end">
                          <QRCodeSVG
                            value={`${pathname}?invoiceNumber=${invoice.invoiceNumber}`}
                            className="h-28 w-28 lg:h-32 lg:w-32"
                          />
                        </div>
                      </div>

                      <InvoiceDetailsListTable order={invoice.orderId} />

                      <div className="flex flex-col-reverse gap-40 items-start justify-between border-t border-muted pb-4 pt-8 xs:flex-row print:pt-10 print:pb-6">
                        <div className="mt-6 max-w-md pe-4 xs:mt-0 print:mt-0">
                          <Title
                            as="h6"
                            className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm print:text-sm"
                          >
                            Notes
                          </Title>
                          <Text className="leading-[1.7]">
                            We appreciate your business, and hope to be working
                            with you again very soon!
                          </Text>
                        </div>
                        <div className="w-full max-w-sm">
                          <Text className="flex items-center justify-between border-b border-muted pb-3.5 lg:pb-5 print:py-4 text-sm">
                            Subtotal:{" "}
                            <Text as="span" className="font-semibold">
                              ${invoice.totalAmount}
                            </Text>
                          </Text>
                          <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5 print:py-4 text-sm">
                            Discount:{" "}
                            <Text as="span" className="font-semibold">
                              ${invoice.discountAmount}
                            </Text>
                          </Text>

                          <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5 print:pt-4">
                            Total: <Text as="span">${invoice.finalAmount}</Text>
                          </Text>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div className="h-16 print:h-8"></div>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="fixed bottom-4 start-0 mt-6 w-full border-t border-muted pt-4 text-center text-sm text-gray-900 print:bottom-2 print:mt-4">
            <span className="font-bold">Adaired Digital Media</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InvoicePrint.displayName = "InvoicePrint";

'use client';

import InvoiceDetails from '@/app/shared/ecommerce/invoice/invoice-details';
import PrintButton from '@/app/shared/print-button';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import DownloadButton from '@/app/shared/download-button';
import { useAtom } from 'jotai';
import { invoicesAtom } from '@/store/atoms/invoices.atom';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Loader, Text } from 'rizzui';
import toast from 'react-hot-toast';

interface InvoiceDetailsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function InvoiceDetailsPage({
  searchParams,
}: InvoiceDetailsProps) {
  const invoiceNumber = Array.isArray(searchParams.invoiceNumber)
    ? searchParams.invoiceNumber[0]
    : searchParams.invoiceNumber || '';

  const [invoices] = useAtom(invoicesAtom);
  const [invoice, setInvoice] = useState(
    invoices.find((inv: any) => inv.invoiceNumber === invoiceNumber)
  );
  const printRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/invoices/download?invoiceNumber=${invoiceNumber}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          responseType: 'blob',
        }
      );

      // Check content type
      const contentType = response.headers['content-type'];
      if (!contentType.includes('application/pdf')) {
        // Attempt to parse error response as JSON
        const text = await response.data.text();
        let errorMessage = 'Invalid response type: Expected application/pdf';
        try {
          const json = JSON.parse(text);
          errorMessage = json.message || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        throw new Error(errorMessage);
      }

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_${invoiceNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to download PDF. Please try again.';
      toast.error(message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!invoiceNumber) {
        toast.error('Missing invoice number');
        return;
      }

      // Skip fetch if invoice is already in state
      const existingInvoice = invoices.find(
        (inv: any) => inv.invoiceNumber === invoiceNumber
      );
      if (existingInvoice) {
        setInvoice(existingInvoice);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/invoices/getUserInvoices?invoiceNumber=${invoiceNumber}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );
        setInvoice(res.data.data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    // Fetch invoice data when the component mounts or when invoiceNumber changes
    if (session?.user?.accessToken) {
      fetchData();
    }
  }, [invoiceNumber, invoices, session?.user?.accessToken]);

  const pageHeader = {
    title: `Invoice Details`,
    breadcrumb: [
      {
        href: routes.userDashboard.dashboard,
        name: 'Dashboard',
      },
      {
        href: routes.userDashboard.invoices,
        name: 'Invoices',
      },
      {
        name: `${invoiceNumber}`,
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="print-hidden mt-4 flex items-center gap-3 @lg:mt-0">
          <PrintButton onClick={handlePrint} />
          <DownloadButton onClick={handleDownloadPDF} />
        </div>
      </PageHeader>

      {invoice ? (
        <InvoiceDetails invoice={invoice} printRef={printRef} />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          <Loader size="lg" variant="spinner" />

          <Text className="ml-4 mt-5">Loading invoice...</Text>
        </div>
      )}
    </>
  );
}

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import InvoiceTable from '@/app/shared/ecommerce/invoice/invoice-list/table';
import { metaObject } from '@/config/site.config';
import { auth } from '@/auth';

// Centralized API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI;

// Fetch endpoints configuration
const ENDPOINTS = {
  invoices: '/invoices/getUserInvoices',
};

const fetchData = async (
  endpoint: string,
  accessToken: string,
  tag: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: [tag],
      },
    });

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${tag}:`, error);
    return [];
  }
};

export const metadata = {
  ...metaObject('Invoices'),
};

const pageHeader = {
  title: 'Invoice List',
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
      name: 'List',
    },
  ],
};

export default async function InvoiceListPage() {
  const session = await auth();
  if (!session) throw new Error('User session is not available.');
  const accessToken = session?.user?.accessToken || '';
  const [invoices] = await Promise.all([
    fetchData(ENDPOINTS.invoices, accessToken, 'invoices'),
  ]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <InvoiceTable initialInvoices={invoices} session={session} />
    </>
  );
}

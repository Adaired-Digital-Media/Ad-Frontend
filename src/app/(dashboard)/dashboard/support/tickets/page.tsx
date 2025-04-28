import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import SupportDashboard from '@/app/shared/support/dashboard';
import { auth } from '@/auth';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import CreateTicket from '@/app/shared/support/dashboard/tickets/create-ticket';

export const metadata = {
  ...metaObject('Support'),
};

const pageHeader = {
  title: 'Support Inbox',
  breadcrumb: [
    {
      href: routes.userDashboard.dashboard,
      name: 'Dashboard',
    },
    {
      href: routes.userDashboard.tickets,
      name: 'Support',
    },
    {
      name: 'Tickets',
    },
  ],
};

// Centralized API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI;

// Fetch endpoints configuration
const ENDPOINTS = {
  tickets: '/tickets/read',
  stats: '/tickets/stats',
};

// Generic fetch function with error handling
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

    if (!response.ok) {
      throw new Error(`Failed to fetch ${tag}: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${tag}:`, error);
    return [];
  }
};

const TicketsPage = async () => {
  const session = await auth();
  if (!session) return;

  // Parallel data fetching
  const [tickets, stats] = await Promise.all([
    fetchData(ENDPOINTS.tickets, session?.user?.accessToken ?? '', 'tickets'),
    fetchData(
      ENDPOINTS.stats,
      session?.user?.accessToken ?? '',
      'ticket_stats'
    ),
  ]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton
          label="Raise Ticket"
          view={<CreateTicket session={session} />}
        />
      </PageHeader>
      <SupportDashboard tickets={tickets} stats={stats} session={session} />
    </>
  );
};

export default TicketsPage;

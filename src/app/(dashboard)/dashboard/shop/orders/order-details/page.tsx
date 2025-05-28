import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import OrderView from '@/app/shared/ecommerce/order/order-view';
import axios from 'axios';
import { auth } from '@/auth';

async function fetchOrder(orderNumber: string) {
  const session = await auth();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/orders/getUserOrders?orderNumber=${orderNumber}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  const data = res.data.data;
  return data;
}

interface OrderDetailsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function OrderDetailsPage({
  searchParams,
}: OrderDetailsPageProps) {
  const session = await auth();
  if (!session) {
    throw new Error('User session is not available.');
  }

  const orderNumber = Array.isArray(searchParams.orderNumber)
    ? searchParams.orderNumber[0]
    : searchParams.orderNumber || '';

  const pageHeader = {
    title: `Order #${orderNumber}`,
    breadcrumb: [
      {
        href: routes.userDashboard.dashboard,
        name: 'Dashboard',
      },
      {
        href: routes.eCommerce.orders,
        name: 'Orders',
      },
      {
        name: orderNumber,
      },
    ],
  };

  const order = await fetchOrder(orderNumber);

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        isDashboard
      />
      <OrderView order={order} session={session} />
    </>
  );
}

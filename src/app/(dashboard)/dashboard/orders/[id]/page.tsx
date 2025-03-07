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

export default async function OrderDetailsPage({ params }: any) {
  const session = await auth();
  const pageHeader = {
    title: `Order #${params.id}`,
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
        name: params.id,
      },
    ],
  };

  const order = await fetchOrder(params.id);

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        isDashboard
      >
        {/* <Link
          href={routes.eCommerce.editOrder(params.id)}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            Edit Order
          </Button>
        </Link> */}
      </PageHeader>
      <OrderView order={order} session={session} />
    </>
  );
}

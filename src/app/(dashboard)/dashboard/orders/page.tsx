import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import OrdersTable from '@/app/shared/ecommerce/order/order-list/table';
import { PiShoppingCart } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import { auth } from '@/auth';
import axios from 'axios';

export const metadata = {
  ...metaObject('Orders'),
};

const pageHeader = {
  title: 'Orders',
  breadcrumb: [
    {
      href: routes.userDashboard.dashboard,
      name: 'Dashboard',
    },
    {
      href: routes.userDashboard.orders,
      name: 'Orders',
    },
    {
      name: 'List',
    },
  ],
};

async function fetchOrders() {
  const session = await auth();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/orders/getUserOrders`,
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

export default async function OrdersPage() {
  const orders = await fetchOrders();
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        isDashboard
      >
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes?.eCommerce?.products}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiShoppingCart className="me-1.5 h-[17px] w-[17px]" />
              Shop Now
            </Button>
          </Link>
        </div>
      </PageHeader>

      <OrdersTable orderData={orders} />
    </>
  );
}

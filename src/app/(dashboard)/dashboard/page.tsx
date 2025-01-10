import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import { auth } from '@/auth';
import axios from 'axios';

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

export default async function DashboardPage() {
  const session = await auth();
  const orders = await fetchOrders();

  return <EcommerceDashboard session={session} ordersData={orders} />;
}

import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import { auth } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();

  return <EcommerceDashboard session={session} />;
}

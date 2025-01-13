import { cn } from '@core/utils/class-names';
import SmallWidthContainer from '@/app/(website)/components/SmallWidthContainer';
import { Button } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
interface OrderConfirmedProps {
  params: {
    id: string;
  };
}

const OrderConfirmed: React.FC<OrderConfirmedProps> = ({ params }) => {
  const { id } = params;

  return (
    <SmallWidthContainer className="h-dvh">
      <div
        className={cn(
          `m-auto max-w-2xl space-y-10 rounded-lg px-36 py-6 shadow-xl`
        )}
      >
        <div></div>
        <div className={cn(`space-y-2 text-center`)}>
          <h1>Order Confirmed</h1>
          <h3>Thank you for your purchase!</h3>
          <p>
            Your Order Number: <strong>{id}</strong>
          </p>
          <p>You will receive an email with your order details shortly.</p>
        </div>
        <div className={cn(`flex items-center justify-center gap-16`)}>
          <Link href={routes.userDashboard.orders}>
            <Button
              variant="outline"
              className="w-full border-[#ccc] sm:w-auto"
            >
              View Orders
            </Button>
          </Link>
          <Link href={routes.eCommerce.products}>
            <Button className="w-full bg-[#f39019] sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </SmallWidthContainer>
  );
};

export default OrderConfirmed;

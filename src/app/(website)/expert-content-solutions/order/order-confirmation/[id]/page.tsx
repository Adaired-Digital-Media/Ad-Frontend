import { cn } from '@core/utils/class-names';
import SmallWidthContainer from '@/app/(website)/components/SmallWidthContainer';
import { Button } from 'rizzui';
interface OrderConfirmedProps {
  params: {
    id: string;
  };
}

const OrderConfirmed: React.FC<OrderConfirmedProps> = ({ params }) => {
  const { id } = params;

  return (
    <SmallWidthContainer className="h-dvh ">
      <div
        className={cn(`max-w-2xl space-y-10 rounded-lg px-36 py-6 shadow-xl m-auto`)}
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
        <div className={cn(`flex items-center gap-16 justify-center`)}>
          <Button variant="outline" className="w-full sm:w-auto border-[#ccc]">
            View Orders
          </Button>
          <Button className="w-full sm:w-auto bg-[#f39019]">Continue Shopping</Button>
        </div>
      </div>
    </SmallWidthContainer>
  );
};

export default OrderConfirmed;

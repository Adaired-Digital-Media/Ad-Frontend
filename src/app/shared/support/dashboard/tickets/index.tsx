import TicketsTable from "@/app/shared/support/dashboard/tickets/table";
import { Ticket } from '@/types/tickets.types';
import WidgetCard from '@core/components/cards/widget-card';
import { cn } from '@core/utils/class-names';
import { Session } from 'next-auth';

export default function PendingShipments({
  className,
  tickets,
  session,
}: {
  className?: string;
  tickets: Ticket[];
  session: Session;
}) {
  return (
    <WidgetCard
      title="Tickets"
      descriptionClassName="mt-2"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7 items-center"
      description="Summary of the tickets raised by you...."
    >
      <TicketsTable tickets={tickets} session={session}/>
    </WidgetCard>
  );
}

import { Ticket } from '@/types/tickets.types';
import StatCards from './stat-cards';
import TicketsTable from "./tickets";
import { Session } from 'next-auth';

export default function SupportDashboard({
  tickets,
  stats,
  session,
}: {
  tickets: Ticket[];
  stats: any;
  session: Session;
}) {
  return (
    <div className="@container">
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <StatCards
          className="col-span-full @xl:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4"
          initialStats={stats}
        />

        <TicketsTable
          className="col-span-full"
          tickets={tickets}
          session={session}
        />
      </div>
    </div>
  );
}

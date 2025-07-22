import MetricCard from '@/@core/components/cards/metric-card';
import TagIcon from '@/@core/components/icons/tag';
import TagIcon2 from '@/@core/components/icons/tag-2';
import TagIcon3 from '@/@core/components/icons/tag-3';
import TicketIcon from '@/@core/components/icons/ticket';
import { cn } from '@/@core/utils/class-names';

const StatCards = ({
  className,
  initialStats,
}: {
  className?: string;
  initialStats: any;
}) => {
  const ticketStats = [
    {
      id: 1,
      icon: <TicketIcon className="h-full w-full" />,
      title: 'Total Raised Tickets',
      metric:
        'totalTicketsRaised' in initialStats
          ? initialStats.totalTicketsRaised
          : 0,
    },
    {
      id: 1,
      icon: <TagIcon className="h-full w-full" />,
      title: 'Open Tickets',
      metric: 'openTickets' in initialStats ? initialStats.openTickets : 0,
    },
    {
      id: 1,
      icon: <TagIcon2 className="h-full w-full" />,
      title: 'Closed Tickets',
      metric:
        'closedTickets' in initialStats ? initialStats.closedTickets : 0,
    },
    {
      id: 1,
      icon: <TagIcon3 className="h-full w-full" />,
      title: 'Re-Opened Tickets',
      metric:
        'reopenedTickets' in initialStats
          ? initialStats.reopenedTickets
          : 0,
    },
  ];

  return (
    <>
      <div
        className={cn('4xl-gap-9 grid grid-cols-1 gap-5 3xl:gap-8', className)}
      >
        {ticketStats.map((stat) => (
          <MetricCard
            key={stat.title + stat.id}
            title={stat.title}
            metric={stat.metric}
            icon={stat.icon}
            iconClassName="bg-transparent w-11 h-11"
          />
        ))}
      </div>
    </>
  );
};

export default StatCards;

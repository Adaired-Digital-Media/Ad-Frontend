import { cn } from '@core/utils/class-names';
import { Badge, Flex, Text } from 'rizzui';
import { replaceUnderscoreDash } from '@core/utils/replace-underscore-dash';

const statusColors = {
  success: ['text-green-dark', 'bg-green-dark'],
  warning: ['text-orange-dark', 'bg-orange-dark'],
  danger: ['text-red-dark', 'bg-red-dark'],
  default: ['text-gray-600', 'bg-gray-600'],
};

const allStatus = {
  online: statusColors.success,
  offline: statusColors.default,
  overdue: statusColors.danger,
  publish: statusColors.success,
  approved: statusColors.success,
  rejected: statusColors.danger,
  active: statusColors.success,
  deactivated: statusColors.danger,
  on_going: statusColors.warning,
  at_risk: statusColors.danger,
  delayed: statusColors.default,
  draft: statusColors.default,

  // Orders Status
  pending: statusColors.warning,
  processing: statusColors.warning,
  confirmed: statusColors.warning,
  completed: statusColors.success,
  cancelled: statusColors.danger,

  // Order Payment Status
  unpaid: statusColors.warning,
  paid: statusColors.success,
  refunded: statusColors.danger,
  failed: statusColors.danger,
};

export type StatusTypes = keyof typeof allStatus;

export function getStatusBadge(status: string) {
  const statusLower = status.toLowerCase() as StatusTypes;
  if (statusLower in allStatus) {
    return (
      <Flex align="center" gap="2" className="w-auto">
        <Badge renderAsDot className={allStatus[statusLower][1]} />
        <Text
          className={cn('font-medium capitalize', allStatus[statusLower][0])}
        >
          {replaceUnderscoreDash(statusLower)}
        </Text>
      </Flex>
    );
  }
  return (
    <Flex align="center" gap="2" className="w-auto">
      <Badge renderAsDot className="bg-gray-600" />
      <Text className="font-medium capitalize text-gray-600">
        {replaceUnderscoreDash(statusLower)}
      </Text>
    </Flex>
  );
}

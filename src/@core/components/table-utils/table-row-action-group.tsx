import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import { ActionIcon, Flex, Tooltip } from 'rizzui';
import Link from 'next/link';
import { cn } from '@core/utils/class-names';
import DeletePopover from '../delete-popover';

export default function TableRowActionGroup({
  onDelete,
  editUrl,
  viewUrl ,
  deletePopoverTitle = 'Delete the appointment',
  deletePopoverDescription = 'Are you sure you want to delete this item?',
  className,
}: {
  onDelete?: () => void;
  editUrl?: string;
  viewUrl?: string;
  deletePopoverTitle?: string;
  deletePopoverDescription?: string;
  className?: string;
}) {
  return (
    <Flex
      align="center"
      justify="end"
      gap="3"
      className={cn('pe-3', className)}
    >
      {editUrl && (
        <Tooltip size="sm" content="Edit" placement="top" color="invert">
          {typeof editUrl === 'string' ? (
            <Link href={editUrl.toString()}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="Edit Item"
              >
                <PencilIcon className="size-4" />
              </ActionIcon>
            </Link>
          ) : (
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="Edit Item"
              onClick={editUrl}
            >
              <PencilIcon className="size-4" />
            </ActionIcon>
          )}
        </Tooltip>
      )}
      {viewUrl && (
        <Tooltip size="sm" content="View Item" placement="top" color="invert">
          <Link href={viewUrl}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="View item"
            >
              <EyeIcon className="size-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
      )}
      {onDelete && (
        <DeletePopover
          title={deletePopoverTitle}
          description={deletePopoverDescription}
          onDelete={onDelete}
        />
      )}
    </Flex>
  );
}

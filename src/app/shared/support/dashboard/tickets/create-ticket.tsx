'use client';

import { useCallback, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  Button,
  ActionIcon,
  Title,
  Textarea,
  Text,
  Switch,
} from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useAtom } from 'jotai';
import toast from 'react-hot-toast';
import { Session } from 'next-auth';
import { ticketActionsAtom } from '@/store/atoms/tickets.atom';
import {
  CreateTicketInput,
  createTicketSchema,
} from '@/validators/create-tickets.schema';
import { useRouter } from 'next/navigation';
import { FileInput } from '@/app/shared/file-input';
import { routes } from '@/config/routes';

export default function CreateTicket({ session }: { session: Session }) {
  const router = useRouter();
  const { closeModal } = useModal();
  const [, dispatch] = useAtom(ticketActionsAtom);
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [includeAttachments, setIncludeAttachments] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketInput>({
    defaultValues: {
      subject: '',
      description: '',
      attachments: '',
    },
    resolver: zodResolver(createTicketSchema),
  });

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const onSubmit: SubmitHandler<CreateTicketInput> = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const accessToken = session?.user?.accessToken || '';
        const newTicket = await dispatch({
          type: 'create',
          token: accessToken,
          payload: {
            subject: data.subject,
            description: data.description,
            attachments: files.length > 0 && files,
          },
        });
        if (newTicket.success) {
          toast.success('Ticket Raised successfully');
          router.push(routes.userDashboard.inbox(newTicket.data.ticketId));
          closeModal();
          reset({ subject: '', description: '' });
        }
      } catch (error) {
        toast.error('Failed to raise ticket. ');
        console.error('Failed to raise ticket : ', error);
      } finally {
        setLoading(false);
      }
    },
    [closeModal, reset, session?.user?.accessToken]
  );
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
      >
        <div className="flex items-center justify-between">
          <Title as="h4" className="font-semibold">
            Raise a ticket
          </Title>
          <ActionIcon size="sm" variant="text" onClick={closeModal}>
            <PiXBold className="h-auto w-5" />
          </ActionIcon>
        </div>
        <Input
          label="Subject"
          placeholder="e.g. Issue related to order."
          {...register('subject')}
          error={errors.subject?.message}
          disabled={isSubmitting}
        />
        <Textarea
          label="Description"
          placeholder="e.g. What is the status of my order"
          {...register('description')}
          error={errors.description?.message}
          disabled={isSubmitting}
        />

        <Switch
          label="Include Attachments"
          checked={includeAttachments}
          labelClassName="text-sm font-medium text-gray-700 dark:text-gray-200"
          size="sm"
          color="primary"
          variant="flat"
          labelPlacement="right"
          onChange={() => setIncludeAttachments(!includeAttachments)}
        />

        {includeAttachments && (
          <div>
            <Text as="strong">Attachments :</Text>
            <FileInput
              className="mt-1 w-full"
              containerClassName="min-h-20"
              wrapperClassName=""
              label={''}
              iconClassName="!h-14 !w-14"
              onFilesSelected={handleFilesSelected}
            />
          </div>
        )}
        <Text>
          <strong>Note:</strong> For orders related queries please mention{' '}
          <strong>Order No.</strong>
        </Text>
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="outline"
            onClick={closeModal}
            className="w-full @xl:w-auto"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading || isSubmitting}
            className="w-full @xl:w-auto"
          >
            Raise
          </Button>
        </div>
      </form>
    </>
  );
}

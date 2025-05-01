'use client';

import { useAtom } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import { Session } from 'next-auth';
import MessageDetails from './message-details';
import {
  ticketActionsAtom,
  ticketsAtom,
  currentTicketAtom,
} from '@/store/atoms/tickets.atom';
import { Loader, Text } from 'rizzui';

export default function SupportInbox({
  initialTicketId,
  session,
}: {
  initialTicketId: string;
  session: Session;
}) {
  const [tickets] = useAtom(ticketsAtom);
  const [currentTicket, setCurrentTicket] = useAtom(currentTicketAtom);
  const [, dispatch] = useAtom(ticketActionsAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track if we've already set the ticket
  const initializedRef = useRef(false);

  // Find ticket in existing list or fetch if not found
  useEffect(() => {
    if (!initialTicketId || !session?.user?.accessToken) return;

    // Only run this effect once unless ticketId changes
    if (initializedRef.current && currentTicket?.ticketId === initialTicketId) {
      return;
    }

    const existingTicket = tickets.find((t) => t.ticketId === initialTicketId);
    if (existingTicket) {
      setCurrentTicket(existingTicket);
      initializedRef.current = true;
      return;
    }

    const fetchTicket = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await dispatch({
          type: 'fetchSingle',
          token: session.user.accessToken!,
          payload: { ticketId: initialTicketId },
        });
        initializedRef.current = true;
      } catch (err) {
        setError('Failed to load ticket. Please try again.');
        console.error('Error fetching ticket:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [
    initialTicketId,
    session?.user?.accessToken,
    tickets,
    dispatch,
    setCurrentTicket,
    currentTicket?.ticketId,
  ]);

  if (isLoading || !currentTicket) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader variant="spinner" size="xl" />
        <Text className="mt-2">Loading ticket details...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Text className="text-red-500">{error}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="@container">
      <div className="mt-2 items-start @container @4xl:grid @4xl:grid-cols-12 @4xl:gap-7 @[1550px]:grid-cols-11">
        <MessageDetails
          session={session}
          selectedTicket={currentTicket}
          className="hidden @4xl:col-span-full @4xl:block @[1550px]:col-span-full"
        />
      </div>
    </div>
  );
}

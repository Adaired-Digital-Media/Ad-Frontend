"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import io, { Socket } from "socket.io-client";
import { Session } from "next-auth";
import { ticketsAtom, currentTicketAtom } from "@/store/atoms/tickets.atom";
import { Ticket, TicketMessage } from "@/types/tickets.types";
import toast from "react-hot-toast";

interface WebSocketClientProps {
  session: Session;
  ticketId: string;
  onTyping: (userId: string) => void;
  onStopTyping: (userId: string) => void;
  onMessageRead: (messageId: string, userId: string) => void;
  onUserTyping?: () => void; // Added to emit typing event
  onUserStopTyping?: () => void; // Added to emit stop typing event
}

export default function WebSocketClient({
  session,
  ticketId,
  onTyping,
  onStopTyping,
  onMessageRead,
  onUserTyping,
  onUserStopTyping,
}: WebSocketClientProps) {
  const [, setTickets] = useAtom(ticketsAtom);
  const [, setCurrentTicket] = useAtom(currentTicketAtom);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!session?.user?.accessToken || !ticketId) return;

    // Initialize Socket.IO client
    socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_API_URI!, {
      auth: {
        token: `Bearer ${session.user.accessToken}`,
      },
    });

    const socket = socketRef.current;

    // Handle connection
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("joinTicket", { ticketId });
    });

    // Handle join confirmation
    socket.on("joinedTicket", ({ ticketId }: { ticketId: string }) => {
      console.log(`Joined ticket room ${ticketId}`);
    });

    // Handle new message
    socket.on(
      "newMessage",
      ({ ticketId, message }: { ticketId: string; message: TicketMessage }) => {
        setTickets((prev) =>
          prev.map((t) =>
            t._id === ticketId ? { ...t, messages: [...t.messages, message] } : t
          )
        );
        setCurrentTicket((prev) =>
          prev?._id === ticketId
            ? { ...prev, messages: [...prev.messages, message] }
            : prev
        );
        toast.success("New message received");

        // Emit read message event when a new message is received
        socket.emit("readMessage", { ticketId, messageId: message._id });
      }
    );

    // Handle ticket update
    socket.on(
      "ticketUpdated",
      ({ ticketId, updates }: { ticketId: string; updates: Partial<Ticket> }) => {
        setTickets((prev) =>
          prev.map((t) => (t._id === ticketId ? { ...t, ...updates } : t))
        );
        setCurrentTicket((prev) =>
          prev?._id === ticketId ? { ...prev, ...updates } : prev
        );
        toast.success("Ticket updated");
      }
    );

    // Handle ticket deletion
    socket.on("ticketDeleted", ({ ticketId }: { ticketId: string }) => {
      setTickets((prev) => prev.filter((t) => t._id !== ticketId));
      setCurrentTicket(null);
      toast.success("Ticket deleted");
    });

    // Handle typing indicator
    socket.on(
      "userTyping",
      ({ userId, ticketId }: { userId: string; ticketId: string }) => {
        if (ticketId === ticketId) {
          onTyping(userId);
        }
      }
    );

    // Handle stop typing
    socket.on(
      "userStoppedTyping",
      ({ userId, ticketId }: { userId: string; ticketId: string }) => {
        if (ticketId === ticketId) {
          onStopTyping(userId);
        }
      }
    );

    // Handle message read
    socket.on(
      "messageRead",
      ({
        ticketId,
        messageId,
        userId,
      }: {
        ticketId: string;
        messageId: string;
        userId: string;
      }) => {
        if (ticketId === ticketId) {
          onMessageRead(messageId, userId);
          setTickets((prev) =>
            prev.map((t) =>
              t._id === ticketId
                ? {
                    ...t,
                    messages: t.messages.map((m) =>
                      m._id.toString() === messageId
                        ? {
                            ...m,
                            readBy: m.readBy ? [...m.readBy, userId] : [userId],
                          }
                        : m
                    ),
                  }
                : t
            )
          );
          setCurrentTicket((prev) =>
            prev?._id === ticketId
              ? {
                  ...prev,
                  messages: prev.messages.map((m) =>
                    m._id.toString() === messageId
                      ? {
                          ...m,
                          readBy: m.readBy ? [...m.readBy, userId] : [userId],
                        }
                      : m
                  ),
                }
              : prev
          );
        }
      }
    );

    // Handle errors
    socket.on("error", ({ message }: { message: string }) => {
      toast.error(message);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      console.log("Disconnected from WebSocket server");
    };
  }, [session, ticketId, onTyping, onStopTyping, onMessageRead, setTickets, setCurrentTicket]);

  // Function to emit typing event
  const emitTyping = () => {
    if (socketRef.current && onUserTyping) {
      socketRef.current.emit("typing", { ticketId });
      onUserTyping();
    }
  };

  // Function to emit stop typing event
  const emitStopTyping = () => {
    if (socketRef.current && onUserStopTyping) {
      socketRef.current.emit("stopTyping", { ticketId });
      onUserStopTyping();
    }
  };

  // Function to emit read message event
  const emitReadMessage = (messageId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("readMessage", { ticketId, messageId });
    }
  };

  return null; // This component doesn't render anything
}
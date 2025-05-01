import { z } from 'zod';

// form zod validation schema
export const createTicketSchema = z.object({
  _id: z.string().optional(),
  subject: z.string().min(1, { message: 'Subject is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  attachments: z.any().optional(),
});

// generate form types from zod validation schema
export type CreateTicketInput = z.infer<typeof createTicketSchema>;

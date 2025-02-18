import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

export const zohoLeadsSchema = z.object({
  company: z.string().min(2, {
    message: messages.companyNameIsRequired,
  }),
  salutation: z.string().optional(),
  first_name: z.string().min(2, {
    message: messages.firstNameRequired,
  }),
  last_name: z.string().min(2, {
    message: messages.lastNameRequired,
  }),
  email: validateEmail,
  lead_source: z.string().min(2, {
    message: messages.leadSourceRequired,
  }),
  phone: z.string().min(10, {
    message: messages.phoneNumberIsRequired,
  }),
  website: z.string().optional(),
  service: z.string().min(2, {
    message: messages.serviceRequired,
  }),
  country: z.string().min(2, {
    message: messages.countryIsRequired,
  }),
  agent: z.string().min(2, {
    message: messages.agentNameRequired,
  }),
  description: z.string().optional(),
});

export type ZohoLeadInput = z.infer<typeof zohoLeadsSchema>;

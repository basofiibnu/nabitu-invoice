import { z } from 'zod';
import { invoiceSchema } from './schema';

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

export type InvoiceItem = {
  created_at: string;
  name: string;
  number: string;
  dueDate: string;
  amount: string;
  status: 'Paid' | 'Unpaid' | 'Pending';
  updated_at: string;
  uuid: string;
};

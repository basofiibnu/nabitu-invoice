import { z } from 'zod';

export const invoiceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.string().min(1, 'Invoice number is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((value) => !isNaN(Number(value.replace(/,/g, ''))), {
      message: 'Amount must be a valid number',
    }),
  status: z.enum(['Pending', 'Paid', 'Unpaid']),
});

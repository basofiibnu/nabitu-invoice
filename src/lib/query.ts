import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { InvoiceFormData } from '@/lib/types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const useInvoices = (search: string, status: string) => {
  return useQuery({
    queryKey: ['invoices', search, status],
    queryFn: async () => {
      let query = supabase.from('invoices').select('*');
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      if (status && status !== 'All Status') {
        query = query.eq('status', status);
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useDetailInvoice = (uuid: string) => {
  return useQuery({
    queryKey: ['invoice', uuid],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('uuid', uuid)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useAddInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, InvoiceFormData>({
    mutationFn: async (newInvoice: InvoiceFormData) => {
      const { error } = await supabase
        .from('invoices')
        .insert(newInvoice);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
    onError: (error) => {
      console.error('Error creating invoice:', error);
    },
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (invoiceId: string) => {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('uuid', invoiceId);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
    onError: (error) => {
      console.error('Error deleting invoice:', error);
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { id: string; data: Partial<InvoiceFormData> }
  >({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase
        .from('invoices')
        .update(data)
        .eq('uuid', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
    onError: (error) => {
      console.error('Error updating invoice:', error);
    },
  });
};

'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  MenuItem,
  Container,
  Typography,
  Box,
  Grid2,
  Divider,
  InputAdornment,
  Skeleton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormField from '@/components/invoices/FormField';
import CurrencyTextField from '@/components/invoices/CurrencyField';
import Toast from '@/components/invoices/Toast';
import { InvoiceFormData } from '@/lib/types';
import { invoiceSchema } from '@/lib/schema';
import { useDetailInvoice, useUpdateInvoice } from '@/lib/query';
import { useParams, useRouter } from 'next/navigation';

export default function AddInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data: invoiceData, isLoading: isLoadingInvoice } =
    useDetailInvoice(id as string);

  const {
    mutate: updateInvoice,
    isPending,
    isError,
    isSuccess,
    error,
  } = useUpdateInvoice();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  });

  const statusValue = watch('status');

  const onSubmit = (data: InvoiceFormData) => {
    updateInvoice(
      { id: invoiceData.uuid, data: data },
      {
        onSuccess: () => {
          router.push('/invoices/list');
        },
      }
    );
  };

  useEffect(() => {
    if (invoiceData) {
      setValue('amount', invoiceData.amount);
      setValue('name', invoiceData.name);
      setValue('number', invoiceData.number);
      setValue('status', invoiceData.status);
      setValue('dueDate', invoiceData.dueDate.split('T')[0]);
    }
  }, [invoiceData, setValue]);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="text-[26px] font-bold mb-6"
      >
        Edit Invoice
      </Typography>
      <Container className="bg-white rounded-lg shadow-md px-0 mb-10">
        {isLoadingInvoice ? (
          <Box py={'16px'} px={'24px'}>
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                sx={{ fontSize: '1rem' }}
              />
            ))}
          </Box>
        ) : (
          <>
            <Box className="px-6 py-4">
              <Typography
                variant="h6"
                gutterBottom
                className="mb-0 font-semibold text-base leading-6 text-[#1C2434]"
              >
                Invoice Form
              </Typography>
            </Box>
            <Divider />
            <Box className="px-6 py-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormField
                      name="name"
                      control={control}
                      label="Name"
                      placeholder="Enter your invoice name"
                      error={!!errors.name}
                      helperText={
                        errors.name ? errors.name.message : ''
                      }
                      required
                      disabled={isPending}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormField
                      name="number"
                      control={control}
                      label="Invoice Number"
                      placeholder="Enter your invoice number"
                      error={!!errors.number}
                      helperText={
                        errors.number ? errors.number.message : ''
                      }
                      required
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormField
                      name="dueDate"
                      control={control}
                      label="Due Date"
                      type="date"
                      error={!!errors.dueDate}
                      helperText={
                        errors.dueDate ? errors.dueDate.message : ''
                      }
                      required
                      disabled={isPending}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <CurrencyTextField
                      name="amount"
                      control={control}
                      label="Amount"
                      placeholder="Enter your invoice amount"
                      error={!!errors.amount}
                      helperText={
                        errors.amount ? errors.amount.message : ''
                      }
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Rp
                          </InputAdornment>
                        ),
                      }}
                      disabled={isPending}
                    />
                  </Grid2>
                  {typeof statusValue !== 'undefined' && (
                    <Grid2 size={{ xs: 12, md: 6 }}>
                      <FormField
                        name="status"
                        control={control}
                        label="Status"
                        select
                        error={!!errors.status}
                        helperText={
                          errors.status ? errors.status.message : ''
                        }
                        required
                        defaultValue={statusValue}
                        disabled={isPending}
                      >
                        <MenuItem value="Select Status" disabled>
                          Select Status
                        </MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Unpaid">Unpaid</MenuItem>
                      </FormField>
                    </Grid2>
                  )}
                </Grid2>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: {
                      xs: 'center',
                      lg: 'flex-end',
                    },
                  }}
                  mt={{
                    xs: 4,
                    lg: 2,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-[#3C50E0] min-w-[260px] px-7 py-3 capitalize font-semibold"
                    disabled={isPending}
                  >
                    {isPending ? 'Submitting...' : 'Edit Invoice'}
                  </Button>
                </Box>
              </form>
            </Box>
          </>
        )}
      </Container>

      {!isPending && isError && (
        <Toast
          type="error"
          message={`Error submitting invoice: ${error?.message}`}
        />
      )}
      {!isPending && isSuccess && (
        <Toast
          type="success"
          message="You can view and manage your invoice in the ‘My Invoices‘ section."
        />
      )}
    </Container>
  );
}

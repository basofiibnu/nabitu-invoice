'use client';

import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormField from '@/components/invoices/FormField';
import CurrencyTextField from '@/components/invoices/CurrencyField';
import Toast from '@/components/invoices/Toast';
import { InvoiceFormData } from '@/lib/types';
import { invoiceSchema } from '@/lib/schema';
import { useAddInvoice } from '@/lib/query';

export default function AddInvoicePage() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const {
    mutate: addInvoice,
    isPending,
    isError,
    isSuccess,
    error,
  } = useAddInvoice();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  });

  const generateInvoiceNumber = () => {
    const generatedNumber = `INV${Math.floor(
      Math.random() * 1000000
    )}`;
    setValue('number', generatedNumber);
    setInvoiceNumber(generatedNumber);
  };

  useEffect(() => {
    generateInvoiceNumber();
  }, []);

  const onSubmit = (data: InvoiceFormData) => {
    addInvoice(data, {
      onSuccess: () => {
        setValue('name', '');
        setValue('dueDate', '');
        setValue('amount', '');
        generateInvoiceNumber();
      },
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="text-[26px] font-bold mb-6"
      >
        Add Invoice
      </Typography>
      <Container className="bg-white rounded-lg shadow-md px-0 mb-10">
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
                  helperText={errors.name ? errors.name.message : ''}
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
                  value={invoiceNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
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
                  defaultValue="Select Status"
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
                {isPending ? 'Submitting...' : '+Add Invoice'}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>

      {!isPending && isError && (
        <Toast
          type="error"
          message={`Error creating invoice: ${error?.message}`}
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

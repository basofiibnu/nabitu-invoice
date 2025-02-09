/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

type FormFieldProps = {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  type?: string;
  select?: boolean;
  children?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  [x: string]: any;
};

const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  placeholder = '',
  type = 'text',
  select = false,
  children,
  error,
  helperText,
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <Box>
      <Typography
        component="label"
        variant="subtitle2"
        className="text-sm font-semibold leading-6"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            variant="outlined"
            fullWidth
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            select={select}
            className="mt-3"
            disabled={disabled}
            sx={{
              '& .MuiInputBase-input': {
                padding: '16px 22px',
                cursor: disabled ? 'not-allowed' : 'text',
                '::placeholder': {
                  color: '#64748B',
                  fontSize: '16px',
                },
              },
              '& .MuiFormHelperText-root': {
                marginLeft: 0,
                marginRight: 0,
                marginTop: '6px',
                fontSize: '14px',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#E2E8F0',
                },
                '&:hover fieldset': {
                  borderColor: disabled ? '#E2E8F0' : '#64748B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: disabled ? '#E2E8F0' : '#64748B',
                  borderWidth: 1,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E2E8F0',
                },
              },
            }}
            {...props}
          >
            {children}
          </TextField>
        )}
      />
    </Box>
  );
};

export default FormField;

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

type CurrencyTextFieldProps = {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  [x: string]: any;
};

const CurrencyTextField: React.FC<CurrencyTextFieldProps> = ({
  name,
  control,
  label,
  placeholder = '',
  error,
  helperText,
  required = false,
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
          <NumericFormat
            {...field}
            customInput={TextField}
            thousandSeparator
            variant="outlined"
            fullWidth
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            className="mt-3"
            valueIsNumericString
            sx={{
              '& .MuiInputBase-input': {
                padding: '16px 22px',
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
                  borderColor: '#64748B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#64748B',
                  borderWidth: 1,
                },
              },
            }}
            {...props}
          />
        )}
      />
    </Box>
  );
};

export default CurrencyTextField;

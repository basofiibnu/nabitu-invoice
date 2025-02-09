import { TextField } from '@mui/material';
import React from 'react';

type SelectFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
};

const SelectField: React.FC<SelectFieldProps> = ({ ...props }) => {
  return (
    <TextField
      type={'text'}
      variant="outlined"
      fullWidth
      placeholder={'Search'}
      sx={{
        '& .MuiInputBase-input': {
          padding: '12px 4px',
          fontSize: '12px',
          color: '#7E7E7E',
          paddingLeft: '16px',
        },
        '& .MuiSelect-select': {
          paddingRight: '60px !important',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          backgroundColor: '#FFF',
          '& fieldset': {
            borderColor: '#FFF',
          },
          '&:hover fieldset': {
            borderColor: '#64748B',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#64748B',
            borderWidth: 1,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFF',
          },
        },
      }}
      select
      {...props}
    >
      {props.children}
    </TextField>
  );
};

export default SelectField;

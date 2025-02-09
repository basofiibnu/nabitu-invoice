import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

type SearchFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
};

const SearchField: React.FC<SearchFieldProps> = ({ ...props }) => {
  return (
    <TextField
      type={'text'}
      variant="outlined"
      fullWidth
      placeholder={'Search'}
      sx={{
        '& .MuiInputBase-input': {
          padding: '12px 4px',
          '::placeholder': {
            color: '#64748B',
            fontSize: '12px',
          },
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
      slotProps={{
        input: {
          sx: {
            fontSize: '12px',
          },
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default SearchField;

import { Check, X } from '@mui/icons-material';
import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'warning';
};

const Toast: React.FC<ToastProps> = ({ type, message }) => {
  return (
    <Container className="p-0">
      {type === 'success' && (
        <Box className="bg-[#E1F9F0] text-white px-10 py-4 rounded-md relative">
          <Box className="absolute top-0 left-0 w-[7px] h-full bg-[#34D399] rounded-md" />
          <Stack
            direction={'row'}
            spacing={'32px'}
            alignItems={'center'}
          >
            <Box className="flex-shrink-0">
              <Box className="bg-[#34D399] w-8 h-8 rounded-md flex items-center justify-center">
                <Check className="text-white" />
              </Box>
            </Box>
            <Box className="ml-3">
              <Typography
                variant="body1"
                className="text-base font-semibold text-[#004434] leading-6"
              >
                Invoice added successfully!
              </Typography>
              <Typography
                variant="body2"
                className="text-base font-normal text-[#637381] leading-6"
              >
                {message}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      {type === 'error' && (
        <Box className="bg-[#f9e3e1] text-white px-10 py-4 rounded-md relative">
          <Box className="absolute top-0 left-0 w-[7px] h-full bg-[#d34434] rounded-md" />
          <Stack
            direction={'row'}
            spacing={'32px'}
            alignItems={'center'}
          >
            <Box className="flex-shrink-0">
              <Box className="bg-[#d34434] w-8 h-8 rounded-md flex items-center justify-center">
                <X className="text-white" />
              </Box>
            </Box>
            <Box className="ml-3">
              <Typography
                variant="body1"
                className="text-base font-semibold text-[#004434] leading-6"
              >
                Add Invoice Error!
              </Typography>
              <Typography
                variant="body2"
                className="text-base font-normal text-[#637381] leading-6"
              >
                {message}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default Toast;

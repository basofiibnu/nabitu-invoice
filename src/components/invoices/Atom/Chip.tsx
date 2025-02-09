import { Box } from '@mui/material';
import React from 'react';

type ChipProps = {
  title: string;
  type: 'Paid' | 'Unpaid' | 'Pending';
};

const Chip: React.FC<ChipProps> = ({ title, type = '' }) => {
  return (
    <>
      {type === 'Paid' && (
        <Box
          className={`px-[14px] py-[4px] rounded-full bg-[#219653] bg-opacity-10 text-[#219653] font-medium text-sm w-max`}
        >
          {title}
        </Box>
      )}
      {type === 'Unpaid' && (
        <Box
          className={`px-[14px] py-[4px] rounded-full bg-[#D34053] bg-opacity-10 text-[#D34053] font-medium text-sm w-max`}
        >
          {title}
        </Box>
      )}
      {type === 'Pending' && (
        <Box
          className={`px-[14px] py-[4px] rounded-full bg-[#FFA70B] bg-opacity-10 text-[#FFA70B] font-medium text-sm w-max`}
        >
          {title}
        </Box>
      )}
    </>
  );
};

export default Chip;

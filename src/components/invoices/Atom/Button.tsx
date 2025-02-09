import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

type ButtonProps = {
  icon: string;
  onClick: () => void;
  isOpened?: boolean;
  background?: string;
  title?: string;
};

const Button: React.FC<ButtonProps> = ({
  icon,
  onClick,
  isOpened = true,
  background = '',
  title = '',
}) => {
  return (
    <button
      className={`p-2 rounded-full ${
        background ? `bg-[${background}]` : 'bg-transparent'
      } hover:bg-[#E2E8F0] transition-colors relative`}
      onClick={onClick}
    >
      {!isOpened && (
        <Box className="w-1 h-1 rounded-full bg-red-600 absolute top-1 right-1" />
      )}
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {icon && (
          <Image
            src={icon}
            alt={'header-button'}
            width={18}
            height={18}
          />
        )}
        {title && (
          <Typography variant="body2" className="text-xs">
            {title}
          </Typography>
        )}
      </Stack>
    </button>
  );
};

export default Button;

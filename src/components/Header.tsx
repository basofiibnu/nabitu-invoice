'use client';

// src/components/Toolbar.tsx
import Image from 'next/image';
import { ThemeSwitch } from './Switch';
import Button from './invoices/Atom/Button';
import Text from './invoices/Atom/Text';
import { Box, Stack } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Header = () => {
  return (
    <header className="flex justify-end items-center bg-white shadow p-4">
      <Stack direction={'row'} alignItems={'center'} gap={'24px'}>
        <ThemeSwitch />
        <Stack direction={'row'} alignItems={'center'} gap={'16px'}>
          <Button
            icon="/alarm.svg"
            onClick={() => {}}
            isOpened={false}
            background="#EFF4FB"
          />
          <Button
            icon="/chat.svg"
            onClick={() => {}}
            isOpened
            background="#EFF4FB"
          />
        </Stack>

        <Stack direction={'row'} alignItems={'center'} gap={'12px'}>
          <Stack direction={'column'} alignItems={'flex-end'}>
            <Text
              className="font-semibold text-sm leading-5"
              caption="John Doe"
            />
            <Text
              className="text-xs text-[#637381] font-semibold leading-4"
              caption="Verified Member"
            />
          </Stack>
          <Image
            src="/profile.png"
            alt="John Doe"
            width={40}
            height={40}
            className="rounded-full"
          />
          <Box>
            <ExpandMore />
          </Box>
        </Stack>
      </Stack>
    </header>
  );
};

export default Header;

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ThemeSwitch } from './Switch';
import Button from './invoices/Button';
import Text from './invoices/Text';
import { Box, Stack, IconButton, Drawer } from '@mui/material';
import { ExpandMore, Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  return (
    <header className="flex justify-between items-center bg-white shadow p-4">
      <Box>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', lg: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ display: { xs: 'block', lg: 'none' } }}
        >
          <Sidebar />
        </Drawer>
      </Box>
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

        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={'12px'}
          className="hidden lg:flex"
        >
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

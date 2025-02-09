'use client';

// src/app/invoices/layout.tsx
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/utils';
import { CssBaseline } from '@mui/material';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function InvoicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Toolbar/Header */}
            <Header />

            {/* Page content */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

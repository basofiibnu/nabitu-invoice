'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import SearchField from '@/components/invoices/SearchField';
import SelectField from '@/components/invoices/SelectField';
import GeneralTable from '@/components/invoices/Table';
import { useInvoices } from '@/lib/query';
import { useDebounce } from '@/utils/utils';
import {
  Box,
  Container,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

export default function MyInvoicesPage() {
  const router = useRouter();
  const query = router?.query || {};
  const [search, setSearch] = useState(
    Array.isArray(query.search) ? query.search[0] : query.search ?? ''
  );
  const [status, setStatus] = useState(
    Array.isArray(query.status)
      ? query.status[0]
      : query.status ?? 'All Status'
  );

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useInvoices(
    debouncedSearch,
    status
  );

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (status) {
      params.set('status', status);
    }
    router?.replace({
      pathname: router.pathname,
      query: params.toString(),
    });
  }, [debouncedSearch, status, router]);

  return (
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'space-between' }}
        alignItems={'center'}
        mb={'24px'}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          className="text-[26px] font-bold"
        >
          My Invoices
        </Typography>

        <Stack direction="row" spacing={3}>
          <Box>
            <SearchField
              value={search}
              onChange={handleSearchChange}
            />
          </Box>
          <Box>
            <SelectField value={status} onChange={handleStatusChange}>
              {['All Status', 'Pending', 'Paid', 'Unpaid'].map(
                (status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    sx={{ fontSize: '12px' }}
                    selected={status === 'All Status'}
                  >
                    {status}
                  </MenuItem>
                )
              )}
            </SelectField>
          </Box>
        </Stack>
      </Stack>
      <Container
        maxWidth="lg"
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {isLoading && <GeneralTable.Skeleton />}
        {!isLoading && !error && data && <GeneralTable data={data} />}
        {!isLoading && error && (
          <Typography
            component={'p'}
            textAlign={'center'}
            variant="body1"
            color="error"
          >
            Error: {error.message}
          </Typography>
        )}
      </Container>
    </Container>
  );
}

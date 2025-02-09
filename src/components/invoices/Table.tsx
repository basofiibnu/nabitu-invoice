'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  Container,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import Chip from './Chip';
import TableSkeleton from './TableSkeleton';
import { InvoiceItem } from '@/lib/types';
import Actions from './Actions';
import { useDeleteInvoice } from '@/lib/query';
import { redirect } from 'next/navigation';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F7F9FC',
    color: '#1C2434',
    fontWeight: '600',
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type GeneralTableProps = {
  data: InvoiceItem[];
  Skeleton?: typeof TableSkeleton;
};

interface GeneralTableComponent extends React.FC<GeneralTableProps> {
  Skeleton: typeof TableSkeleton;
}

const GeneralTable: GeneralTableComponent = ({ data }) => {
  const { mutate: deleteInvoice, isPending } = useDeleteInvoice();

  const handleRedirect = (uuid: string) => {
    redirect(`/invoices/edit/${uuid}`);
  };

  return (
    <Box>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="List">
            <TableHead>
              <TableRow>
                <StyledTableCell>Invoice</StyledTableCell>
                <StyledTableCell>Due Date</StyledTableCell>
                <StyledTableCell align="center">
                  Status
                </StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell align="center">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row) => (
                  <StyledTableRow
                    key={row.uuid}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      <Container className="flex flex-col justify-start px-0">
                        <Typography
                          className="text-base font-regular leading-6 mb-1"
                          variant="body1"
                        >
                          {row.name}
                        </Typography>
                        <Typography className="text-sm font-semibold leading-5">
                          {row.number}
                        </Typography>
                      </Container>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography className="text-base font-regular leading-6">
                        {row.dueDate.split('T')[0]}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack
                        direction="row"
                        justifyContent={'center'}
                      >
                        <Chip title={row.status} type={row.status} />
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography className="text-base font-regular leading-6">
                        Rp {row.amount}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Actions
                        onDelete={deleteInvoice}
                        onEdit={() => handleRedirect(row.uuid)}
                        id={row.uuid}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography
                      component={'p'}
                      textAlign={'center'}
                      variant="body1"
                      color="textSecondary"
                    >
                      No invoices found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

GeneralTable.Skeleton = TableSkeleton;

export default GeneralTable;

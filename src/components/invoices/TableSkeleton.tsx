'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Container,
  Skeleton,
  styled,
  Typography,
} from '@mui/material';

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

const TableSkeleton = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="List">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </StyledTableCell>
            <StyledTableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </StyledTableCell>
            <StyledTableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </StyledTableCell>
            <StyledTableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </StyledTableCell>
            <StyledTableCell align="center">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map((row) => (
            <StyledTableRow
              key={row}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <StyledTableCell component="th" scope="row">
                <Container className="flex flex-col justify-start px-0">
                  <Typography
                    className="text-base font-regular leading-6"
                    variant="body1"
                  >
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                    />
                  </Typography>
                  <Typography className="text-sm font-semibold leading-5">
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                    />
                  </Typography>
                </Container>
              </StyledTableCell>
              <StyledTableCell>
                <Typography className="text-base font-regular leading-6">
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem' }}
                  />
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              </StyledTableCell>
              <StyledTableCell>
                <Typography className="text-base font-regular leading-6">
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem' }}
                  />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;

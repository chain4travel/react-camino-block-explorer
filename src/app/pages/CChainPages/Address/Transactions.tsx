import * as React from 'react';
import { Grid, TableContainer, Box, LinearProgress } from '@mui/material';
import { useInfiniteQuery } from 'react-query';
import Address from './Address';
import CutomTable from 'app/components/Table/CustomTable';
import useWidth from 'app/hooks/useWidth';
import { loadCAddressTransactions } from 'api';
import { useLocation } from 'react-router-dom';

export default function Transactions() {
  const location = useLocation();
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    // error,
  } = useInfiniteQuery(
    '/c-address',
    ({ pageParam = 50 }) =>
      loadCAddressTransactions({
        address: location.pathname.split('/')[3],
        offset: pageParam,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? (allPages.length + 1) * 50 : undefined;
      },
    },
  );

  const intObserver = React.useRef<IntersectionObserver | null>(null);
  const lastPostRef = React.useCallback(
    address => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver(blocks => {
        if (blocks[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (address) intObserver.current.observe(address);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );
  // if (status === 'error') return <p className='center'>Error: {error.message}</p>

  const content = data?.pages.map(pg => {
    return pg.map((transaction, i) => {
      if (pg.length === i + 1) {
        return (
          <Address
            ref={lastPostRef}
            key={transaction.number}
            transaction={transaction}
          />
        );
      }
      return <Address key={transaction.number} transaction={transaction} />;
    });
  });

  const { isDesktop, isWidescreen } = useWidth();
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ width: 1, gap: '20px' }}
      >
        {status === 'success' && data && (
          <TableContainer sx={{ height: '650px' }}>
            {isWidescreen || isDesktop ? (
              <CutomTable columns={columns}>{content}</CutomTable>
            ) : (
              <Grid item container alignItems="center">
                {content}
              </Grid>
            )}
            {isFetchingNextPage && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress color="secondary" />
              </Box>
            )}
          </TableContainer>
        )}
      </Grid>
    </>
  );
}

const columns = [
  {
    name: 'direction',
    label: 'In/Out',
    field: 'direction',
    align: 'left',
  },
  {
    name: 'txnHash',
    label: 'Txn Hash',
    field: 'txnHash',
    align: 'left',
    type: 'hash',
  },
  {
    name: 'block',
    label: 'Block',
    field: 'block',
    align: 'left',
  },
  {
    name: 'age',
    label: 'Age',
    field: 'age',
    align: 'left',
    type: 'timestamp',
  },
  {
    name: 'from',
    label: 'From',
    field: 'from',
    align: 'left',
    type: 'hash',
  },
  {
    name: 'to',
    label: 'To',
    field: 'to',
    align: 'left',
    type: 'hash',
  },
  {
    name: 'value',
    label: 'Value',
    field: 'value',
    align: 'left',
    type: 'currency',
  },
  {
    name: 'txnFee',
    label: 'Txn Fee',
    field: 'txnFee',
    align: 'left',
    type: 'currency',
  },
];

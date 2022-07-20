import * as React from 'react';
import {
  Grid,
  Paper,
  Typography,
  useTheme,
  TableContainer,
  Box,
  LinearProgress,
} from '@mui/material';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import { useInfiniteQuery } from 'react-query';
import CutomTable from 'app/components/Table/CustomTable';
import useWidth from 'app/hooks/useWidth';
import { getXPTransactions } from 'api';
import Transaction from './Transaction';

export default function XPTransactions() {
  const theme = useTheme();
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    // error,
  } = useInfiniteQuery(
    '/xtransactions',
    ({ pageParam = 0 }) =>
      getXPTransactions(
        pageParam,
        '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
      ),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 50 ? (allPages.length + 1) * 50 : undefined;
      },
    },
  );
  const intObserver = React.useRef<IntersectionObserver | null>(null);
  const lastPostRef = React.useCallback(
    transaction => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver(transactions => {
        if (transactions[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (transaction) intObserver.current.observe(transaction);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const content = data?.pages.map(pg => {
    return pg.map((transaction, i) => {
      if (pg.length === i + 1) {
        return (
          <Transaction
            ref={lastPostRef}
            key={transaction.hash}
            transaction={transaction}
          />
        );
      }
      return <Transaction key={transaction.hash} transaction={transaction} />;
    });
  });
  const { isDesktop, isWidescreen } = useWidth();
  return (
    <PageContainer
      pageTitle="X Transactions"
      metaContent="list of transactions x-chain"
    >
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '680px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',

          p: '1.5rem 2rem 1.5rem 2rem',
          [theme.breakpoints.down('md')]: {
            p: '1rem 1.5rem 1rem 1.5rem',
          },
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ width: 1, gap: '20px' }}
        >
          <Grid
            item
            container
            alignItems="center"
            sx={{
              gap: '20px',
            }}
          >
            <BackButton />
            <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
              X-Transactions
            </Typography>
          </Grid>
          {status === 'success' && data && (
            <TableContainer sx={{ height: '650px' }}>
              {isWidescreen || isDesktop ? (
                <CutomTable columns={columns}>{content}</CutomTable>
              ) : (
                <Grid item container alignItems="center">
                  {content}
                </Grid>
              )}
            </TableContainer>
          )}
          {isFetchingNextPage && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress color="secondary" />
            </Box>
          )}
        </Grid>
      </Paper>
    </PageContainer>
  );
}

const columns = [
  {
    name: 'hash',
    label: 'Hash',
    field: 'hash',
    align: 'center',
    type: 'hash',
    // detailsLink: transactionDetails,
  },
  {
    name: 'from',
    label: 'From',
    field: 'from',
    align: 'center',
    type: 'hash',
    // detailsLink: addressDetails,
  },
  {
    name: 'to',
    label: 'To',
    field: 'to',
    align: 'center',
    type: 'hash',
    // detailsLink: addressDetails,
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
    field: 'timestamp',
    align: 'center',
    type: 'timestamp',
  },
  {
    name: 'type',
    label: 'Type',
    field: 'Type',
    align: 'left',
  },
  {
    name: 'fee',
    value: 'fee',
    label: 'Fee',
    align: 'left',
    type: 'currency',
  },
];

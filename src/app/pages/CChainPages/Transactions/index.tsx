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

// import Block from './Block';
import CutomTable from 'app/components/Table/TableView';
import useWidth from 'app/hooks/useWidth';
import { getTransactionsPage } from 'api';
import Transaction from './Transaction';

export default function Transactions() {
  const theme = useTheme();
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    // error,
  } = useInfiniteQuery(
    '/transactions',
    ({ pageParam = NaN }) => getTransactionsPage(pageParam),
    {
      getNextPageParam: lastPage => {
        return lastPage.length
          ? lastPage[lastPage.length - 1].blockNumber - 1
          : undefined;
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
  // if (status === 'error') return <p className='center'>Error: {error.message}</p>

  const content = data?.pages.map(pg => {
    return pg.map((transaction, i) => {
      if (pg.length === i + 1) {
        return (
          <Transaction
            ref={lastPostRef}
            key={transaction.blockNumber}
            transaction={transaction}
          />
        );
      }
      return (
        <Transaction key={transaction.blockNumber} transaction={transaction} />
      );
    });
  });
  const { isDesktop, isWidescreen } = useWidth();
  return (
    <PageContainer pageTitle="C Blocks" metaContent="chain-overview c-chain">
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
              C-Transactions
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
    name: 'blockNumber',
    label: 'Block',
    field: 'blockNumber',
    align: 'left',
    type: 'hash',
    // detailsLink: blockDetails,
  },
  {
    name: 'from',
    label: 'From',
    field: 'from',
    align: 'left',
    type: 'hash',
    // detailsLink: addressDetails,
  },
  {
    name: 'to',
    label: 'To',
    field: 'to',
    align: 'left',
    type: 'hash',
    // detailsLink: addressDetails,
  },
  {
    name: 'hash',
    label: 'Hash',
    field: 'hash',
    align: 'left',
    type: 'hash',
    // detailsLink: transactionDetails,
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
    field: 'timestamp',
    align: 'left',
    type: 'timestamp',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
    type: 'status',
  },
  {
    name: 'transactionCost',
    value: 'transactionCost',
    label: 'Transaction Cost',
    field: 'transactionCost',
    align: 'left',
    type: 'currency',
  },
  {
    name: 'value',
    value: 'value',
    label: 'Value',
    field: 'value',
    align: 'left',
    type: 'currency',
  },
];

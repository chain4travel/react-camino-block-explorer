import { Grid } from '@mui/material';
import * as React from 'react';
import BlockList from './BlockList';
import TransactionsList from './TransactionsList';

export function LatestBlocksAndTransactionsList({ blocks, transactions }) {
  return (
    <Grid
      container
      rowSpacing={{ xs: 4, lg: '0!important' }}
      columnSpacing={{ xs: 0, lg: 4 }}
    >
      <Grid item xs={12} lg={6}>
        <BlockList title="Latest Blocks" items={blocks} to="/c-chain/blocks" />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TransactionsList
          title="Latest Transactions"
          items={transactions}
          to="/c-chain/transactions"
          link
        />
      </Grid>
    </Grid>
  );
}

import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Grid } from '@mui/material';
import { ListCard } from 'app/components/LatestBlocksAndTransactionsList';
import { selectAllBlocks } from 'store/cchainSlice';
import { useSelector } from 'react-redux';

export function CChainPageBlocks() {
  const blocks = useSelector(selectAllBlocks);
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>c-chain</title>
        <meta name="description" content="blocks c-chain" />
      </Helmet>
      <span>blocks</span>
      <Grid
        container
        rowSpacing={{ xs: 4, lg: '0!important' }}
        columnSpacing={{ xs: 0, lg: 4 }}
      >
        {blocks && blocks.length > 0 && (
          <Grid item xs={12} lg={12}>
            <ListCard
              title="Latest Blocks"
              items={blocks}
              to="/c-chain/blocks"
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

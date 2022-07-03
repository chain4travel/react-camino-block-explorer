import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

export function PChainPage() {
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>p-chain</title>
        <meta name="description" content="chain-overview p-chain" />
      </Helmet>
      <span>p-chain</span>
    </Container>
  );
}

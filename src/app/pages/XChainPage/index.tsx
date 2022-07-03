import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

export function XChainPage() {
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>x-chain</title>
        <meta name="description" content="chain-overview x-chain" />
      </Helmet>
      <span>x-chain</span>
    </Container>
  );
}

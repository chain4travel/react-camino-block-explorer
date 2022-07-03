import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

export function BlockDetails() {
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>c-BlockDetails</title>
        <meta name="description" content="chain-overviewBlockDetails" />
      </Helmet>
      <span>BlockDetails</span>
    </Container>
  );
}

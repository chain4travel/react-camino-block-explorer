import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import OverviewCards from '../../components/OverviewCards';

export function HomePage() {
  React.useEffect(() => {
    console.log('pikala');
  }, []);
  return (
    <Container maxWidth="xl" fixed>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <OverviewCards />
      HomePage
    </Container>
  );
}

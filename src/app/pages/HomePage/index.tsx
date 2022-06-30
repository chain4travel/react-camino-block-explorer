import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';

export function HomePage() {
  React.useEffect(() => {
    console.log('pikala');
  }, []);
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'primary.main',
        }}
      >
        HomePage
      </Box>
    </>
  );
}

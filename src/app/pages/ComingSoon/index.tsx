import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { ReactComponent as ComingSoonSvg } from './assets/comingsoon.svg';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeNetwork } from 'store/networkSlice';

export function ComingSoonPage() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(changeNetwork('Columbus'));
  };
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>mainnet</title>
        <meta name="description" content="mainnet" />
      </Helmet>
      <Grid
        sx={{ height: '500px' }}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <ComingSoonSvg />
        <Typography
          variant="h5"
          color="overviewCard.contrastText"
          sx={{
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          The Camino Mainnet is not available yet.
        </Typography>
        <Button
          onClick={handleClick}
          sx={[
            {
              borderRadius: '20px',
              backgroundColor: 'secondary.main',
              color: 'primary.main',
              textTransform: 'none',
            },
            {
              '&:hover': {
                color: 'secondary.main',
                backgroundColor: 'primary.main',
              },
            },
          ]}
          variant="contained"
        >
          Switch to Columbus network
        </Button>
      </Grid>
    </Container>
  );
}

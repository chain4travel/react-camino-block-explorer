import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { ReactComponent as ComingSoonSvg } from './assets/comingsoon.svg';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeNetwork } from 'store/networkSlice';
import MainButton from 'app/components/MainButton';
import AlignedContainer from 'app/components/AlignedContainer';

export function ComingSoonPage() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(changeNetwork('Columbus'));
  };
  return (
    <AlignedContainer maxWidth="xl">
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
        <MainButton
          variant="contained"
          onClick={handleClick}
          buttonLabel="Switch to Columbus Network"
        />
      </Grid>
    </AlignedContainer>
  );
}

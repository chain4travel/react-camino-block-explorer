import React, { useEffect } from 'react';
import { NavBar } from 'app/components/NavBar';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { Typography, Box, CircularProgress, Container } from '@mui/material';
import {
  getActiveNetwork,
  selectAllChains,
  selectNetworkStatus,
  changeNetwork,
} from 'store/app-config';
import { Footer } from 'app/components/Footer';
import { Status } from 'types';
import { getChains } from 'api';
import PageContainer from 'app/components/PageContainer';
import MainButton from 'app/components/MainButton';

export default function MainLayout() {
  const chains = useAppSelector(selectAllChains);
  const status = useAppSelector(selectNetworkStatus);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(changeNetwork('Columbus'));
  };
  useEffect(() => {
    console.log('MainLayout: useEffect', status);
    dispatch(getChains());
  }, [activeNetwork]); // eslint-disable-line
  return (
    <>
      <NavBar />
      {status === Status.LOADING && (
        <Container fixed maxWidth="xl">
          <CircularProgress
            color="secondary"
            size={75}
            style={{ margin: 'auto', display: 'block' }}
          />
        </Container>
      )}
      {status === Status.SUCCEEDED && chains?.length > 0 && <Outlet />}
      {status === Status.FAILED && (
        <PageContainer pageTitle="Error" metaContent="An error has occurred">
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Typography
              variant="h4"
              component="span"
              fontWeight="fontWeightBold"
              sx={{ color: 'error.light' }}
            >
              Something went wrong, Please Again!
            </Typography>
            <MainButton variant="contained" onClick={handleClick}>
              Switch to Columbus Network
            </MainButton>
          </Box>
        </PageContainer>
      )}
      <Footer />
    </>
  );
}

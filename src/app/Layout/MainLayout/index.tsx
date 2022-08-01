import * as React from 'react';
import { NavBar } from 'app/components/NavBar';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';
import { selectAllChains, selectNetworkStatus } from 'store/app-config';
import { Footer } from 'app/components/Footer';
import { Status } from 'types';
import { Typography } from '@mui/material';

export default function MainLayout() {
  const chains = useAppSelector(selectAllChains);
  const status = useAppSelector(selectNetworkStatus);

  return (
    <>
      <NavBar />
      {status === Status.SUCCEEDED && chains?.length > 0 && <Outlet />}
      {status === Status.FAILED && (
        <Typography variant="h6" component="span">
          Something went wrong, Please try later!
        </Typography>
      )}

      <Footer />
    </>
  );
}

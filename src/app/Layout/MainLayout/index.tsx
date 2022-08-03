import * as React from 'react';
import { NavBar } from 'app/components/NavBar';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  getActiveNetwork,
  selectAllChains,
  selectNetworkStatus,
} from 'store/app-config';
import { Footer } from 'app/components/Footer';
import { Status } from 'types';
import { Typography } from '@mui/material';
import { getChains } from 'api';

export default function MainLayout() {
  const chains = useAppSelector(selectAllChains);
  const status = useAppSelector(selectNetworkStatus);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getChains());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNetwork]);
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

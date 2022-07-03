import * as React from 'react';
import { NavBar } from 'app/components/NavBar';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Typography variant="h6" gutterBottom>
        Footer
      </Typography>
    </>
  );
}

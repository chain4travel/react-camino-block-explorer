import * as React from 'react';
import { NavBar } from 'app/components/NavBar';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';
import { selectAllChains } from 'store/app-config';
import { Footer } from 'app/components/Footer';

export default function MainLayout() {
  const chains = useAppSelector(selectAllChains);
  return (
    <>
      <NavBar />
      {chains?.length && <Outlet />}
      <Outlet />
      <Footer />
    </>
  );
}

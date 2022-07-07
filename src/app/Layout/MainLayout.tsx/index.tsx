import * as React from 'react';
import { NavBar } from 'app/components/NavBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

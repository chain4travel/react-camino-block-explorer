import { Helmet } from 'react-helmet-async';

import { GlobalStyle } from 'styles/global-styles';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CChainPage } from './pages/CChainPage';
import MainLayout from './Layout/MainLayout.tsx';
import { CssBaseline } from '@mui/material';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<CChainPage />} />
          <Route path="/cchain" element={<CChainPage />} />
        </Route>
        {/* <Route path="/notfound" element={<NotFoundPage />} /> */}
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

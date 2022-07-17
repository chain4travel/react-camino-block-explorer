import { Helmet } from 'react-helmet-async';
import React from 'react';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { CChainPage, Blocks, CTransactions } from './pages/CChainPages';
import {
  XChainPage,
  XAddressDetail,
  XTransactionDetails,
  XPShowAllTransactions,
} from './pages/XChainPages';
import { PChainPage, PChainDetailPage } from './pages/PChainPages';
import MainLayout from './Layout/MainLayout.tsx';
import { CssBaseline } from '@mui/material';
import { ComingSoonPage } from './pages/ComingSoon';
import {
  TransactionDetails,
  BlockDetails,
  CAddressDetails,
} from './pages/CChainPages';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Helmet
        titleTemplate="%s | Camino Block Explorer"
        defaultTitle="Camino Block Explorer"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Camino Block Explorer" />
      </Helmet>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/c-chain" />} />
          <Route path="c-chain">
            <Route index element={<CChainPage />} />
            <Route path="blocks">
              <Route index element={<Blocks />} />
              <Route path=":id" element={<BlockDetails />} />
            </Route>
            <Route path="transactions">
              <Route index element={<CTransactions />} />
              <Route path=":id" element={<TransactionDetails />} />
            </Route>
            <Route path="address/:id" element={<CAddressDetails />} />
          </Route>
          <Route path="x-chain">
            <Route index element={<XChainPage />} />
            <Route path="transactions">
              <Route index element={<XPShowAllTransactions />} />
              <Route path=":id" element={<XTransactionDetails />} />
            </Route>
            <Route path="address/:id" element={<XAddressDetail />} />
          </Route>
          <Route path="p-chain">
            <Route index element={<PChainPage />} />
            <Route path="transactions">
              <Route index element={<XPShowAllTransactions />} />
              <Route path=":id" element={<PChainDetailPage />} />
            </Route>
            <Route path="address/:id" element={<XAddressDetail />} />
          </Route>
          <Route path="/mainnet" element={<ComingSoonPage />} />
        </Route>
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

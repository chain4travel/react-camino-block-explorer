import { Helmet } from 'react-helmet-async';
import React from 'react';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { CChainPage } from './pages/CChainPages';
import {
  XChainPage,
  XAddressDetail,
  XTransactionDetails,
} from './pages/XChainPages';
import { PChainPage, PChainDetailPage } from './pages/PChainPages';
import MainLayout from './Layout/MainLayout.tsx';
import { CssBaseline } from '@mui/material';
import { BlockDetails } from './pages/CChainPages/BlockDetails';
import { ComingSoonPage } from './pages/ComingSoon';
import { TableDetials } from 'app/components/TableDetails';
import { TransactionDetails } from './pages/CChainPages/TransactionDetails';
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
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/c-chain" />} />
          <Route path="/c-chain" element={<CChainPage />} />
          <Route path="/c-chain/blocks" element={<TableDetials />} />
          <Route path="/c-chain/blocks/:id" element={<BlockDetails />} />
          <Route
            path="/c-chain/transactions/:id"
            element={<TransactionDetails />}
          />
          <Route path="/x-chain" element={<XChainPage />} />
          <Route
            path="x-chain/details/address/:id"
            element={<XAddressDetail />}
          />
          <Route
            path="x-chain/details/transactions/:id"
            element={<XTransactionDetails />}
          />
          <Route path="/p-chain" element={<PChainPage />} />
          <Route
            path="/p-chain/transactions/:id"
            element={<PChainDetailPage />}
          />
          <Route path="/mainnet" element={<ComingSoonPage />} />
        </Route>
        {/* <Route path="/notfound" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

import { Helmet } from 'react-helmet-async';
import { GlobalStyle } from 'styles/global-styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CChainPage } from './pages/CChainPages';
import { XChainPage } from './pages/XChainPage';
import { PChainPage } from './pages/PChainPage';
import MainLayout from './Layout/MainLayout.tsx';
import { CssBaseline } from '@mui/material';
import { BlockDetails } from './pages/CChainPages/BlockDetails';
import { ComingSoonPage } from './pages/ComingSoon';
import { TableDetials } from 'app/components/TableDetails';
import { TransactionDetails } from './pages/CChainPages/TransactionDetails';
import { PChainDetailPage } from './pages/PChainPage/PChainDetialPage';
export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Helmet
        titleTemplate="Camino Block Explorer %s"
        defaultTitle="Camino Block Explorer"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Camino Block Explorer" />
      </Helmet>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<CChainPage />} />
          <Route path="/c-chain" element={<CChainPage />}></Route>
          <Route path="/c-chain/blocks" element={<TableDetials />} />
          <Route path="/c-chain/blocks/:id" element={<BlockDetails />} />
          <Route
            path="/c-chain/transactions/:id"
            element={<TransactionDetails />}
          />
          <Route path="/x-chain" element={<XChainPage />} />
          <Route path="/p-chain" element={<PChainPage />} />
          <Route
            path="/p-chain/transactions/:is"
            element={<PChainDetailPage />}
          />
          <Route path="/mainnet" element={<ComingSoonPage />} />
        </Route>
        {/* <Route path="/notfound" element={<NotFoundPage />} /> */}
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

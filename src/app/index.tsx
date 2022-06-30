/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { GlobalStyle } from 'styles/global-styles';

// import { HomePage } from './pages/HomePage/Loadable';
// import { CChainPage } from './pages/CChainPage';
// import { NotFoundPage } from './components/NotFoundPage/Loadable';
// import { useTranslation } from 'react-i18next';
// import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
// import { NavBar } from './components/NavBar';

// const Layout = () => {
//   return (
//     <>
//       <NavBar />
//       <Outlet />
//     </>
//   );
// };

// export function App() {
//   const { i18n } = useTranslation();
//   return (
//     <BrowserRouter>
//       <Helmet
//         titleTemplate="%s - React Boilerplate"
//         defaultTitle="React Boilerplate"
//         htmlAttributes={{ lang: i18n.language }}
//       >
//         <meta name="description" content="A React Boilerplate application" />
//       </Helmet>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/cchain" element={<CChainPage />} />
//         </Route>
//         <Route path="/notfound" element={<NotFoundPage />} />
//       </Routes>
//       <GlobalStyle />
//     </BrowserRouter>
//   );
// }

import React, { useContext } from 'react';
// import { Helmet } from 'react-helmet-async';

// import { GlobalStyle } from 'styles/global-styles';
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
          <Route path="/" element={<HomePage />} />
          <Route path="/cchain" element={<CChainPage />} />
        </Route>
        {/* <Route path="/notfound" element={<NotFoundPage />} /> */}
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

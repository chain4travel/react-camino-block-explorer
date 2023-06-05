import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { GlobalStyle } from 'styles/global-styles'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { CChainPage, Blocks, CTransactions, Address } from './pages/CChainPages'
import { XChainPage, XAddressDetail, XPTransactions } from './pages/XChainPages'
import { PChainPage } from './pages/PChainPages'
import MainLayout from './Layout/MainLayout'
import { CssBaseline } from '@mui/material'
import { ComingSoonPage } from './pages/ComingSoon'
import { TransactionDetails, BlockDetails } from './pages/CChainPages'
import XPTransactionDetails from './pages/XChainPages/Transactions/XPTransactionsDetails'
import Validators from './pages/Validators'
import NotFoundPage from './pages/PageNotFound'
import { RoutesConfig } from '../utils/route-paths'
import Statistics from './pages/Statistics'
import { getActiveNetwork } from 'store/app-config'
import { useAppSelector } from 'store/configureStore'

export function App() {
    let activeNetwork = useAppSelector(getActiveNetwork)
    let routesConfig = RoutesConfig()

    return (
        <>
            <BrowserRouter>
                <CssBaseline enableColorScheme />
                <Helmet
                    titleTemplate="%s | Camino Block Explorer"
                    defaultTitle="Camino Block Explorer"
                >
                    <meta name="description" content="Camino Block Explorer" />
                </Helmet>
                {activeNetwork ? (
                    <Routes>
                        <Route path={`${routesConfig.BASE_PATH}`} element={<MainLayout />}>
                            <Route
                                path={`${routesConfig.BASE_PATH}`}
                                element={
                                    <Navigate
                                        replace={true}
                                        to={`${routesConfig.BASE_PATH}/c-chain`}
                                    />
                                }
                            />
                            <Route path="c-chain">
                                <Route index element={<CChainPage />} />
                                <Route path="blocks" element={<Blocks />} />
                                <Route path="txs" element={<CTransactions />} />
                                <Route path="block/:id" element={<BlockDetails />} />
                                <Route path="tx/:id" element={<TransactionDetails />} />
                                <Route path="address/:id" element={<Address />} />
                            </Route>
                            <Route path="x-chain">
                                <Route index element={<XChainPage />} />
                                <Route path="txs" element={<XPTransactions />} />
                                <Route path="tx/:id" element={<XPTransactionDetails />} />
                                <Route path="address/:id" element={<XAddressDetail />} />
                            </Route>
                            <Route path="p-chain">
                                <Route index element={<PChainPage />} />
                                <Route path="txs" element={<XPTransactions />} />
                                <Route path="tx/:id" element={<XPTransactionDetails />} />
                                <Route path="address/:id" element={<XAddressDetail />} />
                            </Route>
                            <Route
                                path={`${routesConfig.BASE_PATH}/mainnet`}
                                element={<ComingSoonPage />}
                            />
                            <Route
                                path={`${routesConfig.BASE_PATH}/validators`}
                                element={<Validators />}
                            />
                            <Route
                                path={`${routesConfig.BASE_PATH}/statistics`}
                                element={<Statistics />}
                            />
                            <Route path="*" element={<NotFoundPage />}></Route>
                        </Route>
                    </Routes>
                ) : null}
                <GlobalStyle />
            </BrowserRouter>
        </>
    )
}

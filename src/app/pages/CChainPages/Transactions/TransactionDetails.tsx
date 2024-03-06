import { Box, Button, Grid, Paper, useTheme } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import {
    TrimmedTransactionDetails,
    fetchNextTransactionDetails,
    fetchPrevTransactionDetails,
    getNextPrevTransaction,
} from './utils'
import {
    changeCurrentIndex,
    clearTr,
    getCTransactionCurrency,
    getCTransactionDetailsStatus,
    getCTransactionInformations,
    getCurrentIndex,
    getNextPrevStatus,
    getNextPrevTx,
    resetLoadingStatusForNPTransactions,
} from 'store/cchainSlice'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { useAppDispatch, useAppSelector } from 'store/configureStore'

import BackButton from 'app/components/BackButton'
import DetailsField from 'app/components/DetailsField'
import Icon from '@mdi/react'
import OutlinedContainer from 'app/components/OutlinedContainer'
import PageContainer from 'app/components/PageContainer'
import RoundButton from 'app/components/RoundButton'
import { RoutesConfig } from 'utils/route-paths'
import { Status } from 'types'
import SubPageTitle from 'app/components/SubPageTitle'
import TransactionDetailView from './TransactionDetailView'
import { fetchTransactionDetails } from 'store/cchainSlice/utils'
import { getTransactionFromUrl } from 'utils/route-utils'
import { mdiTransfer } from '@mdi/js'
import { useNavigate } from 'react-router-dom'

const TransactionDetails: FC = () => {
    const routesConfig = RoutesConfig()
    const theme = useTheme()
    const detailTr = useAppSelector(getCTransactionInformations)
    const detailCr = useAppSelector(getCTransactionCurrency)

    const loading = useAppSelector(getCTransactionDetailsStatus)
    const getNPStatus = useAppSelector(getNextPrevStatus)
    const nextPrevTX = useAppSelector(getNextPrevTx)
    const currentIndex = useAppSelector(getCurrentIndex)
    const [btnStopper, setBtnStopper] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleDelay = () => {
        setBtnStopper(true)
        setTimeout(() => {
            setBtnStopper(false)
        }, 500)
    }

    useEffect(() => {
        dispatch(fetchTransactionDetails(getTransactionFromUrl()))
        return () => {
            changeCurrentIndex(0)
            dispatch(clearTr())
            dispatch(resetLoadingStatusForNPTransactions())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (detailTr && getNPStatus === Status.IDLE) {
            let args: TrimmedTransactionDetails = {
                address: detailTr?.fromAddr,
                blockNumber: detailTr?.block,
                transactionID: 0,
            }
            dispatch(fetchPrevTransactionDetails(args))
            dispatch(fetchNextTransactionDetails(args))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailTr])

    useEffect(() => {
        if (
            nextPrevTX.length > 0 &&
            nextPrevTX[currentIndex] &&
            getTransactionFromUrl() !== nextPrevTX[currentIndex]?.hash
        )
            navigate(`${routesConfig.CTRANSACTION}/${nextPrevTX[currentIndex]?.hash}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex])

    return (
        <PageContainer pageTitle="C Transaction Details" metaContent="chain-overview c-chain">
            <Paper
                variant="outlined"
                square
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '680px',
                    width: 1,
                    backgroundColor: 'card.background',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    p: '1rem 1.5rem 1rem 1.5rem',
                }}
            >
                <Grid container direction="column" sx={{ width: 1, gap: '20px', flex: 1 }}>
                    <SubPageTitle title="C-Chain Transaction" backToLink={routesConfig.CCHAIN}>
                        <Box
                            sx={{
                                display: 'flex',
                                whiteSpace: 'nowrap',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <RoundButton
                                disabled={
                                    getNPStatus === Status.LOADING ||
                                    loading === Status.LOADING ||
                                    btnStopper
                                }
                                onClick={() => {
                                    if (
                                        getNPStatus !== Status.LOADING &&
                                        loading !== Status.LOADING
                                    ) {
                                        dispatch(getNextPrevTransaction(true, detailTr))
                                    }
                                    handleDelay()
                                }}
                                sx={{ width: '42px', height: '42px', mr: '15px' }}
                            >
                                <Icon
                                    path={mdiChevronLeft}
                                    size={1}
                                    color={theme.palette.primary.contrastText}
                                />
                            </RoundButton>
                            <RoundButton
                                disabled={
                                    getNPStatus === Status.LOADING ||
                                    loading === Status.LOADING ||
                                    btnStopper
                                }
                                onClick={() => {
                                    if (
                                        getNPStatus !== Status.LOADING &&
                                        loading !== Status.LOADING
                                    ) {
                                        dispatch(getNextPrevTransaction(false, detailTr))
                                    }
                                    handleDelay()
                                }}
                                sx={{ width: '42px', height: '42px' }}
                            >
                                <Icon
                                    path={mdiChevronRight}
                                    size={1}
                                    color={theme.palette.primary.contrastText}
                                />
                            </RoundButton>
                        </Box>
                    </SubPageTitle>
                    {loading === Status.SUCCEEDED && (
                        <OutlinedContainer transparent={false}>
                            <DetailsField
                                field="Transaction"
                                value={detailTr?.hash}
                                type="string"
                                icon={
                                    <Icon
                                        path={mdiTransfer}
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                }
                                allowCopy={true}
                                style={{ padding: '1rem' }}
                            />
                        </OutlinedContainer>
                    )}
                    <TransactionDetailView
                        loading={loading}
                        detailTr={detailTr}
                        detailCr={detailCr}
                    />
                </Grid>
                {(detailTr || detailCr) && (
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            paddingTop: '1rem',
                            marginTop: 'auto',
                        }}
                    >
                        <BackButton backToLink={routesConfig.CCHAIN} />
                    </Box>
                )}
            </Paper>
        </PageContainer>
    )
}

export default TransactionDetails

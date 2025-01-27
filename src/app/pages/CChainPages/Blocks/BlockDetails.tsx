import { Box, Grid, Paper } from '@mui/material'
import React, { FC } from 'react'
import { getCBlockDetail, getCBlockDetailStatus } from 'store/cchainSlice'
import { useAppDispatch, useAppSelector } from 'store/configureStore'

import BlockDetailView from './BlockDetailView'
import LoadingWrapper from 'app/components/LoadingWrapper'
import PageContainer from 'app/components/PageContainer'
import { RoutesConfig } from 'utils/route-paths'
import { Status } from 'types'
import SubPageTitle from 'app/components/SubPageTitle'
import TransactionsList from 'app/pages/CChainPages/LatestBlocksAndTransactionsList/TransactionsList'
import { fetchCBlockDetail } from 'store/cchainSlice/utils'
import { getBlockNumber } from 'utils/route-utils'
import { useLocation } from 'react-router-dom'

const BlockDetails: FC = () => {
    const routesConfig = RoutesConfig()
    const dispatch = useAppDispatch()
    const location = useLocation()
    const blockDetails = useAppSelector(getCBlockDetail)
    const loading = useAppSelector(getCBlockDetailStatus)

    React.useEffect(() => {
        dispatch(fetchCBlockDetail(parseInt(getBlockNumber())))
    }, [location, dispatch])

    return (
        <PageContainer pageTitle="C BlockDetails" metaContent="chain-overview c-chain">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Paper
                    variant="outlined"
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '600px',
                        width: 1,
                        backgroundColor: 'card.background',
                        borderRadius: '12px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        p: '1rem 1.5rem 1rem 1.5rem',
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        sx={{
                            width: 1,
                            minHeight: '600px',
                            gap: '20px',
                        }}
                    >
                        <SubPageTitle
                            title={`Block ${getBlockNumber()}`}
                            backToLink={routesConfig.CCHAIN}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: '20px',
                                width: '100%',
                            }}
                        >
                            <BlockDetailView loading={loading} blockDetails={blockDetails} />
                        </Box>
                    </Grid>
                </Paper>
                <TransactionsView loading={loading} blockDetails={blockDetails} />
            </Box>
        </PageContainer>
    )
}

export default BlockDetails

interface TransactionsViewProps {
    loading: Status
    blockDetails: any
}

const TransactionsView: FC<TransactionsViewProps> = ({ loading, blockDetails }) => {
    return (
        <LoadingWrapper loading={loading} failedLoadingMsg="">
            {blockDetails?.transactions?.length > 0 && (
                <Grid item xs={12} lg={12}>
                    <TransactionsList
                        title="Block Transactions"
                        items={blockDetails?.transactions}
                        link={false}
                    />
                </Grid>
            )}
        </LoadingWrapper>
    )
}

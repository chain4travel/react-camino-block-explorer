import * as React from 'react'

import { fetchBlocksTransactionsCChain, loadBlocksTransactionstype } from 'api'
import { getValidatorsOverreview, getValidatorsStatus } from 'store/validatorsSlice'

import DataControllers from 'app/components/DataControllers'
import LatestBlocksAndTransactionsList from 'app/pages/CChainPages/LatestBlocksAndTransactionsList'
import LoadingWrapper from 'app/components/LoadingWrapper'
import OverviewCards from 'app/components/OverviewCards'
import PageContainer from 'app/components/PageContainer'
import { Status } from 'types'
import { Typography } from '@mui/material'
import { getCchainOverreview } from 'store/cchainSlice'
import { useAppSelector } from 'store/configureStore'
import { useQuery } from 'react-query'

export default function CChainPage() {
    const validatorsLoading = useAppSelector(getValidatorsStatus)
    const { percentageOfActiveValidators, numberOfValidators, numberOfActiveValidators } =
        useAppSelector(getValidatorsOverreview)
    const { numberOfTransactions, totalGasFees, gasFeesLoading, transactionsLoading } =
        useAppSelector(getCchainOverreview)

    const { data, isError, error, isLoading } = useQuery<
        Promise<loadBlocksTransactionstype>,
        string,
        loadBlocksTransactionstype
    >('blocks-transactions-cchain', fetchBlocksTransactionsCChain, {
        refetchInterval: 10000,
        refetchOnMount: true,
        refetchIntervalInBackground: true,
    })

    const validateErrorString = (): String => {
        try {
            let errorData: any = error
            if (errorData !== null && errorData !== undefined) {
                if (errorData instanceof Object) {
                    return 'Something went wrong, Please Try Again!'
                } else {
                    return errorData as string
                }
            } else {
                return ''
            }
        } catch (e) {
            return 'Something went wrong, Please Try Again!'
        }
    }

    return (
        <PageContainer
            pageTitle="C chain"
            metaContent="Track and analyze transactions, smart contracts, and dApps on Camino C-Chain. Explore travel-related on-chain data on Camino Network's EVM-compatible C-Chain."
            metaKeywords="Camino C-Chain"
        >
            {isError && error ? (
                <>
                    <Typography
                        variant="h4"
                        color="error"
                        sx={{ textAlign: 'center', marginTop: '1rem' }}
                    >
                        {validateErrorString()}
                    </Typography>
                </>
            ) : (
                <>
                    <DataControllers />
                    <OverviewCards
                        numberOfTransactions={numberOfTransactions}
                        totalGasFees={totalGasFees}
                        numberOfActiveValidators={numberOfActiveValidators}
                        numberOfValidators={numberOfValidators}
                        percentageOfActiveValidators={percentageOfActiveValidators}
                        gasFeesLoading={gasFeesLoading}
                        transactionsLoading={transactionsLoading}
                        validatorsLoading={validatorsLoading}
                    />
                    <LoadingWrapper
                        loading={isLoading === true ? Status.LOADING : Status.SUCCEEDED}
                        failedLoadingMsg="Failed to load blocks and transactions"
                        loadingBoxStyle={{ minHeight: '500px' }}
                    >
                        {data && (
                            <LatestBlocksAndTransactionsList
                                blocks={data.blocks}
                                transactions={data.transactions}
                            />
                        )}
                    </LoadingWrapper>
                </>
            )}
        </PageContainer>
    )
}

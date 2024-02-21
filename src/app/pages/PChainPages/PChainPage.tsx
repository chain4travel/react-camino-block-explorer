import * as React from 'react'

import { getPchainOverreview, getXPchainStatus, selectAllPTransactions } from 'store/xchainSlice'
import { getValidatorsOverreview, getValidatorsStatus } from 'store/validatorsSlice'
import { useAppDispatch, useAppSelector } from 'store/configureStore'

import { ChainType } from 'utils/types/chain-type'
import DataControllers from 'app/components/DataControllers'
import LoadingWrapper from 'app/components/LoadingWrapper'
import OverviewCards from '../../components/OverviewCards'
import PageContainer from 'app/components/PageContainer'
import { RoutesConfig } from 'utils/route-paths'
import { Typography } from '@mui/material'
import XPItemDivider from 'app/components/XChainPageComponents/XPItemDivider'
import { XPTransaction } from 'types/transaction'
import XPTransactionItem from 'app/components/XChainPageComponents/XPTransactionItem'
import XPTransactionList from 'app/components/XChainPageComponents/XPTransactionList'
import { fetchXPTransactions } from 'store/xchainSlice/utils'
import { getChainID } from 'api/utils'
import { useEffectOnce } from 'app/hooks/useEffectOnce'

export default function PChainPage() {
    const routesConfig = RoutesConfig()
    const dispatch = useAppDispatch()
    const CHAIN_ID = getChainID('p')
    const transactions = useAppSelector(selectAllPTransactions)
    const status = useAppSelector(getXPchainStatus)
    const { numberOfTransactions, totalGasFees, gasFeesLoading, transactionsLoading } =
        useAppSelector(getPchainOverreview)
    const validatorsLoading = useAppSelector(getValidatorsStatus)
    const { percentageOfActiveValidators, numberOfValidators, numberOfActiveValidators } =
        useAppSelector(getValidatorsOverreview)
    useEffectOnce(() => {
        dispatch(fetchXPTransactions({ chainID: CHAIN_ID, chainType: 'p' }))
    })

    return (
        <PageContainer pageTitle="P chain" metaContent="chain-overview p-chain">
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
            <XPTransactionList ShowAllLink={routesConfig.PTRANSACTIONS}>
                <LoadingWrapper loading={status} failedLoadingMsg="Failed to load transactions">
                    {transactions && transactions?.length > 0 ? (
                        <>
                            {transactions?.map((transaction: XPTransaction, index: number) => (
                                <XPItemDivider
                                    index={index}
                                    max={transactions.length - 1}
                                    key={index}
                                >
                                    <XPTransactionItem
                                        chainType={ChainType.P_CHAIN}
                                        data={transaction}
                                    />
                                </XPItemDivider>
                            ))}
                        </>
                    ) : (
                        <Typography
                            variant="h4"
                            component="h4"
                            fontWeight="fontWeightBold"
                            sx={{ color: 'card.subValue' }}
                        >
                            No transactions found
                        </Typography>
                    )}
                </LoadingWrapper>
            </XPTransactionList>
        </PageContainer>
    )
}

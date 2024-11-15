import * as React from 'react'
import PageContainer from 'app/components/PageContainer'
import OverviewCards from '../../components/OverviewCards'
import { fetchXPTransactions } from 'store/xchainSlice/utils'
import { useEffectOnce } from 'app/hooks/useEffectOnce'
import { useAppDispatch, useAppSelector } from 'store/configureStore'
import { selectAllXTransactions, getXPchainStatus, getXchainOverreview } from 'store/xchainSlice'
import { ChainType } from 'utils/types/chain-type'
import LoadingWrapper from 'app/components/LoadingWrapper'
import XPItemDivider from 'app/components/XChainPageComponents/XPItemDivider'
import XPTransactionItem from 'app/components/XChainPageComponents/XPTransactionItem'
import XPTransactionList from 'app/components/XChainPageComponents/XPTransactionList'
import DataControllers from 'app/components/DataControllers'
import { getValidatorsOverreview, getValidatorsStatus } from 'store/validatorsSlice'
import { RoutesConfig } from 'utils/route-paths'
import { getChainID } from 'api/utils'
import { XPTransaction } from 'types/transaction'

export default function XChainPage() {
    const routesConfig = RoutesConfig()
    const dispatch = useAppDispatch()
    const CHAIN_ID = getChainID('x')
    const transactions = useAppSelector(selectAllXTransactions)
    const status = useAppSelector(getXPchainStatus)
    // const error = useAppSelector(getXchainError);
    const { numberOfTransactions, totalGasFees, gasFeesLoading, transactionsLoading } =
        useAppSelector(getXchainOverreview)
    const validatorsLoading = useAppSelector(getValidatorsStatus)
    const { percentageOfActiveValidators, numberOfValidators, numberOfActiveValidators } =
        useAppSelector(getValidatorsOverreview)
    useEffectOnce(() => {
        dispatch(fetchXPTransactions({ chainID: CHAIN_ID, chainType: 'x' }))
    })

    return (
        <PageContainer
            pageTitle="X chain"
            metaContent="Explore Camino X-Chain DAG-based transaction processing for secure, efficient asset creation, management, and exchange on Camino Network."
            metaKeywords="Camino X-Chain"
        >
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
            <XPTransactionList ShowAllLink={routesConfig.XTRANSACTIONS}>
                <LoadingWrapper loading={status} failedLoadingMsg="Failed to load transactions">
                    {transactions?.map((transaction: XPTransaction, index: number) => (
                        <XPItemDivider index={index} max={transactions.length - 1} key={index}>
                            <XPTransactionItem chainType={ChainType.X_CHAIN} data={transaction} />
                        </XPItemDivider>
                    ))}
                </LoadingWrapper>
            </XPTransactionList>
        </PageContainer>
    )
}

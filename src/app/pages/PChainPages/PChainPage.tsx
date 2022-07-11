import * as React from 'react';
import PageContainer from 'app/components/PageConatiner';
import OverviewCards from '../../components/OverviewCards';
import XPTransactionList from 'app/components/XChainPageComponents/XPTransactionList';
import XPTransactionItem from 'app/components/XChainPageComponents/XPTransactionItem';
import XPItemDivider from 'app/components/XChainPageComponents/XPItemDivider';
import DataControllers from 'app/components/DataControllers';
import { ChainType } from 'utils/types/chain-type';
import { LoadingWrapper } from 'app/components/LoadingWrapper';
import { fetchXPTransactions } from 'store/xchainSlice/utils';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { selectAllXTransactions, getXPchainStatus } from 'store/xchainSlice';

const CHAIN_ID = '11111111111111111111111111111111LpoYY';

export default function PChainPage() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectAllXTransactions);
  const status = useAppSelector(getXPchainStatus);
  useEffectOnce(() => {
    dispatch(fetchXPTransactions({ chainID: CHAIN_ID, chainType: 'p' }));
  });

  return (
    <PageContainer pageTitle="P chain" metaContent="chain-overview p-chain">
      <DataControllers />
      <OverviewCards
        numberOfTransactions={0}
        totalGasFees={0}
        numberOfActiveValidators={0}
        numberOfValidators={0}
        percentageOfActiveValidators={0}
        gasFeesLoading="succeeded"
        transactionsLoading="succeeded"
        validatorsLoading="succeeded"
      />
      <XPTransactionList ShowAllLink="/transactions">
        <LoadingWrapper
          loading={status}
          failedLoadingMsg="Failed to load transactions"
        >
          {transactions?.map((transaction, index) => (
            <XPItemDivider
              index={index}
              max={transactions.length - 1}
              key={index}
            >
              <XPTransactionItem
                chainType={ChainType.X_CHAIN}
                data={transaction}
              />
            </XPItemDivider>
          ))}
        </LoadingWrapper>
      </XPTransactionList>
    </PageContainer>
  );
}

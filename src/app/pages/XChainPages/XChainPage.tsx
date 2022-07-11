import * as React from 'react';
import PageContainer from 'app/components/PageContainer';
import OverviewCards from '../../components/OverviewCards';
import { fetchXPTransactions } from 'store/xchainSlice/utils';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  selectAllXTransactions,
  getXPchainStatus,
  // getXchainError,
  // getXchainOverreview,
} from 'store/xchainSlice';
import XPTransactionList from 'app/components/XChainPageComponents/XPTransactionList';
import XPTransactionItem from 'app/components/XChainPageComponents/XPTransactionItem';
import XPItemDivider from 'app/components/XChainPageComponents/XPItemDivider';
import DataControllers from 'app/components/DataControllers';
import { ChainType } from 'utils/types/chain-type';
import { LoadingWrapper } from 'app/components/LoadingWrapper';

const CHAIN_ID = '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV';

export default function XChainPage() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectAllXTransactions);
  const status = useAppSelector(getXPchainStatus);
  React.useEffect(() => {
    console.log('XChainPage: useEffect', status);
  }, [status]);
  // const error = useAppSelector(getXchainError);
  // const {
  //   numberOfTransactions,
  //   totalGasFees,
  //   numberOfActiveValidators,
  //   numberOfValidators,
  //   percentageOfActiveValidators,
  //   gasFeesLoading,
  //   transactionsLoading,
  //   validatorsLoading,
  // } = useAppSelector(getXchainOverreview);
  useEffectOnce(() => {
    dispatch(fetchXPTransactions({ chainID: CHAIN_ID, chainType: 'x' }));
  });

  return (
    <PageContainer pageTitle="X chain" metaContent="chain-overview x-chain">
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

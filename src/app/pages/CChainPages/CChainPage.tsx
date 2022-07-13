import * as React from 'react';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import {
  selectAllBlocks,
  getCchainError,
  selectAllTransactions,
  getCchainOverreview,
} from 'store/cchainSlice';
import { Typography } from '@mui/material';
import OverviewCards from 'app/components/OverviewCards';
import { LatestBlocksAndTransactionsList } from 'app/components/LatestBlocksAndTransactionsList';
import DataControllers from 'app/components/DataControllers';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  fetchBlocksTransactions,
  loadValidators,
} from 'store/cchainSlice/utils';
import PageContainer from 'app/components/PageContainer';

export default function CChainPage() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector(selectAllBlocks);
  const transactions = useAppSelector(selectAllTransactions);
  const error = useAppSelector(getCchainError);
  const {
    numberOfTransactions,
    totalGasFees,
    numberOfActiveValidators,
    numberOfValidators,
    percentageOfActiveValidators,
    gasFeesLoading,
    transactionsLoading,
    validatorsLoading,
  } = useAppSelector(getCchainOverreview);

  useEffectOnce(() => {
    dispatch(fetchBlocksTransactions());
    dispatch(loadValidators());
  });

  return (
    <PageContainer pageTitle="C chain" metaContent="chain-overview c-chain">
      {error ? (
        <Typography
          variant="h4"
          color="error"
          sx={{
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          {error}
        </Typography>
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
          <LatestBlocksAndTransactionsList
            blocks={blocks}
            transactions={transactions}
          />
        </>
      )}
    </PageContainer>
  );
}
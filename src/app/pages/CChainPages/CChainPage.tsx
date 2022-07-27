import * as React from 'react';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import {
  selectAllBlocks,
  getCchainError,
  selectAllTransactions,
  getCchainOverreview,
  getCchainStatus,
} from 'store/cchainSlice';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { fetchBlocksTransactions } from 'store/cchainSlice/utils';
import LatestBlocksAndTransactionsList from 'app/components/LatestBlocksAndTransactionsList';
import OverviewCards from 'app/components/OverviewCards';
import DataControllers from 'app/components/DataControllers';
import PageContainer from 'app/components/PageContainer';
import {
  getValidatorsOverreview,
  getValidatorsStatus,
} from 'store/validatorsSlice';
import { Status } from 'types';

export default function CChainPage() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector(selectAllBlocks);
  const transactions = useAppSelector(selectAllTransactions);
  const error = useAppSelector(getCchainError);
  const status = useAppSelector(getCchainStatus);
  const validatorsLoading = useAppSelector(getValidatorsStatus);
  const {
    percentageOfActiveValidators,
    numberOfValidators,
    numberOfActiveValidators,
  } = useAppSelector(getValidatorsOverreview);
  const {
    numberOfTransactions,
    totalGasFees,
    gasFeesLoading,
    transactionsLoading,
  } = useAppSelector(getCchainOverreview);

  useEffectOnce(() => {
    dispatch(fetchBlocksTransactions());
  });

  return (
    <PageContainer pageTitle="C chain" metaContent="chain-overview c-chain">
      {status === Status.FAILED && error ? (
        <Typography
          variant="h4"
          color="error"
          sx={{ textAlign: 'center', marginTop: '1rem' }}
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

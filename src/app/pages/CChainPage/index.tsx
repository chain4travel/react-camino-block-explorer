import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import {
  fetchBlocksTransactions,
  loadNumberOfTransactions,
  loadTotalGasFess,
  selectAllBlocks,
  getCchainError,
  selectAllTransactions,
  getCchainStatus,
  getCchainOverreview,
} from 'store/cchainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import OverviewCards from 'app/components/OverviewCards';
import { Timeframe } from 'store/cchainSlice';
import { LatestBlocksAndTransactionsList } from 'app/components/LatestBlocksAndTransactionsList';

export function CChainPage() {
  const dispatch = useDispatch();
  const blocks = useSelector(selectAllBlocks);
  const transactions = useSelector(selectAllTransactions);
  const status = useSelector(getCchainStatus);
  const error = useSelector(getCchainError);
  const {
    numberOfTransactions,
    totalGasFees,
    numberOfActiveValidators,
    numberOfValidators,
    percentageOfActiveValidators,
    gasFeesLoading,
    transactionsLoading,
    validatorsLoading,
  } = useSelector(getCchainOverreview);

  useEffectOnce(() => {
    dispatch(fetchBlocksTransactions());
    dispatch(loadNumberOfTransactions(Timeframe.MONTHS_1));
    dispatch(loadTotalGasFess());
  });
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>CChainPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>
        {status === 'succeeded' ? (
          <>
            <OverviewCards />
            <LatestBlocksAndTransactionsList />
          </>
        ) : (
          <>loading</>
        )}
      </span>
    </Container>
  );
}

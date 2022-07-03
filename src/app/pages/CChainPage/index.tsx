import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import {
  fetchBlocksTransactions,
  loadNumberOfTransactions,
  loadValidators,
  loadTotalGasFess,
  selectAllBlocks,
  getCchainError,
  selectAllTransactions,
  getCchainStatus,
  getCchainOverreview,
} from 'store/cchainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Container, CircularProgress } from '@mui/material';
import OverviewCards from 'app/components/OverviewCards';
import { Timeframe } from 'store/cchainSlice';
import { LatestBlocksAndTransactionsList } from 'app/components/LatestBlocksAndTransactionsList';
import GlobalReloadButton from 'app/components/GlobalReloadButton';

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
    dispatch(loadValidators());
  });

  return (
    <>
      <Helmet>
        <title>c-chain</title>
        <meta name="description" content="chain-overview" />
      </Helmet>
      <Container fixed maxWidth="xl" sx={{ flex: 1 }}>
        {status === 'succeeded' ? (
          <>
            <GlobalReloadButton />
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
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Container>
    </>
  );
}

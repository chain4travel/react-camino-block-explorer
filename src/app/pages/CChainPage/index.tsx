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
import { Container, CircularProgress, Typography } from '@mui/material';
import OverviewCards from 'app/components/OverviewCards';
import { Timeframe } from 'types';
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
    dispatch(loadValidators());
  });

  return (
    <>
      <Helmet>
        <title>c-chain</title>
        <meta name="description" content="chain-overview" />
      </Helmet>
      <Container fixed maxWidth="xl" sx={{ flex: 1 }}>
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
        {status === 'succeeded' ? (
          <>
            <LatestBlocksAndTransactionsList
              blocks={blocks}
              transactions={transactions}
            />
          </>
        ) : (
          <>
            {error ? (
              <Typography
                variant="h6"
                color="error"
                sx={{
                  textAlign: 'center',
                  marginTop: '1rem',
                }}
              >
                {error}
              </Typography>
            ) : (
              <CircularProgress color="secondary" />
            )}
          </>
        )}
      </Container>
    </>
  );
}

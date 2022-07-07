import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import {
  selectAllBlocks,
  getCchainError,
  selectAllTransactions,
  getCchainOverreview,
} from 'store/cchainSlice';
import { Container, Typography } from '@mui/material';
import OverviewCards from 'app/components/OverviewCards';
import { LatestBlocksAndTransactionsList } from 'app/components/LatestBlocksAndTransactionsList';
import DataControllers from 'app/components/DataControllers';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  fetchBlocksTransactions,
  loadValidators,
} from 'store/cchainSlice/utils';

export function CChainPage() {
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
    <>
      <Helmet>
        <title>c-chain</title>
        <meta name="description" content="chain-overview" />
      </Helmet>
      <Container fixed maxWidth="xl" sx={{ flex: 1 }}>
        <>
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
        </>
      </Container>
    </>
  );
}

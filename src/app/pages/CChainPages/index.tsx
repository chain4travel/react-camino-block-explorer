import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import {
  fetchBlocksTransactions,
  loadValidators,
  selectAllBlocks,
  getCchainError,
  selectAllTransactions,
  getCchainOverreview,
} from 'store/cchainSlice';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import OverviewCards from 'app/components/OverviewCards';
import { LatestBlocksAndTransactionsList } from 'app/components/LatestBlocksAndTransactionsList';
import DataControllers from 'app/components/DataControllers';
import { useAppDispatch } from 'store/configureStore';

export function CChainPage() {
  const dispatch = useAppDispatch();
  const blocks = useSelector(selectAllBlocks);
  const transactions = useSelector(selectAllTransactions);
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

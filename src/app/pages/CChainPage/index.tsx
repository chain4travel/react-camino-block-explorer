import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import {
  fetchBlocksTransactions,
  selectAllBlocks,
  getCchainError,
  selectAllTransactions,
  getCchainStatus,
  getCchainOverreview,
} from 'store/cchainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import OverviewCards from 'app/components/OverviewCards';

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
  });
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>CChainPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>{status === 'succeeded' ? <OverviewCards /> : <>loading</>}</span>
    </Container>
  );
}

import * as React from 'react';
import { getCchainOverreview } from 'store/cchainSlice';
import { Typography } from '@mui/material';
import { useAppSelector } from 'store/configureStore';
import LatestBlocksAndTransactionsList from 'app/pages/CChainPages/LatestBlocksAndTransactionsList';
import OverviewCards from 'app/components/OverviewCards';
import DataControllers from 'app/components/DataControllers';
import PageContainer from 'app/components/PageContainer';
import {
  getValidatorsOverreview,
  getValidatorsStatus,
} from 'store/validatorsSlice';
import { useQuery } from 'react-query';
import { fetchBlocksTransactionsCChain } from 'api';

export default function CChainPage() {
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

  // error
  const { data, isError, error } = useQuery(
    'blocks-transactions-cchain',
    fetchBlocksTransactionsCChain,
    {
      refetchInterval: 5000,
      refetchOnMount: true,
      refetchIntervalInBackground: true,
    },
  );
  return (
    <PageContainer pageTitle="C chain" metaContent="chain-overview c-chain">
      {isError && error ? (
        <Typography
          variant="h4"
          color="error"
          sx={{ textAlign: 'center', marginTop: '1rem' }}
        >
          {error as string}
        </Typography>
      ) : (
        data && (
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
              blocks={data.blocks}
              transactions={data.transactions}
            />
          </>
        )
      )}
    </PageContainer>
  );
}

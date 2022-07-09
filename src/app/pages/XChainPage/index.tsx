import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import OverviewCards from '../../components/OverviewCards';
import RowRadioButtonsGroup from '../../components/RowRadioButtonsGroup';
import GlobalReloadButton from '../../components/GlobalReloadButton';
import { fetchXTransactions } from 'store/xchainSlice/utils';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  selectAllXTransactions,
  // getXchainStatus,
  // getXchainError,
  // getXchainOverreview,
} from 'store/xchainSlice';
import XPTransactionList from 'app/components/XChainPageComponents/XPTransactionList';
import XPTransactionItem from 'app/components/XChainPageComponents/XPTransactionItem';
import XPItemDivider from 'app/components/XChainPageComponents/XPItemDivider';
import { ChainType } from 'utils/types/chain-type';

export function XChainPage() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectAllXTransactions);
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
    dispatch(fetchXTransactions());
  });

  return (
    <Container fixed maxWidth="xl">
      <Helmet>
        <title>x-chain</title>
        <meta name="description" content="chain-overview x-chain" />
      </Helmet>
      <Grid container spacing={{ xs: 3, md: 1 }}>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <RowRadioButtonsGroup />
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <GlobalReloadButton style={{ display: 'flex', marginLeft: 'auto' }} />
        </Grid>
      </Grid>
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
      </XPTransactionList>
    </Container>
  );
}

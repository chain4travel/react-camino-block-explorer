import React from 'react';
import { getDisplayValueForGewi } from '../../../utils/currency-utils';
import { OverviewCard } from './OverviewCard';
import { Grid } from '@mui/material';

export default function OverviewCards(props: {
  numberOfTransactions: number;
  totalGasFees: number;
  numberOfActiveValidators: number;
  numberOfValidators: number;
  percentageOfActiveValidators: number;
  gasFeesLoading: string;
  transactionsLoading: string;
  validatorsLoading: string;
}) {
  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: 4, lg: '0!important' }}
        columnSpacing={{ xs: 0, lg: 4 }}
      >
        <Grid item xs={12} lg={4}>
          <OverviewCard
            title="Number Of Validators"
            value={props.numberOfValidators.toString()}
            loading={props.validatorsLoading}
            subValue={`(${props.numberOfActiveValidators} / ${props.percentageOfActiveValidators}% active)`}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <OverviewCard
            title="Number of Transactions"
            value={props.numberOfTransactions.toLocaleString('en-US')}
            loading={props.transactionsLoading}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <OverviewCard
            title="Total Gas Fees"
            value={getDisplayValueForGewi(props.totalGasFees)}
            loading={props.gasFeesLoading}
          />
        </Grid>
      </Grid>
    </>
  );
}

import React from 'react';
import { getDisplayValueForGewi } from '../../../utils/currency/currency-utils';
import { OverviewCard } from './OverviewCard';
import { Grid } from '@mui/material';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';

export default function OverviewCards(props: {
  numberOfTransactions;
  totalGasFees;
}) {
  return (
    <>
      <RowRadioButtonsGroup />
      <Grid
        container
        rowSpacing={{ xs: 4, lg: '0!important' }}
        columnSpacing={{ xs: 0, lg: 4 }}
      >
        <Grid item xs={12} lg={4}>
          <OverviewCard
            title="Number Of Validators"
            value="7"
            subValue="(7 / 100% active)"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <OverviewCard
            title="Number of Transactions"
            value={props.numberOfTransactions.toLocaleString('en-US')}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <OverviewCard
            title="Total Gas Fees"
            value={getDisplayValueForGewi(props.totalGasFees)}
          />
        </Grid>
      </Grid>
    </>
  );
}

import React, { FC, useState, Fragment, useEffect } from 'react';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import { Paper, useTheme } from '@mui/material';
import {
  getDailyEmissions,
  getDailyEmissionsStatus,
  getNetworkEmissions,
  getNetworkEmissionsStatus,
  getTransactionsEmissions,
  getTransactionsEmissionsStatus,
  getCountryEmissions,
  getCountryEmissionsStatus
} from 'store/co2emissionsSlice';
import { loadDailyEmissions, loadNetworkEmissions, loadTransactionsEmissions } from 'store/co2emissionsSlice/utils';
import {
  getTransactionsPerDay,
  getTransactionsPerDayStatus,
  getUniqueAddresses,
  getUniqueAddressesLoading,
  getDailyTokenTransfers,
  getDailyTokenTransfersLoading,
  getGasUsed,
  getGasUsedLoading,
  getActiveAddresses,
  getActiveAddressesInfo,
  getGasAveragePrice,
  getGasAveragePriceInfo,
  getGasAverageLimit,
  getGasAverageLimitInfo,
  getAverageBlockSize,
  getAverageBlockSizeInfo,
} from 'store/blockchainDatachartsSlice';
import {
  loadDailyTransactionsStatistics,
  loadUniqueAddresses,
  loadDailyTokenTransfer,
  loadGasUsed,
  loadActiveAddresses,
  loadGasAveragePrice,
  loadGasAverageLimit,
  loadAverageBlockSize,
} from 'store/blockchainDatachartsSlice/utils';
import BlockchainCharts from '../../components/Statistics/BlockchainDataCharts';
import { typeBlockchainDataChart } from './ChartSelector';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CO2ConsumptionCharts from '../../components/Statistics/CO2ConsumptionCharts/index';
import { typesMeter } from './ChartSelector';
import { loadCountryEmissions } from '../../../store/co2emissionsSlice/utils';

const Statistics: FC = () => {
  const theme = useTheme();
  const dark = theme.palette.mode === 'light' ? false : true;

  return (
    <PageContainer pageTitle="Statistics" metaContent="statistics">
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '544px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <SubPageTitle
          title="Blockchain Data"
          style={{ marginBottom: '2rem', marginTop: '2rem', fontSize: '2rem' }}
          hiddenBackButton={true}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Daily Transactions'}
                utilSlice={(dates) => loadDailyTransactionsStatistics(dates)}
                sliceGetter={getTransactionsPerDay}
                sliceGetterLoader={getTransactionsPerDayStatus}
                typeStatistic={typeBlockchainDataChart.DAILY_TRANSACTIONS}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="The chart shows the total distinct numbers of address on the Camino blockchain and the increase in the number of address daily."
                darkMode={dark}
                titleText={'Unique Adresses'}
                utilSlice={(dates) => loadUniqueAddresses(dates)}
                sliceGetter={getUniqueAddresses}
                sliceGetterLoader={getUniqueAddressesLoading}
                typeStatistic={typeBlockchainDataChart.UNIQUE_ADRESSES}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="The Camino Daily Gas Used Chart shows the historical total daily gas used of the Camino network."
                darkMode={dark}
                titleText={'Gas Used'}
                utilSlice={(dates) => loadGasUsed(dates)}
                sliceGetter={getGasUsed}
                sliceGetterLoader={getGasUsedLoading}
                typeStatistic={typeBlockchainDataChart.GAS_USED}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="The Active Camino Address chart shows the daily number of unique addresses that were active on the network as a sender or receiver."
                darkMode={dark}
                titleText={'Active Addresses'}
                utilSlice={(dates) => loadActiveAddresses(dates)}
                sliceGetter={getActiveAddresses}
                sliceGetterLoader={getActiveAddressesInfo}
                typeStatistic={typeBlockchainDataChart.ACTIVE_ADDRESSES}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="The Camino Average Block Size Chart indicates the historical average block size in bytes of the Camino blockchain."
                darkMode={dark}
                titleText={'Average Block Size'}
                utilSlice={(dates) => loadAverageBlockSize(dates)}
                sliceGetter={getAverageBlockSize}
                sliceGetterLoader={getAverageBlockSizeInfo}
                typeStatistic={typeBlockchainDataChart.AVERAGE_BLOCK_SIZE}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="The Camino Average Gas Price Chart shows the daily average gas price used of the Camino network."
                darkMode={dark}
                titleText={'Gas Average Price'}
                utilSlice={(dates) => loadGasAveragePrice(dates)}
                sliceGetter={getGasAveragePrice}
                sliceGetterLoader={getGasAveragePriceInfo}
                typeStatistic={typeBlockchainDataChart.GAS_AVERAGE_PRICE}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="The chart shows the number of Camino tokens transferred daily."
                darkMode={dark}
                titleText={'Daily Token Transfer'}
                utilSlice={(dates) => loadDailyTokenTransfer(dates)}
                sliceGetter={getDailyTokenTransfers}
                sliceGetterLoader={getDailyTokenTransfersLoading}
                typeStatistic={typeBlockchainDataChart.DAILY_TOKEN_TRANSFER}
              />
            </Grid>

            {/*

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Gas Average Limit'}
                utilSlice={() => loadGasAverageLimit()}
                sliceGetter={getGasAverageLimit}
                sliceGetterLoader={getGasAverageLimitInfo}
                typeStatistic={typeBlockchainDataChart.GAS_AVERAGE_LIMIT}
              />
            </Grid>
             */}
          </Grid>
        </Box>
      </Paper>



      {/* */}
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '544px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <SubPageTitle
          title="CO2 Emissions"
          style={{ marginBottom: '20px' }}
          hiddenBackButton={true}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <CO2ConsumptionCharts
                typeMeter={typesMeter.BAR}
                darkMode={dark}
                utilSlice={(dates) => loadDailyEmissions(dates)}
                sliceGetter={getDailyEmissions}
                sliceGetterLoader={getDailyEmissionsStatus}
                titleText="Daily Emissions"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2ConsumptionCharts
                typeMeter={typesMeter.TIME_SERIES}
                darkMode={dark}
                utilSlice={(dates) => loadNetworkEmissions(dates)}
                sliceGetter={getNetworkEmissions}
                sliceGetterLoader={getNetworkEmissionsStatus}
                titleText="Network Emissions"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2ConsumptionCharts
                typeMeter={typesMeter.TIME_SERIES}
                darkMode={dark}
                utilSlice={(dates) => loadTransactionsEmissions(dates)}
                sliceGetter={getTransactionsEmissions}
                sliceGetterLoader={getTransactionsEmissionsStatus}
                titleText="Network Emissions Per Transaction"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2ConsumptionCharts
                typeMeter={typesMeter.COUNTRIES_BAR}
                darkMode={dark}
                utilSlice={(dates) => loadCountryEmissions(dates)}
                sliceGetter={getCountryEmissions}
                sliceGetterLoader={getCountryEmissionsStatus}
                titleText="Country Emissions"
              />
            </Grid>

          </Grid>
        </Box>
      </Paper>

    </PageContainer>
  );
};

export default Statistics;

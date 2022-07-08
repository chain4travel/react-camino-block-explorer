// async loadTransactions(offset = 0, count = 10): Promise<XPTransaction[]> {
//   return await this.store.loadTransactions('x', offset, count, null);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'index';
import { DateTime } from 'luxon';
import { getStartDate } from 'utils/display/display-utils';
import {
  loadTransactionAggregates,
  loadTransactionFeesAggregates,
} from 'utils/magellan';

const CHAIN_ID = '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV';

export const loadNumberOfXTransactions = createAsyncThunk(
  'xchain/loadNumberOfXTransactions',
  async (timeframe: string) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, timeframe);
    const result = await loadTransactionAggregates(
      CHAIN_ID,
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && result.aggregates.transactionCount;
  },
);

export const loadTotalXGasFess = createAsyncThunk(
  'xchain/loadTotalXGasFess',
  async (timeframe: string) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, timeframe);
    const result = await loadTransactionFeesAggregates(
      CHAIN_ID,
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && parseInt(result.aggregates.txfee);
  },
);

// export const loadValidators = createAsyncThunk('validators', async () => {
//   let networks = store.getState().networks;
//   let activeNetwork = networks.networks.find(
//     element => element.id === networks.activeNetwork,
//   );
//   const response = await axios.post(
//     `${activeNetwork?.protocol}://${activeNetwork?.host}:${activeNetwork?.port}/ext/bc/P`,
//     {
//       jsonrpc: '2.0',
//       method: 'platform.getCurrentValidators',
//       params: {
//         subnetID: null,
//         nodeIDs: [],
//       },
//       id: 1,
//     },
//   );
//   return response.data.result.validators;
// });

export const fetchXTransactions = createAsyncThunk(
  'xchain/fetchTransactions',
  async () => {
    let networks = store.getState().networks;
    let activeNetwork = networks.networks.find(
      element => element.id === networks.activeNetwork,
    );
    const response = await axios.get(
      `${activeNetwork?.magellanAddress}/v2/transactions?chainID=${CHAIN_ID}&offset=0&limit=10&sort=timestamp-desc`,
    );
    return response.data;
  },
);

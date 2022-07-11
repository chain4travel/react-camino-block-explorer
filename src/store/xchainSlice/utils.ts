import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'index';
import { DateTime } from 'luxon';
import { getStartDate } from 'utils/display/display-utils';
import {
  loadTransactionAggregates,
  loadTransactionFeesAggregates,
} from 'utils/magellan';

// const CHAIN_ID = '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV';

interface test {
  timeframe: string;
  chainId: string;
}

export const loadNumberOfPXTransactions = createAsyncThunk(
  'xchain/loadNumberOfXTransactions',
  async (test: test) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, test.timeframe);
    const result = await loadTransactionAggregates(
      test.chainId,
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && result.aggregates.transactionCount;
  },
);

export const loadTotalPXGasFess = createAsyncThunk(
  'xchain/loadTotalXGasFess',
  async (test: test) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, test.timeframe);
    const result = await loadTransactionFeesAggregates(
      test.chainId,
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && parseInt(result.aggregates.txfee);
  },
);

export const fetchXPTransactions = createAsyncThunk(
  'xchain/fetchTransactions',
  async (chainID: string) => {
    let networks = store.getState().networks;
    let activeNetwork = networks.networks.find(
      element => element.id === networks.activeNetwork,
    );
    const response = await axios.get(
      `${activeNetwork?.magellanAddress}/v2/transactions?chainID=${chainID}&offset=0&limit=10&sort=timestamp-desc`,
    );
    return { transactions: response.data.transactions, type: 'x' };
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadTransactionAggregates, loadTransactionFeesAggregates } from 'api';
import axios from 'axios';
import { store } from 'index';
import { DateTime } from 'luxon';
import { getStartDate } from 'utils/display-utils';

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

interface transactionsArg {
  chainID: string;
  chainType: string;
}

export const fetchXPTransactions = createAsyncThunk(
  'xchain/fetchTransactions',
  async (chain: transactionsArg) => {
    let networks = store.getState().networks;
    let activeNetwork = networks.networks.find(
      element => element.id === networks.activeNetwork,
    );
    const response = await axios.get(
      `${activeNetwork?.magellanAddress}/v2/transactions?chainID=${chain.chainID}&offset=0&limit=10&sort=timestamp-desc`,
    );
    return { transactions: response.data.transactions, type: chain.chainType };
  },
);

export const loadAssets = createAsyncThunk('xchain/loadAssets', async () => {
  let networks = store.getState().networks;
  let activeNetwork = networks.networks.find(
    element => element.id === networks.activeNetwork,
  );
  const response = (
    await axios.get(`${activeNetwork?.magellanAddress}/v2/assets`)
  ).data;
  const newElements = new Map();
  if (response.assets) {
    response.assets.forEach(element => {
      newElements.set(element.id, {
        name: element.name,
        symbol: element.symbol,
      });
    });
  }
  return newElements;
});

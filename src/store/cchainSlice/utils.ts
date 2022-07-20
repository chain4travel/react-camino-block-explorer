import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DateTime } from 'luxon';
import { store } from '../../index';
import { getStartDate } from 'utils/display-utils';
import { loadTransactionAggregates, loadTransactionFeesAggregates } from 'api';

const CHAIN_ID = 'G52TJLLbDSxYXsijNMpKFB6kAyDVRd9DGWVWYBh86Z8sEXm1i';

export const loadNumberOfTransactions = createAsyncThunk(
  'cchain/loadNumberOfTransactions',
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

export const loadTotalGasFess = createAsyncThunk(
  'cchain/loadTotalGasFess',
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

export const fetchBlocksTransactions = createAsyncThunk(
  'cchain/fetchBlocks',
  async () => {
    let networks = store.getState().networks;
    let activeNetwork = networks.networks.find(
      element => element.id === networks.activeNetwork,
    );
    const response = await axios.get(
      `${activeNetwork?.magellanAddress}/v2/cblocks?limit=10&limit=10`,
    );
    return response.data;
  },
);

export const fetchCBlockDetail = createAsyncThunk(
  'cchain/blockDetail',
  async (number: number) => {
    let networks = store.getState().networks;
    let activeNetwork = networks.networks.find(
      element => element.id === networks.activeNetwork,
    );
    const res = (
      await axios.get(`${activeNetwork?.magellanAddress}/v2/ctxdata/${number}`)
    ).data;
    return res;
  },
);

export const fetchTransactionDetails = createAsyncThunk(
  'cchain/transactionDetail',
  async (adress: string) => {
    let networks = store.getState().networks;
    let activeNetwork = networks.networks.find(
      element => element.id === networks.activeNetwork,
    );
    const res = (
      await axios.get(
        `${activeNetwork?.magellanAddress}/v2/ctransactions?hash=${adress}`,
      )
    ).data.Transactions[0];
    return res;
  },
);

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  BlockTableData,
  initialStateType,
  ChainOverviewType,
  CTransaction,
  MagellanAggregatesResponse,
  MagellanTxFeeAggregatesResponse,
  NodeValidator,
} from './types';
import axios from 'axios';
import { DateTime } from 'luxon';
import { store } from '../../index';

const BASE_URL = 'https://magellan.columbus.camino.foundation/v2';
const CHAIN_ID = 'G52TJLLbDSxYXsijNMpKFB6kAyDVRd9DGWVWYBh86Z8sEXm1i';
const URL = `${BASE_URL}/cblocks?limit=10&limit=10`;

export enum Timeframe {
  HOURS_24 = 'HOURS_24',
  DAYS_7 = 'DAYS_7',
  MONTHS_1 = 'MONTHS_1',
}

const initialState: initialStateType = {
  transactionCount: NaN,
  blockCount: NaN,
  blocks: [],
  transactions: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: undefined,
  ChainOverview: {
    numberOfTransactions: 0,
    totalGasFees: 0,
    numberOfActiveValidators: 0,
    numberOfValidators: 0,
    percentageOfActiveValidators: '0',
    gasFeesLoading: 'idle',
    transactionsLoading: 'idle',
    validatorsLoading: 'idle',
  } as ChainOverviewType,
};

export function getStartDate(
  endDate: DateTime,
  timeframe: Timeframe,
): DateTime {
  switch (timeframe) {
    case Timeframe.DAYS_7:
      return endDate.minus({ weeks: 1 });
    case Timeframe.HOURS_24:
      return endDate.minus({ days: 1 });
    case Timeframe.MONTHS_1:
      return endDate.minus({ months: 1 });
  }
}

async function loadTransactionAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanAggregatesResponse> {
  let url = `${BASE_URL}/aggregates?chainID=${CHAIN_ID}&startTime=${startTime}&endTime=${endTime}`;
  return (await axios.get(url)).data;
}
async function loadTransactionFeesAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanTxFeeAggregatesResponse> {
  const url = `${BASE_URL}/txfeeAggregates?chainID=${CHAIN_ID}&startTime=${startTime}&endTime=${endTime}`;
  return (await axios.get(url)).data;
}

export const loadNumberOfTransactions = createAsyncThunk(
  'cchain/loadNumberOfTransactions',
  async (timeframe: Timeframe) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, Timeframe.HOURS_24);
    const result = await loadTransactionAggregates(
      'c',
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && result.aggregates.transactionCount;
  },
);

export const loadTotalGasFess = createAsyncThunk(
  'cchain/loadTotalGasFess',
  async () => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, Timeframe.HOURS_24);
    const result = await loadTransactionFeesAggregates(
      'c',
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && parseInt(result.aggregates.txfee);
  },
);

export const fetchBlocksTransactions = createAsyncThunk(
  'cchain/fetchBlocks',
  async () => {
    const response = await axios.get(URL);
    return response.data;
  },
);

export const loadValidators = createAsyncThunk('validators', async () => {
  let networks = store.getState().networks;
  let activeNetwork = networks.networks.find(
    element => element.id === networks.activeNetwork,
  );
  const response = await axios.post(
    `${activeNetwork?.protocol}://${activeNetwork?.host}:${activeNetwork?.port}/ext/bc/P`,
    {
      jsonrpc: '2.0',
      method: 'platform.getCurrentValidators',
      params: {
        subnetID: null,
        nodeIDs: [],
      },
      id: 1,
    },
  );
  return response.data.result.validators;
});

const cchainSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlocksTransactions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBlocksTransactions.fulfilled, (state, action) => {
        state.blocks = action.payload.blocks.map((block): BlockTableData => {
          let result: BlockTableData = {
            hash: block.hash,
            number: parseInt(block.number),
            timestamp: block.timestamp,
            // timestamp: new Date(block.timestamp * 1000),
            gasLimit: parseInt(block.gasLimit),
            gasUsed: parseInt(block.gasUsed),
            numberOfTransactions: block.evmTx ? block.evmTx : 0,
            blockCost: parseInt(block.gasUsed) * parseInt(block.baseFeePerGas),
          };
          return result;
        });
        state.transactions = action.payload.transactions.map(
          (element): CTransaction => {
            let result: CTransaction = {
              block: parseInt(element.block),
              index: parseInt(element.index),
              from: element.from,
              hash: element.hash,
              status:
                parseInt(element.status) === 1
                  ? 'Success'
                  : `Failed-${parseInt(element.status)}`,
              timestamp: element.timestamp,
              // timestamp: new Date(parseInt(element.timestamp) * 1000),
              to: element.to,
              value: parseInt(element.value),
              transactionCost:
                parseInt(element.gasUsed) * parseInt(element.effectiveGasPrice),
            };
            return result;
          },
        );
        state.status = 'succeeded';
        state.transactionCount = action.payload.transactionCount;
        state.blockCount = action.payload.blockCount;
      })
      .addCase(fetchBlocksTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadNumberOfTransactions.pending, (state, action) => {
        state.ChainOverview.transactionsLoading = 'loading';
      })
      .addCase(loadNumberOfTransactions.fulfilled, (state, action) => {
        state.ChainOverview.numberOfTransactions = action.payload;
        state.ChainOverview.transactionsLoading = 'succeeded';
      })
      .addCase(loadNumberOfTransactions.rejected, (state, action) => {
        state.ChainOverview.transactionsLoading = 'failed';
      })
      .addCase(loadTotalGasFess.pending, (state, action) => {
        state.ChainOverview.gasFeesLoading = 'loading';
      })
      .addCase(loadTotalGasFess.fulfilled, (state, action) => {
        state.ChainOverview.totalGasFees = action.payload;
        state.ChainOverview.gasFeesLoading = 'succeeded';
      })
      .addCase(loadTotalGasFess.rejected, (state, action) => {
        state.ChainOverview.gasFeesLoading = 'failed';
      })
      .addCase(loadValidators.pending, (state, action) => {
        state.ChainOverview.validatorsLoading = 'loading';
      })
      .addCase(loadValidators.fulfilled, (state, action) => {
        state.ChainOverview.numberOfValidators = action.payload.length;
        state.ChainOverview.numberOfActiveValidators = action.payload.filter(
          (v: NodeValidator) => v.connected,
        ).length;
        state.ChainOverview.percentageOfActiveValidators = (
          (state.ChainOverview.numberOfActiveValidators /
            state.ChainOverview.numberOfValidators) *
          100
        ).toFixed(0);
        state.ChainOverview.validatorsLoading = 'succeeded';
      })
      .addCase(loadValidators.rejected, (state, action) => {
        state.ChainOverview.validatorsLoading = 'failed';
      });
  },
});
export const selectAllBlocks = state => state.cchain.blocks;
export const selectAllTransactions = state => state.cchain.transactions;
export const getCchainStatus = state => state.cchain.status;
export const getCchainError = state => state.cchain.error;
export const getCchainOverreview = state => state.cchain.ChainOverview;
export default cchainSlice.reducer;

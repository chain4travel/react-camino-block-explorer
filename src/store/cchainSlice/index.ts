import { createSlice } from '@reduxjs/toolkit';

import { status, Timeframe } from 'types';
import { BlockTableData } from 'types/block';
import { CTransaction } from 'types/transaction';
import { ChainOverviewType, initialCchainStateType } from 'types/store';
import { RootState } from 'store/configureStore';
import {
  fetchBlocksTransactions,
  loadNumberOfTransactions,
  loadTotalGasFess,
  loadValidators,
} from './utils';
import { NodeValidator } from 'types/node-types';
import { MagellanBlock, MagellanTransaction } from 'types/magellan-types';

const initialState: initialCchainStateType = {
  transactionCount: NaN,
  blockCount: NaN,
  blocks: [],
  transactions: [],
  status: status.IDLE,
  error: undefined,
  timeFrame: Timeframe.HOURS_24,
  ChainOverview: {
    numberOfTransactions: 0,
    totalGasFees: 0,
    numberOfActiveValidators: 0,
    numberOfValidators: 0,
    percentageOfActiveValidators: 0,
    gasFeesLoading: status.IDLE,
    transactionsLoading: status.IDLE,
    validatorsLoading: status.IDLE,
  } as ChainOverviewType,
};

const cchainSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    changetimeFrame(state, action) {
      state.timeFrame = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlocksTransactions.pending, (state, action) => {
        state.status = status.LOADING;
      })
      .addCase(fetchBlocksTransactions.fulfilled, (state, action) => {
        state.blocks = action.payload.blocks.map(
          (block: MagellanBlock): BlockTableData => {
            let result: BlockTableData = {
              hash: block.hash,
              number: parseInt(block.number),
              // timestamp: new Date(block.timestamp * 1000),
              timestamp: block.timestamp * 1000,
              gasLimit: parseInt(block.gasLimit),
              gasUsed: parseInt(block.gasUsed),
              numberOfTransactions: block.evmTx ? block.evmTx : 0,
              blockCost:
                parseInt(block.gasUsed) * parseInt(block.baseFeePerGas),
            };
            return result;
          },
        );
        state.transactions = action.payload.transactions.map(
          (element: MagellanTransaction): CTransaction => {
            let result: CTransaction = {
              block: parseInt(element.block),
              index: parseInt(element.index),
              from: element.from,
              hash: element.hash,
              status:
                parseInt(element.status) === 1
                  ? 'Success'
                  : `Failed-${parseInt(element.status)}`,
              // timestamp: new Date(parseInt(element.timestamp) * 1000),
              timestamp: parseInt(element.timestamp) * 1000,
              to: element.to,
              value: parseInt(element.value),
              transactionCost:
                parseInt(element.gasUsed) * parseInt(element.effectiveGasPrice),
            };
            return result;
          },
        );
        state.status = status.SUCCEEDED;
        state.transactionCount = action.payload.transactionCount;
        state.blockCount = action.payload.blockCount;
      })
      .addCase(fetchBlocksTransactions.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      })
      .addCase(loadNumberOfTransactions.pending, state => {
        state.ChainOverview.transactionsLoading = status.LOADING;
      })
      .addCase(loadNumberOfTransactions.fulfilled, (state, action) => {
        state.ChainOverview.numberOfTransactions = action.payload;
        state.ChainOverview.transactionsLoading = status.SUCCEEDED;
      })
      .addCase(loadNumberOfTransactions.rejected, state => {
        state.ChainOverview.transactionsLoading = status.FAILED;
      })
      .addCase(loadTotalGasFess.pending, state => {
        state.ChainOverview.gasFeesLoading = status.LOADING;
      })
      .addCase(loadTotalGasFess.fulfilled, (state, action) => {
        state.ChainOverview.totalGasFees = action.payload;
        state.ChainOverview.gasFeesLoading = status.SUCCEEDED;
      })
      .addCase(loadTotalGasFess.rejected, state => {
        state.ChainOverview.gasFeesLoading = status.FAILED;
      })
      .addCase(loadValidators.pending, state => {
        state.ChainOverview.validatorsLoading = status.LOADING;
      })
      .addCase(loadValidators.fulfilled, (state, action) => {
        state.ChainOverview.numberOfValidators = action.payload.length;
        state.ChainOverview.numberOfActiveValidators = action.payload.filter(
          (v: NodeValidator) => v.connected,
        ).length;
        state.ChainOverview.percentageOfActiveValidators = parseInt(
          (
            (state.ChainOverview.numberOfActiveValidators /
              state.ChainOverview.numberOfValidators) *
            100
          ).toFixed(0),
        );
        state.ChainOverview.validatorsLoading = status.SUCCEEDED;
      })
      .addCase(loadValidators.rejected, state => {
        state.ChainOverview.validatorsLoading = status.FAILED;
      });
  },
});
export const selectAllBlocks = (state: RootState) => state.cchain.blocks;
export const selectAllTransactions = (state: RootState) =>
  state.cchain.transactions;
export const getCchainStatus = (state: RootState) => state.cchain.status;
export const getCchainError = (state: RootState) => state.cchain.error;
export const getCchainOverreview = (state: RootState) =>
  state.cchain.ChainOverview;
export const getTimeFrame = (state: RootState) => state.cchain.timeFrame;
export const { changetimeFrame } = cchainSlice.actions;
export default cchainSlice.reducer;

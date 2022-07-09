import { createSlice } from '@reduxjs/toolkit';

import { status, Timeframe } from 'types';
import { BlockDetail, BlockTableData } from 'types/block';
import { CTransaction } from 'types/transaction';
import { ChainOverviewType, initialCchainStateType } from 'types/store';
import { RootState } from 'store/configureStore';
import {
  fetchBlocksTransactions,
  fetchCBlockDetail,
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
  blockDetail: undefined,
  loadBlockDetial: status.IDLE,
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
      })
      .addCase(fetchCBlockDetail.pending, state => {
        state.loadBlockDetial = status.LOADING;
      })
      .addCase(fetchCBlockDetail.fulfilled, (state, action) => {
        let block: BlockDetail = {
          hash: action.payload.hash,
          number: parseInt(action.payload.header.number),
          parentHash: action.payload.header.parentHash,
          // parentBlockNumber: parseInt(action.payload.header.number), to review
          baseGaseFee: parseInt(action.payload.header.baseFeePerGas),
          fees: 0,
          gasUsed: parseInt(action.payload.header.gasUsed).toLocaleString(
            'en-US',
          ),
          time: new Date(
            parseInt(action.payload.header.timestamp) * 1000,
          ).toString(),
          transactionsCount: action.payload.transactions
            ? action.payload.transactions.length
            : 0,
          extData: action.payload.header.extraData,
          transactions: action.payload.transactions
            ? action.payload.transactions.map(item => ({
                block: item.block,
                index: parseInt(item.receipt.transactionIndex),
                from: item.fromAddr,
                hash: item.hash,
                status: item.receipt.status,
                timestamp: new Date(item.createdAt),
                to: item.toAddr,
                transactionCost: item.receipt.gasUsed
                  ? parseInt(item.receipt.gasUsed) *
                    parseInt(item.receipt.effectiveGasPrice)
                  : parseInt(item.maxFeePerGas) *
                    parseInt(item.receipt.effectiveGasPrice),
                value: parseInt(item.value),
              }))
            : [],
        };
        block.fees += block.transactions
          .map(e => e.transactionCost)
          .reduce((pv, cv) => pv + cv, 0);
        state.blockDetail = block;
        state.loadBlockDetial = status.SUCCEEDED;
      })
      .addCase(fetchCBlockDetail.rejected, state => {
        state.loadBlockDetial = status.FAILED;
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
export const getCBlockDetail = (state: RootState) => state.cchain.blockDetail;
export const getCBlockDetailStatus = (state: RootState) =>
  state.cchain.loadBlockDetial;
export const getTimeFrame = (state: RootState) => state.cchain.timeFrame;
export const { changetimeFrame } = cchainSlice.actions;
export default cchainSlice.reducer;

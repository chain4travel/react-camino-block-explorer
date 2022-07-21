import { createSlice } from '@reduxjs/toolkit';

import { Status, Timeframe } from 'types';
import { BlockDetail, BlockTableData } from 'types/block';
import {
  CTransaction,
  TransactionCurrencuy,
  TransactionInformations,
} from 'types/transaction';
import { ChainOverviewType, initialCchainStateType } from 'types/store';
import { RootState } from 'store/configureStore';
import {
  fetchBlocksTransactions,
  fetchCBlockDetail,
  fetchTransactionDetails,
  loadNumberOfTransactions,
  loadTotalGasFess,
} from './utils';
import { MagellanBlock, MagellanTransaction } from 'types/magellan-types';

const initialState: initialCchainStateType = {
  transactionCount: NaN,
  blockCount: NaN,
  blocks: [],
  transactions: [],
  status: Status.IDLE,
  error: undefined,
  blockDetail: undefined,
  transcationDetails: undefined,
  loadTransactionDetails: Status.IDLE,
  loadBlockDetial: Status.IDLE,
  timeFrame: Timeframe.HOURS_24,
  ChainOverview: {
    numberOfTransactions: 0,
    totalGasFees: 0,
    gasFeesLoading: Status.IDLE,
    transactionsLoading: Status.IDLE,
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
        state.status = Status.LOADING;
      })
      .addCase(fetchBlocksTransactions.fulfilled, (state, action) => {
        state.blocks = action.payload.blocks.map(
          (block: MagellanBlock): BlockTableData => {
            let result: BlockTableData = {
              hash: block.hash,
              number: parseInt(block.number),
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
              timestamp: parseInt(element.timestamp) * 1000,
              to: element.to,
              value: parseInt(element.value),
              transactionCost:
                parseInt(element.gasUsed) * parseInt(element.effectiveGasPrice),
            };
            return result;
          },
        );
        state.status = Status.SUCCEEDED;
        state.transactionCount = action.payload.transactionCount;
        state.blockCount = action.payload.blockCount;
      })
      .addCase(fetchBlocksTransactions.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(loadNumberOfTransactions.pending, state => {
        state.ChainOverview.transactionsLoading = Status.LOADING;
      })
      .addCase(loadNumberOfTransactions.fulfilled, (state, action) => {
        state.ChainOverview.numberOfTransactions = action.payload;
        state.ChainOverview.transactionsLoading = Status.SUCCEEDED;
      })
      .addCase(loadNumberOfTransactions.rejected, state => {
        state.ChainOverview.transactionsLoading = Status.FAILED;
      })
      .addCase(loadTotalGasFess.pending, state => {
        state.ChainOverview.gasFeesLoading = Status.LOADING;
      })
      .addCase(loadTotalGasFess.fulfilled, (state, action) => {
        state.ChainOverview.totalGasFees = action.payload;
        state.ChainOverview.gasFeesLoading = Status.SUCCEEDED;
      })
      .addCase(loadTotalGasFess.rejected, state => {
        state.ChainOverview.gasFeesLoading = Status.FAILED;
      })
      .addCase(fetchCBlockDetail.pending, state => {
        state.loadBlockDetial = Status.LOADING;
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
        state.loadBlockDetial = Status.SUCCEEDED;
      })
      .addCase(fetchCBlockDetail.rejected, state => {
        state.loadBlockDetial = Status.FAILED;
      })
      .addCase(fetchTransactionDetails.pending, state => {
        state.loadTransactionDetails = Status.LOADING;
      })
      .addCase(fetchTransactionDetails.fulfilled, (state, { payload }) => {
        let transactionInformations: TransactionInformations = {
          type: payload.type,
          block: payload.block,
          createdAt: new Date(payload.createdAt),
          fromAddr: payload.fromAddr,
          toAddr: payload.toAddr,
        };
        let transactionCurrencuy: TransactionCurrencuy = {
          gasPrice: parseInt(payload.gasPrice),
          maxFeePerGas: parseInt(payload.maxFeePerGas),
          maxPriorityFeePerGas: parseInt(payload.maxPriorityFeePerGas),
          gasUsed: parseInt(payload.receipt.gasUsed),
          effectiveGasPrice: parseInt(payload.receipt.effectiveGasPrice),
          transactionCost:
            parseInt(payload.receipt.gasUsed) *
            parseInt(payload.receipt.effectiveGasPrice),
        };
        state.transcationDetails = {
          transactionInformations,
          transactionCurrencuy,
        };
        state.loadTransactionDetails = Status.SUCCEEDED;
      })
      .addCase(fetchTransactionDetails.rejected, (state, action) => {
        state.loadTransactionDetails = Status.FAILED;
      });
  },
});

// Select Blocks
export const selectAllBlocks = (state: RootState) => state.cchain.blocks;

// Select Transactions
export const selectAllTransactions = (state: RootState) =>
  state.cchain.transactions;

// Select Request Status
export const getCchainStatus = (state: RootState) => state.cchain.status;
export const getCchainError = (state: RootState) => state.cchain.error;

// Select Chain overreview Data
export const getCchainOverreview = (state: RootState) =>
  state.cchain.ChainOverview;
// Select TimeFrame for chainoverreview
export const getTimeFrame = (state: RootState) => state.cchain.timeFrame;

// Select Block Details
export const getCBlockDetail = (state: RootState) => state.cchain.blockDetail;
export const getCBlockDetailStatus = (state: RootState) =>
  state.cchain.loadBlockDetial;

// Select Transaction Details

export const getCTransactionInformations = (state: RootState) =>
  state.cchain.transcationDetails?.transactionInformations;
export const getCTransactionCurrencuy = (state: RootState) =>
  state.cchain.transcationDetails?.transactionCurrencuy;
export const getCTransactionDetailsStatus = (state: RootState) =>
  state.cchain.loadTransactionDetails;

// actions
export const { changetimeFrame } = cchainSlice.actions;
// reduceer
export default cchainSlice.reducer;

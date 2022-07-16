import { createSlice } from '@reduxjs/toolkit';
import { loadValidators } from 'store/cchainSlice/utils';
import { RootState } from 'store/configureStore';

import { Status, Timeframe } from 'types';
import { NodeValidator } from 'types/node-types';
import { ChainOverviewType, initialXPchainStateType } from 'types/store';
import { createTransaction } from 'utils/magellan';
import {
  fetchXPTransactions,
  loadAssets,
  loadNumberOfPXTransactions,
  loadTotalPXGasFess,
} from './utils';

const initialState: initialXPchainStateType = {
  xTransactions: undefined,
  pTransactions: undefined,
  xTransactionDetails: undefined,
  pTransactionDetails: undefined,
  loadXPTransactions: Status.IDLE,
  loadXTransactionDetials: Status.IDLE,
  loadPTransactionDetials: Status.IDLE,
  error: undefined,
  assets: undefined,
  timeFrame: Timeframe.HOURS_24,
  ChainOverview: {
    numberOfTransactions: 0,
    totalGasFees: 0,
    numberOfActiveValidators: 0,
    numberOfValidators: 0,
    percentageOfActiveValidators: 0,
    gasFeesLoading: Status.IDLE,
    transactionsLoading: Status.IDLE,
    validatorsLoading: Status.IDLE,
  } as ChainOverviewType,
};

const xchainSlice = createSlice({
  name: 'xchaine',
  initialState,
  reducers: {
    changetimeFrameXPchain(state, action) {
      state.timeFrame = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchXPTransactions.pending, (state, action) => {
        state.loadXPTransactions = Status.LOADING;
      })
      .addCase(fetchXPTransactions.fulfilled, (state, action) => {
        state.loadXPTransactions = Status.SUCCEEDED;
        if (action.payload.type === 'x')
          state.xTransactions =
            action.payload.transactions.map(createTransaction);
        else if (action.payload.type === 'p')
          state.pTransactions =
            action.payload.transactions.map(createTransaction);
      })
      .addCase(fetchXPTransactions.rejected, (state, action) => {
        state.loadXPTransactions = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(loadNumberOfPXTransactions.pending, state => {
        state.ChainOverview.transactionsLoading = Status.LOADING;
      })
      .addCase(loadNumberOfPXTransactions.fulfilled, (state, action) => {
        state.ChainOverview.numberOfTransactions = action.payload;
        state.ChainOverview.transactionsLoading = Status.SUCCEEDED;
      })
      .addCase(loadNumberOfPXTransactions.rejected, state => {
        state.ChainOverview.transactionsLoading = Status.FAILED;
      })
      .addCase(loadTotalPXGasFess.pending, state => {
        state.ChainOverview.gasFeesLoading = Status.LOADING;
      })
      .addCase(loadTotalPXGasFess.fulfilled, (state, action) => {
        state.ChainOverview.totalGasFees = action.payload;
        state.ChainOverview.gasFeesLoading = Status.SUCCEEDED;
      })
      .addCase(loadTotalPXGasFess.rejected, state => {
        state.ChainOverview.gasFeesLoading = Status.FAILED;
      })
      .addCase(loadValidators.pending, state => {
        state.ChainOverview.validatorsLoading = Status.LOADING;
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
        state.ChainOverview.validatorsLoading = Status.SUCCEEDED;
      })
      .addCase(loadValidators.rejected, state => {
        state.ChainOverview.validatorsLoading = Status.FAILED;
      })
      .addCase(loadAssets.pending, state => {
        // state.ChainOverview.validatorsLoading = status.FAILED;
      })
      .addCase(loadAssets.fulfilled, (state, action) => {
        // state.assets = action.payload;
        // state.ChainOverview.validatorsLoading = status.FAILED;
        console.log(action.payload);
      })
      .addCase(loadAssets.rejected, state => {
        // state.ChainOverview.validatorsLoading = status.FAILED;
      });
  },
});

// Select All X Transactions
export const selectAllXTransactions = (state: RootState) =>
  state.xchain.xTransactions;
// Select All P Transactions
export const selectAllPTransactions = (state: RootState) =>
  state.xchain.pTransactions;
// Select Loading Status
export const getXPchainStatus = (state: RootState) =>
  state.xchain.loadXPTransactions;
export const getXchainError = (state: RootState) => state.xchain.error;
// Select ChainOverreview data
export const getXPchainOverreview = (state: RootState) =>
  state.xchain.ChainOverview;
// Select TimeFrime
export const getTimeFrameXPchain = (state: RootState) => state.xchain.timeFrame;
// Actions
export const { changetimeFrameXPchain } = xchainSlice.actions;
// Reducer
export default xchainSlice.reducer;

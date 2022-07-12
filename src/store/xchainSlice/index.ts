import { createSlice } from '@reduxjs/toolkit';
import { loadValidators } from 'store/cchainSlice/utils';
import { RootState } from 'store/configureStore';

import { status, Timeframe } from 'types';
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
  loadXPTransactions: status.IDLE,
  loadXTransactionDetials: status.IDLE,
  loadPTransactionDetials: status.IDLE,
  error: undefined,
  assets: undefined,
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
        state.loadXPTransactions = status.LOADING;
      })
      .addCase(fetchXPTransactions.fulfilled, (state, action) => {
        state.loadXPTransactions = status.SUCCEEDED;
        if (action.payload.type === 'x')
          state.xTransactions =
            action.payload.transactions.map(createTransaction);
        else if (action.payload.type === 'p')
          state.pTransactions =
            action.payload.transactions.map(createTransaction);
      })
      .addCase(fetchXPTransactions.rejected, (state, action) => {
        state.loadXPTransactions = status.FAILED;
        state.error = action.error.message;
      })
      .addCase(loadNumberOfPXTransactions.pending, state => {
        state.ChainOverview.transactionsLoading = status.LOADING;
      })
      .addCase(loadNumberOfPXTransactions.fulfilled, (state, action) => {
        state.ChainOverview.numberOfTransactions = action.payload;
        state.ChainOverview.transactionsLoading = status.SUCCEEDED;
      })
      .addCase(loadNumberOfPXTransactions.rejected, state => {
        state.ChainOverview.transactionsLoading = status.FAILED;
      })
      .addCase(loadTotalPXGasFess.pending, state => {
        state.ChainOverview.gasFeesLoading = status.LOADING;
      })
      .addCase(loadTotalPXGasFess.fulfilled, (state, action) => {
        state.ChainOverview.totalGasFees = action.payload;
        state.ChainOverview.gasFeesLoading = status.SUCCEEDED;
      })
      .addCase(loadTotalPXGasFess.rejected, state => {
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

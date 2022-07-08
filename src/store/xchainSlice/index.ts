import { createSlice } from '@reduxjs/toolkit';
import { loadValidators } from 'store/cchainSlice/utils';
import { RootState } from 'store/configureStore';

import { status, Timeframe } from 'types';
import { NodeValidator } from 'types/node-types';
import { ChainOverviewType, initialXPchainStateType } from 'types/store';
import { createTransaction } from 'utils/magellan';
import {
  fetchXTransactions,
  loadNumberOfXTransactions,
  loadTotalXGasFess,
} from './utils';

const initialState: initialXPchainStateType = {
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

const xchainSlice = createSlice({
  name: 'xchaine',
  initialState,
  reducers: {
    changetimeFrameXchain(state, action) {
      state.timeFrame = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchXTransactions.pending, state => {
      state.status = status.FAILED;
    });
    builder
      .addCase(fetchXTransactions.fulfilled, (state, action) => {
        state.status = status.SUCCEEDED;
        state.transactions = action.payload.transactions.map(createTransaction);
      })
      .addCase(fetchXTransactions.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      })
      .addCase(loadNumberOfXTransactions.pending, state => {
        state.ChainOverview.transactionsLoading = status.LOADING;
      })
      .addCase(loadNumberOfXTransactions.fulfilled, (state, action) => {
        state.ChainOverview.numberOfTransactions = action.payload;
        state.ChainOverview.transactionsLoading = status.SUCCEEDED;
      })
      .addCase(loadNumberOfXTransactions.rejected, state => {
        state.ChainOverview.transactionsLoading = status.FAILED;
      })
      .addCase(loadTotalXGasFess.pending, state => {
        state.ChainOverview.gasFeesLoading = status.LOADING;
      })
      .addCase(loadTotalXGasFess.fulfilled, (state, action) => {
        state.ChainOverview.totalGasFees = action.payload;
        state.ChainOverview.gasFeesLoading = status.SUCCEEDED;
      })
      .addCase(loadTotalXGasFess.rejected, state => {
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
export const selectAllXTransactions = (state: RootState) =>
  state.xchain.transactions;
export const getXchainStatus = (state: RootState) => state.xchain.status;
export const getXchainError = (state: RootState) => state.xchain.error;
export const getXchainOverreview = (state: RootState) =>
  state.xchain.ChainOverview;
export const getTimeFrame = (state: RootState) => state.xchain.timeFrame;
export const { changetimeFrameXchain } = xchainSlice.actions;
export default xchainSlice.reducer;

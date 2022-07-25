import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBaseUrl } from 'api/utils';
import axios from 'axios';
import { changeCurrentIndex } from 'store/cchainSlice';
import { fetchTransactionDetails } from 'store/cchainSlice/utils';
import { AppDispatch, RootState } from 'store/configureStore';
import { TransactionInformations } from 'types/transaction';

export interface TrimmedTransactionDetails {
  address?: string;
  blockNumber?: number;
  transactionID: number;
}

export function getNextPrevTransaction(
  direction: boolean,
  transaction?: TransactionInformations,
) {
  return async function getTx(
    dispatch: AppDispatch,
    getState: () => RootState,
  ) {
    let txs = getState().cchain.transactionsNavigation;
    let currentIndex = getState().cchain.currentIndex;
    if (direction) {
      if (currentIndex + 1 < txs.length) {
        dispatch(changeCurrentIndex(currentIndex + 1));
        dispatch(fetchTransactionDetails(txs[currentIndex + 1].hash));
      }
    } else {
      if (currentIndex - 1 >= 0) {
        dispatch(changeCurrentIndex(currentIndex - 1));
        dispatch(fetchTransactionDetails(txs[currentIndex - 1].hash));
      }
    }
  };
}
export const fetchPrevTransactionDetails = createAsyncThunk(
  'cchain/prevtransactionsDetails',
  async (infos: TrimmedTransactionDetails) => {
    let url = `${getBaseUrl()}/v2/cblocks?limit=${0}&limit=${5}&blockStart=${
      infos.blockNumber
    }&blockEnd=${NaN}&transactionId=${infos.transactionID}&address=${
      infos.address
    }`;
    const res = await axios.get(url);
    return res.data.transactions;
  },
);

export const fetchNextTransactionDetails = createAsyncThunk(
  'cchain/nexttransactionsDetails',
  async (infos: TrimmedTransactionDetails) => {
    let url = `${getBaseUrl()}/v2/cblocks?limit=${0}&limit=${5}&blockStart=${NaN}&blockEnd=${
      infos.blockNumber
    }&transactionId=${infos.transactionID}&address=${infos.address}`;
    const res = await axios.get(url);
    return res.data.transactions;
  },
);

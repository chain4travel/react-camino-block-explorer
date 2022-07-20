import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'index';
import { BlockType } from 'types/block';
import {
  MagellanAggregatesResponse,
  MagellanBlock,
  MagellanTxFeeAggregatesResponse,
} from 'types/magellan-types';
import { createTransaction } from 'utils/magellan';
import { baseEndpoint } from 'utils/magellan-api-utils';
import { mapToTableData } from './utils';

const api = axios.create({
  baseURL: 'https://magellan.columbus.camino.foundation',
});

export const getBlocksPage = async (startingBlock: number) => {
  const response = await api.get(
    `${baseEndpoint}/cblocks?limit=${50}&limit=0&blockStart=${startingBlock}&blockEnd=NaN&transactionId=0`,
  );
  return response.data.blocks.map((block: MagellanBlock): BlockType => {
    return {
      hash: block.hash,
      number: parseInt(block.number),
      timestamp: new Date(block.timestamp * 1000),
      gasLimit: parseInt(block.gasLimit),
      gasUsed: parseInt(block.gasUsed),
      numberOfTransactions: block.evmTx ? block.evmTx : 0,
      blockCost: parseInt(block.gasUsed) * parseInt(block.baseFeePerGas),
    };
  });
};

export async function getTransactionsPage(
  startingBlock = NaN,
  endingBlock = NaN,
  transactionId = 0,
) {
  const response = await api.get(
    `${baseEndpoint}/cblocks?limit=${0}&limit=${50}&blockStart=${startingBlock}&blockEnd=${endingBlock}&transactionId=${transactionId}`,
  );
  return response.data.transactions.map(transaction => {
    return {
      blockNumber: parseInt(transaction.block),
      transactionIndex: parseInt(transaction.index),
      from: transaction.from,
      hash: transaction.hash,
      status:
        parseInt(transaction.status) === 1
          ? 'Success'
          : `Failed-${parseInt(transaction.status)}`,
      timestamp: parseInt(transaction.timestamp) * 1000,
      to: transaction.to,
      value: parseInt(transaction.value),
      transactionCost:
        parseInt(transaction.gasUsed) * parseInt(transaction.effectiveGasPrice),
    };
  });
}

export async function loadTransactionAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanAggregatesResponse> {
  let url = `${baseEndpoint}/aggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`;
  return (await api.get(url)).data;
}

export async function loadTransactionFeesAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanTxFeeAggregatesResponse> {
  const url = `${baseEndpoint}/txfeeAggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`;
  return (await api.get(url)).data;
}

export async function loadBlocksAndTransactions({ address, offset }) {
  return await api.get(
    `${baseEndpoint}/cblocks?address=${address}&limit=0&limit=${offset}`,
  );
}

export async function loadCAddressTransactions({ address, offset }) {
  let res = (await loadBlocksAndTransactions({ address, offset })).data;
  return res.transactions.map(transaction => {
    return {
      blockNumber: parseInt(transaction.block),
      transactionIndex: parseInt(transaction.index),
      from: transaction.from,
      hash: transaction.hash,
      status:
        parseInt(transaction.status) === 1
          ? 'Success'
          : `Failed-${parseInt(transaction.status)}`,
      timestamp: parseInt(transaction.timestamp) * 1000,
      to: transaction.to,
      value: parseInt(transaction.value),
      transactionCost:
        parseInt(transaction.gasUsed) * parseInt(transaction.effectiveGasPrice),
      direction: transaction.from === address ? 'out' : 'in',
    };
  });
}

export async function loadXPTransactions(offset: number, chainID: string) {
  return await api.get(
    `${baseEndpoint}/transactions?chainID=${chainID}&offset=${offset}&limit=50&sort=timestamp-desc`,
  );
}

export async function getXPTransactions(offset: number, chainID: string) {
  let res = (await loadXPTransactions(offset, chainID)).data;
  let newItems = res.transactions.map(item => createTransaction(item));
  return newItems.map(mapToTableData);
}

export const getChains = createAsyncThunk('appConfig/chains', async () => {
  let networks = store.getState().appConfig;
  let activeNetwork = networks.networks.find(
    element => element.id === networks.activeNetwork,
  );
  const res = await axios.get(
    `${activeNetwork?.magellanAddress}${baseEndpoint}`,
  );
  return res.data;
});

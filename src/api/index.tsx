import axios from 'axios';
import { BlockType } from 'types/block';
import {
  MagellanAggregatesResponse,
  MagellanBlock,
  MagellanTxFeeAggregatesResponse,
} from 'types/magellan-types';
import { createTransaction } from 'utils/magellan';
import { mapToTableData } from './utils';

const api = axios.create({
  baseURL: 'https://magellan.columbus.camino.foundation/v2',
});

export const getBlocksPage = async (startingBlock: number) => {
  const response = await api.get(
    `/cblocks?limit=${50}&limit=0&blockStart=${startingBlock}&blockEnd=NaN&transactionId=0`,
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
    `/cblocks?limit=${0}&limit=${50}&blockStart=${startingBlock}&blockEnd=${endingBlock}&transactionId=${transactionId}`,
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
  let url = `/aggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`;
  return (await api.get(url)).data;
}

export async function loadTransactionFeesAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanTxFeeAggregatesResponse> {
  const url = `/txfeeAggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`;
  return (await api.get(url)).data;
}

export async function loadBlocksAndTransactions({ address, offset }) {
  return await api.get(`/cblocks?address=${address}&limit=0&limit=${offset}`);
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
      // timestamp: parseInt(transaction.timestamp) * 1000,
      to: transaction.to,
      value: parseInt(transaction.value),
      transactionCost:
        parseInt(transaction.gasUsed) * parseInt(transaction.effectiveGasPrice),
      direction: transaction.from === address ? 'out' : 'in',
    };
  });
}

export async function loadXPTransactions(offset, chainID) {
  return await api.get(
    `/transactions?chainID=${chainID}&offset=${offset}&limit=50&sort=timestamp-desc`,
  );
}

export async function getXPTransactions(offset, chainID) {
  let res = (await loadXPTransactions(offset, chainID)).data;
  let newItems = res.transactions.map(item => createTransaction(item));
  return newItems.map(mapToTableData);
}

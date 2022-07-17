import axios from 'axios';
import { BlockType } from 'types/block';
import {
  MagellanAggregatesResponse,
  MagellanBlock,
  MagellanTxFeeAggregatesResponse,
} from 'types/magellan-types';

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

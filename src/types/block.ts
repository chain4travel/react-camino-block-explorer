import { CTransaction } from './transaction';

export interface BlockTableData {
  number: number;
  timestamp: number;
  numberOfTransactions: number;
  hash: string;
  gasUsed?: number;
  gasLimit?: number;
  blockCost: number;
}

export interface BlockDetails {
  blockNumber: number;
  timestamp: Date;
  transactionCount: number;
  fees: number;
  gasUsed: number;
  gasLimit: number;
  baseGaseFee?: number;
  hash: string;
  parentHash: string;
  additionalInformation: AdditionalInformation;
  parentBlockNumber?: number;
  transactions: CTransaction[];
}

interface AdditionalInformation {
  extraData?: string;
}

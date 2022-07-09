import { status } from 'types';
import { BlockDetail, BlockTableData } from './block';
import { CTransaction, XPTransaction } from './transaction';

export interface ChainOverviewType {
  numberOfTransactions: number;
  totalGasFees: number;
  numberOfActiveValidators: number;
  numberOfValidators: number;
  percentageOfActiveValidators: number;
  gasFeesLoading: status;
  transactionsLoading: status;
  validatorsLoading: status;
}

export interface initialCchainStateType {
  transactionCount: number;
  blockCount: number;
  blocks: BlockTableData[];
  transactions: CTransaction[];
  status: status;
  error: undefined | string;
  timeFrame: string;
  blockDetail?: BlockDetail;
  loadBlockDetial: status;
  ChainOverview: ChainOverviewType;
}

export interface initialXPchainStateType {
  transactions: XPTransaction[];
  status: status;
  error: undefined | string;
  timeFrame: string;
  ChainOverview: ChainOverviewType;
}

import { Status } from 'types';
import { BlockDetail, BlockTableData } from './block';
import { CTransaction, TranscationDetails, XPTransaction } from './transaction';

export interface ChainOverviewType {
  numberOfTransactions: number;
  totalGasFees: number;
  numberOfActiveValidators: number;
  numberOfValidators: number;
  percentageOfActiveValidators: number;
  gasFeesLoading: Status;
  transactionsLoading: Status;
  validatorsLoading: Status;
}

export interface initialCchainStateType {
  transactionCount: number;
  blockCount: number;
  blocks: BlockTableData[];
  transactions: CTransaction[];
  status: Status;
  error: undefined | string;
  timeFrame: string;
  blockDetail?: BlockDetail;
  loadBlockDetial: Status;
  loadTransactionDetails: Status;
  transcationDetails?: TranscationDetails;
  ChainOverview: ChainOverviewType;
}

interface assets {
  name: string;
  symbol: string;
}
export interface initialXPchainStateType {
  xTransactions?: XPTransaction[];
  pTransactions?: XPTransaction[];
  xTransactionDetails?: XPTransaction;
  pTransactionDetails?: XPTransaction;
  loadXPTransactions: Status;
  loadXTransactionDetials: Status;
  loadPTransactionDetials: Status;
  error: undefined | string;
  timeFrame: string;
  assets?: assets[];
  ChainOverview: ChainOverviewType;
}

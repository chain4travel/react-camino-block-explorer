export interface BlockTableData {
  number: number;
  timestamp: number;
  numberOfTransactions: number;
  hash: string;
  gasUsed?: number;
  gasLimit?: number;
  blockCost: number;
}

export interface initialStateType {
  transactionCount: number;
  blockCount: number;
  blocks: BlockTableData[];
  transactions: CTransaction[];
  status: string;
  error: undefined | string;
  timeFrame: string;
  ChainOverview: ChainOverviewType;
}

export interface ChainOverviewType {
  numberOfTransactions: number;
  totalGasFees: number;
  numberOfActiveValidators: number;
  numberOfValidators: number;
  percentageOfActiveValidators: string;
  gasFeesLoading: string;
  transactionsLoading: string;
  validatorsLoading: string;
}
export interface CTransaction {
  hash: string;
  status: string; // enum?
  block: number;
  index: number;
  timestamp: number;
  from: string;
  to: string;
  value: number;
  transactionCost: number;
}

export interface Aggregates {
  startTime: string;
  endTime: string;
  transactionVolume: string;
  transactionCount: number;
  addressCount: number;
  outputCount: number;
  assetCount: number;
}

export interface MagellanAggregatesResponse {
  aggregates: Aggregates;
  startTime: string;
  endTime: string;
}

export interface MagellanTxFeeAggregatesResponse {
  aggregates: TxFeeAggregates;
  startTime: string;
  endTime: string;
}

export interface TxFeeAggregates {
  startTime: string;
  endTime: string;
  txfee: string;
}

export interface NodeValidator {
  connected: boolean;
}

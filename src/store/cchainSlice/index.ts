import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://magellan.columbus.camino.foundation/v2';

const URL = `${url}/cblocks?limit=10&limit=10`;

export interface CTransaction {
  hash: string;
  status: string; // enum?
  block: number;
  index: number;
  timestamp: Date;
  from: string;
  to: string;
  value: number;
  transactionCost: number;
}

export interface BlockTableData {
  number: number;
  timestamp: Date;
  numberOfTransactions: number;
  hash: string;
  gasUsed?: number;
  gasLimit?: number;
  blockCost: number;
}

interface initialStateType {
  transactionCount: number;
  blockCount: number;
  blocks: BlockTableData[];
  transactions: CTransaction[];
  status: string;
  error: undefined | string;
  ChainOverview: ChainOverviewType;
}

// {
//   chainIds: {} as Record<string, string>,
//   selectedTime: Timeframe.HOURS_24,
//   validators: {} as MagellanValidatorsResponse,
//   numberOfTransactions: 0 as number,
//   totalGasFees: 0 as number,
//   numberOfActiveValidators: 0 as number,
//   numberOfValidators: 0 as number,
//   percentageOfActiveValidators: '',
//   gasFeesLoading: false as boolean,
//   transactionsLoading: false as boolean,
// }
// interface over

interface ChainOverviewType {
  numberOfTransactions: number;
  totalGasFees: number;
  numberOfActiveValidators: number;
  numberOfValidators: number;
  percentageOfActiveValidators: number;
  gasFeesLoading: string;
  transactionsLoading: string;
  validatorsLoading: string;
}

const initialState: initialStateType = {
  transactionCount: NaN,
  blockCount: NaN,
  blocks: [],
  transactions: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: undefined,
  ChainOverview: {
    numberOfTransactions: 0,
    totalGasFees: 0,
    numberOfActiveValidators: 0,
    numberOfValidators: 0,
    percentageOfActiveValidators: 0,
    gasFeesLoading: 'idle',
    transactionsLoading: 'idle',
    validatorsLoading: 'idle',
  } as ChainOverviewType,
};

export const fetchBlocksTransactions = createAsyncThunk(
  'cchain/fetchBlocks',
  async () => {
    const response = await axios.get(URL);
    return response.data;
  },
);

const cchainSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlocksTransactions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBlocksTransactions.fulfilled, (state, action) => {
        state.blocks = action.payload.blocks.map((block): BlockTableData => {
          let result: BlockTableData = {
            hash: block.hash,
            number: parseInt(block.number),
            timestamp: block.timestamp,
            // timestamp: new Date(block.timestamp * 1000),
            gasLimit: parseInt(block.gasLimit),
            gasUsed: parseInt(block.gasUsed),
            numberOfTransactions: block.evmTx ? block.evmTx : 0,
            blockCost: parseInt(block.gasUsed) * parseInt(block.baseFeePerGas),
          };
          return result;
        });
        state.transactions = action.payload.transactions.map(
          (element): CTransaction => {
            let result: CTransaction = {
              block: parseInt(element.block),
              index: parseInt(element.index),
              from: element.from,
              hash: element.hash,
              status:
                parseInt(element.status) === 1
                  ? 'Success'
                  : `Failed-${parseInt(element.status)}`,
              timestamp: element.timestamp,
              // timestamp: new Date(parseInt(element.timestamp) * 1000),
              to: element.to,
              value: parseInt(element.value),
              transactionCost:
                parseInt(element.gasUsed) * parseInt(element.effectiveGasPrice),
            };
            return result;
          },
        );
        state.status = 'succeeded';
        state.transactionCount = action.payload.transactionCount;
        state.blockCount = action.payload.blockCount;
      })
      .addCase(fetchBlocksTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const selectAllBlocks = state => state.cchain.blocks;
export const selectAllTransactions = state => state.cchain.transactions;
export const getCchainStatus = state => state.cchain.status;
export const getCchainError = state => state.cchain.error;
export default cchainSlice.reducer;

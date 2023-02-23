import { createAsyncThunk } from '@reduxjs/toolkit'

//API
import {
    fetchBlockchainActiveAddresses,
    fetchBlockchainChartDailyTransactions,
    fetchBlockchainChartUniqueAddresses,
    fetchBlockchainDailyGasUsed,
    fetchBlockchainAverageBlockSize
} from '../../api/index'

//Temporally JSON Test
import dailyTokenTransferData from '../../app/components/Statistics/json/dailyTokenTransaction.json'
import gasAveragePriceData from '../../app/components/Statistics/json/gasAveragePrice.json'
import gasAverageLimitData from '../../app/components/Statistics/json/gasAverageLimit.json'
import averageBlockSizeData from '../../app/components/Statistics/json/averageBlockSize.json'

/*
    /avgGasPriceUsed
    /averageBlockSize
*/

export const loadDailyTransactionsStatistics = createAsyncThunk(
    'blockchainDataCharts/transactionsPerDay',
    async (dates: any, thunk) => {
        let data = await fetchBlockchainChartDailyTransactions(dates)
        return data
    },
)

export const loadUniqueAddresses = createAsyncThunk(
    'blockchainDataCharts/uniqueAddressesInfo',
    async (dates: any, thunk) => {
        let data = await fetchBlockchainChartUniqueAddresses(dates)
        return data
    },
)

//Pending Fetch
export const loadDailyTokenTransfer = createAsyncThunk(
    'blockchainDataCharts/dailyTokenTransfers',
    async () => {
        let data = dailyTokenTransferData
        return data
    },
)

export const loadGasUsed = createAsyncThunk(
    'blockchainDataCharts/gasUsed',
    async (dates: any, thunk) => {
        let data = await fetchBlockchainDailyGasUsed(dates)
        return data
    },
)

export const loadActiveAddresses = createAsyncThunk(
    'blockchainDataCharts/activeAdresses',
    async (dates: any, thunk) => {
        let data = await fetchBlockchainActiveAddresses(dates)
        return data
    },
)

export const loadGasAveragePrice = createAsyncThunk(
    'blockchainDataCharts/gasAveragePrice',
    async () => {
        let data = gasAveragePriceData
        return data
    },
)

export const loadGasAverageLimit = createAsyncThunk(
    'blockchainDataCharts/gasAverageLimit',
    async () => {
        let data = gasAverageLimitData
        return data
    },
)

export const loadAverageBlockSize = createAsyncThunk(
    'blockchainDataCharts/averageBlockSizeData',
    async (dates: any, thunk) => {
        let data = await fetchBlockchainAverageBlockSize(dates);
        return data
    },
)

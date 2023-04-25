import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/configureStore'
import { Status } from 'types'
import {
    loadDailyTransactionsStatistics,
    loadUniqueAddresses,
    loadDailyTokenTransfer,
    loadGasUsed,
    loadActiveAddresses,
    loadGasAveragePrice,
    loadGasAverageLimit,
    loadAverageBlockSize,
} from './utils'
import { BlockchainDataInitialState } from 'types/statistics'

let initialState: BlockchainDataInitialState = {
    transactionsPerDay: null,
    transactionsPerDayLoading: Status.IDLE,
    uniqueAddressesInfo: null,
    uniqueAddressesInfoLoading: Status.IDLE,
    dailyTokenTransfers: null,
    dailyTokenTransfersLoading: Status.IDLE,
    gasUsed: null,
    gasUsedLoading: Status.IDLE,
    activeAdresses: null,
    activeAdressesLoading: Status.IDLE,
    gasAveragePrice: null,
    gasAveragePriceLoading: Status.IDLE,
    gasAverageLimit: null,
    gasAverageLimitLoading: Status.IDLE,
    averageBlockSize: null,
    averageBlockSizeLoading: Status.IDLE,
}

const blockchainDataChartsSlice = createSlice({
    name: 'blockchainDataCharts',
    initialState,
    reducers: {
        blockchainDataChartsReducer: () => initialState,
    },
    extraReducers(builder) {
        //(Blockchain Data) Daily Transactions
        builder.addCase(loadDailyTransactionsStatistics.pending, state => {
            state.transactionsPerDayLoading = Status.LOADING
        })
        builder.addCase(loadDailyTransactionsStatistics.fulfilled, (state, { payload }) => {
            state.transactionsPerDay = payload
            state.transactionsPerDayLoading = Status.SUCCEEDED
        })
        builder.addCase(loadDailyTransactionsStatistics.rejected, state => {
            state.transactionsPerDayLoading = Status.FAILED
        })

        //(Blockchain Data) Unique Addreses Info
        builder.addCase(loadUniqueAddresses.pending, state => {
            state.uniqueAddressesInfoLoading = Status.LOADING
        })
        builder.addCase(loadUniqueAddresses.fulfilled, (state, { payload }) => {
            state.uniqueAddressesInfo = payload
            state.uniqueAddressesInfoLoading = Status.SUCCEEDED
        })
        builder.addCase(loadUniqueAddresses.rejected, state => {
            state.uniqueAddressesInfoLoading = Status.FAILED
        })

        //(Blockchain Data) Daily Token Transfer
        builder.addCase(loadDailyTokenTransfer.pending, state => {
            state.dailyTokenTransfersLoading = Status.LOADING
        })
        builder.addCase(loadDailyTokenTransfer.fulfilled, (state, { payload }) => {
            state.dailyTokenTransfers = payload
            state.dailyTokenTransfersLoading = Status.SUCCEEDED
        })
        builder.addCase(loadDailyTokenTransfer.rejected, state => {
            state.dailyTokenTransfersLoading = Status.FAILED
        })

        //(Blockchain Data) Gas Used
        builder.addCase(loadGasUsed.pending, state => {
            state.gasUsedLoading = Status.LOADING
        })
        builder.addCase(loadGasUsed.fulfilled, (state, { payload }) => {
            state.gasUsed = payload
            state.gasUsedLoading = Status.SUCCEEDED
        })
        builder.addCase(loadGasUsed.rejected, state => {
            state.gasUsedLoading = Status.FAILED
        })

        //(Blockchain Data) Active Addresses
        builder.addCase(loadActiveAddresses.pending, state => {
            state.activeAdressesLoading = Status.LOADING
        })
        builder.addCase(loadActiveAddresses.fulfilled, (state, { payload }) => {
            state.activeAdresses = payload
            state.activeAdressesLoading = Status.SUCCEEDED
        })
        builder.addCase(loadActiveAddresses.rejected, state => {
            state.activeAdressesLoading = Status.FAILED
        })
        //(Blockchain Data) gasAveragePrice
        builder.addCase(loadGasAveragePrice.pending, state => {
            state.gasAveragePriceLoading = Status.LOADING
        })
        builder.addCase(loadGasAveragePrice.fulfilled, (state, { payload }) => {
            state.gasAveragePrice = payload
            state.gasAveragePriceLoading = Status.SUCCEEDED
        })
        builder.addCase(loadGasAveragePrice.rejected, state => {
            state.gasAveragePriceLoading = Status.FAILED
        })
        //(Blockchain Data) gasAverageLimit
        builder.addCase(loadGasAverageLimit.pending, state => {
            state.gasAverageLimitLoading = Status.LOADING
        })
        builder.addCase(loadGasAverageLimit.fulfilled, (state, { payload }) => {
            state.gasAverageLimit = payload
            state.gasAverageLimitLoading = Status.SUCCEEDED
        })
        builder.addCase(loadGasAverageLimit.rejected, state => {
            state.gasAverageLimitLoading = Status.FAILED
        })

        //(Blockchain Data) averageBlockSize
        builder.addCase(loadAverageBlockSize.pending, state => {
            state.averageBlockSizeLoading = Status.LOADING
        })
        builder.addCase(loadAverageBlockSize.fulfilled, (state, { payload }) => {
            state.averageBlockSize = payload
            state.averageBlockSizeLoading = Status.SUCCEEDED
        })
        builder.addCase(loadAverageBlockSize.rejected, state => {
            state.averageBlockSizeLoading = Status.FAILED
        })
    },
})

export const getTransactionsPerDay = (state: RootState) =>
    state.blockchainDataCharts.transactionsPerDay
export const getTransactionsPerDayStatus = (state: RootState) =>
    state.blockchainDataCharts.transactionsPerDayLoading

export const getUniqueAddresses = (state: RootState) =>
    state.blockchainDataCharts.uniqueAddressesInfo
export const getUniqueAddressesLoading = (state: RootState) =>
    state.blockchainDataCharts.uniqueAddressesInfoLoading

export const getDailyTokenTransfers = (state: RootState) =>
    state.blockchainDataCharts.dailyTokenTransfers
export const getDailyTokenTransfersLoading = (state: RootState) =>
    state.blockchainDataCharts.dailyTokenTransfersLoading

export const getGasUsed = (state: RootState) => state.blockchainDataCharts.gasUsed
export const getGasUsedLoading = (state: RootState) => state.blockchainDataCharts.gasUsedLoading

export const getActiveAddresses = (state: RootState) => state.blockchainDataCharts.activeAdresses
export const getActiveAddressesInfo = (state: RootState) =>
    state.blockchainDataCharts.activeAdressesLoading

export const getGasAveragePrice = (state: RootState) => state.blockchainDataCharts.gasAveragePrice
export const getGasAveragePriceInfo = (state: RootState) =>
    state.blockchainDataCharts.gasAveragePriceLoading

export const getGasAverageLimit = (state: RootState) => state.blockchainDataCharts.gasAverageLimit
export const getGasAverageLimitInfo = (state: RootState) =>
    state.blockchainDataCharts.gasAverageLimitLoading

export const getAverageBlockSize = (state: RootState) => state.blockchainDataCharts.averageBlockSize
export const getAverageBlockSizeInfo = (state: RootState) =>
    state.blockchainDataCharts.averageBlockSizeLoading

export const { blockchainDataChartsReducer } = blockchainDataChartsSlice.actions

export default blockchainDataChartsSlice.reducer

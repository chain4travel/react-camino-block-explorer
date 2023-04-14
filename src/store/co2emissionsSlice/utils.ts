import { createAsyncThunk } from '@reduxjs/toolkit'
import { FilterDates } from 'types/statistics'
import {
    fetchDailyEmissions,
    fetchNetworkEmissions,
    fetchTransactionsEmissions,
    fetchCountryEmissions,
} from '../../api'

export const loadDailyEmissions = createAsyncThunk(
    'co2statistics/dailyEmissions',
    async (dates: FilterDates, thunk) => {
        let response = await fetchDailyEmissions(dates)
        return response
    },
)

export const loadNetworkEmissions = createAsyncThunk(
    'co2statistics/networkEmissions',
    async (dates: FilterDates, thunk) => {
        let response = await fetchNetworkEmissions(dates)
        return response
    },
)

export const loadTransactionsEmissions = createAsyncThunk(
    'co2statistics/transactionsEmissions',
    async (dates: FilterDates, thunk) => {
        let response = await fetchTransactionsEmissions(dates)
        return response
    },
)

export const loadCountryEmissions = createAsyncThunk(
    'co2statistics/countryEmissions',
    async (dates: FilterDates, thunk) => {
        let response = await fetchCountryEmissions(dates)
        return response
    },
)

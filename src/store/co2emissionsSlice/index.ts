import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/configureStore'
import { Status } from 'types'
import { Emissions, EmissionsDataInitialState } from 'types/statistics'
import {
    loadCountryEmissions,
    loadDailyEmissions,
    loadNetworkEmissions,
    loadTransactionsEmissions,
} from './utils'

let initialState: EmissionsDataInitialState = {
    dailyEmissions: null,
    dailyEmissionsStatus: Status.IDLE,
    networkEmissions: null,
    networkEmissionsStatus: Status.IDLE,
    transactionsEmissions: null,
    transactionsEmissionsStatus: Status.IDLE,
    carbonIntensityFactor: {},
    carbonIntensityFactorStatus: Status.IDLE,
    countryEmissions: null,
    countryEmissionsStatus: Status.IDLE,
}

const co2EmissionsSlice = createSlice({
    name: 'co2emissions',
    initialState,
    reducers: {
        co2EmissionsReducer: () => initialState,
    },
    extraReducers(builder) {
        //Daily Emissions
        builder.addCase(loadDailyEmissions.pending, state => {
            state.dailyEmissionsStatus = Status.LOADING
        })
        builder.addCase(loadDailyEmissions.fulfilled, (state, { payload }) => {
            if (payload != null && payload !== undefined) {
                state.dailyEmissions = payload
            } else {
                state.dailyEmissions = null
            }

            state.dailyEmissionsStatus = Status.SUCCEEDED
        })
        builder.addCase(loadDailyEmissions.rejected, state => {
            state.dailyEmissionsStatus = Status.FAILED
        })

        //Network Emissions
        builder.addCase(loadNetworkEmissions.pending, state => {
            state.networkEmissionsStatus = Status.LOADING
        })
        builder.addCase(loadNetworkEmissions.fulfilled, (state, { payload }) => {
            if (payload != null && payload !== undefined) {
                state.networkEmissions = payload
            } else {
                state.networkEmissions = null
            }

            state.networkEmissionsStatus = Status.SUCCEEDED
        })
        builder.addCase(loadNetworkEmissions.rejected, state => {
            state.networkEmissionsStatus = Status.FAILED
        })

        //Transactions Emissions
        builder.addCase(loadTransactionsEmissions.pending, state => {
            state.transactionsEmissionsStatus = Status.LOADING
        })
        builder.addCase(loadTransactionsEmissions.fulfilled, (state, { payload }) => {
            if (payload != null && payload !== undefined) {
                state.transactionsEmissions = payload
            } else {
                state.transactionsEmissions = null
            }

            state.transactionsEmissionsStatus = Status.SUCCEEDED
        })
        builder.addCase(loadTransactionsEmissions.rejected, state => {
            state.transactionsEmissionsStatus = Status.FAILED
        })

        //Country Emissions
        builder.addCase(loadCountryEmissions.pending, state => {
            state.countryEmissionsStatus = Status.LOADING
        })
        builder.addCase(loadCountryEmissions.fulfilled, (state, { payload }) => {
            if (payload != null && payload !== undefined) {
                state.countryEmissions = payload
            } else {
                state.countryEmissions = null
            }

            state.countryEmissionsStatus = Status.SUCCEEDED
        })
        builder.addCase(loadCountryEmissions.rejected, state => {
            state.countryEmissionsStatus = Status.FAILED
        })
    },
})

export const getDailyEmissions = (state: RootState): Emissions => state.co2emissions.dailyEmissions
export const getDailyEmissionsStatus = (state: RootState): string =>
    state.co2emissions.dailyEmissionsStatus

export const getNetworkEmissions = (state: RootState): Emissions =>
    state.co2emissions.networkEmissions
export const getNetworkEmissionsStatus = (state: RootState): string =>
    state.co2emissions.networkEmissionsStatus

export const getTransactionsEmissions = (state: RootState): Emissions =>
    state.co2emissions.transactionsEmissions
export const getTransactionsEmissionsStatus = (state: RootState): string =>
    state.co2emissions.transactionsEmissionsStatus

export const getCountryEmissions = (state: RootState): Emissions =>
    state.co2emissions.countryEmissions
export const getCountryEmissionsStatus = (state: RootState): string =>
    state.co2emissions.countryEmissionsStatus

export const { co2EmissionsReducer } = co2EmissionsSlice.actions

export default co2EmissionsSlice.reducer

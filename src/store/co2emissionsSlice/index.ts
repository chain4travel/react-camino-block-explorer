import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/configureStore'
import { Status } from 'types'
import { loadCountryEmissions, loadDailyEmissions, loadNetworkEmissions, loadTransactionsEmissions } from './utils'

let initialStateCO2Data = {
    name: '',
    value: [],
}

let initialState = {
    dailyEmissions: initialStateCO2Data,
    dailyEmissionsStatus: Status.IDLE,
    networkEmissions: initialStateCO2Data,
    networkEmissionsStatus: Status.IDLE,
    transactionsEmissions: initialStateCO2Data,
    transactionsEmissionsStatus: Status.IDLE,
    carbonIntensityFactor: {},
    carbonIntensityFactorStatus: Status.IDLE,
    countryEmissions: initialStateCO2Data,
    countryEmissionsStatus: Status.IDLE
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
            let data: any = payload

            if (data != null && data != undefined) {
                state.dailyEmissions = data
            } else {
                state.dailyEmissions = initialStateCO2Data
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
            let data: any = payload

            if (data != null && data != undefined) {
                state.networkEmissions = data
            } else {
                state.networkEmissions = initialStateCO2Data
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
            let data: any = payload

            if (data != null && data != undefined) {
                state.transactionsEmissions = data
            } else {
                state.transactionsEmissions = initialStateCO2Data
            }

            state.transactionsEmissionsStatus = Status.SUCCEEDED
        })
        builder.addCase(loadTransactionsEmissions.rejected, state => {
            state.transactionsEmissionsStatus = Status.FAILED
        });

        //Country Emissions
        builder.addCase(loadCountryEmissions.pending, state => {
            state.countryEmissionsStatus = Status.LOADING
        })
        builder.addCase(loadCountryEmissions.fulfilled, (state, { payload }) => {
            let data: any = payload

            if (data != null && data != undefined) {
                state.countryEmissions = data
            } else {
                state.countryEmissions = initialStateCO2Data
            }

            state.countryEmissionsStatus = Status.SUCCEEDED
        })
        builder.addCase(loadCountryEmissions.rejected, state => {
            state.countryEmissionsStatus = Status.FAILED
        });
    },
})

export const getDailyEmissions = (state: RootState) => state.co2emissions.dailyEmissions
export const getDailyEmissionsStatus = (state: RootState) => state.co2emissions.dailyEmissionsStatus

export const getNetworkEmissions = (state: RootState) => state.co2emissions.networkEmissions
export const getNetworkEmissionsStatus = (state: RootState) =>
    state.co2emissions.networkEmissionsStatus

export const getTransactionsEmissions = (state: RootState) =>
    state.co2emissions.transactionsEmissions
export const getTransactionsEmissionsStatus = (state: RootState) =>
    state.co2emissions.transactionsEmissionsStatus

    export const getCountryEmissions = (state: RootState) =>
    state.co2emissions.countryEmissions
export const getCountryEmissionsStatus = (state: RootState) =>
    state.co2emissions.countryEmissionsStatus

export const { co2EmissionsReducer } = co2EmissionsSlice.actions

export default co2EmissionsSlice.reducer

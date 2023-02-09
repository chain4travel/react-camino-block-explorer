import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchDailyEmissions,
    fetchNetworkEmissions,
    fetchTransactionsEmissions
} from '../../api';

export const loadDailyEmissions = createAsyncThunk("co2statistics/dailyEmissions", async (dates: any, thunk) => {
    let response = await fetchDailyEmissions(dates);
    return response;
});

export const loadNetworkEmissions = createAsyncThunk("co2statistics/networkEmissions", async (dates: any, thunk) => {
    let response = await fetchNetworkEmissions(dates);
    return response;
});

export const loadTransactionsEmissions = createAsyncThunk("co2statistics/transactionsEmissions", async (dates: any, thunk) => {
    let response = await fetchTransactionsEmissions(dates);
    return response;
});
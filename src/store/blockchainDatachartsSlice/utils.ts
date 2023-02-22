import { createAsyncThunk } from "@reduxjs/toolkit";

//API
import {
    fetchBlockchainChartDailyTransactions,
    fetchBlockchainChartUniqueAddresses
} from '../../api/index'; 

//Temporally JSON Test
import uniqueAddresesData from '../../app/components/Statistics/json/uniqueAddresesData.json';
import dailyTokenTransferData from '../../app/components/Statistics/json/dailyTokenTransaction.json';
import gasUsedData from '../../app/components/Statistics/json/gasUsed.json';
import activeAddressesData from '../../app/components/Statistics/json/activeAddresses.json';
import gasAveragePriceData from '../../app/components/Statistics/json/gasAveragePrice.json';
import gasAverageLimitData from '../../app/components/Statistics/json/gasAverageLimit.json';
import averageBlockSizeData from '../../app/components/Statistics/json/averageBlockSize.json';


/*

Get("/activeAddresses", (*V2Context).ActiveAddresses).
		Get("/uniqueAddresses", (*V2Context).UniqueAddresses).
		Get("/averageBlockSize", (*V2Context).AverageBlockSize).
		
		Get("/dailyGasUsed", (*V2Context).DailyGasUsed).
		Get("/avgGasPriceUsed", (*V2Context).AvgGasPriceUsed).
		Get("/dailyTokenTransfer", (*V2Context).DailyTokenTransfer).
*/


//Pending of Fetch
export const loadDailyTransactionsStatistics = createAsyncThunk("blockchainDataCharts/transactionsPerDay", async (dates: any, thunk) => {
    let data = await fetchBlockchainChartDailyTransactions(dates);
    return data;
});

export const loadUniqueAddresses = createAsyncThunk("blockchainDataCharts/uniqueAddressesInfo", async (dates: any, thunk) => {
    let data = await fetchBlockchainChartUniqueAddresses(dates);  
    return data;
});

export const loadDailyTokenTransfer = createAsyncThunk("blockchainDataCharts/dailyTokenTransfers", async () => {
    let data = dailyTokenTransferData;
    return data;
});

export const loadGasUsed = createAsyncThunk("blockchainDataCharts/gasUsed", async () => {
    let data = gasUsedData;
    return data;
});

export const loadActiveAddresses = createAsyncThunk("blockchainDataCharts/activeAdresses", async () => {
    let data = activeAddressesData;
    return data;
});
export const loadGasAveragePrice = createAsyncThunk("blockchainDataCharts/gasAveragePrice", async () => {
    let data = gasAveragePriceData;
    return data;
});
export const loadGasAverageLimit = createAsyncThunk("blockchainDataCharts/gasAverageLimit", async () => {
    let data = gasAverageLimitData;
    return data;
});
export const loadAverageBlockSize = createAsyncThunk("blockchainDataCharts/averageBlockSizeData", async () => {
    let data = averageBlockSizeData;
    return data;
});
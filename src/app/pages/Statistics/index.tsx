import React, { FC } from 'react'
import SubPageTitle from 'app/components/SubPageTitle'
import PageContainer from 'app/components/PageContainer'
import { Paper, useTheme } from '@mui/material'
import {
    getDailyEmissions,
    getDailyEmissionsStatus,
    getNetworkEmissions,
    getNetworkEmissionsStatus,
    getTransactionsEmissions,
    getTransactionsEmissionsStatus,
    getCountryEmissions,
    getCountryEmissionsStatus,
} from 'store/co2emissionsSlice'
import {
    loadDailyEmissions,
    loadNetworkEmissions,
    loadTransactionsEmissions,
} from 'store/co2emissionsSlice/utils'
import {
    getTransactionsPerDay,
    getTransactionsPerDayStatus,
    getUniqueAddresses,
    getUniqueAddressesLoading,
    getDailyTokenTransfers,
    getDailyTokenTransfersLoading,
    getGasUsed,
    getGasUsedLoading,
    getActiveAddresses,
    getActiveAddressesInfo,
    getGasAveragePrice,
    getGasAveragePriceInfo,
    getAverageBlockSize,
    getAverageBlockSizeInfo,
} from 'store/blockchainDatachartsSlice'
import {
    loadDailyTransactionsStatistics,
    loadUniqueAddresses,
    loadDailyTokenTransfer,
    loadGasUsed,
    loadActiveAddresses,
    loadGasAveragePrice,
    loadAverageBlockSize,
} from 'store/blockchainDatachartsSlice/utils'
import BlockchainCharts from '../../components/Statistics/BlockchainDataCharts'
import { typeChartData } from '../../../utils/statistics/ChartSelector'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CO2ConsumptionCharts from '../../components/Statistics/CO2ConsumptionCharts/index'
import { typesMeter } from '../../../utils/statistics/ChartSelector'
import { loadCountryEmissions } from '../../../store/co2emissionsSlice/utils'
import '../../../styles/datacharts.css'

const Statistics: FC = () => {
    const theme = useTheme()
    const dark = theme.palette.mode === 'light' ? false : true

    return (
        <PageContainer pageTitle="Statistics" metaContent="statistics">
            <Paper
                variant="outlined"
                square
                sx={{
                    minHeight: '544px',
                    width: 1,
                    backgroundColor: 'primary.dark',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderColor: 'primary.light',
                    borderStyle: 'solid',
                    p: '1rem 1.5rem 1rem 1.5rem',
                }}
            >
                <SubPageTitle
                    title="Blockchain Data"
                    styleTyphography={{ marginBottom: '2rem', marginTop: '2rem', fontSize: '2rem' }}
                    hiddenBackButton={true}
                    backToLink={''}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <BlockchainCharts
                                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                                darkMode={dark}
                                titleText={'Daily Transactions'}
                                utilSlice={(dates: Date) => loadDailyTransactionsStatistics(dates)}
                                sliceGetter={getTransactionsPerDay}
                                sliceGetterLoader={getTransactionsPerDayStatus}
                                typeStatistic={typeChartData.DAILY_TRANSACTIONS}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <BlockchainCharts
                                tooltipTitle="The chart shows the total distinct numbers of address on the Camino blockchain and the increase in the number of address daily."
                                darkMode={dark}
                                titleText={'Unique Adresses'}
                                utilSlice={(dates: Date) => loadUniqueAddresses(dates)}
                                sliceGetter={getUniqueAddresses}
                                sliceGetterLoader={getUniqueAddressesLoading}
                                typeStatistic={typeChartData.UNIQUE_ADRESSES}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <BlockchainCharts
                                tooltipTitle="The Camino Daily Gas Used Chart shows the historical total daily gas used of the Camino network."
                                darkMode={dark}
                                titleText={'Gas Used'}
                                utilSlice={(dates: Date) => loadGasUsed(dates)}
                                sliceGetter={getGasUsed}
                                sliceGetterLoader={getGasUsedLoading}
                                typeStatistic={typeChartData.GAS_USED}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <BlockchainCharts
                                tooltipTitle="The Active Camino Address chart shows the daily number of unique addresses that were active on the network as a sender or receiver."
                                darkMode={dark}
                                titleText={'Active Addresses'}
                                utilSlice={(dates: Date) => loadActiveAddresses(dates)}
                                sliceGetter={getActiveAddresses}
                                sliceGetterLoader={getActiveAddressesInfo}
                                typeStatistic={typeChartData.ACTIVE_ADDRESSES}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <BlockchainCharts
                                tooltipTitle="The Camino Average Block Size Chart indicates the historical average block size in bytes of the Camino blockchain."
                                darkMode={dark}
                                titleText={'Average Block Size'}
                                utilSlice={(dates: Date) => loadAverageBlockSize(dates)}
                                sliceGetter={getAverageBlockSize}
                                sliceGetterLoader={getAverageBlockSizeInfo}
                                typeStatistic={typeChartData.AVERAGE_BLOCK_SIZE}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <BlockchainCharts
                                tooltipTitle="The Camino Average Gas Price Chart shows the daily average gas price, including the gas unit and gas tip used of the Camino Network."
                                darkMode={dark}
                                titleText={'Average gas price'}
                                utilSlice={(dates: Date) => loadGasAveragePrice(dates)}
                                sliceGetter={getGasAveragePrice}
                                sliceGetterLoader={getGasAveragePriceInfo}
                                typeStatistic={typeChartData.GAS_AVERAGE_PRICE}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <BlockchainCharts
                                tooltipTitle="The chart shows the number of Camino tokens transferred daily."
                                darkMode={dark}
                                titleText={'Daily Token Transfer'}
                                utilSlice={(dates: Date) => loadDailyTokenTransfer(dates)}
                                sliceGetter={getDailyTokenTransfers}
                                sliceGetterLoader={getDailyTokenTransfersLoading}
                                typeStatistic={typeChartData.DAILY_TOKEN_TRANSFER}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Paper
                variant="outlined"
                square
                sx={{
                    minHeight: '544px',
                    width: 1,
                    backgroundColor: 'primary.dark',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderColor: 'primary.light',
                    borderStyle: 'solid',
                    p: '1rem 1.5rem 1rem 1.5rem',
                }}
            >
                <SubPageTitle
                    title="CO2 Emissions"
                    styleTyphography={{ marginBottom: '2rem', marginTop: '2rem', fontSize: '2rem' }}
                    hiddenBackButton={true}
                    backToLink={''}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.BAR}
                                darkMode={dark}
                                utilSlice={(dates: Date) => loadDailyEmissions(dates)}
                                sliceGetter={getDailyEmissions}
                                sliceGetterLoader={getDailyEmissionsStatus}
                                titleText="Daily Emissions"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.TIME_SERIES}
                                darkMode={dark}
                                utilSlice={(dates: Date) => loadNetworkEmissions(dates)}
                                sliceGetter={getNetworkEmissions}
                                sliceGetterLoader={getNetworkEmissionsStatus}
                                titleText="Network Emissions"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.TIME_SERIES}
                                darkMode={dark}
                                utilSlice={(dates: Date) => loadTransactionsEmissions(dates)}
                                sliceGetter={getTransactionsEmissions}
                                sliceGetterLoader={getTransactionsEmissionsStatus}
                                titleText="Network Emissions Per Transaction"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.COUNTRIES_BAR}
                                darkMode={dark}
                                utilSlice={(dates: Date) => loadCountryEmissions(dates)}
                                sliceGetter={getCountryEmissions}
                                sliceGetterLoader={getCountryEmissionsStatus}
                                titleText="Country Emissions"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </PageContainer>
    )
}

export default Statistics

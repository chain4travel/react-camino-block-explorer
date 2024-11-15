import '../../../styles/datacharts.css'

import { Paper, useTheme } from '@mui/material'
import React, { FC } from 'react'
import {
    getActiveAddresses,
    getActiveAddressesInfo,
    getAverageBlockSize,
    getAverageBlockSizeInfo,
    getDailyTokenTransfers,
    getDailyTokenTransfersLoading,
    getGasUsed,
    getGasUsedLoading,
    getTransactionsPerDay,
    getTransactionsPerDayStatus,
    getUniqueAddresses,
    getUniqueAddressesLoading,
} from 'store/blockchainDatachartsSlice'
import {
    loadActiveAddresses,
    loadAverageBlockSize,
    loadDailyTokenTransfer,
    loadDailyTransactionsStatistics,
    loadGasUsed,
    loadUniqueAddresses,
} from 'store/blockchainDatachartsSlice/utils'

import BlockchainCharts from '../../components/Statistics/BlockchainDataCharts'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PageContainer from 'app/components/PageContainer'
import SubPageTitle from 'app/components/SubPageTitle'
import { typeChartData } from '../../../utils/statistics/ChartSelector'

const Statistics: FC = () => {
    const theme = useTheme()
    const dark = theme.palette.mode === 'light' ? false : true

    return (
        <PageContainer
            pageTitle="Camino Statistics and Blockchain Data Dashboard"
            metaContent="Explore the Camino statistics dashboard for real-time data on network activity, transactions, gas, wallets, and more. Keep track of the travel blockchain performance."
            metaKeywords='Camino Statistics'
        >
            <Paper
                variant="outlined"
                square
                sx={{
                    minHeight: '544px',
                    width: 1,
                    backgroundColor: 'card.background',
                    borderRadius: '12px',
                    borderWidth: '1px',
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
            {/* <Paper
                variant="outlined"
                square
                sx={{
                    minHeight: '544px',
                    width: 1,
                    backgroundColor: 'card.background',
                    borderRadius: '12px',
                    borderWidth: '1px',
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
                                utilSlice={(dates: FilterDates) => loadDailyEmissions(dates)}
                                sliceGetter={getDailyEmissions}
                                sliceGetterLoader={getDailyEmissionsStatus}
                                titleText="Daily Emissions"
                                description={
                                    'The daily emissions chart shows the daily C02 emissions of the network compared to other popular blockchains.'
                                }
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.TIME_SERIES}
                                darkMode={dark}
                                utilSlice={(dates: FilterDates) => loadNetworkEmissions(dates)}
                                sliceGetter={getNetworkEmissions}
                                sliceGetterLoader={getNetworkEmissionsStatus}
                                titleText="Network Emissions"
                                description={
                                    'The network emissions chart shows the C02 emissions of the network.'
                                }
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.TIME_SERIES}
                                darkMode={dark}
                                utilSlice={(dates: FilterDates) => loadTransactionsEmissions(dates)}
                                sliceGetter={getTransactionsEmissions}
                                sliceGetterLoader={getTransactionsEmissionsStatus}
                                titleText="Network Emissions Per Transaction"
                                description={
                                    'The network emissions per transaction chart shows the C02 emissions of each transaction.'
                                }
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.COUNTRIES_BAR}
                                darkMode={dark}
                                utilSlice={(dates: FilterDates) => loadCountryEmissions(dates)}
                                sliceGetter={getCountryEmissions}
                                sliceGetterLoader={getCountryEmissionsStatus}
                                titleText="Carbon Intensity Factor"
                                description={
                                    'The Carbon Intensity Factor chart shows the number of grams of CO2 required to generate one kWh of energy in specific countries. The Camino bar demonstrates the median amount of CO2 needed to operate a node on the Camino chain across all countries.'
                                }
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper> */}
        </PageContainer>
    )
}

export default React.memo(Statistics)

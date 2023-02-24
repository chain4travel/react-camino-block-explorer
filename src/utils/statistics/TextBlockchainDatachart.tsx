import React from 'react'
import { typeBlockchainDataChart } from './ChartSelector'
import { Grid } from '@mui/material'
import moment from 'moment'

export const TextBlockchainDatachart = ({
    typeStatistic,
    startDate,
    endDate,
    dataStatistics,
    Text,
}) => {
    return (
        <>
            <Grid xs={12} md={6}>
                {typeStatistic === typeBlockchainDataChart.DAILY_TRANSACTIONS && (
                    <Text>
                        Highest number of {dataStatistics.highestValue} transactions on{' '}
                        {`${moment(startDate).format('dddd, MMMM DD, YYYY')}`}
                    </Text>
                )}
                {typeStatistic === typeBlockchainDataChart.UNIQUE_ADRESSES && (
                    <Text>
                        Highest increase of {dataStatistics.highestValue} new addresses was recorded
                        on {`${moment(startDate).format('dddd, MMMM DD, YYYY')}`}
                    </Text>
                )}
                {typeStatistic === typeBlockchainDataChart.ACTIVE_ADDRESSES && (
                    <Text>
                        Highest number of {dataStatistics.highestValue} addresses on{' '}
                        {`${moment(startDate).format('dddd, MMMM DD, YYYY')}`}
                    </Text>
                )}
            </Grid>
            <Grid xs={12} md={6}>
                {typeStatistic === typeBlockchainDataChart.DAILY_TRANSACTIONS && (
                    <Text>
                        Lowest number of {dataStatistics.lowerValue} transactions on{' '}
                        {`${moment(endDate).format('dddd, MMMM DD, YYYY')}`}
                    </Text>
                )}
                {typeStatistic === typeBlockchainDataChart.UNIQUE_ADRESSES && (
                    <Text>
                        Lowest increase of {dataStatistics.lowestValue} new addresses was recorded
                        on {`${moment(startDate).format('dddd, MMMM DD, YYYY')}`}
                    </Text>
                )}
                {typeStatistic === typeBlockchainDataChart.ACTIVE_ADDRESSES && (
                    <Text>
                        Lowest number of {dataStatistics.lowestValue} addresses on{' '}
                        {`${moment(startDate).format('dddd, MMMM DD, YYYY')}`}
                    </Text>
                )}
            </Grid>
        </>
    )
}

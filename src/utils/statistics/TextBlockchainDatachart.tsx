import React from 'react'
import { typeChartData } from './ChartSelector'
import { useTheme } from '@mui/material'
import moment from 'moment'
import { IBlockChainDataChart } from 'types/statistics'

export const TextBlockchainDatachart = ({
    typeStatistic,
    startDate,
    endDate,
    dataStatistics,
    Text,
    isDescriptionOfHighest,
}: IBlockChainDataChart) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'

    const getLowestDate = () => {
        if (dataStatistics.lowerDate !== null && dataStatistics.lowerDate !== undefined) {
            return moment(dataStatistics.lowerDate).format('dddd, MMMM DD, YYYY')
        } else if (dataStatistics.lowestDate !== null && dataStatistics.lowestDate !== undefined) {
            return moment(dataStatistics.lowestDate).format('dddd, MMMM DD, YYYY')
        } else {
            return ''
        }
    }

    const getHighestDate = () => {
        if (dataStatistics.highestDate != null && dataStatistics.highestDate !== undefined) {
            return moment(dataStatistics.highestDate).format('dddd, MMMM DD, YYYY')
        } else {
            return ''
        }
    }

    return (
        <>
            {isDescriptionOfHighest ? (
                <>
                    {typeStatistic === typeChartData.DAILY_TRANSACTIONS && (
                        <Text backgroundColor={isDark ? '#0f172a' : '#F5F6FA'}>
                            Highest number of {dataStatistics.highestValue} transactions on <br />
                            {`${getHighestDate()}`}
                        </Text>
                    )}
                    {typeStatistic === typeChartData.UNIQUE_ADRESSES && (
                        <Text backgroundColor={isDark ? '#0f172a' : '#F5F6FA'}>
                            Highest increase of {dataStatistics.highestValue} new addresses was
                            recorded on <br /> {`${getHighestDate()}`}
                        </Text>
                    )}
                    {typeStatistic === typeChartData.ACTIVE_ADDRESSES && (
                        <Text backgroundColor={isDark ? '#0f172a' : '#F5F6FA'}>
                            Highest number of {dataStatistics.highestValue} addresses on <br />
                            {`${getHighestDate()}`}
                        </Text>
                    )}
                </>
            ) : (
                <>
                    {typeStatistic === typeChartData.DAILY_TRANSACTIONS && (
                        <Text backgroundColor={isDark ? '#0f172a' : '#F5F6FA'}>
                            Lowest number of {dataStatistics.lowerValue} transactions on <br />
                            {`${getLowestDate()}`}
                        </Text>
                    )}
                    {typeStatistic === typeChartData.UNIQUE_ADRESSES && (
                        <Text backgroundColor={isDark ? '#0f172a' : '#F5F6FA'}>
                            Lowest increase of {dataStatistics.lowestValue} new addresses was
                            recorded on <br /> {`${getLowestDate()}`}
                        </Text>
                    )}
                    {typeStatistic === typeChartData.ACTIVE_ADDRESSES && (
                        <Text backgroundColor={isDark ? '#0f172a' : '#F5F6FA'}>
                            Lowest number of {dataStatistics.lowestValue} addresses on <br />
                            {`${getLowestDate()}`}
                        </Text>
                    )}
                </>
            )}
        </>
    )
}

import { useTheme } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { IBlockChainDataChart } from 'types/statistics'
import { currentDateFormat } from 'utils/helpers/moment'
import { seeTimeAxis } from '../../app/components/Statistics/ChartConfig/SeeTimeAxis'
import { typeChartData } from './ChartSelector'

const TextBlockchainDatachart = ({
    typeStatistic,
    startDate,
    endDate,
    dataStatistics,
    Text,
    isDescriptionOfHighest,
    timeSeeAxis,
}: IBlockChainDataChart) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'
    const getLowestDate = () => {
        if (dataStatistics.lowestDate !== null && dataStatistics.lowestDate !== undefined) {
            let dateString = validateTypeTimeFilter(dataStatistics.lowestDate)
            return dateString
        } else {
            return ''
        }
    }

    const getHighestDate = () => {
        if (dataStatistics.highestDate != null && dataStatistics.highestDate !== undefined) {
            let dateString = validateTypeTimeFilter(dataStatistics.highestDate)
            return dateString
        } else {
            return ''
        }
    }

    function validateTypeTimeFilter(dateString: string): string {
        try {
            let format =
                currentDateFormat()[0] === 'd' ? 'dddd, DD MMMM, YYYY' : 'dddd, MMMM DD, YYYY'
            let defaultStringDate = moment(dateString).format(format)
            switch (timeSeeAxis) {
                case seeTimeAxis.day:
                    return defaultStringDate
                case seeTimeAxis.month:
                    return defaultStringDate
                case seeTimeAxis.year:
                    return moment(dateString).format('MMMM, YYYY')
                case seeTimeAxis.all:
                    return moment(dateString).format('YYYY')
                case seeTimeAxis.custom:
                    return validateCustomDateText(dateString)
                default:
                    return defaultStringDate
            }
        } catch (e) {
            console.error('Text Chart Error:', e)
            return dateString
        }
    }

    function validateCustomDateText(dateString: string): string {
        try {
            let monthsBetween =
                moment(endDate).toDate().getMonth() - moment(startDate).toDate().getMonth()

            let yearsBetween =
                moment(endDate).toDate().getFullYear() - moment(startDate).toDate().getFullYear()

            if ((monthsBetween >= 1 || monthsBetween < 0) && yearsBetween === 0) {
                return moment(dateString).format('MMMM, YYYY')
            } else if (yearsBetween > 0) {
                return moment(dateString).format('YYYY')
            } else {
                return moment(dateString).format('dddd, MMMM DD, YYYY')
            }
        } catch (e) {
            return moment(dateString).format('YYYY')
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
                            Lowest number of {dataStatistics.lowestValue} transactions on <br />
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

export default React.memo(TextBlockchainDatachart)

import { IBlockChainDataChart } from 'types/statistics'
import React from 'react'
import { Typography } from '@mui/material'
import { currentDateFormat } from 'utils/helpers/moment'
import moment from 'moment'
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
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                my: 2,
                                mx: 1,
                                border: 1,
                                borderColor: 'primary.light',
                                borderRadius: 1,
                                backgroundColor: 'card.background',
                                p: 2,
                            }}
                        >
                            Highest number of {dataStatistics.highestValue} transactions on <br />
                            {`${getHighestDate()}`}
                        </Typography>
                    )}
                    {typeStatistic === typeChartData.UNIQUE_ADRESSES && (
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                my: 2,
                                mx: 1,
                                border: 1,
                                borderColor: 'primary.light',
                                borderRadius: 1,
                                backgroundColor: 'card.background',
                                p: 2,
                            }}
                        >
                            Highest increase of {dataStatistics.highestValue} new addresses was
                            recorded on <br /> {`${getHighestDate()}`}
                        </Typography>
                    )}
                    {typeStatistic === typeChartData.ACTIVE_ADDRESSES && (
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                my: 2,
                                mx: 1,
                                border: 1,
                                borderColor: 'primary.light',
                                borderRadius: 1,
                                backgroundColor: 'card.background',
                                p: 2,
                            }}
                        >
                            Highest number of {dataStatistics.highestValue} addresses on <br />
                            {`${getHighestDate()}`}
                        </Typography>
                    )}
                </>
            ) : (
                <>
                    {typeStatistic === typeChartData.DAILY_TRANSACTIONS && (
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                my: 2,
                                mx: 1,
                                border: 1,
                                borderColor: 'primary.light',
                                borderRadius: 1,
                                backgroundColor: 'card.background',
                                p: 2,
                            }}
                        >
                            Lowest number of {dataStatistics.lowestValue} transactions on <br />
                            {`${getLowestDate()}`}
                        </Typography>
                    )}
                    {typeStatistic === typeChartData.UNIQUE_ADRESSES && (
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                my: 2,
                                mx: 1,
                                border: 1,
                                borderColor: 'primary.light',
                                borderRadius: 1,
                                backgroundColor: 'card.background',
                                p: 2,
                            }}
                        >
                            Lowest increase of {dataStatistics.lowestValue} new addresses was
                            recorded on <br /> {`${getLowestDate()}`}
                        </Typography>
                    )}
                    {typeStatistic === typeChartData.ACTIVE_ADDRESSES && (
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                my: 2,
                                mx: 1,
                                border: 1,
                                borderColor: 'primary.light',
                                borderRadius: 1,
                                backgroundColor: 'card.background',
                                p: 2,
                            }}
                        >
                            Lowest number of {dataStatistics.lowestValue} addresses on <br />
                            {`${getLowestDate()}`}
                        </Typography>
                    )}
                </>
            )}
        </>
    )
}

export default React.memo(TextBlockchainDatachart)

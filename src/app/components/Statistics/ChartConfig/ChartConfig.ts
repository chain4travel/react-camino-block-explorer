import { typeChartData as typesStatistic } from '../../../../utils/statistics/ChartSelector'
import {
    dailyTransactionsTooltip,
    uniqueAddressesTooltip,
    dailyTokenTransferTooltip,
    gasUsedTooltip,
    activeAddressesTooltip,
    averageGasPriceTooltip,
    averageGasLimitTooltip,
    averageBlockSizeTooltip,
    co2EmissionsTooltip,
} from './Tooltips'
import moment from 'moment'
import { seeTimeAxis, verifyRangeTime } from './SeeTimeAxis'

class ChartConfig {
    title: string
    categories: string[] = []
    typeChartData: string | undefined
    data
    highestAndLowestInfo: {
        highestValue: string
        highestDate: string
        lowestValue: string
        lowestDate: string
    } = {
        highestValue: '',
        highestDate: '',
        lowestValue: '',
        lowestDate: '',
    }
    timeSeeAxis: string = ''

    constructor(
        typeChartData: string | undefined,
        title: string,
        dataChart: any,
        timeSeeAxis: string,
    ) {
        this.typeChartData = typeChartData
        this.title = title
        switch (this.typeChartData) {
            case typesStatistic.DAILY_TRANSACTIONS:
                this.data = dataChart.txInfo
                break
            case typesStatistic.UNIQUE_ADRESSES:
                this.data = dataChart.addressInfo
                break
            case typesStatistic.DAILY_TOKEN_TRANSFER:
                this.data = dataChart
                break
            case typesStatistic.GAS_USED:
                this.data = dataChart.txInfo
                break
            case typesStatistic.ACTIVE_ADDRESSES:
                this.data = dataChart.addressInfo
                break
            case typesStatistic.GAS_AVERAGE_PRICE:
                this.highestAndLowestInfo = {
                    highestValue: dataChart.highestValue,
                    highestDate: dataChart.highestDate,
                    lowestValue: dataChart.lowestValue,
                    lowestDate: dataChart.lowestDate,
                }
                this.data = dataChart.txInfo
                break
            case typesStatistic.GAS_AVERAGE_LIMIT:
                this.data = dataChart
                break
            case typesStatistic.AVERAGE_BLOCK_SIZE:
                this.data = dataChart
                break
            case typesStatistic.CO2_EMISSIONS:
                this.data = dataChart
                break
        }

        this.checkRangeTimeString(timeSeeAxis)
    }

    public getCategories() {
        switch (this.typeChartData) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return this.data.map((value: { date: string }, index: number) =>
                    this.getCheckTimeCategories(value.date),
                )
            case typesStatistic.UNIQUE_ADRESSES:
                return this.data.map((value: { dateAt: string }, index: number) =>
                    this.getCheckTimeCategories(value.dateAt),
                )
            case typesStatistic.GAS_USED:
                return this.data.map((value: { date: string }, index: number) =>
                    this.getCheckTimeCategories(value.date),
                )
            case typesStatistic.ACTIVE_ADDRESSES:
                return this.data.map((value: { dateAt: string }, index: number) =>
                    this.getCheckTimeCategories(value.dateAt),
                )
            case typesStatistic.AVERAGE_BLOCK_SIZE:
                return this.data.map((value: { dateInfo: string }, index: number) =>
                    this.getCheckTimeCategories(value.dateInfo),
                )
            case typesStatistic.GAS_AVERAGE_PRICE:
                return this.data.map((value: { date: string }, index: number) =>
                    this.getCheckTimeCategories(value.date),
                )
            case typesStatistic.DAILY_TOKEN_TRANSFER:
                return this.data.map((value: { dateAt: string }, index: number) =>
                    this.getCheckTimeCategories(value.dateAt),
                )
            case typesStatistic.CO2_EMISSIONS:
                return this.data.map((value: { time: string }, index: number) =>
                    this.getCheckTimeCategories(value.time),
                )
            default:
                return this.data.map((value: { Date: string }, index: number) =>
                    this.getCheckTimeCategories(value.Date),
                )
        }
    }

    private checkRangeTimeString(timeSeeAxis: string) {
        if (timeSeeAxis === 'custom') {
            this.timeSeeAxis = verifyRangeTime(this.typeChartData, this.data)
        } else {
            this.timeSeeAxis = timeSeeAxis
        }
    }

    private getCheckTimeCategories(date: string) {
        switch (this.timeSeeAxis) {
            case seeTimeAxis.day:
                return moment(date, 'YYYY-MM-DD').format('D MMM')
            case seeTimeAxis.month:
                return moment(date, 'YYYY-MM-DD').format('D MMM')
            case seeTimeAxis.year:
                return moment(date, 'YYYY-MM-DD').format('MMM')
            case seeTimeAxis.all:
                return moment(date, 'YYYY-MM-DD').format('YYYY')
        }
    }

    public getTooltip(index: number) {
        switch (this.typeChartData) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return dailyTransactionsTooltip(this.data[index])
            case typesStatistic.UNIQUE_ADRESSES:
                return uniqueAddressesTooltip(this.data[index])
            case typesStatistic.DAILY_TOKEN_TRANSFER:
                return dailyTokenTransferTooltip(this.data[index])
            case typesStatistic.GAS_USED:
                return gasUsedTooltip(this.data[index])
            case typesStatistic.ACTIVE_ADDRESSES:
                return activeAddressesTooltip(this.data[index])
            case typesStatistic.GAS_AVERAGE_PRICE:
                return averageGasPriceTooltip(this.data[index], this.highestAndLowestInfo)
            case typesStatistic.GAS_AVERAGE_LIMIT:
                return averageGasLimitTooltip(this.data[index])
            case typesStatistic.AVERAGE_BLOCK_SIZE:
                return averageBlockSizeTooltip(this.data[index])
            case typesStatistic.CO2_EMISSIONS:
                return co2EmissionsTooltip(this.data[index])
        }
    }

    public getMappedSeries() {
        switch (this.typeChartData) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return this.data.map(
                    (value: { totalTransactions: string; date: string }, index: number) => {
                        return { y: value.totalTransactions, name: value.date }
                    },
                )
            case typesStatistic.UNIQUE_ADRESSES:
                return this.data.map(
                    (value: { totalAddresses: string; dateAt: string }, index: number) => {
                        return { y: value.totalAddresses, name: value.dateAt }
                    },
                )
            case typesStatistic.DAILY_TOKEN_TRANSFER:
                return this.data.map((value: { counter: number; dateAt: string }, index: any) => {
                    return { y: value.counter, name: value.dateAt }
                })
            case typesStatistic.GAS_USED:
                return this.data.map((value: { avgGas: string; date: string }, index: number) => {
                    return { y: value.avgGas, name: value.date }
                })
            case typesStatistic.ACTIVE_ADDRESSES:
                return this.data.map((value: { total: string; dateAt: string }, index: number) => {
                    return { y: value.total, name: value.dateAt }
                })
            case typesStatistic.GAS_AVERAGE_PRICE:
                return this.data.map((value: { avgGas: string; date: string }, index: number) => {
                    return { y: parseInt(value.avgGas)/1000000000, name: value.date }
                })
            case typesStatistic.GAS_AVERAGE_LIMIT:
                return this.data.map(
                    (value: { AverageGasLimit: string; Date: string }, index: number) => {
                        return { y: value.AverageGasLimit, name: value.Date }
                    },
                )
            case typesStatistic.AVERAGE_BLOCK_SIZE:
                return this.data.map(
                    (value: { blockSize: string; dateInfo: string }, index: number) => {
                        return { y: value.blockSize, name: value.dateInfo }
                    },
                )

            case typesStatistic.CO2_EMISSIONS:
                return this.data.map((value: { value: string }, index: number) => {
                    return {
                        name: index,
                        y: value.value,
                    }
                })
        }
    }
}

export default ChartConfig

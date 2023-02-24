import { typeBlockchainDataChart as typesStatistic } from '../../../../utils/statistics/ChartSelector'
import {
    dailyTransactionsTooltip,
    uniqueAddressesDailyIncreaseTooltip,
    dailyTokenTransferTooltip,
    gasUsedTooltip,
    activeAddressesTooltip,
    averageGasPriceTooltip,
    averageGasLimitTooltip,
    averageBlockSizeTooltip,
} from './Tooltips'
import moment from 'moment'
import { ethers } from 'ethers'

class ConfigLinearMeter {
    title: string
    categories: any[] = []
    typeBlockchainDataChart: any
    data: any[] = []
    highestAndLowestInfo: any

    constructor(typeBlockchainDataChart: any, title: string, dataChart: any) {
        this.typeBlockchainDataChart = typeBlockchainDataChart
        this.title = title
        switch (this.typeBlockchainDataChart) {
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
                    lowerValue: dataChart.lowerValue,
                    lowerDate: dataChart.lowerDate,
                }
                this.data = dataChart.txInfo
                break
            case typesStatistic.GAS_AVERAGE_LIMIT:
                this.data = dataChart
                break
            case typesStatistic.AVERAGE_BLOCK_SIZE:
                this.data = dataChart
                break
        }
    }

    public getCategories() {
        switch (this.typeBlockchainDataChart) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return this.data.map((value, index) => moment(new Date(value.date)).format('D MMM'))
            case typesStatistic.UNIQUE_ADRESSES:
                return this.data.map((value, index) =>
                    moment(new Date(value.dateAt)).format('D MMM'),
                )
            case typesStatistic.GAS_USED:
                return this.data.map((value, index) => moment(new Date(value.date)).format('D MMM'))
            case typesStatistic.ACTIVE_ADDRESSES:
                return this.data.map((value, index) =>
                    moment(new Date(value.dateAt)).format('D MMM'),
                )
            case typesStatistic.AVERAGE_BLOCK_SIZE:
                return this.data.map((value, index) =>
                    moment(new Date(value.dateInfo)).format('D MMM'),
                )
            case typesStatistic.GAS_AVERAGE_PRICE:
                return this.data.map((value, index) => moment(new Date(value.date)).format('D MMM'))
            case typesStatistic.DAILY_TOKEN_TRANSFER:
                return this.data.map((value, index) => moment(new Date(value.dateAt)).format('D MMM'))
            default:
                return this.data.map((value, index) => moment(new Date(value.Date)).format('D MMM'))
        }
    }

    public getTooltip(index) {
        switch (this.typeBlockchainDataChart) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return dailyTransactionsTooltip(this.data[index])
            case typesStatistic.UNIQUE_ADRESSES:
                return uniqueAddressesDailyIncreaseTooltip(this.data[index])
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
        }
    }

    public getMappedSeries() {
        switch (this.typeBlockchainDataChart) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return this.data.map((value, index) => {
                    return { y: value.totalTransactions, name: value.date }
                })
            case typesStatistic.UNIQUE_ADRESSES:
                return this.data.map((value, index) => {
                    return { y: value.dailyIncrease, name: value.dateAt }
                })
            case typesStatistic.DAILY_TOKEN_TRANSFER:
                return this.data.map((value, index) => {
                    let convertedCounter = parseFloat(ethers.formatEther(value.counter.toString())).toFixed(3);
                    return { y: parseInt(convertedCounter), name: value.dateAt }
                })
            case typesStatistic.GAS_USED:
                return this.data.map((value, index) => {
                    return { y: value.avgGas, name: value.date }
                })
            case typesStatistic.ACTIVE_ADDRESSES:
                return this.data.map((value, index) => {
                    return { y: value.total, name: value.dateAt }
                })
            case typesStatistic.GAS_AVERAGE_PRICE:
                return this.data.map((value, index) => {
                    return { y: value.avgGas, name: value.date }
                })
            case typesStatistic.GAS_AVERAGE_LIMIT:
                return this.data.map((value, index) => {
                    return { y: value.AverageGasLimit, name: value.Date }
                })
            case typesStatistic.AVERAGE_BLOCK_SIZE:
                return this.data.map((value, index) => {
                    return { y: value.blockSize, name: value.dateInfo }
                })
        }
    }
}

export default ConfigLinearMeter

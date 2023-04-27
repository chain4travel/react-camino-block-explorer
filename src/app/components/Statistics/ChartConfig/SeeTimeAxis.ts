import moment from 'moment'
import { typeChartData as typesStatistic } from '../../../../utils/statistics/ChartSelector'

export const seeTimeAxis = {
    day: 'day',
    month: 'month',
    year: 'year',
    all: 'all',
    custom: 'custom',
}

export function verifyRangeTime(typeChartData: string | undefined, dataChart: any[]) {
    let lowestDate: Date = new Date('2099/12/31')
    let highestDate: Date = new Date('2000/01/01')

    for (let i = 0; i < dataChart.length; i++) {
        let data: Date
        switch (typeChartData) {
            case typesStatistic.DAILY_TRANSACTIONS:
                data = moment(dataChart[i].date, 'YYYY-MM-DD').toDate()
                break
            case typesStatistic.UNIQUE_ADRESSES:
                data = moment(dataChart[i].dateAt, 'YYYY-MM-DD').toDate()
                break
            case typesStatistic.DAILY_TOKEN_TRANSFER:
                data = moment(dataChart[i].dateAt, 'YYYY-MM-DD').toDate()
                break
            case typesStatistic.GAS_USED:
                data = moment(dataChart[i].date, 'YYYY-MM-DD').toDate()
                break
            case typesStatistic.ACTIVE_ADDRESSES:
                data = moment(dataChart[i].dateAt, 'YYYY-MM-DD').toDate()
                break
            case typesStatistic.GAS_AVERAGE_PRICE:
                data = moment(dataChart[i].date, 'YYYY-MM-DD').toDate()
                break
            case typesStatistic.GAS_AVERAGE_LIMIT:
                data = moment(dataChart[i].Date, 'YYYY-MM-DD').toDate()
                break
            case typesStatistic.AVERAGE_BLOCK_SIZE:
                data = moment(dataChart[i].dateInfo, 'YYYY-MM-DD').toDate()
                break
            case typesStatistic.CO2_EMISSIONS:
                data = moment(dataChart[i].time, 'YYYY-MM-DD').toDate()
                break
            default:
                data = moment(dataChart[i].Date, 'YYYY-MM-DD').toDate()
                break
        }
        if (data < lowestDate) {
            lowestDate = data
        }
        if (data > highestDate) {
            highestDate = data
        }
    }
    if (
        highestDate.getDate() === lowestDate.getDate() &&
        highestDate.getMonth() === lowestDate.getMonth() &&
        highestDate.getFullYear() === lowestDate.getFullYear()
    ) {
        return 'day'
    } else if (
        highestDate.getMonth() === lowestDate.getMonth() &&
        highestDate.getFullYear() === lowestDate.getFullYear()
    ) {
        return 'month'
    } else if (
        highestDate.getMonth() !== lowestDate.getMonth() &&
        highestDate.getFullYear() === lowestDate.getFullYear()
    ) {
        return 'year'
    } else if (highestDate.getFullYear() !== lowestDate.getFullYear()) {
        return 'all'
    } else {
        return 'month'
    }
}

export function verifyDataChart(typeChartData: string | undefined, dataChart: any) {
    let data: any[] = []
    switch (typeChartData) {
        case typesStatistic.DAILY_TRANSACTIONS:
            data = dataChart.txInfo
            return data
        case typesStatistic.UNIQUE_ADRESSES:
            data = dataChart.addressInfo
            return data
        case typesStatistic.DAILY_TOKEN_TRANSFER:
            data = dataChart
            return data
        case typesStatistic.GAS_USED:
            data = dataChart.txInfo
            return data
        case typesStatistic.ACTIVE_ADDRESSES:
            data = dataChart.addressInfo
            return data
        case typesStatistic.GAS_AVERAGE_PRICE:
            data = dataChart.txInfo
            return data
        case typesStatistic.GAS_AVERAGE_LIMIT:
            data = dataChart
            return data
        case typesStatistic.AVERAGE_BLOCK_SIZE:
            data = dataChart
            return data
        case typesStatistic.CO2_EMISSIONS:
            data = dataChart
            return data
        default:
            return data
    }
}

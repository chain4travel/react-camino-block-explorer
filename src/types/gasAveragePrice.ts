export interface GasAveragePriceInfo {
    avgGas: number
    date: string
}

export interface GasAveragePrice {
    highestValue: number
    highestDate: string
    lowestValue: number
    lowestDate: string
    txInfo: GasAveragePriceInfo[]
}

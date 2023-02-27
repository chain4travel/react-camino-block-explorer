export interface GasAveragePriceInfo {
    avgGas: number
    date: string
}

export interface GasAveragePrice {
    highestValue: number
    highestDate: string
    lowerValue: number
    lowerDate: string
    txInfo: GasAveragePriceInfo[]
}

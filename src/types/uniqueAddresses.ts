export type AddressInfo = {
    dateAt: string
    totalAddresses: number
    dailyIncrease: number
}

export type UniqueAdressesInfo = {
    highestValue: number
    highestDate: string
    lowestValue: number
    lowestDate: string
    addressInfo: AddressInfo[]
}

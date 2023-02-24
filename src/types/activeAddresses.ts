export interface ActiveAddreses {
    highestValue: number
    highestDate: string
    lowestValue: number
    lowestDate: string
    addressInfo: ActiveAddresesInfo[]
}

export interface ActiveAddresesInfo {
    dateAt: string
    total: number
    receiveCount: number
    sendCount: number
}

export default ActiveAddreses

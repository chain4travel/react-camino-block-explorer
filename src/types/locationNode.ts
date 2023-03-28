import { Moment } from 'moment'

export type LocationNode = {
    city_code?: string
    lng: number
    lat: number
    country: string
    city: string
    alpha2: string //Example: CO - Colombia,
    ip: string
    nodeIdentity: string
}

export type NodesPerCountry = {
    country: string
    alpha2: string
    nodes: string[]
}

export type NodesPerCity = NodesPerCountry & {
    city: string
    lng?: number
    lat?: number
}

export type ValidatorReponse = {
    status: string
    nodeID: string
    startTime: Moment
    endTime: Moment
    txID: string
    uptime: string
    lng: number
    lat: number
    country: string
    city: string
    countryISO: string
    IP: string
    nodeIdentity: string
    connected: boolean
}

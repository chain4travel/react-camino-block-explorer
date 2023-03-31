import { ChainType } from 'utils/types/chain-type'
import { Fund } from './transaction'

export interface IAddress {
    type: string
    timestamp: string
    id: string
    chainType: ChainType
}

export interface IInputOutput {
    inputs: Fund[]
    outputs: Fund[]
}

export interface ICards {
    address: string
    value: number
}

export interface LoadsBlocksAndTransactions {
    address: string
    offset: number
    limit: number
    chainID: string
}

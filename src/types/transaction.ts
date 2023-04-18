import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'
import { ChainType } from 'utils/types/chain-type'
import { XPTransactionDetail } from './magellan-types'

export interface CTransaction {
    hash: string
    status: string // enum?
    block: number
    index: number
    timestamp: Date | number
    from: string
    to: string
    value: number
    transactionCost: number
}

export interface XPTransaction {
    id: string
    type: string
    timestamp: Date
    from: Fund[]
    to: Fund[]
    fee: number
    inputTotals?: Fund[]
    outputTotals?: Fund[]
    memo?: string
    status?: string
    hash?: number | string
}

export interface Fund {
    address: string
    value: number
}

export interface TransactionTableData {
    blockNumber: number
    transactionIndex: number
    from: string
    to: string
    hash: string
    status: string
    value: number
    timestamp: Date
    transactionCost: number
}

export interface XPTransactionTableData {
    from: Fund[]
    to: Fund[]
    hash: string
    type: string
    value: number
    fee: number
    timestamp?: Date
}

export interface TranscationDetail {
    hash: string
    type: number
    block: number
    createdAt: Date
    nonce: number
    gasPrice: number
    maxFeePerGas: number
    maxPriorityFeePerGas: number
    gasLimit: number
    value: number
    fromAddr: string
    toAddr: string
    v: string
    r: string
    s: string
    gasUsed?: number
    contractAddress?: string
    transactionCost: number
    effectiveGasPrice: number
}

export interface CAddressTransactionTableData {
    type: number
    hash: string
    blockNumber: number
    age: Date
    from: string
    to: string
    value: number
    transactionCost: number
    timestamp: number
    direction: 'out' | 'in'
}

export interface TransactionInformations {
    hash: string
    type: number
    block: number
    createdAt: Date
    fromAddr: string
    toAddr: string
}

export interface TransactionCurrency {
    maxFeePerGas: number
    maxPriorityFeePerGas: number
    gasPrice: number
    gasUsed: number
    effectiveGasPrice: number
    transactionCost: number
    value: number
}
export interface TranscationDetails {
    transactionInformations: TransactionInformations
    transactionCurrency: TransactionCurrency
}

export type DailyTransactionsInfo = {
    date: string
    totalTransactions: number
    avgBlockTime: number
    avgBlockSize: number
    totalBlockCount: number
    totalUnclesCount: number
    newAddressSeen: string
}

export type DailyTransactions = {
    highestValue: number
    highestDate: string
    lowestValue: number
    lowestDate: string
    txInfo: DailyTransactionsInfo[]
}

export interface InputsOutputs {
    inputs?: Fund[]
    outputs?: Fund[]
}

export interface IXPTransactionFirstSection {
    id: string
    timestamp: Date
    type: string
    to: string
}

export interface IXPTransactionSecondSection {
    type: string
    from?: Fund[]
    data: Fund[]
    chainType: ChainType
}

export interface ITransactionDetailView {
    detailTr?: XPTransactionDetail
    inputs?: Fund[]
    outputs?: Fund[]
}

export interface ITransactionDetails {
    sx: SxProps<Theme> | undefined
    children: JSX.Element
    disabled: boolean
    onClick: () => void
}

export interface ITransaction {
    block: string
    index: string
    from: string
    hash: string
    status: string
    timestamp: string
    to: string
    value: string
    gasUsed: number
    effectiveGasPrice: number
}

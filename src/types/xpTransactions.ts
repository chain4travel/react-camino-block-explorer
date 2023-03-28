import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'
import { ChainType } from 'utils/types/chain-type'
import { XPTransactionDetail } from './magellan-types'
import { XPTransaction } from './transaction'

export interface IXPTransactionSecondSection {
    type: string
    from?: IData[]
    data: IData[]
    chainType: ChainType
}

export interface IData {
    address: string
    value: number
}

export interface ITransaction {
    fee: number
    from: FromTo[]
    id: string
    inputTotals: []
    hash: string
    memo: string
    outputTotals: {}
    status: string
    timestamp: number
    to: FromTo[]
    type: string
}

export interface FromTo {
    address: string
    value: number
}

export interface ITransactionDetails {
    sx: SxProps<Theme> | undefined
    children: JSX.Element
    disabled: boolean
    onClick: () => void
}

export interface ITransactionDetailView {
    detailTr?: XPTransactionDetail
    inputs: XPTransaction
    outputs: XPTransaction
}

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BlockTableData, BlockType } from 'types/block'
import {
    MagellanAggregatesResponse,
    MagellanBlock,
    MagellanCBlocksResponse,
    MagellanTransaction,
    MagellanTxFeeAggregatesResponse,
    MagellanXPTransactionResponse,
} from 'types/magellan-types'
import { CTransaction, ITransaction } from 'types/transaction'
import { createTransaction } from 'utils/magellan'
import { baseEndpoint } from 'utils/magellan-api-utils'
import { getBaseUrl, getChainID, mapToTableData } from './utils'
import BigNumber from 'bignumber.js'
import { FilterDates } from '../types/statistics'
import { getDisplayAmount } from 'utils/currency-utils'

export const getBlocksPage = async (startingBlock: number) => {
    const response = await axios.get(
        `${getBaseUrl()}${baseEndpoint}/cblocks?limit=${50}&limit=0&blockStart=${startingBlock}&blockEnd=NaN&transactionId=0`,
    )
    return response.data.blocks.map((block: MagellanBlock): BlockType => {
        return {
            hash: block.hash,
            number: parseInt(block.number),
            timestamp: new Date(block.timestamp * 1000),
            gasLimit: parseInt(block.gasLimit),
            gasUsed: parseInt(block.gasUsed),
            numberOfTransactions: block.evmTx ? block.evmTx : 0,
            blockCost: BigNumber(block.gasUsed)
                .multipliedBy(BigNumber(block.baseFeePerGas))
                .toNumber(),
        }
    })
}

export async function getTransactionsPage(
    startingBlock = NaN,
    endingBlock = NaN,
    transactionId = 0,
) {
    const response = await axios.get(
        `${getBaseUrl()}${baseEndpoint}/cblocks?limit=${0}&limit=${50}&blockStart=${startingBlock}&blockEnd=${endingBlock}&transactionId=${transactionId}`,
    )
    return response.data.transactions.map((transaction: ITransaction) => {
        return {
            blockNumber: parseInt(transaction.block),
            transactionIndex: parseInt(transaction.index),
            from: transaction.from,
            hash: transaction.hash,
            status:
                parseInt(transaction.status) === 1
                    ? 'Success'
                    : `Failed-${parseInt(transaction.status)}`,
            timestamp: parseInt(transaction.timestamp) * 1000,
            to: transaction.to,
            value: getDisplayAmount(parseInt(transaction.value)).value,
            transactionCost: getDisplayAmount(
                BigNumber(transaction.gasUsed)
                    .multipliedBy(BigNumber(transaction.effectiveGasPrice))
                    .toNumber(),
            ).value,
        }
    })
}

export async function loadTransactionAggregates(
    chainAlias: string,
    startTime: string,
    endTime: string,
): Promise<MagellanAggregatesResponse> {
    let url = `${getBaseUrl()}${baseEndpoint}/aggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`
    return (await axios.get(url)).data
}

export async function loadTransactionFeesAggregates(
    chainAlias: string,
    startTime: string,
    endTime: string,
): Promise<MagellanTxFeeAggregatesResponse> {
    const url = `${getBaseUrl()}${baseEndpoint}/txfeeAggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`
    return (await axios.get(url)).data
}

export async function loadBlocksAndTransactions({
    address,
    offset,
}: {
    address?: string
    offset: number
}) {
    try {
        let res = await axios.get(
            `${getBaseUrl()}${baseEndpoint}/cblocks?address=${address}&limit=0&limit=${offset}`,
        )
        return res.data
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
}

export async function loadCAddressTransactions({
    address,
    allPages,
}: {
    address?: string
    allPages: number
}) {
    try {
        let res = await loadBlocksAndTransactions({ address, offset: (allPages + 1) * 50 })
        let transactions = res?.transactions?.slice(allPages * 50)
        if (transactions)
            return transactions.map((transaction: ITransaction) => {
                return {
                    blockNumber: parseInt(transaction.block),
                    transactionIndex: parseInt(transaction.index),
                    from: transaction.from,
                    hash: transaction.hash,
                    status:
                        parseInt(transaction.status) === 1
                            ? 'Success'
                            : `Failed-${parseInt(transaction.status)}`,
                    timestamp: parseInt(transaction.timestamp) * 1000,
                    to: transaction.to,
                    value: getDisplayAmount(parseInt(transaction.value)).value,
                    transactionCost: getDisplayAmount(
                        BigNumber(transaction.gasUsed)
                            .multipliedBy(BigNumber(transaction.effectiveGasPrice))
                            .toNumber(),
                    ).value,
                    direction: transaction.from === address ? 'out' : 'in',
                }
            })
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
}

export async function loadXPTransactions(offset: number, chainID: string) {
    return await axios.get(
        `${getBaseUrl()}${baseEndpoint}/transactions?chainID=${chainID}&offset=${offset}&limit=50&sort=timestamp-desc`,
    )
}

export async function getXPTransactions(offset: number, alias: string) {
    let res: MagellanXPTransactionResponse = (await loadXPTransactions(offset, getChainID(alias)))
        .data
    if (res && res.transactions && res.transactions.length > 0) {
        let newItems = res.transactions.map(item => createTransaction(item))
        return newItems.map(mapToTableData)
    }
    return []
}

export const getChains = createAsyncThunk('appConfig/chains', async () => {
    try {
        const res = await axios.get(`${getBaseUrl()}${baseEndpoint}`)
        if (Object.keys(res.data.chains).length !== 3) throw new Error('failed to load chains')
        return res.data
    } catch (e) {
        throw new Error('can not connect')
    }
})

export interface loadBlocksTransactionstype {
    blocks: BlockTableData[]
    transactions: CTransaction[]
}

export const fetchBlocksTransactionsCChain = async (): Promise<loadBlocksTransactionstype> => {
    const result: MagellanCBlocksResponse = (
        await axios.get(`${getBaseUrl()}/v2/cblocks?limit=8&limit=8`)
    ).data
    let r: loadBlocksTransactionstype = { blocks: [], transactions: [] }
    if (result) {
        if (result.blocks) {
            r.blocks = result.blocks.map((block: MagellanBlock): BlockTableData => {
                let result: BlockTableData = {
                    hash: block.hash,
                    number: parseInt(block.number),
                    timestamp: block.timestamp * 1000,
                    gasLimit: parseInt(block.gasLimit),
                    gasUsed: parseInt(block.gasUsed),
                    numberOfTransactions: block.evmTx ? block.evmTx : 0,
                    blockCost: parseInt(block.gasUsed) * parseInt(block.baseFeePerGas),
                }
                return result
            })
        }
        if (result.transactions) {
            r.transactions = result.transactions.map(
                (element: MagellanTransaction): CTransaction => {
                    let result: CTransaction = {
                        block: parseInt(element.block),
                        index: parseInt(element.index),
                        from: element.from,
                        hash: element.hash,
                        status:
                            parseInt(element.status) === 1
                                ? 'Success'
                                : `Failed-${parseInt(element.status)}`,
                        timestamp: parseInt(element.timestamp) * 1000,
                        to: element.to,
                        value: getDisplayAmount(parseInt(element.value)).value,
                        transactionCost: getDisplayAmount(
                            BigNumber(element.gasUsed)
                                .multipliedBy(BigNumber(element.effectiveGasPrice))
                                .toNumber(),
                        ).value,
                    }
                    return result
                },
            )
        }
    }
    return r
}

export async function loadValidatorsInfo() {
    return new Promise((resolve, reject) => {
        const urlValidators = `${getBaseUrl()}${baseEndpoint}/validatorsInfo`
        let request = {
            method: 'post',
            url: urlValidators,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        axios(request)
            .then(function (response) {
                resolve(response.data.value)
            })
            .catch(e => {
                console.error(e)
                reject([])
            })
    })
}

export const fetchDailyEmissions = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/dailyEmissions?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    name: '',
                    value: [],
                })
            })
    })
}

export const fetchNetworkEmissions = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/networkEmissions?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    name: '',
                    value: [],
                })
            })
    })
}

export const fetchTransactionsEmissions = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/transactionEmissions?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    name: '',
                    value: [],
                })
            })
    })
}

export const fetchCountryEmissions = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/countryEmissions?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    name: '',
                    value: [],
                })
            })
    })
}

export const fetchBlockchainChartDailyTransactions = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/dailyTransactions?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    highestValue: 0,
                    highestDate: '',
                    lowestValue: 0,
                    lowestDate: '',
                    txInfo: [],
                })
            })
    })
}

export const fetchBlockchainChartUniqueAddresses = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/uniqueAddresses?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    highestValue: 0,
                    highestDate: '',
                    lowestValue: 0,
                    lowestDate: '',
                    addressInfo: [],
                })
            })
    })
}

export const fetchBlockchainDailyGasUsed = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/dailyGasUsed?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    highestValue: 0,
                    highestDate: '',
                    lowestValue: 0,
                    lowestDate: '',
                    txInfo: [],
                })
            })
    })
}

export const fetchBlockchainActiveAddresses = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/activeAddresses?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    highestValue: 0,
                    highestDate: '',
                    lowestValue: 0,
                    lowestDate: '',
                    addressInfo: [],
                })
            })
    })
}

export const fetchBlockchainAverageBlockSize = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/averageBlockSize?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve([])
            })
    })
}

export const fetchBlockchainAverageGasPriceUsed = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/avgGasPriceUsed?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve({
                    highestValue: 0,
                    highestDate: '',
                    lowestValue: 0,
                    lowestDate: '',
                    txInfo: [],
                })
            })
    })
}

export const fetchBlockchainDailyTokenTransfer = (dates: FilterDates) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            url: `${getBaseUrl()}${baseEndpoint}/dailyTokenTransfer?startTime=${
                dates.startDate
            }&endTime=${dates.endDate}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(e => {
                console.error(e)
                resolve([])
            })
    })
}

import moment from 'moment'
import { DailyTransactionsInfo } from '../../../../types/transaction'
import { AddressInfo } from '../../../../types/uniqueAddresses'
import { DailyTokenTransfer } from '../../../../types/dailyTokenTransfer'
import { GasUsed } from '../../../../types/gasUsed'
import { ActiveAddresesInfo } from '../../../../types/activeAddresses'
import { GasAveragePriceInfo } from '../../../../types/gasAveragePrice'
import { GasAverageLimit } from '../../../../types/gasAverageLimit'
import { AverageBlockSize } from '../../../../types/averageBlockSize'
import { ethers } from 'ethers'

//Transactions
export const dailyTransactionsTooltip = (data: DailyTransactionsInfo) => {
    const header = `<span>
        ${moment(data.date, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Transactions:</label> <b>${data.totalTransactions}</b>]
        <br/>
        <br/>

        <b>Avg Block Time:</b>${data.avgBlockTime}<br/>
        <b>Avg Block Size:</b>${data.avgBlockSize}<br/>
        <b>Total Block Count:</b>${data.totalBlockCount} <br/>
        <b>Total Uncles Count:</b>${data.totalUnclesCount} <br/>
        <b>New Adress Seen:</b>${data.newAddressSeen}
        
        </span><br/>`
    return header
}

//Unique Addresses
export const uniqueAddressesTooltip = (data: AddressInfo) => {
    const header = `<span>
        ${moment(data.dateAt, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Disctinct Addresses:</label> <b>${
            data.totalAddresses
        }</b>]
        <br/>
        <br/>
        <b>Daily Increase:</b>${data.dailyIncrease}<br/>
        </span>`
    return header
}

//Daily Token Transfer
export const dailyTokenTransferTooltip = (data: DailyTokenTransfer) => {
    const header = `<span>
    ${moment(data.dateAt, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Token Transfer:</label> <b>${parseFloat(
            ethers.formatEther(data.counter.toString()),
        )
            .toFixed(3)
            .toString()} CAM</b>]
        </span>`
    return header
}

//Gas Used
export const gasUsedTooltip = (data: GasUsed) => {
    const header = `<span>
    ${moment(data.date, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Gas Used:</label> <b>${data.avgGas}</b>]
        </span>`
    return header
}

//Active Addresses
export const activeAddressesTooltip = (data: ActiveAddresesInfo) => {
    const header = `<span>
    ${moment(data.dateAt, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Camino Addresses:</label> <b>${data.total}</b>]
        <br/>
        <br/>
        <b>Receive Count:</b>${data.receiveCount}<br/>
        <b>Send Count:</b>${data.sendCount}<br/>
        </span>`
    return header
}

//Gas Average Price
export const averageGasPriceTooltip = (
    data: GasAveragePriceInfo,
    highestAndLowestInfo: { highestValue: string; lowerValue: string },
) => {
    const header = `<span>
    ${moment(data.date, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Average gas price:</label> <b>${data.avgGas} Gwei</b>]
        <br/>
        <br/>
        <b>Max gas price:</b>${highestAndLowestInfo.highestValue} Gwei<br/>
        <b>Min gas price:</b>${highestAndLowestInfo.lowerValue} Gwei<br/>
        </span>`
    return header
}

//Gas Average Limit
export const averageGasLimitTooltip = (data: GasAverageLimit) => {
    const header = `<span>
    ${moment(data.Date, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">average gas limit:</label> <b>${data.AverageGasLimit}</b>]
        <br/>`
    return header
}

//Gas Average Size
export const averageBlockSizeTooltip = (data: AverageBlockSize) => {
    const header = `<span>
    ${moment(data.dateInfo, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Block Size (Bytes):</label> <b>${data.blockSize}</b>]
        <br/>`
    return header
}

//CO2 Emissions
export const co2EmissionsTooltip = (data: { time: string; value: string }) => {
    const header = `<span>
    ${moment(data.time, 'YYYY-MM-DD').format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">CO2 Emissions:</label> <b>${data.value}</b>]
        <br/>`
    return header
}

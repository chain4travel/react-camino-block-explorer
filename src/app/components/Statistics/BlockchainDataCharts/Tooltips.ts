import moment from 'moment';
import { DailyTransactionsInfo } from '../../../../types/transaction';
import { AddressInfo } from '../../../../types/uniqueAddresses';
import { DailyTokenTransfer } from '../../../../types/dailyTokenTransfer';
import { GasUsed } from '../../../../types/gasUsed';
import { ActiveAddresesInfo } from '../../../../types/activeAddresses';
import { GasAveragePrice,GasAveragePriceInfo } from '../../../../types/gasAveragePrice';
import { GasAverageLimit } from '../../../../types/gasAverageLimit';
import { AverageBlockSize } from '../../../../types/averageBlockSize';
import { ethers } from 'ethers'

//Transactions
export const dailyTransactionsTooltip = (data: DailyTransactionsInfo) => {
  const header = `<span>
        ${moment(new Date(data.date)).format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Transactions:</label> <b>${
          data.totalTransactions
        }</b>]
        <br/>
        <br/>

        <b>Avg Block Time:</b>${data.avgBlockTime} TH<br/>
        <b>Avg Block Size:</b>${data.avgBlockSize} GH<br/>
        <b>Total Block Count:</b>${data.totalBlockCount} <br/>
        <b>Total Uncles Count:</b>${data.totalUnclesCount} <br/>
        <b>New Adress Seen:</b>${data.newAddressSeen}
        
        </span><br/>`;
  return header;
};

//Unique Addresses
export const uniqueAddressesDailyIncreaseTooltip = (data: AddressInfo) => {
  const header = `<span>
        ${moment(new Date(data.dateAt)).format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Disctinct Addresses:</label> <b>${
          data.totalAddresses
        }</b>]
        <br/>
        <br/>
        <b>Daily Increase:</b>${data.dailyIncrease}<br/>
        </span>`;
  return header;
};

//Daily Token Transfer
export const dailyTokenTransferTooltip = (data: DailyTokenTransfer) => {
  const header = `<span>
    ${moment(new Date(data.dateAt)).format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Token Transfer:</label> <b>${
          parseFloat(ethers.formatEther(data.counter.toString())).toFixed(3).toString()
        } CAM</b>]
        </span>`;
  return header;
};

//Gas Used
export const gasUsedTooltip = (data: GasUsed) => {
  const header = `<span>
    ${moment(new Date(data.date)).format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Gas Used:</label> <b>${
          data.avgGas
        }</b>]
        </span>`;
  return header;
};

//Active Addresses
export const activeAddressesTooltip = (data: ActiveAddresesInfo) => {
  const header = `<span>
    ${moment(new Date(data.dateAt)).format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Total Gas Used:</label> <b>${
          data.total
        }</b>]
        <br/>
        <br/>
        <b>Receive Count:</b>${data.receiveCount}<br/>
        <b>Send Count:</b>${data.sendCount}<br/>
        </span>`;
  return header;
};

//Gas Average Price
export const averageGasPriceTooltip = (data: GasAveragePriceInfo, highestAndLowestInfo: any) => {
  const header = `<span>
    ${moment(new Date(data.date)).format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Average gas price:</label> <b>${
          data.avgGas
        } Gwei</b>]
        <br/>
        <br/>
        <b>Max gas price:</b>${highestAndLowestInfo.highestValue} Gwei<br/>
        <b>Min gas price:</b>${highestAndLowestInfo.lowerValue} Gwei<br/>
        </span>`;
  return header;
};

//Gas Average Limit
export const averageGasLimitTooltip = (data: GasAverageLimit) => {
  const header = `<span>
    ${moment(new Date(data.Date)).format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">average gas limit:</label> <b>${
          data.AverageGasLimit
        }</b>]
        <br/>`;
  return header;
};

//Gas Average Size
export const averageBlockSizeTooltip = (data: AverageBlockSize) => {
  const header = `<span>
    ${moment(new Date(data.dateInfo)).format('MMMM Do YYYY')}
        <br/>
        [<label style="color: blue">Gas (gWei):</label> <b>${
          data.blockSize
        }</b>]
        <br/>`;
  return header;
};

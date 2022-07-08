import axios from 'axios';
import {
  MagellanAggregatesResponse,
  MagellanTxFeeAggregatesResponse,
  MagellanXPOutput,
  MagellanXPTransaction,
} from 'types/magellan-types';
import { Fund, XPTransaction } from 'types/transaction';

const BASE_URL = 'https://magellan.columbus.camino.foundation/v2';

function sortByAddress(a: Fund, b: Fund): number {
  return a.address.localeCompare(b.address);
}

export function convertMemo(memo: string): string {
  try {
    // Turn the string from bytestream to percent-encoding
    const percentEnc = atob(memo)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('');
    // decode base64 string including special characters
    return decodeURIComponent(percentEnc);
  } catch (e) {
    console.log('Memo was not base64 encoded, using raw value');
    return memo;
  }
}

export function createTransaction(
  magellanTransaction: MagellanXPTransaction,
): XPTransaction {
  return {
    id: magellanTransaction.id,
    timestamp: new Date(Date.parse(magellanTransaction.timestamp)).toString(),
    type: magellanTransaction.type,
    from: getInputFunds(magellanTransaction),
    to: getOutputFunds(magellanTransaction),
    fee: magellanTransaction.txFee,
    inputTotals: magellanTransaction.inputTotals,
    outputTotals: magellanTransaction.outputTotals,
    status: 'accepted', //TODO: set dynamically when magellan delivers this information
    memo: convertMemo(magellanTransaction.memo),
  } as XPTransaction;
}

export function getOutputFunds(
  magellanTransaction: MagellanXPTransaction,
): Fund[] {
  const outputfunds: Fund[] = [];
  for (const output of magellanTransaction.outputs || []) {
    outputfunds.push(createFundFromOutput(output));
  }
  return outputfunds.sort(sortByAddress);
}

export function getInputFunds(
  magellanTransaction: MagellanXPTransaction,
): Fund[] {
  const inputfunds: Fund[] = [];
  if (magellanTransaction.inputs) {
    for (const input of magellanTransaction.inputs) {
      const inputFund = createFundFromOutput(input.output);
      inputFund.signature = input.credentials[0].signature;
      inputfunds.push(inputFund);
    }
  }
  return inputfunds.sort(sortByAddress);
}

function createFundFromOutput(magellanOutput: MagellanXPOutput): Fund {
  return {
    address:
      magellanOutput && magellanOutput.addresses
        ? magellanOutput.addresses[0]
        : null,
    value: magellanOutput.amount,
  } as Fund;
}

export async function loadTransactionAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanAggregatesResponse> {
  let url = `${BASE_URL}/aggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`;
  return (await axios.get(url)).data;
}
export async function loadTransactionFeesAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanTxFeeAggregatesResponse> {
  const url = `${BASE_URL}/txfeeAggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`;
  return (await axios.get(url)).data;
}

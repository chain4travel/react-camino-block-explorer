import { ChainType } from './types/chain-type';

export const DETAILS = 'details';
export const TABLES = 'all';

const transactions = 'transactions';
const blocks = 'blocks';
const address = 'address';
const validators = 'validators';

export function getPathElement(type: ChainType): string {
  return type.toLowerCase();
}

export function getTransactionDetailsPath(transactionId: string): string {
  const basePath = `${DETAILS}/${transactions}/`;
  if (transactionId) {
    return basePath + transactionId;
  }
  return basePath;
}

export function getAddressDetailsPath(addressId: string): string {
  return `${DETAILS}/${address}/${addressId}`;
}

export function getBlockDetailsPath(
  chaintype: ChainType,
  blockId: string | number,
): string {
  const basePath = `/${DETAILS}/${blocks}/${getPathElement(chaintype)}/`;
  if (blockId !== undefined) {
    return basePath + blockId;
  }
  return basePath;
}

export function getAllBlocksPath(chaintype: ChainType) {
  return `/${TABLES}/${getPathElement(chaintype)}/${blocks}`;
}

export function getAllTransactionsPath(chaintype: ChainType) {
  return `/${TABLES}/${getPathElement(chaintype)}/${transactions}`;
}

export function getAllValidatorsPath() {
  return `/${TABLES}/${validators}`;
}

export function getTransactionsPathName(chaintype: ChainType) {
  return `${chaintype}-${transactions}-${DETAILS}`;
}

export function getBlockDetailsPathName(chaintype: ChainType) {
  return `${chaintype}-${blocks}-${DETAILS}`;
}

export function getAllBlocksPathName(chaintype: ChainType) {
  return `${chaintype}-${blocks}-${TABLES}`;
}

export function getAllTransactionsPathName(chaintype: ChainType) {
  return `${chaintype}-${transactions}-${TABLES}`;
}

export function getAddressLink(chaintype: ChainType, value: string): string {
  if (chaintype === ChainType.X_CHAIN) {
    return getAddressDetailsPath('X-' + value);
  }
  if (chaintype === ChainType.P_CHAIN) {
    return getAddressDetailsPath('P-' + value);
  }
  return getAddressDetailsPath(value);
}

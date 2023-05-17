import { ChainType } from './types/chain-type'
import { RoutesConfig } from './route-paths'

export function getPathElement(type: ChainType): string {
    return type.toLowerCase()
}

export function GetTransactionDetailsPath(chaintype: ChainType, transactionId: string): string {
    const routesConfig = RoutesConfig()
    const basePath = `${routesConfig.BASE_PATH}/${getPathElement(chaintype)}${
        routesConfig.TRANSACTION
    }/`
    if (transactionId) {
        return basePath + transactionId
    }
    return basePath
}

export function GetAddressDetailsPath(chaintype: ChainType, addressId: string): string {
    const routesConfig = RoutesConfig()
    return `${routesConfig.BASE_PATH}/${getPathElement(chaintype)}${
        routesConfig.ADDRESS
    }/${addressId}`
}

export function GetBlockDetailsPath(chaintype: ChainType, blockId: string | number): string {
    const routesConfig = RoutesConfig()
    const basePath = `${routesConfig.BASE_PATH}/${getPathElement(chaintype)}${routesConfig.BLOCK}/`
    if (blockId !== undefined) {
        return basePath + blockId
    }
    return basePath
}

export function getAddressLink(chaintype: ChainType, value: string): string {
    if (chaintype === ChainType.X_CHAIN) {
        return 'X-' + value
    }
    if (chaintype === ChainType.P_CHAIN) {
        return 'P-' + value
    }
    return value
}

export function getAddressFromUrl(): string {
    return window.location.pathname.split('/').pop() || ''
}

export function getTransactionFromUrl(): string {
    return window.location.pathname.split('/').pop() || ''
}

export function getBlockNumber(): string {
    return window.location.pathname.split('/').pop() || ''
}

export function getChainTypeFromUrl(): ChainType {
    const chainType = window.location.pathname.split('/')[2]

    if (chainType === ChainType.X_CHAIN) {
        return ChainType.X_CHAIN
    }
    if (chainType === ChainType.P_CHAIN) {
        return ChainType.P_CHAIN
    }
    return ChainType.C_CHAIN
}

export function getTransactionType(chainType: ChainType) {
    const routesConfig = RoutesConfig()
    switch (chainType) {
        case ChainType.X_CHAIN:
            return routesConfig.XTRANSACTION
        case ChainType.P_CHAIN:
            return routesConfig.PTRANSACTION
        default:
            return routesConfig.XTRANSACTION
    }
}

export function getAddressType(chainType: ChainType) {
    const routesConfig = RoutesConfig()
    switch (chainType) {
        case ChainType.X_CHAIN:
            return routesConfig.XADDRESS
        case ChainType.P_CHAIN:
            return routesConfig.PADDRESS
        default:
            return routesConfig.XADDRESS
    }
}

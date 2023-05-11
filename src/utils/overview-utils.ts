import { Amount } from './types/currency-type'
import BigNumber from 'bignumber.js'
import {
    formatAmount,
    conversionACamPerNCam,
    ACAM_CAM_CONVERSION_THRESHHOLD,
    ACAM_NCAM_CONVERSION_THRESHHOLD,
    aCamToCam,
    aCamToNCam,
} from './currency-utils'

export function getOverviewValueForGewi(nCamVal: number): string {
    let value = new BigNumber(nCamVal)
    let converter = new BigNumber(conversionACamPerNCam)
    return getDisplayValue(value.multipliedBy(converter).toNumber())
}

export function getDisplayValue(aCam: number): string {
    const amount = getDisplayAmount(aCam)
    return formatAmount(amount.value, amount.currency)
}

export function getDisplayAmount(aCam: number): Amount {
    if (aCam === 0 || aCam >= ACAM_CAM_CONVERSION_THRESHHOLD) {
        return {
            value: aCamToCam(aCam),
            currency: 'CAM',
            currencyIcon: 'img:/images/camino-coin-logo.png',
        }
    }
    if (aCam >= ACAM_NCAM_CONVERSION_THRESHHOLD) {
        return {
            value: aCamToNCam(aCam),
            currency: 'nCAM',
            currencyIcon: 'img:/images/camino-ncam-coin-logo.png',
        }
    }
    return {
        value: aCam,
        currency: 'aCAM',
        currencyIcon: 'img:/images/camino-acam-coin-logo.png',
    }
}

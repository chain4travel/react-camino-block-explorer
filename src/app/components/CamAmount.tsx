import * as React from 'react'

import { Box, Tooltip, Typography } from '@mui/material'
import {
    customToLocaleString,
    getACamAmount,
    getDisplayAmount,
    roundedToLocaleString,
} from '../../utils/currency-utils'

import { ReactComponent as ACamIcon } from './assets/a-cam.svg'
import { ReactComponent as CamIcon } from './assets/cam.svg'
import { ReactComponent as GasStationOutline } from './assets/gas-station-outline.svg'
import { ICamAmount } from 'types/filesInComponents'
import { ReactComponent as NCamIcon } from './assets/n-cam.svg'
import { useLocation } from 'react-router-dom'

export function AmountIcon({ currency }: { currency: string }) {
    return (
        <Box sx={{ width: '26px', height: '26px', marginLeft: '6px', marginRight: '6px' }}>
            {currency === 'nCAM' ? <NCamIcon /> : currency === 'aCAM' ? <ACamIcon /> : <CamIcon />}
        </Box>
    )
}

export function CamAmount({
    amount,
    currency = 'aCam',
    style,
    camAmountStyle,
    abbreviate = true,
    dataCy,
    type,
}: ICamAmount) {
    const chainType = useLocation().pathname.split('/')[3]
    const tooltipAmount = customToLocaleString(getDisplayAmount(amount, chainType).value, 20, false)
    const tooltipCurrency = getDisplayAmount(
        getACamAmount(amount, currency, chainType),
        chainType,
    ).currency
    const tooltipText = `${tooltipAmount} ${tooltipCurrency}`
    const getDataCYAmount = () => {
        let strDataCY = 'cam-amount'
        if (type !== undefined && type != null) {
            strDataCY = strDataCY + '-' + type
        }
        return strDataCY
    }

    return (
        <AmountTooltip value={tooltipText} show={abbreviate} style={style}>
            <Box
                sx={{
                    display: 'flex',
                    width: 'min-content',
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...camAmountStyle,
                }}
            >
                <Typography
                    data-cy={dataCy || getDataCYAmount()}
                    variant="body2"
                    component="h6"
                    sx={{ color: 'grey.500', whiteSpace: 'nowrap' }}
                >
                    {roundedToLocaleString(
                        getDisplayAmount(amount, chainType).value,
                        abbreviate ? 4 : 20,
                        abbreviate,
                    )}
                </Typography>
                <AmountIcon
                    currency={
                        getDisplayAmount(getACamAmount(amount, currency, chainType), chainType)
                            .currency
                    }
                />
                <Typography
                    variant="caption"
                    sx={{
                        color: 'grey.500',
                        fontSize: '11px',
                        minWidth: '32px',
                        textAlign: 'left',
                    }}
                >
                    {
                        getDisplayAmount(getACamAmount(amount, currency, chainType), chainType)
                            .currency
                    }
                </Typography>
            </Box>
        </AmountTooltip>
    )
}

export function GasAmount({
    amount,
    abbreviate = false,
    dataCy,
}: {
    amount: number
    abbreviate?: boolean
    dataCy?: string
}) {
    return (
        <AmountTooltip value={customToLocaleString(amount, 20, false)} show={abbreviate}>
            <Box
                sx={{
                    display: 'flex',
                    width: 'min-content',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Typography
                    data-cy={dataCy}
                    variant="body2"
                    component="h6"
                    sx={{ whiteSpace: 'nowrap', color: 'grey.500' }}
                >
                    {roundedToLocaleString(amount, abbreviate ? 4 : 20, abbreviate)}
                </Typography>
                <GasStationOutline style={{ width: '24px', height: '24px', marginLeft: '3px' }} />
            </Box>
        </AmountTooltip>
    )
}

function AmountTooltip({
    value,
    show,
    style,
    children,
}: {
    value: string
    show: boolean
    style?: React.CSSProperties
    children: React.ReactNode
}) {
    return (
        <>
            {show ? (
                <Tooltip title={value} placement="top" sx={{ width: 'min-content', ...style }}>
                    <Box>{children}</Box>
                </Tooltip>
            ) : (
                <Box>{children}</Box>
            )}
        </>
    )
}

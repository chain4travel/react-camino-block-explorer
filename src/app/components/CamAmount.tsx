import * as React from 'react'
import { Typography, Tooltip, Box } from '@mui/material'
import { ReactComponent as GasStationOutline } from './assets/gas-station-outline.svg'
import { ReactComponent as ACamIcon } from './assets/a-cam.svg'
import { ReactComponent as NCamIcon } from './assets/n-cam.svg'
import { ReactComponent as CamIcon } from './assets/cam.svg'
import {
    getDisplayAmount,
    getACamAmount,
    customToLocaleString,
    roundedToLocaleString,
} from '../../utils/currency-utils'

export function AmountIcon({ currency }) {
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
}: {
    amount: number
    currency?: string
    style?: React.CSSProperties
    camAmountStyle?: React.CSSProperties
    abbreviate?: boolean
    dataCy?: string
}) {
    const tooltipAmount = customToLocaleString(getDisplayAmount(amount).value, 20, false)
    const tooltipCurrency = getDisplayAmount(getACamAmount(amount, currency)).currency
    const tooltipText = `${tooltipAmount} ${tooltipCurrency}`

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
                <Typography data-cy={dataCy} variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
                    {roundedToLocaleString(
                        getDisplayAmount(amount).value,
                        abbreviate ? 4 : 20,
                        abbreviate,
                    )}
                </Typography>
                <AmountIcon currency={getDisplayAmount(getACamAmount(amount, currency)).currency} />
                <Typography
                    variant="caption"
                    sx={{ fontSize: '11px', minWidth: '32px', textAlign: 'left' }}
                >
                    {getDisplayAmount(getACamAmount(amount, currency)).currency}
                </Typography>
            </Box>
        </AmountTooltip>
    )
}

export function GasAmount({
    amount,
    abbreviate = false,
    dataCy
}: {
    amount: number
    abbreviate?: boolean
    dataCy?:string
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
                <Typography data-cy={dataCy} variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
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

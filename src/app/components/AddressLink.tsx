import * as React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function AddressLink({
    to,
    value,
    typographyVariant,
    truncate,
    dataCy,
}: {
    to: string
    value: string | number
    typographyVariant?:
        | 'button'
        | 'caption'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'overline'
        | 'inherit'
        | undefined
    truncate?: boolean
    dataCy?: string
}) {
    return (
        <Link to={to} style={{ textDecoration: 'none' }} rel="noopener noreferrer">
            {truncate ? (
                <Typography
                    variant={typographyVariant}
                    color="latestList.blockNumber"
                    noWrap={true}
                    data-cy={dataCy}
                >
                    {value}
                </Typography>
            ) : (
                <Typography
                    variant={typographyVariant}
                    color="latestList.blockNumber"
                    data-cy={dataCy}
                >
                    {value}
                </Typography>
            )}
        </Link>
    )
}

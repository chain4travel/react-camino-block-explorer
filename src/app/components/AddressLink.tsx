import * as React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { IAddressLink } from 'types/filesInComponents'

export default function AddressLink({
    to,
    value,
    typographyVariant,
    truncate,
    dataCy,
}: IAddressLink) {
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

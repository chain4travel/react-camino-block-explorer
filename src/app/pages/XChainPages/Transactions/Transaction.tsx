import { Chip, Grid, Paper, TableCell, TableRow, Typography } from '@mui/material'
import { GetAddressType, GetTransactionType, getAddressLink } from 'utils/route-utils'

import AddressLink from 'app/components/AddressLink'
import { ChainType } from 'utils/types/chain-type'
import { Field } from 'app/components/DetailsField'
import { NoMaxWidthTooltip } from 'app/components/RelativeTime'
import React from 'react'
import { RoutesConfig } from 'utils/route-paths'
import { XPTransaction } from 'types/transaction'
import { getChainTypeFromUrl } from 'utils/route-utils'
import moment from 'utils/helpers/moment'
import useWidth from 'app/hooks/useWidth'

interface Props {
    transaction: any
}
export type Ref = any

const Transaction = React.forwardRef<Ref, Props>((props, ref) => {
    const transactionBody = <CustomRow transaction={props.transaction} />

    const { isDesktop, isWidescreen } = useWidth()
    let content
    if (isDesktop || isWidescreen)
        content = ref ? (
            <TableRow ref={ref}>{transactionBody}</TableRow>
        ) : (
            <TableRow>{transactionBody}</TableRow>
        )
    else
        content = ref ? (
            <Paper
                sx={{
                    width: 1,
                    marginBottom: '1rem',
                    padding: '15px',
                    gap: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: 'none',
                }}
                ref={ref}
            >
                <GridItem transaction={props.transaction} />
            </Paper>
        ) : (
            <Paper
                sx={{
                    width: 1,
                    marginBottom: '1rem',
                    padding: '15px',
                    gap: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: 'none',
                }}
            >
                <GridItem transaction={props.transaction} />
            </Paper>
        )
    return content
})

export default Transaction

const GridItem = ({ transaction }: { transaction: XPTransaction }) => {
    const routesConfig = RoutesConfig()
    const chainType = getChainTypeFromUrl() as ChainType

    return (
        <>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Hash
                </Typography>
                <AddressLink
                    to={`${GetTransactionType(chainType, routesConfig)}/${transaction.hash}`}
                    value={transaction.hash}
                    typographyVariant="body1"
                    truncate={true}
                />
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    From
                </Typography>
                {transaction.from[0]?.address ? (
                    <AddressLink
                        to={`${GetAddressType(chainType, routesConfig)}/${getAddressLink(
                            chainType,
                            transaction.from[0]?.address,
                        )}`}
                        value={transaction.from[0]?.address}
                        typographyVariant="body1"
                        truncate={true}
                    />
                ) : (
                    '-'
                )}
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    To
                </Typography>
                {transaction.to[0]?.address ? (
                    <AddressLink
                        to={`${GetAddressType(chainType, routesConfig)}/${getAddressLink(
                            chainType,
                            transaction.to[0]?.address,
                        )}`}
                        value={transaction.to[0]?.address}
                        typographyVariant="body1"
                        truncate={true}
                    />
                ) : (
                    '-'
                )}
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Timestamp
                </Typography>
                <NoMaxWidthTooltip
                    title={moment(transaction.timestamp).format(
                        'MMM D, YYYY, h:mm:ss A ([GMT] ZZ)',
                    )}
                >
                    <Typography variant="body2" component="span" noWrap={true}>
                        {moment(transaction.timestamp).format('h:mm:ss A\xa0-\xa0DD.MM.YYYY')}
                    </Typography>
                </NoMaxWidthTooltip>
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Type
                </Typography>
                <Chip
                    label={transaction.type}
                    size="small"
                    style={{ minWidth: '61px', height: 'min-content' }}
                />
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Fee
                </Typography>
                <Field type="gwei" value={transaction.fee} />
            </Grid>
        </>
    )
}

const CustomRow = ({ transaction }: { transaction: XPTransaction }) => {
    const chainType = getChainTypeFromUrl() as ChainType
    const routesConfig = RoutesConfig()
    return (
        <>
            <TableCell
                align="left"
                sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
                width="20%"
            >
                <AddressLink
                    to={`${GetTransactionType(chainType, routesConfig)}/${transaction.hash}`}
                    value={transaction.hash}
                    typographyVariant="body1"
                    truncate={true}
                />
            </TableCell>
            <TableCell
                align="left"
                sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
                width="22.5%"
            >
                {transaction.from[0]?.address ? (
                    <AddressLink
                        to={`${GetAddressType(chainType, routesConfig)}/${getAddressLink(
                            chainType,
                            transaction.from[0]?.address,
                        )}`}
                        value={transaction.from[0]?.address}
                        typographyVariant="body1"
                        truncate={true}
                    />
                ) : (
                    '-'
                )}
            </TableCell>
            <TableCell
                align="left"
                sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
                width="22.5%"
            >
                {transaction.to[0]?.address ? (
                    <AddressLink
                        to={`${GetAddressType(chainType, routesConfig)}/${getAddressLink(
                            chainType,
                            transaction.to[0]?.address,
                        )}`}
                        value={transaction.to[0]?.address}
                        typographyVariant="body1"
                        truncate={true}
                    />
                ) : (
                    '-'
                )}
            </TableCell>
            <TableCell align="left" width="10%">
                <NoMaxWidthTooltip
                    title={moment(transaction.timestamp).format(
                        'MMM D, YYYY, h:mm:ss A ([GMT] ZZ)',
                    )}
                >
                    <Typography variant="caption" component="span" noWrap={true}>
                        {moment(transaction.timestamp).format('h:mm:ss A\xa0-\xa0DD.MM.YYYY')}
                    </Typography>
                </NoMaxWidthTooltip>
            </TableCell>
            <TableCell align="left" width="10%">
                <Chip
                    label={transaction.type}
                    size="small"
                    style={{ minWidth: '61px', height: 'min-content' }}
                />
            </TableCell>
            <TableCell align="left" width="15%">
                <Field type="gwei" value={transaction.fee} />
            </TableCell>
        </>
    )
}

import React, { FC } from 'react'
import { Box, Typography, Paper, CircularProgress } from '@mui/material'
import { CTransaction } from '../../../../types/transaction'
import Divider from '@mui/material/Divider'
import ShowAllButton from './ShowAllButton'
import TransactionItem from './Items/TransactionItem'
import { CCHAIN, TRANSACTIONS } from 'utils/route-paths'

interface TransactionsListProps {
    title: string
    items: CTransaction[]
    link: boolean
}

const TransactionsList: FC<TransactionsListProps> = ({ title, items, link }) => {
    return (
        <Paper
            variant="outlined"
            square
            sx={{
                display: 'flex',
                backgroundColor: 'card.background',
                borderWidth: '1px',
                borderColor: 'primary.light',
                borderStyle: 'solid',
                p: '1rem 1.5rem 1rem 1.5rem',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            {title && (
                <Typography
                    variant="h5"
                    component="h5"
                    fontWeight="fontWeightBold"
                    sx={{ paddingBottom: '1rem' }}
                >
                    {title}
                </Typography>
            )}
            {items.length > 0 ? (
                <>
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            <TransactionItem transaction={item} />
                            {index !== items.length - 1 && <Divider variant="fullWidth" />}
                        </React.Fragment>
                    ))}
                </>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        height: '560px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress color="secondary" />
                </Box>
            )}
            <Typography
                variant="caption"
                component="span"
                fontWeight="fontWeightBold"
                sx={{
                    color: 'error.main',
                    alignSelf: 'flex-end',
                    my: '.5rem',
                    fontSize: '11px',
                    textAlign: 'right',
                }}
            >
                Some transaction values may be approximate <br /> Hover over number or click on
                transaction to view full details.
            </Typography>
            {link && <ShowAllButton toLink={`${CCHAIN}${TRANSACTIONS}`} />}
        </Paper>
    )
}

export default TransactionsList

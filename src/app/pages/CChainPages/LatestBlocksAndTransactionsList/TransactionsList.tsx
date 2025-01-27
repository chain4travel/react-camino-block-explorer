import { Box, Paper, Tooltip, Typography } from '@mui/material'
import React, { FC } from 'react'

import { CTransaction } from '../../../../types/transaction'
import Divider from '@mui/material/Divider'
import Icon from '@mdi/react'
import { RoutesConfig } from 'utils/route-paths'
import ShowAllButton from './ShowAllButton'
import TransactionItem from './Items/TransactionItem'
import { mdiInformationOutline } from '@mdi/js'

interface TransactionsListProps {
    title: string
    items: CTransaction[]
    link: boolean
}

const TransactionsList: FC<TransactionsListProps> = ({ title, items, link }) => {
    const routesConfig = RoutesConfig()
    return (
        <Paper
            variant="outlined"
            square
            sx={{
                display: 'flex',
                backgroundColor: 'card.background',
                borderWidth: '1px',
                borderStyle: 'solid',
                p: '1rem 1.5rem 1rem 1.5rem',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            {title && (
                <Box sx={{ display: 'flex', alignItems: 'center', pb: '1rem', gap: '.75rem' }}>
                    <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
                        {title}
                    </Typography>
                    <Tooltip
                        title="Some transaction values may be approximate. Hover over the number or click on the transaction to view full details."
                        placement="top"
                    >
                        <Icon path={mdiInformationOutline} size={0.85} />
                    </Tooltip>
                </Box>
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
                    <Typography
                        variant="h4"
                        component="h4"
                        fontWeight="fontWeightBold"
                        sx={{ color: 'card.subValue' }}
                    >
                        No transactions found
                    </Typography>
                </Box>
            )}
            {link && (
                <ShowAllButton toLink={`${routesConfig.CCHAIN}${routesConfig.TRANSACTIONS}`} />
            )}
        </Paper>
    )
}

export default TransactionsList

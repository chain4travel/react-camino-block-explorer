import { Box, Paper, Tooltip, Typography } from '@mui/material'

import Icon from '@mdi/react'
import React from 'react'
import ShowAllButton from '../../pages/CChainPages/LatestBlocksAndTransactionsList/ShowAllButton'
import { mdiInformationOutline } from '@mdi/js'

export default function XPTransactionList({
    ShowAllLink,
    children,
}: {
    ShowAllLink: string
    children: React.ReactNode
}) {
    return (
        <Paper
            variant="outlined"
            aria-label="transaction-list"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                minHeight: '600px',
                backgroundColor: 'card.background',
                p: '1rem 1.5rem 1rem 1.5rem',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', pb: '1rem', gap: '.75rem' }}>
                <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
                    Latest Transactions
                </Typography>
                <Tooltip
                    title="Some transaction values may be approximate. Hover over the number or click on the transaction to view full details."
                    placement="top"
                >
                    <Icon path={mdiInformationOutline} size={0.85} />
                </Tooltip>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
            <ShowAllButton toLink={ShowAllLink} />
        </Paper>
    )
}

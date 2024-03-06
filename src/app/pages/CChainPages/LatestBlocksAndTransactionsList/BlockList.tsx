import { Box, Paper, Typography } from '@mui/material'
import React, { FC } from 'react'

import BlockItem from './Items/BlockItem'
import { BlockTableData } from 'types/block'
import Divider from '@mui/material/Divider'
import { RoutesConfig } from 'utils/route-paths'
import ShowAllButton from './ShowAllButton'

interface BlockListProps {
    title: string
    items: BlockTableData[]
    to: string
}

const BlockList: FC<BlockListProps> = ({ title, items, to }) => {
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
                            <BlockItem block={item} to={to} />
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
                        No blocks found
                    </Typography>
                </Box>
            )}
            <ShowAllButton toLink={`${routesConfig.CCHAIN}${routesConfig.BLOCKS}`} />
        </Paper>
    )
}

export default BlockList

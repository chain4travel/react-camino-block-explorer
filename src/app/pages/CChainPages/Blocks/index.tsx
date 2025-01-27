import { Box, Grid, LinearProgress, Paper, TableCellProps, TableContainer } from '@mui/material'
import React, { FC } from 'react'

import Block from './Block'
import { BlockTableData } from 'types/block'
import PageContainer from 'app/components/PageContainer'
import { RoutesConfig } from 'utils/route-paths'
import SubPageTitle from 'app/components/SubPageTitle'
import TableView from 'app/components/Table/TableView'
import { getBlocksPage } from 'api'
import { useInfiniteQuery } from 'react-query'
import useWidth from 'app/hooks/useWidth'

const Blocks: FC = () => {
    const routesConfig = RoutesConfig()
    const intObserver = React.useRef<IntersectionObserver | null>(null)
    const { isDesktop, isWidescreen } = useWidth()

    const {
        fetchNextPage, //function
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
        // error,
    } = useInfiniteQuery('/block', ({ pageParam = NaN }) => getBlocksPage(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? lastPage[lastPage.length - 1].number - 1 : undefined
        },
    })

    const lastPostRef = React.useCallback(
        (block: Element) => {
            if (isFetchingNextPage) return
            if (intObserver.current) intObserver.current?.disconnect()
            intObserver.current = new IntersectionObserver(blocks => {
                if (blocks[0].isIntersecting && hasNextPage) {
                    fetchNextPage()
                }
            })
            if (block) intObserver.current.observe(block)
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage],
    )

    const content = data?.pages.map(pg => {
        return pg.map((block: BlockTableData, i: number) => {
            if (pg.length === i + 1)
                return <Block ref={lastPostRef} key={block.number} block={block} />
            return <Block key={block.number} block={block} />
        })
    })

    return (
        <PageContainer pageTitle="C Blocks" metaContent="chain-overview c-chain">
            <Paper
                variant="outlined"
                square
                sx={{
                    minHeight: '850px',
                    width: 1,
                    backgroundColor: 'card.background',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    p: '1rem 1.5rem 1rem 1.5rem',
                }}
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    sx={{ width: 1, gap: '20px' }}
                >
                    <SubPageTitle title="C-Blocks" backToLink={routesConfig.CCHAIN} />
                    {status === 'success' && data && (
                        <TableContainer sx={{ height: '750px', borderRadius: '12px' }}>
                            {isWidescreen || isDesktop ? (
                                <TableView columns={columns}>{content}</TableView>
                            ) : (
                                <Grid item container alignItems="center">
                                    {content}
                                </Grid>
                            )}
                        </TableContainer>
                    )}
                </Grid>
                {isFetchingNextPage && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress color="secondary" />
                    </Box>
                )}
            </Paper>
        </PageContainer>
    )
}

export default Blocks

export interface ColumnType {
    name: string
    label: string
    field: string
    minWidth: number
    align: TableCellProps['align']
}

const columns: ColumnType[] = [
    {
        name: 'block',
        label: 'Block',
        field: 'number',
        minWidth: 140,
        align: 'left',
    },
    {
        name: 'age',
        label: 'Age',
        field: 'timestamp',
        minWidth: 140,
        align: 'left',
    },
    {
        name: 'transactions',
        label: '# of tx',
        field: 'numberOfTransactions',
        align: 'left',
        minWidth: 50,
    },
    {
        name: 'hash',
        label: 'Hash',
        field: 'hash',
        align: 'left',
        minWidth: 170,
    },
    {
        name: 'gasUsed',
        minWidth: 50,
        label: 'Gas Used',
        field: 'gasUsed',
        align: 'left',
    },
    {
        minWidth: 50,
        name: 'gasLimit',
        label: 'Gas Limit',
        field: 'gasLimit',
        align: 'left',
    },
]

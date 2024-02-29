import { Box, Grid, LinearProgress, Paper, TableContainer } from '@mui/material'

import { ColumnType } from 'app/pages/Validators'
import CutomTable from 'app/components/Table/TableView'
import PageContainer from 'app/components/PageContainer'
import React from 'react'
import { RoutesConfig } from 'utils/route-paths'
import SubPageTitle from 'app/components/SubPageTitle'
import Transaction from './Transaction'
import { getChainTypeFromUrl } from 'utils/route-utils'
import { getXPTransactions } from 'api'
import { useInfiniteQuery } from 'react-query'
import useWidth from 'app/hooks/useWidth'

const XPTransactions = () => {
    const routesConfig = RoutesConfig()
    const chainType = getChainTypeFromUrl()
    const {
        fetchNextPage, //function
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
        // error,
    } = useInfiniteQuery(
        '/xtransactions',
        ({ pageParam = 0 }) => getXPTransactions(pageParam, chainType[0]),
        {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length === 50 ? allPages.length * 50 : undefined
            },
        },
    )
    const intObserver = React.useRef<IntersectionObserver | null>(null)
    const lastPostRef = React.useCallback(
        (transaction: Element) => {
            if (isFetchingNextPage) return

            if (intObserver.current) intObserver.current?.disconnect()

            intObserver.current = new IntersectionObserver(transactions => {
                if (transactions[0].isIntersecting && hasNextPage) {
                    fetchNextPage()
                }
            })

            if (transaction) intObserver.current.observe(transaction)
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage],
    )
    const content = data?.pages.map(pg => {
        return pg.map((transaction, i) => {
            if (pg.length === i + 1) {
                return (
                    <Transaction
                        ref={lastPostRef}
                        key={transaction.hash}
                        transaction={transaction}
                    />
                )
            }
            return <Transaction key={transaction.hash} transaction={transaction} />
        })
    })
    const { isDesktop, isWidescreen } = useWidth()
    return (
        <PageContainer
            pageTitle={`${chainType[0].toLocaleUpperCase()} Transactions`}
            metaContent={`list of transactions ${chainType}`}
        >
            <Paper
                variant="outlined"
                square
                sx={{
                    minHeight: '680px',
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
                    <SubPageTitle
                        title={`${chainType[0].toLocaleUpperCase()}-Transactions`}
                        backToLink={routesConfig.BASE_PATH + '/' + chainType}
                    />
                    {status === 'success' && data && (
                        <TableContainer sx={{ height: '650px', borderRadius: '12px' }}>
                            {isWidescreen || isDesktop ? (
                                <CutomTable columns={columns}>{content}</CutomTable>
                            ) : (
                                <Grid item container alignItems="center">
                                    {content}
                                </Grid>
                            )}
                        </TableContainer>
                    )}
                    {isFetchingNextPage && (
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress color="secondary" />
                        </Box>
                    )}
                </Grid>
            </Paper>
        </PageContainer>
    )
}

const columns: ColumnType[] = [
    {
        name: 'hash',
        label: 'Hash',
        field: 'hash',
        align: 'left',
        type: 'hash',
        // detailsLink: transactionDetails,
    },
    {
        name: 'from',
        label: 'From',
        field: 'from',
        align: 'left',
        type: 'hash',
        // detailsLink: addressDetails,
    },
    {
        name: 'to',
        label: 'To',
        field: 'to',
        align: 'left',
        type: 'hash',
        // detailsLink: addressDetails,
    },
    {
        name: 'timestamp',
        label: 'Timestamp',
        field: 'timestamp',
        align: 'left',
        type: 'timestamp',
    },
    {
        name: 'type',
        label: 'Type',
        field: 'Type',
        align: 'left',
    },
    {
        name: 'fee',
        value: 'fee',
        label: 'Fee',
        align: 'left',
        type: 'currency',
    },
]

export default XPTransactions

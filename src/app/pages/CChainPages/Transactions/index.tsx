import { Box, Grid, LinearProgress, Paper, TableContainer } from '@mui/material'
import React, { FC, useCallback, useRef } from 'react'

import { ColumnType } from 'app/pages/Validators'
import PageContainer from 'app/components/PageContainer'
import { RoutesConfig } from 'utils/route-paths'
import SubPageTitle from 'app/components/SubPageTitle'
import TableView from 'app/components/Table/TableView'
import Transaction from './Transaction'
import { TransactionTableData } from 'types/transaction'
import { getTransactionsPage } from 'api'
import { useInfiniteQuery } from 'react-query'
import useWidth from 'app/hooks/useWidth'

const Transactions: FC = () => {
    const intObserver = useRef<IntersectionObserver | null>(null)
    const { isDesktop, isWidescreen } = useWidth()
    const routesConfig = RoutesConfig()

    const {
        fetchNextPage, //function
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
        // error,
    } = useInfiniteQuery('/transactions', ({ pageParam = NaN }) => getTransactionsPage(pageParam), {
        getNextPageParam: lastPage => {
            return lastPage.length ? lastPage[lastPage.length - 1].blockNumber - 1 : undefined
        },
    })

    const lastPostRef = useCallback(
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
        return pg.map((transaction: TransactionTableData, i: number) => {
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
                    <SubPageTitle title="C-Transactions" backToLink={routesConfig.CCHAIN} />
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

export default Transactions

const columns: ColumnType[] = [
    {
        name: 'blockNumber',
        label: 'Block',
        field: 'blockNumber',
        align: 'left',
        type: 'hash',
        // detailsLink: blockDetails,
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
        name: 'hash',
        label: 'Hash',
        field: 'hash',
        align: 'left',
        type: 'hash',
        // detailsLink: transactionDetails,
    },
    {
        name: 'timestamp',
        label: 'Timestamp',
        field: 'timestamp',
        align: 'left',
        type: 'timestamp',
    },
    {
        name: 'status',
        label: 'Status',
        field: 'status',
        align: 'left',
        type: 'status',
    },
    {
        name: 'transactionCost',
        value: 'transactionCost',
        label: 'Transaction Cost',
        field: 'transactionCost',
        align: 'left',
        type: 'currency',
    },
    {
        name: 'value',
        value: 'value',
        label: 'Value',
        field: 'value',
        align: 'left',
        type: 'currency',
    },
]

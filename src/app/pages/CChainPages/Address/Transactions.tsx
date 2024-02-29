import { Box, Grid, LinearProgress, TableContainer } from '@mui/material'
import React, { FC, useCallback, useEffect, useRef } from 'react'

import Address from './Address'
import { CAddressTransactionTableData } from 'types/transaction'
import { ColumnType } from 'app/pages/Validators'
import LoadingWrapper from 'app/components/LoadingWrapper'
import { Status } from 'types'
import TableView from 'app/components/Table/TableView'
import { getAddressFromUrl } from 'utils/route-utils'
import { loadCAddressTransactions } from 'api'
import { queryClient } from '../../../../App'
import { useInfiniteQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import useWidth from 'app/hooks/useWidth'

const Transactions: FC = () => {
    const location = useLocation()
    useEffect(() => {
        queryClient.clear()
    }, [location]) // eslint-disable-line
    const {
        fetchNextPage, //function
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
        isLoading,
        error,
    } = useInfiniteQuery(
        `/c-address}`,
        async ({ pageParam = 0 }) =>
            await loadCAddressTransactions({
                address: getAddressFromUrl(),
                allPages: pageParam,
            }),
        {
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage.length || lastPage.length < 50) return undefined
                return allPages.length
            },
        },
    )
    const intObserver = useRef<IntersectionObserver | null>(null)
    const lastPostRef = useCallback(
        (address: Element) => {
            if (isFetchingNextPage) return
            if (intObserver.current) intObserver.current?.disconnect()
            intObserver.current = new IntersectionObserver(blocks => {
                if (blocks[0].isIntersecting && hasNextPage) {
                    fetchNextPage()
                }
            })
            if (address) intObserver.current.observe(address)
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage],
    )

    const content = data?.pages?.map(pg => {
        return pg.map((transaction: CAddressTransactionTableData, i: number) => {
            if (pg.length === i + 1)
                return <Address ref={lastPostRef} key={i} transaction={transaction} />
            return <Address key={i} transaction={transaction} />
        })
    })
    const { isDesktop, isWidescreen } = useWidth()
    return (
        <Grid container direction="column" alignItems="center" sx={{ width: 1, gap: '20px' }}>
            <LoadingWrapper
                loading={
                    isLoading === true ? Status.LOADING : error ? Status.FAILED : Status.SUCCEEDED
                }
                failedLoadingMsg="Failed to load transactions"
                loadingBoxStyle={{ minHeight: '500px' }}
            >
                {status === 'success' && data && (
                    <TableContainer sx={{ height: '680px', borderRadius: '12px' }}>
                        {isWidescreen || isDesktop ? (
                            <TableView columns={columns}>{content}</TableView>
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
            </LoadingWrapper>
        </Grid>
    )
}

export default Transactions

const columns: ColumnType[] = [
    {
        name: 'direction',
        label: 'In/Out',
        field: 'direction',
        align: 'left',
    },
    {
        name: 'txnHash',
        label: 'Txn Hash',
        field: 'txnHash',
        align: 'left',
        type: 'hash',
    },
    {
        name: 'block',
        label: 'Block',
        field: 'block',
        align: 'left',
    },
    {
        name: 'age',
        label: 'Age',
        field: 'age',
        align: 'left',
        type: 'timestamp',
    },
    {
        name: 'from',
        label: 'From',
        field: 'from',
        align: 'left',
        type: 'hash',
    },
    {
        name: 'to',
        label: 'To',
        field: 'to',
        align: 'left',
        type: 'hash',
    },
    {
        name: 'value',
        label: 'Value',
        field: 'value',
        align: 'left',
        type: 'currency',
    },
    {
        name: 'txnFee',
        label: 'Txn Fee',
        field: 'txnFee',
        align: 'left',
        type: 'currency',
    },
]

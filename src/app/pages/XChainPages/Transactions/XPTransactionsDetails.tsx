import * as React from 'react'

import { Box, Grid, Paper, Typography } from '@mui/material'
import { convertMemo, getInputFunds, getOutputFunds } from 'utils/magellan'
import { getAddressFromUrl, getChainTypeFromUrl } from 'utils/route-utils'

import BackButton from 'app/components/BackButton'
import CopyTitleCard from 'app/components/CopyTitleCard'
import PageContainer from 'app/components/PageContainer'
import { RoutesConfig } from 'utils/route-paths'
import SubPageTitle from 'app/components/SubPageTitle'
import TransactionDetailView from './XPTransactionDetailView'
import { XPTransaction } from 'types/transaction'
import { XPTransactionDetail } from 'types/magellan-types'
import axios from 'axios'
import { currentDateFormat } from 'utils/helpers/moment'
import { mdiTransfer } from '@mdi/js'
import moment from 'moment'
import { selectMagellanAddress } from 'store/app-config'
import { transactionApi } from 'utils/magellan-api-utils'
import { useAppSelector } from 'store/configureStore'
import { useLocation } from 'react-router-dom'

export default function XPTransactionDetails() {
    const routesConfig = RoutesConfig()
    const [result, setResult] = React.useState<XPTransaction>()
    const [details, setDetails] = React.useState<XPTransactionDetail>()
    const location = useLocation()
    const magellanAddress = useAppSelector(selectMagellanAddress)

    async function fetchTransactionDetail(): Promise<void> {
        const res = (await axios.get(`${magellanAddress}${transactionApi}/${getAddressFromUrl()}`))
            .data
        const parsedDate = moment.utc(res.timestamp)
        let form =
            currentDateFormat()[0] === 'd'
                ? 'ddd DD MMM YYYY HH:mm:ss [GMT]Z (z)'
                : 'ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)'
        const formattedDate = parsedDate.format(form)
        let transaction: XPTransaction = {
            id: res.id,
            // status: 'accepted', //TODO: set dynamically when magellan delivers this information
            type: res.type,
            timestamp: new Date(Date.parse(res.timestamp)),
            from: getInputFunds(res),
            to: getOutputFunds(res),
            fee: res.txFee,
            inputTotals: res.inputTotals,
            outputTotals: res.outputTotals,
            memo: convertMemo(res.memo),
        }
        setResult(transaction)
        setDetails({
            id: res.id,
            status: 'accepted', //TODO: set dynamically when magellan delivers this information
            type: res.type,
            timestamp: formattedDate,
            fee: res.txFee,
            memo: convertMemo(res.memo),
        })
    }

    React.useEffect(() => {
        fetchTransactionDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <PageContainer
            pageTitle={`${location.pathname
                .split('/')[3][0]
                .toLocaleUpperCase()} TransactionDetails`}
            metaContent="chain-overview x-chain"
        >
            <Paper
                variant="outlined"
                square
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '680px',
                    width: 1,
                    backgroundColor: 'card.background',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    p: '1rem 1.5rem 1rem 1.5rem',
                }}
            >
                <Grid container direction="column" sx={{ width: 1, gap: '20px', flex: 1 }}>
                    <SubPageTitle
                        title={`${location.pathname
                            .split('/')[3][0]
                            .toLocaleUpperCase()}-Chain Transaction`}
                        backToLink={`${routesConfig.BASE_PATH}/${getChainTypeFromUrl()}`}
                    />
                    {details && (
                        <CopyTitleCard label="Transaction" value={details.id} icon={mdiTransfer} />
                    )}
                    <TransactionDetailView
                        inputs={result?.from}
                        outputs={result?.to}
                        detailTr={details}
                    />
                </Grid>
                {details && (
                    <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                        <BackButton
                            backToLink={`${routesConfig.BASE_PATH}/${getChainTypeFromUrl()}`}
                        />
                    </Box>
                )}
            </Paper>
        </PageContainer>
    )
}
